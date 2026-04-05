---
feature: FEAT-2
severity: Medium
status: Fixed
---

# BUG-FEAT2-QA-001: Tooltip zeigt immer Uhrzeit – auch für 1W/1M/1J-Daten

**Severity:** Medium
**Bereich:** Functional / A11y
**Status:** Open

## Beschreibung

`ChartTooltip.tsx` verwendet ein einheitliches `Intl.DateTimeFormat`-Format mit `hour: '2-digit', minute: '2-digit'` für alle Zeiträume. Für 1W-, 1M- und 1J-Daten erscheint dadurch immer "um 12:00" im Tooltip – ein Artefakt der Mock-Daten, bei denen alle Nicht-1T-Punkte auf 12:00 Uhr gesetzt sind.

Die Spec (AC-4) gibt als Beispiel "15. März 2026" – ohne Uhrzeit. Für 1T ist die Uhrzeit sinnvoll (stündliche Datenpunkte), für 1W/1M/1J ist sie irreführend.

Zusätzlich: `ChartTooltip` erhält kein `activeRange`-Prop von `PriceAreaChart`, was eine bedingte Formatierung strukturell unmöglich macht.

## Schritte zur Reproduktion

1. Dashboard laden, aktiven Zeitraum auf "1W", "1M" oder "1J" setzen
2. Über einen Datenpunkt hovern
3. Tooltip erscheint mit z.B. "30. März 2026 um 12:00"

## Erwartetes Verhalten

- 1T: Datum + Uhrzeit, z.B. "5. April 2026 um 14:00"
- 1W/1M/1J: Nur Datum, z.B. "30. März 2026" (Spec AC-4 Beispiel)

## Tatsächliches Verhalten

Alle Zeiträume zeigen Datum + Uhrzeit. Für 1W/1M/1J erscheint immer "um 12:00" – ein sinnloser Wert, der Nutzer verwirrt.

## Fix-Vorschlag

`activeRange` als Prop an `ChartTooltip` übergeben und das Datumsformat bedingt setzen:

```tsx
// PriceAreaChart.tsx
<Tooltip content={<ChartTooltip activeRange={activeRange} />} cursor={false} />
```

```tsx
// ChartTooltip.tsx
const showTime = activeRange === '1T'
const formattedDate = new Intl.DateTimeFormat('de-DE', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  ...(showTime ? { hour: '2-digit', minute: '2-digit' } : {}),
}).format(date)
```
