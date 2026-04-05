# BUG-FEAT5-UX-009: Mobile-Tabellenzeile zeigt "Menge" nicht – Datenverlust im kompakten Layout

**Severity:** Medium
**Bereich:** Mobile, Flow
**Feature:** FEAT-5
**Gefunden:** 2026-04-05

## Beschreibung
Das Mobile-Layout der `PortfolioPositionRow` zeigt im 3-Spalten-Grid: Kaufpreis | Akt. Wert | G/V. Die "Menge" (Quantity) fehlt komplett im Mobile-View. Die Spec beschreibt für Mobile: "Row 2: 3-Spalten-Grid: Kaufpreis | Akt. Wert | G/V (USD + %)" – Menge ist dort ebenfalls nicht vorgesehen.

Aus Nutzerperspektive ist das ein Problem: Kai (Trader) trägt 0.842 BTC ein. Im Mobile-Dashboard sieht er Kaufpreis ($62.000), Aktuellen Wert ($71.570) und G/V (+37%). Aber er sieht nicht, auf wie viele BTC sich diese Werte beziehen. Hat er 0.5 BTC oder 0.842 BTC im Portfolio? Das ist nur über das erneute Öffnen des Formularinhalts oder das Scrollen zu einem Desktop-View nachvollziehbar.

Besonders kritisch: Wenn Kai mehrere BTC-Positionen mit verschiedenen Cost-Bases hat (erlaubt per Spec: "zweiter Eintrag als separate Position"), sind die Zeilen auf Mobile ununterscheidbar – beide zeigen "Bitcoin / BTC" mit G/V, aber ohne Menge fehlt der einzige differenzierende Wert.

## Reproduktion / Szenario
1. Dashboard auf einem 375px-Mobile-Screen öffnen
2. Portfolio-Liste betrachten
3. Zwei BTC-Positionen mit verschiedenen Mengen eingeben
4. Mobile-Ansicht: Beide Zeilen sehen identisch aus – Menge fehlt

## Erwartetes Verhalten
Die Menge ist eine Kernangabe jeder Portfolio-Position (Acceptance Criteria 3: "Jede Position zeigt: Coin-Name, Menge, Kaufpreis, aktueller Wert, G/V"). Sie muss auch im Mobile-Layout sichtbar sein. Empfehlung: Menge als vierte Zelle im 3-Spalten-Grid gegen eine weniger kritische Angabe ersetzen, oder als Sub-Line unter dem Coin-Namen anzeigen (z.B. "0.842 BTC" klein unter "Bitcoin").

## Tatsächliches Verhalten
Mobile-Grid zeigt 3 Spalten: Kaufpreis | Akt. Wert | G/V. Menge (`position.quantity`) wird im `md:hidden`-Block nicht gerendert.

## Impact
Betrifft alle Mobile-Nutzer. Für Kai (Trader) mit mehreren gleichen Coin-Positionen ist das ein echter Informationsverlust. Verletzt Acceptance Criteria 3 auf Mobile-Viewports.

**Status:** Fixed – Menge als 'symbol + quantity' in der Subtitle-Zeile des Mobile-Layouts ergänzt
