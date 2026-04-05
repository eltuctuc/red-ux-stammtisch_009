---
status: approved
---

# FEAT-2: Interaktives Preis-Chart
*Erstellt: 2026-04-05*
*Scope-Typ: Klickbarer Prototyp – Fix-Schwelle: Critical*

## Zusammenfassung
Ein interaktives Zeitreihen-Chart für Kryptowährungspreise mit wählbaren Zeiträumen (1T, 1W, 1M, 1J) und Hover-Tooltip. Das Chart ist das zentrale Interaktionselement des Dashboards und muss visuell hochwertig und smooth wirken.

## Zielgruppe
- **Kai (Krypto-Trader):** Erwartet Qualität auf TradingView-Niveau – smooth Animation, präziser Tooltip, sinnvolle Y-Achsen-Skalierung
- **Mia (pragmatische Investorin):** Will auf einen Blick sehen ob der Kurs gestiegen oder gefallen ist
- **Showcase-Betrachter:** Bewertet die Chart-Interaktion als Kernkompetenz-Beweis des Showcases

## Kernwert
Das Chart ist der einzige echte Interaktionspunkt des Dashboards. Ist es nicht smooth und glaubwürdig, verliert der gesamte Showcase seinen Überzeugungswert.

## Nicht im Scope
- Echte Kursdaten per API
- Candlestick-Charts / OHLCV-Daten
- Mehrere Charts gleichzeitig / Chart-Vergleich
- Zeichenwerkzeuge (wie TradingView)
- Zoom per Pinch oder Drag

## User Stories

1. Als Betrachter möchte ich den Kursverlauf einer Kryptowährung als Linien-Chart sehen, damit ich auf einen Blick erkenne ob der Preis gestiegen oder gefallen ist.
2. Als Betrachter möchte ich zwischen den Zeiträumen 1T, 1W, 1M und 1J wechseln können, damit ich kurzfristige und langfristige Trends vergleichen kann.
3. Als Betrachter möchte ich beim Hovern über das Chart einen Tooltip mit genauem Datum und Preis sehen, damit ich konkrete Werte ablesen kann.
4. Als Kai möchte ich, dass die Chart-Linie glatt animiert wenn ich den Zeitraum wechsle, damit das Dashboard professionell wirkt.
5. Als Betrachter möchte ich sehen für welches Asset das Chart gerade angezeigt wird (Name + Symbol), damit klar ist was dargestellt wird.

## Acceptance Criteria

1. Das Chart zeigt eine Preis-Zeitreihe als Linienchart mit Gradient-Fill unter der Linie.
2. Vier Zeitraum-Buttons sind vorhanden: 1T, 1W, 1M, 1J – der aktive Zeitraum ist visuell hervorgehoben.
3. Beim Klick auf einen Zeitraum-Button wechselt das Chart sofort auf die entsprechenden Mock-Daten.
4. Beim Hovern zeigt ein Tooltip: Datum (formatiert, z.B. "15. März 2026") und Preis (formatiert, z.B. "$84,230.50").
5. Die Y-Achse zeigt sinnvolle Intervalle (kein Sprung von $0 auf $100.000 – beginnt nahe am Minimum der Datenpunkte).
6. Das Chart passt sich responsiv an die Container-Breite an (kein Overflow auf mobilen Viewports).
7. Das dargestellte Asset (Name + Symbol) ist oberhalb des Charts erkennbar.
8. Mock-Daten für alle 4 Zeiträume sind vorhanden und erzeugen einen realistischen Kursverlauf (kein flaches oder gerades Linien-Muster).

## Edge Cases

| Fall | Erwartetes Verhalten |
|------|----------------------|
| Kurs im gewählten Zeitraum nur gestiegen | Gradient grün, Linie grün |
| Kurs im gewählten Zeitraum gefallen | Gradient rot, Linie rot (oder neutral grau) |
| Hover außerhalb des Chart-Bereichs | Tooltip verschwindet, kein Fehler |
| Sehr schmaler Viewport (< 375px) | Chart scrollt horizontal oder skaliert ohne Bruch |
| Schnelles Klicken zwischen Zeiträumen | Kein visueller Glitch, Chart wechselt stabil |

## Mock-Daten Anforderungen

- Zeitraum 1T: 24 Datenpunkte (stündlich), realistische Intraday-Schwankungen (±1–3%)
- Zeitraum 1W: 7 Datenpunkte (täglich), Schwankungen ±3–8%
- Zeitraum 1M: 30 Datenpunkte (täglich), Trend erkennbar (z.B. Aufwärtstrend)
- Zeitraum 1J: 52 Datenpunkte (wöchentlich), deutlichere Volatilität sichtbar
- Asset: BTC als Standard (passt zur Portfolio-Übersicht in FEAT-1)

---

## 2. UX Entscheidungen
*UX-Designer: Claude – 2026-04-05*

### Einbettung
**Wo lebt das Feature:** Sektion S-01-B – linke Spalte der mittleren Dashboard-Zeile (ca. 65% Breite), rechts daneben S-01-C Watchlist. Kein Modal, keine Route.

**Begründung:** product-flows.md definiert die Layout-Bindung explizit. Breite Sektion links maximiert den Chart-Canvas, der Showcase-Betrachter nimmt ihn als "Hauptbühne" wahr. Die Watchlist als schmalere Spalte rechts ist visuell sekundär – das Chart bekommt Dominanz.

---

### Layout-Entscheidung

**Desktop (≥1280px):**
```
┌─────────────────────────────────────────────┐
│  Bitcoin  BTC                  [1T][1W][1M][1J] │
│  $84,230.50  +1.2% heute                    │
│                                              │
│  ╱╲    ╱╲   ╱╲╱                             │
│ ╱  ╲  ╱  ╲╱  ╲                              │
│╱    ╲╱       ╲╱                             │
│  (Gradient-Fill, grün oder rot)              │
│  Jan  Feb  Mär  Apr  Mai ...                 │
└─────────────────────────────────────────────┘
```

- Chart-Höhe Desktop: `300px`
- Chart-Höhe Mobile: `200px`
- `ResponsiveContainer width="100%"` → kein Overflow, kein horizontales Scrollen

**Mobile (375px):**
- TimeRangeSelector bleibt als 4-Button-Row (bei ~343px Breite = ~85px/Button → tappbar)
- X-Achse-Labels: Anzahl Ticks reduziert (`interval="preserveStartEnd"` + max. 4 Labels) – verhindert Überlappung
- Höhe: 200px (kompakter, andere Sektionen bleiben sichtbar)

---

### Interaktionsmuster

**Zwei Interaktionen (gemäß product-flows.md S-01-B Transitions):**

**1. Zeitraum-Selector (Toggle-Buttons):**
- Immer genau ein Zeitraum aktiv (kein Deselect)
- Default: `1M` – zeigt den Trend am deutlichsten, ist für Mia und Kai aussagekräftig
- Klick → sofortiger Datenwechsel + Chart-Re-Animation (300ms Recharts built-in)
- Pill-Group-Pattern: 4 Buttons in einem gemeinsamen Container → visuell als Einheit

**Begründung Default 1M:** Kai checkt täglich → er sieht den monatlichen Trend als Kontext. Mia kommt selten → Monat gibt ihr mehr Signal als ein einzelner Tag. Showcase-Betrachter sieht einen vollständigen Trend ohne "zu wenig Kurve" (1T kann flach wirken).

**2. Hover-Tooltip:**
- Erscheint wenn Maus/Touch innerhalb des Chart-Bereichs
- Positionierung: rechts des Cursors (oder links wenn Cursor im rechten Drittel)
- Zeigt: formatiertes Datum + Preis
- Verschwindet bei Maus-Leave (flows.md Transition bestätigt)
- Kein Crosshair-Overlay – zu viel visuelles Rauschen für einen Showcase; `activeDot` (Punkt auf der Linie) reicht

---

### Trend-Farblogik

Chart-Farbe ist **kontextabhängig** (nicht statisch):
- Letzter Datenpunkt > erster Datenpunkt des Zeitraums → **Grün** (`green-500` #22c55e)
- Letzter Datenpunkt ≤ erster → **Rot** (`red-400` #f87171)

Gilt für: Linie + Gradient-Fill + der kleine "heute"-Wert unter dem Asset-Namen.

Edge Case aus Spec: "Kurs nur gestiegen → Gradient grün, Linie grün" → abgedeckt. "Kurs gefallen → rot" → abgedeckt.

---

### Visuelles Design

**Chart-Linie:** `strokeWidth={2}`, Farbe dynamisch (grün/rot), keine Dots auf Datenpunkten (außer activeDot beim Hover)

**Gradient-Fill:**
```
Positiv: green-500 → opacity 0.35 oben, opacity 0.02 unten
Negativ: red-400   → opacity 0.25 oben, opacity 0.02 unten
```
Begründung: Gradient gibt Tiefe und Richtungssignal, niedrige Opacity hält das Chart lesbar.

**Y-Achse:** `domain={['dataMin * 0.995', 'dataMax * 1.005']}` → beginnt nahe am Minimum (AC-5). Tick-Labels: `slate-400`, `text-xs` (12px), rechts-ausgerichtet.

**X-Achse-Labels:**
| Zeitraum | Format | Beispiel | Tick-Anzahl |
|----------|--------|---------|-------------|
| 1T | `HH:mm` | 14:00 | 6 |
| 1W | Wochentag | Mo, Di | 7 |
| 1M | `DD.MM` | 01.03 | 6 |
| 1J | Monat | Jan | 6 |

**Asset-Header:**
```
Bitcoin  BTC                     [1T][1W][1M][1J]
$84,230.50  +1.2% ↑ heute
```
- Name: `text-base font-semibold text-slate-100`
- Symbol: `text-sm text-slate-400`
- Aktueller Preis: `text-2xl font-bold text-slate-50`
- Tages-G/V: `text-sm` grün/rot (konsistent mit FEAT-1 Farblogik)

---

### Komponenten

| Komponente | Verwendung | Status |
|-----------|-----------|--------|
| `ChartSection` | Container-Card `bg-slate-900 rounded-xl p-6` | Neu bauen |
| `ChartHeader` | Asset-Name, Symbol, Preis, Tages-G/V | Neu bauen |
| `TimeRangeSelector` | 4 Toggle-Buttons als Pill-Group | Neu bauen |
| `PriceAreaChart` | Recharts `AreaChart` + `ResponsiveContainer` | Neu bauen |
| `ChartTooltip` | Custom Recharts Tooltip-Component | Neu bauen |
| `ChartGradientDef` | SVG `linearGradient`-Definition (grün/rot) | Teil von PriceAreaChart |

**DS-Lücke:** Design System leer → alle Komponenten neu mit Tailwind + Recharts.

---

### Touch-Targets (interaktive Elemente)

| Element | Größe | WCAG 2.5.5 (44px) | Lösung |
|---------|-------|-------------------|--------|
| TimeRange-Button (1T/1W/1M/1J) | `h-11` (44px) × `min-w-[48px]` | ✅ 44px | `h-11` direkt setzen |
| Chart-Hover-Area | gesamte Chart-Fläche (>44px) | ✅ | – |

Hinweis: `h-10` (40px) wäre unzureichend. Explizit `h-11` einsetzen, nicht `h-10`.

---

### Kontrast-Check (WCAG AA)
Annahme: Hintergrund `slate-900` (#0f172a), Button-Container `slate-800` (#1e293b)

| Element | Vordergrund | Hintergrund | Verhältnis | WCAG | Status |
|---------|------------|-------------|------------|------|--------|
| Active Button Text | `white` #fff | `slate-700` #334155 | ~12:1 | AA/AAA | ✅ |
| Inactive Button Text | `slate-300` #cbd5e1 | `slate-800` #1e293b | ~7:1 | AA | ✅ |
| Asset Name | `slate-100` #f1f5f9 | `slate-900` | ~14:1 | AA | ✅ |
| Aktueller Preis | `slate-50` #f8fafc | `slate-900` | ~17:1 | AAA | ✅ |
| X-Achse Labels | `slate-400` #94a3b8 | `slate-900` | ~4.9:1 | AA | ✅ |
| Y-Achse Labels | `slate-400` #94a3b8 | `slate-900` | ~4.9:1 | AA | ✅ |
| Tooltip Datum | `slate-400` #94a3b8 | `slate-800` #1e293b | ~4.2:1 | ⚠️ knapp | Anpassen auf `slate-300` → ~7:1 ✅ |
| Tooltip Preis | `white` #fff | `slate-800` #1e293b | ~15:1 | AAA | ✅ |

**Lücke behoben:** Tooltip Datum `slate-500` wäre 3.8:1 → bewusst auf `slate-300` angehoben.

---

### Navigation nach Aktionen
Alle 6 Transitions für S-01-B sind in product-flows.md bereits vollständig definiert (Zeitraum-Wechsel × 4 + Tooltip erscheinen/verschwinden). Kein Update nötig.

---

## Fortschritt
- Status: Freigegeben
- Aktueller Schritt: UX ✓ → Architect
