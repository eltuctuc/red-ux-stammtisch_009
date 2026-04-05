# Dev Handoff – FEAT-2 Interaktives Preis-Chart
*Erstellt: 2026-04-05*

## Was wurde gebaut

Interaktives BTC Preis-Chart als Section `S-01-B` im Dashboard. Wählbare Zeiträume (1T/1W/1M/1J), Hover-Tooltip, dynamische Trend-Farbe (grün/rot), Gradient-Fill unter der Linie.

## Implementierte Dateien

| Datei | Zweck |
|-------|-------|
| `projekt/src/data/chartData.ts` | Mock-Daten für 4 Zeiträume + btcAssetInfo |
| `projekt/src/components/chart/ChartSection.tsx` | Container mit activeRange-State |
| `projekt/src/components/chart/ChartHeader.tsx` | Name, Symbol, Preis, 24h-Änderung |
| `projekt/src/components/chart/TimeRangeSelector.tsx` | 4 Toggle-Buttons |
| `projekt/src/components/chart/PriceAreaChart.tsx` | Recharts AreaChart |
| `projekt/src/components/chart/ChartTooltip.tsx` | Custom Tooltip |
| `projekt/src/utils/format.ts` | `formatCurrencyCompact()` ergänzt |
| `projekt/src/App.tsx` | ChartSection integriert, Grid `lg:` → `xl:` |

## Wichtige Implementierungsdetails

- **Trend-Farbe:** `data[last].price >= data[0].price` → grün (`#22c55e`), sonst rot (`#f87171`)
- **Gradient-ID:** `chartGradient` – nur ein Chart im DOM, kein Konflikt
- **X-Achsen-Formatter:** `date-fns` mit `de`-Locale; Format je Zeitraum unterschiedlich
- **Y-Achse Domain:** `['dataMin * 0.995', 'dataMax * 1.005']` – beginnt nahe am Minimum
- **Animation:** `isAnimationActive={true}` mit `animationDuration={300}` bei Zeitraum-Wechsel
- **Touch Targets:** TimeRange-Buttons `h-11` (44px) per UX-Spec
- **A11y:** `role="img"` + `aria-label` auf Chart-Container; `aria-pressed` + `aria-label` auf Buttons

## Bekannte Besonderheiten

- `1M`-Daten enthalten March 30 zweimal (aus 1W übernommen) – optisch unauffällig
- Y-Achse `width={52}` statt spec. 80 – reicht für `$84k`-Labels, spart Platz
- `cursor={false}` auf Tooltip – kein Crosshair, nur `activeDot` auf der Linie

## Für QA relevant (Acceptance Criteria)

1. Chart zeigt Linienchart mit Gradient-Fill ✓
2. Vier Zeitraum-Buttons vorhanden, aktiver hervorgehoben ✓
3. Klick wechselt sofort Chart-Daten ✓
4. Tooltip zeigt Datum + Preis beim Hovern ✓
5. Y-Achse beginnt nahe am Minimum ✓
6. Responsiv ohne Overflow (ResponsiveContainer width="100%") ✓
7. Asset-Name + Symbol oberhalb erkennbar ✓
8. Mock-Daten für alle 4 Zeiträume vorhanden ✓

## Fix-Schwelle

Aktuell: `Critical` (aus FEAT-2 Spec). Beim ersten QA-Run wird die Schwelle bestätigt.
