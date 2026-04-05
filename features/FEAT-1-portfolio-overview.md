---
status: approved
---

# FEAT-1: Portfolio-Übersicht
*Erstellt: 2026-04-05*
*Scope-Typ: Klickbarer Prototyp – Fix-Schwelle: Critical*

## Zusammenfassung
Der visuell dominierende Hero-Bereich des Dashboards. Zeigt dem Betrachter auf den ersten Blick: Gesamtwert des Portfolios, Performance (Gewinn/Verlust absolut und prozentual) und die Verteilung der gehaltenen Assets.

## Zielgruppe
- **Mia (pragmatische Investorin):** Will in unter 5 Sekunden sehen "Wie stehe ich?"
- **Kai (Krypto-Trader):** Erwartet präzise Zahlen und glaubwürdige Asset-Verteilung
- **Showcase-Betrachter:** Beurteilt im ersten Moment ob das Dashboard "echt" wirkt

## Kernwert
Ohne diesen Bereich ist das Dashboard wertlos – er ist das erste was der Blick sucht und entscheidet über den ersten Eindruck.

## Nicht im Scope
- Bearbeiten oder Hinzufügen von Assets durch den User
- Echtzeit-Kurse oder API-Anbindung
- Historische Portfolio-Performance über Zeit (das ist FEAT-2)
- Mehr als 6 dargestellte Assets in der Verteilung

## User Stories

1. Als Betrachter möchte ich den Gesamtwert meines Portfolios prominent sehen, damit ich sofort weiß wie viel mein Portfolio wert ist.
2. Als Betrachter möchte ich den Gewinn/Verlust (absolut + prozentual) farblich kodiert sehen (grün = Plus, rot = Minus), damit ich ohne Rechnen verstehe ob ich profitabel bin.
3. Als Mia möchte ich die Asset-Verteilung als visuelles Element (Donut-Chart oder Liste mit Balken) sehen, damit ich erkenne welche Kryptowährung den größten Anteil hat.
4. Als Kai möchte ich realistische Zahlen und bekannte Asset-Namen (BTC, ETH, SOL etc.) sehen, damit der Showcase nicht als "Fake" wirkt.
5. Als Showcase-Betrachter möchte ich den Portfolio-Bereich als erstes Element beim Laden sehen, damit der erste Eindruck sofort überzeugt.

## Acceptance Criteria

1. Der Gesamtportfoliowert wird als formatierte Zahl angezeigt (z.B. "$124,382.47") – prominent, large type, oben im Dashboard.
2. Gewinn/Verlust wird in zwei Formaten angezeigt: absolut (z.B. "+$8.241,12") und prozentual (z.B. "+7,12%").
3. Positiver Gewinn/Verlust wird grün dargestellt, negativer rot – konsistent in Zahl und Icon.
4. Die Asset-Verteilung zeigt mindestens 4, maximal 6 Assets mit Name, Symbol, Menge, aktuellem Wert und prozentualer Gewichtung im Portfolio.
5. Alle Daten basieren auf realistischen Mock-Werten (BTC, ETH, SOL, BNB, ADA, XRP mit glaubwürdigen Preisen für 2026).
6. Der Bereich ist ohne Scrollen auf Desktop (1280px+) vollständig sichtbar.
7. Auf mobilen Viewports (375px) ist der Gesamtwert und G/V sichtbar, die Asset-Liste ist scrollbar.

## Edge Cases

| Fall | Erwartetes Verhalten |
|------|----------------------|
| Alle Assets im Minus | Gesamtwert rot, G/V-Wert negativ, kein visueller Bruch |
| Ein Asset hat 0% Gewichtung | Wird nicht in der Verteilung angezeigt |
| Sehr langer Asset-Name | Wird abgekürzt (truncate), kein Layout-Bruch |
| Sehr kleine prozentuale Änderung (z.B. +0.01%) | Wird korrekt formatiert angezeigt, kein Runden auf 0% |
| Viewport unter 375px | Kein Layout-Bruch, horizontales Scroll möglich |

## Mock-Daten (Referenz)

```
Portfolio-Gesamtwert: $124,382.47
24h-Änderung: +$3,241.18 (+2.68%)

Assets:
- BTC: 0.842 BTC = $71,570.00 (57.5%)
- ETH: 8.5 ETH = $23,800.00 (19.1%)
- SOL: 82 SOL = $14,760.00 (11.9%)
- BNB: 18 BNB = $10,440.00 (8.4%)
- ADA: 3.800 ADA = $3,116.00 (2.5%)
- XRP: 1.200 XRP = $696.00 (0.6%)
```

---

## 2. UX Entscheidungen
*UX-Designer: Claude – 2026-04-05*

### Einbettung
**Wo lebt das Feature:** Sektion S-01-A – volle Breite, ganz oben im Dashboard, kein Modal, keine eigene Route.

**Begründung:** Vorgabe aus product-flows.md (SPA ohne Routing). Der erste Blick muss sofort treffen: keine Navigation nötig, kein Klick – alles beim Laden sichtbar. Hero-Position maximiert die "5-Sekunden-Erkennbarkeit" (Erfolgskriterium PRD).

---

### Layout-Entscheidung

**Desktop (≥1280px): Zwei-Spalten-Hero**

```
┌────────────────────────────────────────────────────────┐
│  [Links: Wert-Block, ~50% Breite]  [Rechts: Chart+Liste] │
│                                                          │
│  $124,382.47                ◕  BTC ████████ 57.5%       │
│  (48–52px, slate-50, 700)   ●  ETH ████     19.1%       │
│                             ●  SOL ███      11.9%       │
│  +$3,241.18  +2.68% ↑       ●  BNB ██        8.4%       │
│  (20px grün, 16px grün)     ●  ADA █         2.5%       │
│                             ●  XRP ▏         0.6%       │
└────────────────────────────────────────────────────────┘
```

**Mobile (375px): Gestapelt**

```
┌──────────────────────┐
│  $124,382.47         │  ← always above-fold
│  +$3,241  +2.68% ↑   │  ← always above-fold
├──────────────────────┤
│      ◕ Donut 120px   │  ← zentriert, verkleinert
├──────────────────────┤
│  BTC  0.842  $71,570 │  ← scrollbar
│  ETH  8.5    $23,800 │
│  …                   │
└──────────────────────┘
```

**Begründung Donut-Chart vs. Balken-Liste:**
- Mia scannt in ≤5 Sek → Donut kommuniziert Dominanz visuell (BTC >50%) ohne Lesen
- Kai braucht Präzision → Legende direkt daneben mit Wert + Prozent pro Asset
- Balken-Liste wäre reine Datentabelle ohne visuellen Wow-Effekt für den Showcase-Kontext

---

### Interaktionsmuster
**Keine Interaktion.** FEAT-1 ist rein informational.

Begründung: product-flows.md definiert keine Outgoing Transitions für S-01-A. Feature Spec schließt Bearbeitung explizit aus. Der Donut-Chart ist statisch – kein Hover-Tooltip, kein Klick auf Segmente (das wäre Out-of-Scope und würde Routing erfordern, das nicht existiert).

---

### Visuelles Design

**Farbkodierung G/V:**
- Positiv: `green-500` (#22c55e) für Zahl + Pfeil-Icon ↑
- Negativ: `red-500` (#ef4444) für Zahl + Pfeil-Icon ↓
- Gesamtwert selbst: `slate-50` (#f8fafc) – neutral, kein Grün/Rot (der Wert ist eine Tatsache, keine Bewertung)

**Asset-Segmentfarben Donut:**
| Asset | Farbe | Hex | Begründung |
|-------|-------|-----|------------|
| BTC | Orange | `#f97316` | Marken-Farbe BTC, sofort erkennbar |
| ETH | Violett | `#8b5cf6` | Marken-Farbe ETH (violett-lila) |
| SOL | Türkis | `#06b6d4` | Solana = Blau/Türkis in allen Referenzen |
| BNB | Gelb | `#eab308` | BNB = Gold/Gelb |
| ADA | Blau | `#3b82f6` | Cardano = Blau |
| XRP | Grau | `#94a3b8` | XRP = neutral, kleinster Anteil = de-emphasized |

Begründung: Markenassoziierte Farben verhindern den "Fake-Daten"-Eindruck (Kai-Frustrationen). Ein generisches Farb-Rainbow würde sofort als Template wirken.

**Typography-Skala:**
| Element | Größe | Weight | Farbe |
|---------|-------|--------|-------|
| Gesamtwert | 48px (desktop) / 36px (mobile) | 700 | `slate-50` |
| G/V absolut | 20px | 500 | `green-500` / `red-500` |
| G/V prozentual | 16px | 400 | `green-500` / `red-500` |
| Pfeil-Icon | 16px | – | identisch G/V |
| Asset Name/Symbol | 14px | 600 | `slate-100` |
| Asset Wert + Menge | 14px | 400 | `slate-300` |
| Asset %-Anteil | 13px | 400 | `slate-400` |

---

### Komponenten
Da das Design System aktuell leer ist, werden alle Komponenten mit Tailwind CSS gebaut. Kein stilles Abweichen – alle Token-Werte hier explizit.

| Komponente | Verwendung | Status |
|-----------|-----------|--------|
| `PortfolioHeroSection` | Full-width Container, `bg-slate-900`, `px-8 py-10` | Neu bauen |
| `ValueDisplay` | Gesamtwert large type, `text-5xl font-bold text-slate-50` | Neu bauen |
| `PnLBadge` | G/V absolut + prozentual + Icon, flex row, color-coded | Neu bauen |
| `DonutChart` | SVG-basiert (~180px desktop / 120px mobile), 6 Segmente, statisch | Neu bauen – Recharts `PieChart` empfohlen |
| `AssetListRow` | Farb-Dot + Symbol + Name + Menge + Wert + %, `h-10`, flex | Neu bauen |
| `AssetList` | Container für bis zu 6 `AssetListRow`, auf mobile `overflow-y-scroll` | Neu bauen |

---

### Touch-Targets
FEAT-1 hat **keine tappbaren Elemente** – keine Buttons, keine Links, kein interaktiver State.
WCAG 2.5.5 (44px Mindestgröße) entfällt für diese Sektion vollständig.

---

### Kontrast-Check (WCAG AA)
Annahme: Dark Background = `slate-900` (#0f172a)

| Element | Vordergrund | Hintergrund | Verhältnis | WCAG | Status |
|---------|------------|-------------|------------|------|--------|
| Gesamtwert | `slate-50` #f8fafc | `slate-900` #0f172a | ~17:1 | AA/AAA | ✅ |
| G/V grün | `green-500` #22c55e | `slate-900` | ~5.5:1 | AA (Text) | ✅ |
| G/V rot | `red-500` #ef4444 | `slate-900` | ~4.6:1 | AA (Text) | ✅ |
| Asset Name | `slate-100` #f1f5f9 | `slate-900` | ~14:1 | AA/AAA | ✅ |
| Asset Wert | `slate-300` #cbd5e1 | `slate-900` | ~9:1 | AA | ✅ |
| Asset % | `slate-400` #94a3b8 | `slate-900` | ~4.9:1 | AA | ✅ |

Kein Kontrast-Problem identifiziert. `slate-500` (#64748b) bewusst vermieden für Textelemente – liegt mit ~3.8:1 unter 4.5:1. Stattdessen `slate-400` eingesetzt.

---

### Navigation nach Aktionen
Keine. FEAT-1 löst keine Transitions aus. Flows-Dokument bestätigt: S-01-A hat keine Outgoing Transitions.

---

---

## 3. Technisches Design
*Architect: Claude – 2026-04-05*

### Kontext: Globale Dashboard-Architektur
FEAT-1 ist S-01-A und damit der Einstiegspunkt des einzigen Screens. `App.tsx` definiert das Dashboard-Grid für alle 4 Sektionen.

**Dashboard-Grid (App.tsx):**
```
Desktop (≥1280px):
  max-w-[1440px] mx-auto px-6 py-6 bg-slate-950 min-h-screen space-y-6
  ├── S-01-A  PortfolioSection      (full-width)
  ├── div.grid.grid-cols-[2fr_1fr].gap-6
  │   ├── S-01-B  ChartSection     (65%)
  │   └── S-01-C  WatchlistSection (35%)
  └── S-01-D  TransactionSection   (full-width)

Mobile (< 1280px):
  space-y-4, alle Sektionen full-width gestapelt
  → grid bricht auf single column: md:grid-cols-[2fr_1fr]
```

**Globale Shared-Infrastruktur:**
```
projekt/src/
  utils/
    cn.ts          ← clsx + tailwind-merge Wrapper
    format.ts      ← formatCurrency, formatPercent, formatQuantity, formatDate
  components/
    shared/
      PriceChangeBadge.tsx   ← Wiederverwendet in FEAT-1, FEAT-2, FEAT-3
      AssetIcon.tsx          ← Wiederverwendet in FEAT-3, FEAT-4
  data/
    portfolio.ts       ← FEAT-1 Mock-Daten
    chartData.ts       ← FEAT-2 Mock-Daten
    watchlist.ts       ← FEAT-3 Mock-Daten
    transactions.ts    ← FEAT-4 Mock-Daten
```

---

### Komponenten-Struktur

```
PortfolioSection                  ← S-01-A Container (full-width card)
  ├── [Left column, ~50%]
  │   ├── ValueDisplay            ← Gesamtportfoliowert ($124,382.47)
  │   └── PnLBadge                ← G/V absolut + prozentual + Icon
  └── [Right column, ~50%]
      ├── PortfolioDonut          ← Recharts PieChart (statisch, kein Hover)
      └── AssetList
          └── AssetListRow × 6   ← Farb-Dot + Symbol + Name + Menge + Wert + %
```

**Dateipfade:**
```
projekt/src/components/portfolio/
  PortfolioSection.tsx
  ValueDisplay.tsx
  PnLBadge.tsx           ← exportiert auch als shared (via re-export oder eigene Datei)
  PortfolioDonut.tsx
  AssetListRow.tsx
  AssetList.tsx
```

---

### Daten-Modell

**`projekt/src/data/portfolio.ts`:**
```
portfolioData:
  totalValue: number           // 124382.47
  change24hAbsolute: number    // 3241.18 (positiv = grün, negativ = rot)
  change24hPercent: number     // 2.68

  assets: Asset[]
    symbol: string             // "BTC"
    name: string               // "Bitcoin"
    quantity: number           // 0.842
    valueUSD: number           // 71570.00
    portfolioPercent: number   // 57.5
    color: string              // "#f97316" (Marken-Farbe für Donut-Segment)

ASSET_COLORS: Record<string, string>
  // BTC → #f97316, ETH → #8b5cf6, SOL → #06b6d4,
  // BNB → #eab308, ADA → #3b82f6, XRP → #94a3b8
  // (Auch von FEAT-3/4 nutzbar für AssetIcon-Fallback-Farben)
```

---

### State-Komplexität
Geprüft – kein State. FEAT-1 ist rein presentational. Alle Daten kommen aus statischem Import. Keine Interaktion, kein Event-Handler.

---

### Externe Daten / Validation
Kein externes Daten-Lesen (kein localStorage, kein API, kein URL-Param). Static TypeScript-Import → TypeScript-Types reichen, keine Runtime-Validation nötig.

---

### Format-Utilities (`projekt/src/utils/format.ts`)
Zentral für alle 4 Features:

| Funktion | Input | Output | Beispiel |
|----------|-------|--------|---------|
| `formatCurrency(n)` | `124382.47` | `"$124,382.47"` | Intl.NumberFormat |
| `formatCurrencyCompact(n)` | `3241.18` | `"+$3,241.18"` | mit Vorzeichen |
| `formatPercent(n)` | `2.68` | `"+2.68%"` | mit Vorzeichen, min. 2 Dezimalstellen |
| `formatQuantity(n, sym)` | `0.842, "BTC"` | `"0.842 BTC"` | max. 8 Dezimalstellen |
| `formatDate(d)` | `Date` | `"28. Mär 2026"` oder `"vor 2 Tagen"` | FEAT-4 |

`formatPercent` mit ≥2 Dezimalstellen löst Edge Case "0.01% wird nicht auf 0% gerundet".

---

### Recharts-Konfiguration (PortfolioDonut)

- Komponente: `Recharts.PieChart` + `Recharts.Pie`
- `innerRadius={60}` / `outerRadius={90}` (Desktop) → 180px Außendurchmesser
- `innerRadius={45}` / `outerRadius={60}` (Mobile) → 120px Außendurchmesser
- `isAnimationActive={false}` → statischer Donut, kein Einblende-Animation (kein Hover-Interaktion)
- Kein `Tooltip`, kein `Legend` von Recharts – eigene `AssetList` daneben
- `dataKey="portfolioPercent"`, `nameKey="symbol"`
- Assets mit `portfolioPercent === 0` werden vor Übergabe an `<Pie>` gefiltert (Edge Case)

---

### A11y-Architektur

| Element | Maßnahme |
|---------|---------|
| Gesamtwert | `aria-label="Portfolio-Gesamtwert: 124.382,47 US-Dollar"` |
| PnL-Badge | Icon `aria-hidden`, Text screen-reader-lesbar: `"Plus 3.241,18 Dollar, plus 2,68 Prozent"` |
| Donut-Chart | `role="img"` + `aria-label="Asset-Verteilung: Bitcoin 57.5%, Ethereum 19.1%, ..."` |
| AssetListRow | Kein `role` nötig – informationale `<div>`-Liste, nicht interaktiv |
| Farbe nie allein | G/V-Farbe immer mit Pfeil-Icon + Zahl kombiniert |

---

### Dependencies (FEAT-1 spezifisch)

| Dependency | Version | Verwendung |
|-----------|---------|-----------|
| `recharts` | ^3.8.1 | PieChart für Donut | bereits installiert |
| `lucide-react` | ^1.7.0 | TrendingUp / TrendingDown Icon | bereits installiert |

Kein neues npm-Package nötig.

---

### Test-Setup
Scope-Typ: Klickbarer Prototyp → keine Unit-Tests erforderlich. Manuelle Verifikation gegen Acceptance Criteria ausreichend.

---

---

## 4. Implementierung
*2026-04-05*

### Implementierte Dateien
- `projekt/src/App.tsx` – Dashboard-Shell mit Grid-Layout (alle 4 Sektionen)
- `projekt/src/App.css` – Boilerplate gecleart
- `projekt/src/utils/cn.ts` – clsx + tailwind-merge Helper
- `projekt/src/utils/format.ts` – formatCurrency, formatCurrencyWithSign, formatPercent, formatQuantity, formatDate
- `projekt/src/data/portfolio.ts` – Mock-Daten + ASSET_COLORS Map
- `projekt/src/components/shared/PriceChangeBadge.tsx` – Shared Badge (FEAT-2/3 wiederverwendbar)
- `projekt/src/components/portfolio/PortfolioSection.tsx` – S-01-A Container
- `projekt/src/components/portfolio/PortfolioDonut.tsx` – Recharts PieChart Donut
- `projekt/src/components/portfolio/AssetList.tsx` – Container mit 0%-Filter
- `projekt/src/components/portfolio/AssetListRow.tsx` – Einzelne Asset-Zeile

### Installierte Dependencies
Keine neuen – alle Dependencies waren bereits installiert.

### Offene Punkte / Tech-Debt
- `date-fns` noch nicht installiert (wird für FEAT-2 X-Achsen-Formatierung gebraucht)
- FEAT-2/3/4 Platzhalter in App.tsx noch leer

---

## Fortschritt
- Status: Freigegeben
- Aktueller Schritt: Dev ✓ → QA
