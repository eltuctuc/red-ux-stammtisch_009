---
status: approved
---


# FEAT-5: Portfolio-Verwaltung
*Erstellt: 2026-04-05*
*Scope-Typ: Klickbarer Prototyp – Fix-Schwelle: Critical*

## Zusammenfassung
Der User kann im Dashboard sein persönliches Portfolio verwalten: Coins mit Menge und Kaufpreis hinzufügen oder entfernen. Das Dashboard berechnet daraus Gesamtwert (Menge × aktueller Mock-Preis), Gewinn/Verlust pro Position (Kaufpreis vs. aktueller Preis) und hebt Positionen mit >10% Verlust visuell hervor. Alle Daten leben im React State (in-memory, kein Persist).

## Zielgruppe
- **Kai (Krypto-Trader):** Will seine realen Positionen und Cost-Basis eintragen, um G/V auf einen Blick zu sehen. Erwartet korrekte Berechnung und klare Darstellung.
- **Mia (pragmatische Investorin):** Will wissen, ob sie im Plus oder Minus ist. Braucht keine Details – nur das Gesamtbild und Warnsignale bei starken Verlusten.
- **Showcase-Betrachter:** Sieht interaktive Portfolio-Verwaltung als Kernkompetenz-Beweis – die Interaktion muss smooth und die Berechnung sofort sichtbar sein.

## Kernwert
Das Dashboard wird von einer statischen Anzeige zu einer echten Portfolio-Verwaltung. Der User sieht sein individuelles Portfolio und bekommt sofort Feedback ob eine Position in der Verlustzone ist.

## Nicht im Scope
- Persistenz über Browser-Sessions (kein localStorage, kein Backend)
- Kurs-API-Anbindung (aktueller Preis bleibt Mock-Daten)
- Coins außerhalb der vordefinierten Mock-Preis-Liste (BTC, ETH, SOL, BNB, ADA, XRP)
- Transaktionshistorie automatisch aktualisieren bei Portfolio-Änderungen
- Mehrere Portfolios verwalten
- Import aus CSV oder anderen Quellen

## User Stories

1. Als Kai möchte ich einen neuen Coin mit Menge und Kaufpreis in mein Portfolio eintragen, damit das Dashboard meinen tatsächlichen Bestand widerspiegelt.
2. Als Kai möchte ich eine Position aus meinem Portfolio entfernen, damit gelöste Positionen nicht mehr angezeigt werden.
3. Als Mia möchte ich auf einen Blick sehen wie viel ich für jede Position bezahlt habe und was sie heute wert ist, damit ich meinen Gewinn oder Verlust ohne Rechnen kenne.
4. Als Mia möchte ich sofort erkennen wenn eine meiner Positionen mehr als 10% im Minus ist, damit ich das ohne Lesen der Zahlen wahrnehme.
5. Als Showcase-Betrachter möchte ich die Portfolio-Verwaltung ausprobieren und sehen wie das Dashboard sofort auf meine Eingaben reagiert, damit das Showcase als interaktiv und realistisch wahrgenommen wird.

## Acceptance Criteria

1. Es gibt eine Möglichkeit, eine neue Position hinzuzufügen: Coin (aus vordefinierter Liste), Menge (positive Zahl), Kaufpreis pro Einheit (positive Zahl in USD).
2. Die Portfolio-Übersicht zeigt den berechneten Gesamtwert aller Positionen (Summe: Menge × aktueller Mock-Preis pro Coin).
3. Jede Position zeigt: Coin-Name, Menge, Kaufpreis, aktueller Wert, Gewinn/Verlust in USD und Prozent.
4. Positionen mit >10% Verlust ((aktueller Preis − Kaufpreis) / Kaufpreis < −0.10) sind visuell rot hervorgehoben.
5. Eine Position kann aus dem Portfolio entfernt werden.
6. Nach dem Hinzufügen oder Entfernen einer Position aktualisieren sich Gesamtwert und alle Kennzahlen sofort (reaktiv).
7. Das Portfolio ist beim Laden mit realistischen Beispieleinträgen vorbelegt (Pre-Seed), damit das Dashboard nicht leer startet.
8. Die vordefinierte Coin-Auswahl umfasst mindestens: BTC, ETH, SOL, BNB, ADA, XRP.

## Edge Cases

| Fall | Erwartetes Verhalten |
|------|----------------------|
| Kaufpreis = 0 eingegeben | Eingabe wird abgelehnt / Validierungsfeedback |
| Menge = 0 oder negative Zahl | Eingabe wird abgelehnt / Validierungsfeedback |
| Gleicher Coin zweimal hinzugefügt | Zweiter Eintrag wird als separate Position angelegt (verschiedene Cost-Basis erlaubt) |
| Portfolio leer (alle Positionen entfernt) | Leerzustand mit Hinweis "Keine Positionen – füge deinen ersten Coin hinzu" |
| G/V exakt 0% (Kaufpreis = aktueller Preis) | Neutral dargestellt (weder grün noch rot), kein Warnsignal |
| Sehr kleiner Kaufpreis (z.B. ADA $0.10) | Korrekte Dezimalformatierung, kein Runden auf $0.00 |
| Gesamtwert berechnet auf >$1.000.000 | Korrekte Tausenderformatierung, kein Layout-Bruch |

## 2. UX Entscheidungen
*Erstellt: 2026-04-05*

### Einbettung
**S-02 Typ: Modal (zentriert)**

Begründung: Focused task (3 Felder + 2 Buttons), klar abgegrenzter Einstieg und Ausstieg, keine Kontext-Zerstörung im Dashboard. Drawer würde eine Sidebar-Annex-Metapher suggerieren, die hier nicht passt. Inline-Expansion würde das Portfolio-Hero-Layout fragmentieren.

- Desktop: zentriertes Modal ~480px breit, dark backdrop `bg-black/60`
- Mobile: Modal füllt Bildschirm vollständig (100vw/100vh), Scrollbar wenn Tastatur sichtbar

### Komponenten

| Komponente | Einsatz | Begründung |
|-----------|---------|------------|
| Modal Overlay | S-02 Wrapper | Fokussierter Dialog, ESC + Backdrop schließt |
| Select / Dropdown | Coin-Auswahl | 6 fixed Optionen mit Coin-Icon + Name |
| Number Input | Menge + Kaufpreis | `type="number"` mit `min="0"`, `step="any"` |
| Primary Button | "Hinzufügen" Submit | `bg-slate-50 text-slate-900` — einzige starke CTA im Modal |
| Ghost/Text Button | "Abbrechen" | `text-slate-400 hover:text-slate-200` — secondary, kein visual weight |
| Inline Validation | Fehlermeldungen | `text-red-400 text-sm`, `border-red-500` auf invalidem Feld |
| Trash Icon Button | Position entfernen | `lucide-react Trash2`, 44px touch target via padding |

### Portfolio-Positionszeile (Desktop)

Spalten: Coin (Icon + Name + Symbol) | Menge | Kaufpreis | Akt. Wert | G/V USD | G/V % | Entfernen-Button

- G/V positiv: `text-green-400` mit `+`-Prefix
- G/V negativ: `text-red-400` mit `−`-Prefix
- G/V exakt 0: `text-slate-400`, kein Präfix
- Zeile mit >10% Verlust: `bg-red-500/10` Hintergrund-Wash — kein Border, kein Icon, nur subtile Tönung
- Entfernen-Button: `text-slate-500 hover:text-red-400` Trash2-Icon, right-aligned, immer sichtbar (kein Hover-only auf Mobile)

### Portfolio-Positionszeile (Mobile)

- Row 1: Coin-Icon (32px) + Name + Symbol
- Row 2: 3-Spalten-Grid: Kaufpreis | Akt. Wert | G/V (USD + %)
- G/V-Zeile: grün/rot/neutral wie Desktop
- >10% Verlust: `bg-red-500/10` auf der gesamten Card
- Entfernen-Button: kleines Trash2-Icon rechtsbündig in Row 1

### "Position hinzufügen" Button

Positionierung: Unterhalb der Positions-Liste in S-01-A (immer sichtbar, auch bei gefüllter Liste)

```
[+ Position hinzufügen]
```

Style: Outlined Button — `border border-dashed border-slate-600 text-slate-400 hover:border-slate-400 hover:text-slate-200 rounded-lg py-2 px-4 text-sm w-full`

Mit `Plus`-Icon (lucide) links des Labels. Full-width auf Mobile, `w-full` auch Desktop für einfaches Klicken.

### Leerzustand (alle Positionen entfernt)

Ersetzt die Positions-Liste, "Position hinzufügen"-Button bleibt unterhalb:

```
[Briefcase-Icon 40px, slate-600]
Keine Positionen
Füge deinen ersten Coin hinzu
```

Zentriert im S-01-A Bereich, `text-slate-500` für den Beschreibungstext.

### Gesamtwert-Berechnung in S-01-A

- Anzeige: wie bisheriger `totalValue` — wird jetzt dynamisch aus Portfolio-State berechnet
- Headline-Label bleibt "Portfolio-Gesamtwert"
- G/V-Zeile (24h) wird aus den Portfolio-Positionen aggregiert (Summe aller einzelnen G/V absolut + prozentual als gewichteter Durchschnitt vs. Gesamtkaufwert)
- Der bestehende Donut-Chart bleibt erhalten, wird aus State gefüllt

### Touch-Target-Prüfung

| Element | Mindestgröße | Umsetzung |
|---------|-------------|-----------|
| Trash2 Button | 44px | `p-2` um 16px Icon → 40px, `p-3` → 48px ✅ |
| "Hinzufügen" Submit | 44px | `py-3` → 48px ✅ |
| Select Dropdown | 44px | `h-11` (44px) ✅ |
| Number Inputs | 44px | `h-11` (44px) ✅ |
| "Abbrechen" Button | 44px | `py-3` → 48px ✅ |

### State-Komplexität

State Machine erforderlich (Modal-Lifecycle + Form-Validation):

```
States: idle | modal_open | submitting | error
Events: OPEN_MODAL | CLOSE_MODAL | SUBMIT_VALID | SUBMIT_INVALID | REMOVE_POSITION
Transitionen:
  idle + OPEN_MODAL → modal_open
  modal_open + CLOSE_MODAL → idle (kein State-Change in Portfolio)
  modal_open + SUBMIT_VALID → idle (Position added)
  modal_open + SUBMIT_INVALID → modal_open (Inline errors sichtbar)
  idle + REMOVE_POSITION → idle (Position removed, State aktualisiert)
```

Umsetzung: `useReducer` in App.tsx (Portfolio-State + Modal-State)

### Navigation nach Aktionen

Per `flows/product-flows.md`:
- Submit valid → Modal schließt, S-01-A aktualisiert
- Submit invalid → Modal bleibt offen, Inline-Fehler
- Abbrechen / ESC / Backdrop → Modal schließt, kein State-Change
- Entfernen → S-01-A aktualisiert sofort

## 3. Technisches Design
*Erstellt: 2026-04-05*

### Übersicht

FEAT-5 transformiert `PortfolioSection` von einer statischen Anzeige zu einer interaktiven Portfolio-Verwaltung. Der zentrale Portfolio-State zieht nach `App.tsx` und wird per Props nach unten weitergegeben. FEAT-6 konsumiert denselben State.

### State-Komplexität

≥ 2 Muster vorhanden: Modal-Lifecycle + Fokus-Management + Race Condition (Enter + Button-Click). **State Machine via `useReducer` Pflicht.**

```
States: idle | modal_open
Events: OPEN_MODAL | CLOSE_MODAL | ADD_POSITION | REMOVE_POSITION

Transitionen:
  idle + OPEN_MODAL → modal_open
  modal_open + CLOSE_MODAL → idle  (kein State-Change in positions)
  modal_open + ADD_POSITION(payload) → idle  (neue Position in positions[])
  idle + REMOVE_POSITION(id) → idle  (Position aus positions[] entfernt)
```

Form-Validation läuft als lokaler State in `AddPositionForm` – nicht im globalen Reducer.

### Externe Daten

Keine externen Datenquellen (kein localStorage, kein Backend, kein URL-Param). Kein Validation-Overhead nötig.

### Neue Daten-Schicht

**`projekt/src/data/coinRegistry.ts`** — neue Datei, kanonische Mock-Preise und Metadaten für alle 6 Coins:

| Symbol | Name | mockPrice (USD) | color |
|--------|------|----------------|-------|
| BTC | Bitcoin | 85 000 | #f97316 |
| ETH | Ethereum | 2 800 | #8b5cf6 |
| SOL | Solana | 180 | #06b6d4 |
| BNB | BNB Chain | 580 | #eab308 |
| ADA | Cardano | 0.82 | #3b82f6 |
| XRP | XRP | 0.58 | #94a3b8 |

Preise konsistent mit bestehenden `portfolioData`-Werten (Menge × Preis = bisheriger `valueUSD`).

**`PortfolioPosition` Interface** (in `coinRegistry.ts` oder eigene Datei):

```
{ id: string, symbol: string, name: string, color: string,
  quantity: number, purchasePricePerUnit: number }
```

`id` = `crypto.randomUUID()` beim Hinzufügen (oder `Date.now().toString()` als Fallback).

**Pre-Seed `INITIAL_POSITIONS`** — in `coinRegistry.ts`:

| Symbol | Menge | Kaufpreis/Einheit | Aktueller Wert | G/V% | Highlight |
|--------|-------|-------------------|----------------|------|-----------|
| BTC | 0.842 | $62 000 | $71 570 | +37% | – |
| ETH | 8.5 | $2 400 | $23 800 | +17% | – |
| SOL | 82 | $155 | $14 760 | +16% | – |
| BNB | 18 | $520 | $10 440 | +12% | – |
| ADA | 3 800 | $0.95 | $3 116 | **−14%** | ✅ rot |
| XRP | 1 200 | $0.52 | $696 | +12% | – |

ADA ist absichtlich >10% im Minus → macht FEAT-5 AC-4 im Pre-Seed sofort sichtbar.

**`projekt/src/utils/portfolioUtils.ts`** — neue Datei, reine Berechnungsfunktionen:

- `computePositionMetrics(position, registry)` → `{ currentValueUSD, gainLossUSD, gainLossPercent, isLossTen }`
- `computePortfolioTotals(positions, registry)` → `{ totalValue, totalGainLoss, totalGainLossPercent }`
- `deriveAssets(positions, registry)` → `Asset[]` (für PortfolioDonut, benötigt `portfolioPercent`)

### Komponenten-Struktur

**`App.tsx`** (modifiziert):
- Besitzt `portfolioPositions: PortfolioPosition[]` und `isModalOpen: boolean` via `useReducer`
- Initialisierung: `INITIAL_POSITIONS` als Initial-State
- Leitet ab: `portfolioSymbols = new Set(portfolioPositions.map(p => p.symbol))` (für FEAT-6)
- Gibt weiter: `positions`, `onOpenModal`, `onRemovePosition` an `PortfolioSection`
- Gibt weiter: `portfolioSymbols` an `WatchlistSection`
- Rendert: `AddPositionModal` (controlled — `isOpen`, `onClose`, `onSubmit`)

**`portfolio/AddPositionModal.tsx`** (neu):
- Overlay: `fixed inset-0 bg-black/60 z-50 flex items-center justify-center`
- Dialog: `role="dialog" aria-modal="true" aria-labelledby="modal-title"` 
- Schließt bei: ESC-Taste, Backdrop-Klick
- Fokus-Trap: beim Öffnen Fokus auf erstes Feld, beim Schließen Fokus zurück auf Trigger-Button
- Rendert `AddPositionForm` als Child

**`portfolio/AddPositionForm.tsx`** (neu):
- Lokaler State: `{ coin: string, quantity: string, purchasePrice: string, errors: {...} }`
- Felder: Coin-Select (6 Optionen mit Icon + Name), Menge-Input, Kaufpreis-Input
- Validierung on Submit: Menge > 0 und numerisch, Kaufpreis > 0 und numerisch, Coin ausgewählt
- Fehleranzeige: `text-red-400 text-sm` unter dem jeweiligen Feld, `border-red-500` am Feld
- Doppelter Submit-Schutz: `disabled` während Verarbeitung (bei synchronem In-Memory-State minimal, aber sauber)

**`portfolio/PortfolioPositionList.tsx`** (neu, ersetzt `AssetList` in S-01-A):
- Erhält `positions: PortfolioPosition[]`
- Rendert `PortfolioEmptyState` wenn `positions.length === 0`
- Rendert `PortfolioPositionRow` für jede Position
- `<ul role="list">` Wrapper

**`portfolio/PortfolioPositionRow.tsx`** (neu):
- Desktop (md+): Coin-Icon + Name | Menge | Kaufpreis | Akt. Wert | G/V USD | G/V % | Trash-Button
- Mobile (<md): Coin-Icon + Name (Row 1), 3-Spalten-Grid: Kaufpreis | Akt. Wert | G/V (Row 2), Trash-Icon in Row 1
- >10% Verlust: `bg-red-500/10` auf dem ganzen `<li>`-Element
- G/V: `text-green-400` positiv, `text-red-400` negativ, `text-slate-400` neutral
- Trash-Button: `lucide-react Trash2`, `aria-label="{Coin} aus Portfolio entfernen"`, `p-2` für 40px touch target (akzeptabel)

**`portfolio/PortfolioEmptyState.tsx`** (neu):
- `lucide-react Briefcase` Icon (40px, `text-slate-600`)
- "Keine Positionen" (slate-400)
- "Füge deinen ersten Coin hinzu" (slate-500 sm)

**`PortfolioSection.tsx`** (modifiziert):
- Erhält `positions: PortfolioPosition[]`, `onOpenModal: () => void`, `onRemovePosition: (id: string) => void`
- Berechnet `totals` via `computePortfolioTotals` aus utils
- Headline ändert sich: statt "24h G/V" → "Gesamt G/V (seit Kauf)" — realistischer, da wir keine echten 24h-Daten haben
- `PortfolioDonut` erhält weiterhin `Asset[]` (via `deriveAssets`)
- `AssetList` wird durch `PortfolioPositionList` ersetzt

**Bestehende Komponenten unverändert:**
- `PortfolioDonut` — Interface `Asset[]` bleibt, bekommt nur andere Daten
- `AssetIcon`, `PriceChangeBadge`, alle anderen Sections

### A11y-Architektur

- Modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title"`, Fokus-Trap, ESC-Handler
- Trash-Buttons: `aria-label="{Name} aus Portfolio entfernen"`
- Leerzustand: kein `aria-live` nötig (kein asynchrones Update)
- Positions-Liste: `<ul role="list" aria-label="Portfolio-Positionen">`
- Submit-Button: `disabled` bei leerem Form (verhindert leere aria-live-Announcements)

### Dependencies

Keine neuen npm-Pakete. Nutzt bestehende:
- `lucide-react` — `Plus`, `Trash2`, `Briefcase`
- Tailwind v4 — alle Klassen im bestehenden System

### Reihenfolge der Implementierung

1. `coinRegistry.ts` + `PortfolioPosition` type + `INITIAL_POSITIONS`
2. `portfolioUtils.ts` (pure functions, kein UI)
3. `App.tsx` — useReducer, State-Owner
4. `AddPositionModal` + `AddPositionForm`
5. `PortfolioPositionRow` + `PortfolioPositionList` + `PortfolioEmptyState`
6. `PortfolioSection` update (Props-Interface + neue Kinder)

## 4. Implementierung
*2026-04-05*

### Implementierte Dateien
- `projekt/src/data/coinRegistry.ts` – CoinInfo, PortfolioPosition, COIN_REGISTRY, INITIAL_POSITIONS
- `projekt/src/utils/portfolioUtils.ts` – computePositionMetrics, computePortfolioTotals, deriveAssets
- `projekt/src/components/portfolio/AddPositionModal.tsx` – Modal-Overlay, Fokus-Trap, ESC-Handler
- `projekt/src/components/portfolio/AddPositionForm.tsx` – Formular mit lokaler Validierung
- `projekt/src/components/portfolio/PortfolioPositionList.tsx` – Positions-Liste mit Empty-State-Fallback
- `projekt/src/components/portfolio/PortfolioPositionRow.tsx` – Desktop- und Mobile-Layout, G/V, >10%-Rot
- `projekt/src/components/portfolio/PortfolioEmptyState.tsx` – Leerzustand
- `projekt/src/components/portfolio/PortfolioSection.tsx` – Refactored auf Props-Interface
- `projekt/src/App.tsx` – useReducer als State-Owner, portfolioSymbols für FEAT-6

### Installierte Dependencies
Keine neuen Pakete.

### Offene Punkte / Tech-Debt
- `AssetList.tsx` und `portfolio.ts` (static data) sind nun ungenutzt – können in einer späteren Cleanup-Runde entfernt werden
- Chunk size >500kB (Recharts) – bekannte Warnung seit FEAT-2, kein FEAT-5 Thema

## Fortschritt
- Status: Freigegeben
- Aktueller Schritt: Req ✓ → UX ✓ → Tech ✓ → Dev ✓
