# Release Notes

---

## v0.5.0 *(2026-04-05)*

### Neue Features
- **FEAT-5 Portfolio-Verwaltung** – Coins mit Menge und Kaufpreis hinzufügen/entfernen, G/V pro Position und gesamt, >10%-Verlust-Hervorhebung, Pre-Seed mit 6 Einträgen, Undo-Toast nach Entfernen
- **FEAT-6 Watchlist-Portfolio-Integration** – Watchlist-Coins, die im Portfolio liegen, werden mit grüner linker Border hervorgehoben (reaktiv auf Portfolio-State)

### Bug Fixes (QA-Runde FEAT-5)
- G/V USD zeigt korrekt Minuszeichen bei Verlust-Positionen (war: `$494.00` statt `-$494.00`)
- Modal-Fokus springt beim Öffnen auf Coin-Select statt X-Button
- Fokus kehrt nach Modal-Schließen korrekt zum Trigger-Button zurück
- Form-State wird bei jedem Öffnen komplett zurückgesetzt (via `formKey`)
- Submit-Fehler fokussiert automatisch das erste fehlerhafte Feld
- Trash-Button Touch-Target auf 44px angehoben (Desktop + Mobile)
- Undo-Toast 5s nach Entfernen mit "Rückgängig"-Aktion
- Modal via `createPortal` nach `document.body`, `aria-hidden` auf `#app-root` bei Modal-Öffnen
- Mobile-Layout zeigt Menge neben Symbol an (AC-3-Fix)

### Known Issues
- BUG-FEAT5-QA-004: Portfolio-Header zeigt grünes Icon bei G/V = 0 – Low
- BUG-FEAT5-QA-005: `aria-label` auf `<li>` unterdrückt Werte-Vorlesen für Screenreader – Low
- BUG-FEAT5-UX-007: "Kaufpreis"-Spaltenheader ohne "/Einheit"-Angabe – Low
- BUG-FEAT5-UX-008: `aria-label` auf "Position hinzufügen" weicht vom sichtbaren Text ab – Low
- BUG-FEAT5-UX-010: Kein Animations-Feedback beim Entfernen einer Position – Low
- BUG-FEAT5-UX-011: "$0.00"-Zustand bei leerem Portfolio wirkt kaputt – Low

---

## v0.4.0 *(2026-04-05)*

### Neue Features
- **FEAT-4 Transaktionshistorie** – 8 Transaktionen mit Kauf/Verkauf-Badges, Dual-Layout (Tabelle Desktop / Karten Mobile), tabular-nums, adaptiver Datumsformatierung

### Bug Fixes (QA-Runde FEAT-4)
- HTML-Validität: `TransactionRow` in `DesktopTransactionRow` (`<tr>`) und `MobileTransactionCard` (`<div>`) aufgeteilt – invalides `<div>` in `<tbody>` behoben
- `formatQuantity`: Sub-Milli-Werte (z.B. 0.00034) werden jetzt mit 5 statt 4 Dezimalstellen formatiert – alle signifikanten Stellen erhalten
- AssetIcon Desktop: 28px → 32px (spec-konform)
- Spaltenbreiten: Tailwind `w-`-Klassen auf Desktop-Tabellenspalten gesetzt

### Known Issues
- BUG-FEAT4-QA-003: `isEven`-Prop semantisch falsch benannt (zebra trifft ungerade Indizes) – Low
- BUG-FEAT4-QA-004: `formatDate` zeigt "Heute" statt "vor 1 Tag" bei diffDays=0 vs. diffDays=1 Grenzfall – Low
- BUG-FEAT4-UX-002: `tabular-nums` fehlt auf Datum-Zelle der Desktop-Tabelle – Low
- BUG-FEAT4-UX-004: Dreifaches `aria-label` auf verschachtelten Elementen – Low

---

## v0.3.0 *(2026-04-05)*

### Neue Features
- **FEAT-3 Watchlist** – 6 Non-Portfolio-Assets (LINK, DOT, MATIC, AVAX, ATOM, LTC) mit farbigen Fallback-Icons, Preis und 24h-Badge

### Bug Fixes (QA-Runde FEAT-3)
- `formatCurrency`: Sub-Penny-Preise (< $0.01) werden jetzt mit bis zu 6 Dezimalstellen dargestellt statt als $0.00 (shared fix, wirkt auch auf FEAT-4)
- `PriceChangeBadge`: aria-label im Neutral-Zustand (0.00%) liest jetzt "Neutral 0.00 Prozent" statt " 0.00 Prozent" (führendes Leerzeichen entfernt)

### Known Issues
- BUG-FEAT3-QA-003: AssetIcon zeigt kurz Broken-Image-Symbol vor Fallback-Render – Low
- BUG-FEAT3-UX-002: `PriceChangeBadge` fehlt `showIcon` prop aus Spec (API-Hygiene) – Low

---

## v0.2.0 *(2026-04-05)*

### Neue Features
- **FEAT-2 Interaktives Preis-Chart** – BTC Area-Chart mit 4 Zeiträumen (1T/1W/1M/1J), dynamischer Trend-Farbe, Gradient-Fill und Hover-Tooltip mit zeitraumgerechter Datumsformatierung

### Bug Fixes (QA-Runde FEAT-2)
- Tooltip-Format: Uhrzeit nur noch bei 1T-Ansicht (war: immer sichtbar, "um 12:00" bei Tages-/Wochendaten)
- 1M Mock-Daten: abrupter 5.3%-Einbruch am 30. März korrigiert (war: 1W-Startwert fälschlicherweise übernommen)

### Known Issues
- BUG-FEAT2-QA-003: XAxis `tickCount={6}` ohne Wirkung bei category-type – Low
- BUG-FEAT2-QA-004 / UX-002: `aria-label` auf Chart-Container ohne Preis + Zeitraum-Kurzcode statt -Label – Low

---

## v0.1.0 *(2026-04-05)*

### Neue Features
- **FEAT-1 Portfolio-Übersicht** – Hero-Sektion mit Gesamtwert, G/V (24h) und Asset-Verteilung als Donut-Chart

### Bug Fixes (QA-Runde FEAT-1)
- Breakpoint-Fix: Zwei-Spalten-Layout greift jetzt korrekt ab 1280px (xl:) statt 1024px
- WCAG AA: Kontrast-Fix für Label-Texte (slate-400 statt slate-500)
- Data: BNB-Asset-Name korrigiert zu "BNB Chain"
- formatPercent: "-0.00%" Edge Case behoben
- AssetList: semantisches ul/li statt div
- Donut-Ring: Radien auf 85%/58% angehoben (sichtbar größer)
- Icon-Größe: G/V-Icon auf 16px (w-4 h-4) korrigiert

### Known Issues
- BUG-FEAT1-UX-008: Donut-Segmente fließen leicht ineinander (paddingAngle=0) – Low
- BUG-FEAT1-UX-009: formatPercent Edge Case bei negativen Kleinstwerten – Low
