---
feature: FEAT-2
severity: Low
status: Open
---

# BUG-FEAT2-UX-002: aria-label des Chart-Containers fehlt aktueller Preis

**Severity:** Low
**Bereich:** A11y
**Status:** Open

## Beschreibung
Der `aria-label` auf dem Chart-Container in `PriceAreaChart.tsx` enthält nicht den aktuellen Preis. Die technische Spec definiert explizit, dass der Label den aktuellen Preis enthalten soll, damit Screenreader-Nutzer den Kernwert des Charts ohne visuelle Inspektion erfassen können.

## Schritte zur Reproduktion
1. Seite mit Screenreader öffnen (z.B. VoiceOver auf macOS)
2. Fokus auf den Chart-Container navigieren
3. VoiceOver liest: "BTC Preisverlauf, Zeitraum 1M"
4. Kein Preis wird kommuniziert

## Erwartetes Verhalten (aus Spec)
Technisches Design, A11y-Architektur:
> `aria-label="BTC Preisverlauf, 1 Monat, aktuell $84,230.50"` – aktualisiert sich mit activeRange

Der Label soll drei Informationen enthalten: Asset, Zeitraum (ausgeschrieben), aktueller Preis.

## Tatsächliches Verhalten (im Code)
`PriceAreaChart.tsx` Zeile 38:
```tsx
aria-label={`BTC Preisverlauf, Zeitraum ${activeRange}`}
```
- Zeitraum wird als Code-Kürzel (`1M`) nicht ausgeschrieben (`1 Monat`)
- Aktueller Preis fehlt vollständig
- `PriceAreaChart` erhält keinen `currentPrice`-Prop

## Fix-Vorschlag
`PriceAreaChart` um `currentPrice: number` erweitern und Label vervollständigen:

```tsx
// PriceAreaChart.tsx
const RANGE_LABELS: Record<TimeRange, string> = {
  '1T': '1 Tag',
  '1W': '1 Woche',
  '1M': '1 Monat',
  '1J': '1 Jahr',
}

// im JSX:
aria-label={`BTC Preisverlauf, ${RANGE_LABELS[activeRange]}, aktuell ${formatCurrency(currentPrice)}`}
```

In `ChartSection.tsx` den Prop durchreichen:
```tsx
<PriceAreaChart
  data={data}
  activeRange={activeRange}
  trendColor={trendColor}
  isPositive={isPositive}
  currentPrice={btcAssetInfo.currentPrice}
/>
```
