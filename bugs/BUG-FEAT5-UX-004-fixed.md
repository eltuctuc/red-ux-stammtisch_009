# BUG-FEAT5-UX-004: Trash-Button Touch-Target auf Mobile unterschreitet 44px Minimum

**Severity:** Medium
**Bereich:** Mobile, A11y
**Feature:** FEAT-5
**Gefunden:** 2026-04-05

## Beschreibung
Die Spec vermerkt im Touch-Target-Check: `p-2` um ein 16px Icon ergibt 40px (Padding 8px + 16px Icon + 8px = 32px tatsächliche Höhe/Breite des klickbaren Bereichs ohne äußeres Layout-Spacing). Das ist korrekt – `p-2` in Tailwind = 8px padding auf jeder Seite, also 8+16+8 = 32px visuelle Größe. Die Spec selbst kommentiert das als "40px, akzeptabel" – das ist aber nicht akzeptabel nach Apple HIG und WCAG (Mindest-Touch-Target 44×44px).

Der Trash-Button im Mobile-Layout (`md:hidden`-Block in `PortfolioPositionRow.tsx`) hat `p-2 rounded shrink-0`. Das ergibt de facto eine Klickfläche von ~32px². Beim Desktop-Layout gilt dasselbe.

Zusätzlich: Der Trash-Button im Mobile-Layout befindet sich in einer Zeile mit dem Coin-Namen. Der verfügbare Platz ist durch `min-w-0` eingeschränkt – auf kleinen Screens (375px) könnte der Coin-Name sehr lang sein (z.B. "Bitcoin") und den Trash-Button an den rechten Rand schieben, wo er nah am Edge liegt.

## Reproduktion / Szenario
1. Dashboard auf einem 375px-Smartphone öffnen
2. Portfolio-Liste mit einer langen Coin-Bezeichnung betrachten
3. Trash-Button rechts in Row 1 hat ~32×32px Klickfläche

## Erwartetes Verhalten
Mindest-Touch-Target 44×44px nach Apple HIG. Die Spec-Tabelle dokumentiert `p-3` → 48px als korrekte Umsetzung – aber der Code implementiert `p-2`.

## Tatsächliches Verhalten
Beide Trash-Buttons (Desktop und Mobile) nutzen `p-2` (entspricht 32px Touch-Target), nicht `p-3` (48px). Die Spec-Tabelle ist korrekt, die Implementierung weicht ab.

## Impact
Mobile-Nutzer treffen den Trash-Button schlechter, besonders beim schnellen Entfernen von Positionen. Für Kai (Trader), der schnell Positionen bereinigt, bedeutet das Fehlklicks und Frustration.

**Status:** Fixed – p-2 auf p-3 + min-w-[44px] min-h-[44px] auf beiden Trash-Buttons (Desktop + Mobile)
