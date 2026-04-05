---
feature: FEAT-2
severity: Medium
status: Fixed
---

# BUG-FEAT2-UX-001: Tooltip zeigt immer Uhrzeit – auch bei Zeiträumen ohne stündliche Daten

**Severity:** Medium
**Bereich:** UX / Copy
**Status:** Open

## Beschreibung
Der Tooltip in `ChartTooltip.tsx` formatiert das Datum immer mit Uhrzeit (`day + month + year + hour + minute`). Das ergibt für 1J-Wochendaten ("15. März 2026, 00:00") und 1M-Tagesdaten ("15. März 2026, 00:00") eine falsche, irreführende Zeitangabe. Die Uhrzeit "00:00" suggeriert einen konkreten Messzeitpunkt, obwohl es sich um Tages- oder Wochenwerte handelt. Nur für 1T (stündliche Daten) ist die Uhrzeitanzeige sinnvoll.

Die UX-Spec (Acceptance Criteria Nr. 4) beschreibt das Format explizit als `"15. März 2026"` – ohne Uhrzeit.

## Schritte zur Reproduktion
1. Chart aufrufen (Default: 1M aktiv)
2. Über einen Datenpunkt hovern
3. Tooltip zeigt z.B. "15. März 2026, 00:00"
4. Auf 1J wechseln, hovern
5. Tooltip zeigt z.B. "17. Februar 2025, 00:00"

## Erwartetes Verhalten (aus Spec)
- AC-4: Datum im Tooltip formatiert als `"15. März 2026"` (kein Uhrzeitanteil)
- Für 1T: Uhrzeit ist sinnvoll und kann zusätzlich angezeigt werden (`"15. März 2026, 14:00"`)
- Für 1W, 1M, 1J: nur Datum, keine Uhrzeit

## Tatsächliches Verhalten (im Code)
`ChartTooltip.tsx` verwendet `Intl.DateTimeFormat` mit `hour: '2-digit', minute: '2-digit'` fix für alle Zeiträume. Der Tooltip-Komponente wird kein `activeRange`-Prop übergeben, sie kann daher nicht zwischen Zeiträumen unterscheiden.

## Fix-Vorschlag
`ChartTooltip` um einen optionalen `activeRange`-Prop erweitern und das Datumsformat zeitraumabhängig steuern:

```tsx
// ChartTooltip.tsx
interface CustomTooltipProps extends TooltipProps<number, string> {
  payload?: Array<{ payload: ChartDataPoint; value: number }>
  activeRange?: TimeRange
}

export function ChartTooltip({ active, payload, activeRange }: CustomTooltipProps) {
  // ...
  const showTime = activeRange === '1T'
  const formattedDate = new Intl.DateTimeFormat('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...(showTime ? { hour: '2-digit', minute: '2-digit' } : {}),
  }).format(date)
}
```

In `PriceAreaChart.tsx` den Prop durchreichen:
```tsx
<Tooltip content={<ChartTooltip activeRange={activeRange} />} cursor={false} />
```
