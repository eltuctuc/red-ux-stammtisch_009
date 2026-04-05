---
feature: FEAT-2
severity: Low
status: Open
---

# BUG-FEAT2-QA-003: XAxis tickCount={6} hat keine Wirkung – Label-Überlappung auf Mobile möglich

**Severity:** Low
**Bereich:** Functional / Responsive
**Status:** Open

## Beschreibung

`PriceAreaChart.tsx` setzt gleichzeitig `interval="preserveStartEnd"` und `tickCount={6}` auf der `XAxis`. Bei Recharts ist `XAxis` mit einem String-`dataKey` (`"timestamp"`) vom Typ `category`. Bei `category`-Achsen ignoriert Recharts `tickCount` vollständig – der Prop wirkt nur bei `type="number"`.

`interval="preserveStartEnd"` garantiert nur, dass der erste und letzte Tick angezeigt werden. Wie viele Zwischenticks erscheinen, bestimmt Recharts intern basierend auf verfügbarem Platz – nicht durch `tickCount`.

Konsequenz: Auf schmalen Viewports (375px) können bei 1T (24 Datenpunkte) mehr als 6 X-Achsen-Labels erscheinen und sich überlappen. Die Spec fordert maximal 6 Ticks pro Zeitraum.

## Schritte zur Reproduktion

1. App auf 375px-Viewport skalieren (Chrome DevTools, iPhone-Emulation)
2. Zeitraum "1T" wählen (24 Datenpunkte)
3. X-Achse beobachten – möglicherweise mehr als 6 Labels oder Label-Überlappung sichtbar

## Erwartetes Verhalten

Maximal 6 X-Achsen-Labels, auch auf 375px. Keine Label-Überlappung (Spec: "max. 4 Labels" auf Mobile).

## Tatsächliches Verhalten

`tickCount={6}` hat bei `category`-Typ keine Wirkung. Die tatsächliche Tick-Anzahl ist von Recharts-Internem und Viewport-Breite abhängig.

## Fix-Vorschlag

`interval` als Zahl setzen statt als String, um jeden N-ten Tick zu zeigen. Für 1T (24 Punkte) und gewünschte ~6 Labels: `interval={3}` (jeden 4. Tick, ergibt 6 Labels).

Alternativ: `interval` per Zeitraum berechnen:

```tsx
const tickIntervals: Record<TimeRange, number> = {
  '1T': 4,   // 24 Punkte / 4 = 6 Labels
  '1W': 1,   // 7 Punkte -> alle zeigen
  '1M': 4,   // 30 Punkte / 4 = ~7 Labels
  '1J': 8,   // 52 Punkte / 8 = ~6 Labels
}

<XAxis
  dataKey="timestamp"
  tickFormatter={xAxisFormatters[activeRange]}
  interval={tickIntervals[activeRange]}
  ...
/>
```

`tickCount` entfernen (hat keine Wirkung bei category-type).
