# Dev Handoff – FEAT-5 Portfolio-Verwaltung + FEAT-6 Watchlist-Portfolio-Integration
*Erstellt: 2026-04-05*

## Was wurde gebaut

FEAT-5: Portfolio-Verwaltung — Interaktive Verwaltung von Portfolio-Positionen (Coin hinzufügen/entfernen), Echtzeit-Berechnung von Gesamtwert und G/V pro Position und gesamt. Portfolio-State lebt in `App.tsx` via `useReducer`.

FEAT-6: Watchlist-Portfolio-Integration — Watchlist-Einträge, deren Coin im Portfolio ist, werden mit `border-l-2 border-green-500 bg-green-500/5` hervorgehoben. Reaktiv auf Portfolio-State-Änderungen. LTC wurde durch ETH ersetzt (Overlap mit Portfolio sichergestellt).

## Implementierte Dateien

| Datei | Zweck |
|-------|-------|
| `projekt/src/data/coinRegistry.ts` | Neue Datei: CoinInfo, PortfolioPosition Interface, COIN_REGISTRY (6 Coins mit Mock-Preisen), INITIAL_POSITIONS |
| `projekt/src/utils/portfolioUtils.ts` | Neue Datei: computePositionMetrics, computePortfolioTotals, deriveAssets (pure functions) |
| `projekt/src/components/portfolio/AddPositionModal.tsx` | Modal mit Fokus-Trap, ESC-Handler, Backdrop-Close |
| `projekt/src/components/portfolio/AddPositionForm.tsx` | Formular (Coin-Select, Menge, Kaufpreis) mit lokaler Validierung, Inline-Fehlermeldungen |
| `projekt/src/components/portfolio/PortfolioPositionList.tsx` | Liste der Positionen, rendert PortfolioEmptyState wenn leer |
| `projekt/src/components/portfolio/PortfolioPositionRow.tsx` | Desktop- und Mobile-Layout pro Position, G/V, >10%-Verlust-Highlight (`bg-red-500/10`) |
| `projekt/src/components/portfolio/PortfolioEmptyState.tsx` | Leerzustand (Briefcase-Icon + Text) |
| `projekt/src/components/portfolio/PortfolioSection.tsx` | Refactored: Props-Interface statt statische Daten, G/V "seit Kauf" statt "24h" |
| `projekt/src/App.tsx` | useReducer State-Owner, portfolioSymbols Set für FEAT-6 |
| `projekt/src/data/watchlist.ts` | LTC → ETH ersetzt (FEAT-6 Overlap) |
| `projekt/src/components/watchlist/WatchlistSection.tsx` | portfolioSymbols Prop hinzugefügt |
| `projekt/src/components/watchlist/WatchlistRow.tsx` | isInPortfolio Prop + border-l-2 Hervorhebung |

## Wichtige Implementierungsdetails

- **State-Architektur:** `App.tsx` besitzt `{ positions: PortfolioPosition[], isModalOpen: boolean }` via `useReducer`. Actions: OPEN_MODAL, CLOSE_MODAL, ADD_POSITION, REMOVE_POSITION. `id` wird via `crypto.randomUUID()` generiert.
- **Pre-Seed:** `INITIAL_POSITIONS` in `coinRegistry.ts` — ADA hat Kaufpreis $0.95, aktueller Preis $0.82 → −13.7% → ADA-Row ist direkt mit `bg-red-500/10` hervorgehoben (AC-4 sofort sichtbar).
- **Mock-Preise:** In `COIN_REGISTRY` — konsistent mit den bisherigen `portfolioData`-Werten aus FEAT-1.
- **G/V Headline:** PortfolioSection zeigt jetzt "seit Kauf" statt "24h" — realistischer für In-Memory-State ohne echte 24h-Daten.
- **Donut:** `PortfolioDonut` bekommt `Asset[]` via `deriveAssets()` (unverändertes Interface) — funktioniert weiterhin korrekt.
- **Modal Fokus-Trap:** `useEffect` abonniert Tab-Events wenn Modal offen, ESC schließt Modal.
- **Formular-Validierung:** Nur on-Submit, Fehler werden sofort beim nächsten Keypress des betroffenen Feldes gecleared. Keine Validierung beim Tippen.
- **FEAT-6 Highlight:** `border-l-2 border-green-500 bg-green-500/5 pl-[2px]` — `pl-[2px]` kompensiert den 2px-Border ohne Layout-Shift.
- **Watchlist ETH:** ETH ist in beiden Listen → Hervorhebung sofort im Default-Zustand sichtbar (Pre-Seed hat ETH im Portfolio).

## Für QA relevant (Acceptance Criteria FEAT-5)

1. Position hinzufügen: Coin-Select (6 Optionen), Menge > 0, Kaufpreis > 0 ✓
2. Gesamtwert = Summe aller (Menge × Mock-Preis) ✓
3. Pro Position: Name, Menge, Kaufpreis, aktueller Wert, G/V USD, G/V % ✓
4. Positionen mit >10% Verlust: `bg-red-500/10` (ADA im Pre-Seed: −13.7%) ✓
5. Position entfernen via Trash-Button ✓
6. Reaktive Aktualisierung nach Add/Remove ✓
7. Pre-Seed: 6 Positionen beim Start ✓
8. Coin-Auswahl: BTC, ETH, SOL, BNB, ADA, XRP ✓

### Edge Cases

- Kaufpreis = 0 → Validierungsfehler ✓
- Menge = 0 → Validierungsfehler ✓
- Gleicher Coin zweimal → zweite Zeile mit eigener ID ✓
- Portfolio leer (alle entfernt) → PortfolioEmptyState ✓
- G/V exakt 0% → `text-slate-400` neutral ✓
- Gesamtwert 0 → Donut nicht gerendert ✓

## Für QA relevant (Acceptance Criteria FEAT-6)

1. Watchlist-Coin im Portfolio → `border-l-2 border-green-500 bg-green-500/5` ✓
2. Kein Layout-Shift, keine Größenänderung der Rows ✓
3. Coin entfernt → Hervorhebung verschwindet sofort (reaktiv via Set) ✓
4. Kein Portfolio-Overlap → Watchlist sieht aus wie vor FEAT-6 ✓

## Bekannte Limitierungen / Out of Scope

- Gleicher Coin kann mehrfach hinzugefügt werden (separate Positionen — bewusst per Spec)
- Kaufpreis-Feld akzeptiert beliebige Dezimalzahlen (kein Limit auf sinnvolle Werte)
- Bei sehr vielen Positionen kein Scroll-Limit auf der Liste (Prototyp-Scope)
