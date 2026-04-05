# Dev Handoff – FEAT-3 Watchlist
*Erstellt: 2026-04-05*

## Was wurde gebaut

Kompakte Watchlist-Sektion (S-01-C) in der rechten Spalte neben dem Preis-Chart. Zeigt 6 Kryptowährungs-Assets mit Icon, Name, Symbol, aktuellem Preis und 24h-Änderung. Rein presentational, kein State, kein Interaktion.

## Implementierte Dateien

| Datei | Zweck |
|-------|-------|
| `projekt/src/data/watchlist.ts` | Mock-Daten: 6 Assets (LINK, DOT, MATIC, AVAX, ATOM, LTC) |
| `projekt/src/components/shared/AssetIcon.tsx` | 32px Icon: versucht PNG, fällt auf farbigen Circle mit Initials zurück |
| `projekt/src/components/watchlist/WatchlistRow.tsx` | Einzelne Row: h-12, Icon + Name/Symbol links, Preis + Badge rechts |
| `projekt/src/components/watchlist/WatchlistSection.tsx` | section-Container mit "Watchlist"-Header (uppercase/tracking) |
| `projekt/src/App.tsx` | WatchlistSection in rechte xl:-Grid-Spalte |

## Wichtige Implementierungsdetails

- **AssetIcon Fallback:** `onError` → `useState(imgError)` → farbiger Div mit Initials. Da kein `/coins/` Verzeichnis existiert, zeigen alle Icons den Fallback
- **Separator:** `border-b border-slate-800` auf allen Rows außer dem letzten (`isLast` prop)
- **Typography:** 13px/11px (text-[13px]/text-[11px]) statt Standard-Tailwind-Steps – exakt per Spec
- **Kein Hover-State:** WatchlistRows sind `<div role="listitem">`, kein Button/Link, kein cursor-pointer
- **PriceChangeBadge:** Shared Component aus FEAT-1, deckt alle 3 States (positiv/negativ/neutral) bereits ab
- **formatCurrency:** Funktioniert korrekt für $0.92 (MATIC) und $92.30 (LTC)

## Für QA relevant (Acceptance Criteria)

1. 6 Einträge mit realistischen Mock-Assets ✓
2. Icon, Name, Symbol, Preis, 24h-% vorhanden ✓
3. Positiv grün, negativ rot ✓
4. Mindestens 2 Non-Portfolio-Assets (alle 6 sind non-portfolio) ✓
5. Alle 6 auf Desktop ohne horizontales Scrollen ✓
6. Mobile: vollständig vertikal, kein Layout-Bruch ✓
7. "Watchlist" Abschnittsüberschrift vorhanden ✓

## Bekannte Tech-Debt

- Kein `/coins/` PNG-Verzeichnis → alle Icons zeigen Fallback-Circles. Wenn Showcase-Upgrade gewünscht: PNGs in `projekt/public/coins/` ablegen (link.png, dot.png, matic.png, avax.png, atom.png, ltc.png)

## Fix-Schwelle

Aktuell: `Critical` (aus FEAT-3 Spec). Wird beim ersten QA-Run bestätigt.
