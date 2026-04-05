---
feature: FEAT-2
severity: Low
status: Open
---

# BUG-FEAT2-QA-004: aria-label auf Chart-Container unvollständig – aktueller Preis fehlt

**Severity:** Low
**Bereich:** A11y
**Status:** Open

## Beschreibung

Das Tech-Design spezifiziert für den Chart-Container:
`aria-label="BTC Preisverlauf, 1 Monat, aktuell $84,230.50"` – mit aktuellem Preis, der sich beim Zeitraum-Wechsel aktualisiert.

Implementiert ist in `PriceAreaChart.tsx`:
`aria-label={\`BTC Preisverlauf, Zeitraum ${activeRange}\`}`

Zwei Abweichungen:
1. Aktueller Preis fehlt vollständig im `aria-label`
2. Der Zeitraum wird als Kurzcode ausgegeben (`1M`), nicht als lesbare Bezeichnung (`1 Monat`) – Screen Reader würden "ein M" statt "ein Monat" vorlesen

## Schritte zur Reproduktion

1. Screen Reader aktivieren (oder Chrome Accessibility-Tree inspizieren)
2. Chart-Container fokussieren
3. Screen Reader liest: "BTC Preisverlauf, Zeitraum 1M" – Preis fehlt

## Erwartetes Verhalten

`aria-label="BTC Preisverlauf, 1 Monat, aktuell $84.230,50"` – mit lesbarem Zeitraum und aktuellem Preis, aktualisiert sich beim Zeitraum-Wechsel.

## Tatsächliches Verhalten

`aria-label="BTC Preisverlauf, Zeitraum 1M"` – kein Preis, Zeitraum als Kurzcode.

## Fix-Vorschlag

`PriceAreaChart` um `currentPrice`-Prop erweitern und `aria-label` vervollständigen:

```tsx
// PriceAreaChart.tsx
const RANGE_LABELS: Record<TimeRange, string> = {
  '1T': '1 Tag',
  '1W': '1 Woche',
  '1M': '1 Monat',
  '1J': '1 Jahr',
}

<div
  role="img"
  aria-label={`BTC Preisverlauf, ${RANGE_LABELS[activeRange]}, aktuell ${formatCurrency(currentPrice)}`}
  className="h-[200px] md:h-[300px] w-full"
>
```

`ChartSection` übergibt zusätzlich `currentPrice={btcAssetInfo.currentPrice}` an `PriceAreaChart`.
