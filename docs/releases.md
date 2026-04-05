# Release Notes

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
