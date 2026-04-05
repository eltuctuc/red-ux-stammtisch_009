# BUG-FEAT6-UX-001: Asymmetrisches Padding bei hervorgehobenen Watchlist-Rows

**Severity:** Medium
**Bereich:** Darstellung
**Feature:** FEAT-6
**Gefunden:** 2026-04-05

## Beschreibung

Die Padding-Kompensation für den 2px Left-Border ist unvollständig. Die Row hat als Basis `px-1` (= 4px links und rechts). Bei `isInPortfolio === true` wird `pl-[2px]` gesetzt, das das linke Padding von 4px auf 2px reduziert – korrekt. Das rechte Padding bleibt aber bei 4px (aus `px-1`). Ergebnis: hervorgehobene Rows haben links 2px, rechts 4px Padding. Nicht hervorgehobene Rows haben beidseitig 4px. Der Inneninhalt (Icon + Name) sitzt in der hervorgehobenen Zeile 2px weiter rechts als in den normalen Zeilen – spürbar, wenn ETH direkt neben LINK, DOT etc. steht.

Die Spec schreibt `pl-[calc(0.25rem-2px)] pr-1` vor – also eine explizite Trennung von left- und right-padding. Implementiert ist stattdessen `px-1` (beide Seiten) plus `pl-[2px]` als Override, ohne das rechte Padding explizit zu fixieren. Das CSS-Ergebnis ist rechnerisch korrekt für links (2px), aber die Asymmetrie zum rechten Padding (4px) bleibt bestehen.

## Reproduktion / Szenario

1. Dashboard öffnen (ETH ist per Default im Portfolio und in der Watchlist)
2. Watchlist-Section betrachten
3. ETH-Row mit den anderen Rows (LINK, DOT, MATIC, AVAX, ATOM) visuell vergleichen
4. Expected: Alle Rows haben denselben optischen Einzug für Icon und Name – kein horizontaler Versatz zwischen hervorgehobener und normaler Row
5. Actual: ETH-Row ist links um ~2px eingerückt (Icon und Name stehen minimal weiter rechts), während rechts 4px Abstand bleibt – die Row wirkt leicht nach rechts verschoben

## Erwartetes Verhalten

Alle Watchlist-Rows haben dieselbe horizontale Ausrichtung von Icon und Coin-Name. Die grüne Left-Border der ETH-Row ist sichtbar, ohne dass der Inhalt der Row horizontal verschoben wirkt.

## Tatsächliches Verhalten

Die hervorgehobene ETH-Row hat `pl-[2px] pr-4` (de facto), alle anderen Rows `px-4` (de facto) – asymmetrisches Innen-Padding sorgt für einen minimalen, aber wahrnehmbaren Versatz des Inhalts nach rechts.

## Impact

Kein Layout-Bruch, aber der visuelle Qualitätsanspruch "kein Layout-Shift" aus AC-2 ist verletzt. Bei einem Showcase-Prototyp fällt die Ungenauigkeit einem aufmerksamen Betrachter auf.

**Fix:** In `WatchlistRow.tsx` den `portfolioClass`-String von `pl-[2px]` auf `pl-[2px] pr-1` ändern – oder besser: den Basis-`px-1` aus der gemeinsamen className entfernen und stattdessen in beiden Branches explizit setzen:
- Normal: `px-1`
- Portfolio: `pl-[2px] pr-1`

**Status:** Fixed – gemeinsamer `px-1` aus der Basis-className entfernt. Normal-Rows: `px-1`. Portfolio-Rows: `pl-[2px] pr-1`. Beide Seiten symmetrisch (links: 2px + 2px Border = 4px gesamt, rechts: 4px). Kein Layout-Shift mehr.
