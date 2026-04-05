# BUG-FEAT6-UX-003: Grün als semantische Farbe mit zwei verschiedenen Bedeutungen im selben Dashboard

**Severity:** Medium
**Bereich:** Konsistenz
**Feature:** FEAT-6
**Gefunden:** 2026-04-05

## Beschreibung

Im Dashboard hat Grün jetzt zwei verschiedene Bedeutungen, die gleichzeitig sichtbar sind:

1. **FEAT-5 (Portfolio):** `text-green-400` = positiver Gewinn/Verlust (G/V > 0)
2. **FEAT-6 (Watchlist):** `border-green-500 bg-green-500/5` = "dieser Coin ist im Portfolio"

Ein Nutzer der auf die grüne ETH-Row in der Watchlist schaut, kann nicht intuitiv unterscheiden ob Grün hier "im Portfolio" oder "positive Performance" bedeutet – zumal die `PriceChangeBadge` in der ETH-Row ebenfalls grün ist (change24hPercent: +1.42%). Die ETH-Row hat damit drei Grün-Elemente gleichzeitig: Left-Border, Background-Wash und grünes Kurs-Badge.

WCAG Principle: Farbe darf nicht das einzige Unterscheidungsmerkmal für unterschiedliche Bedeutungen sein (WCAG 2.1 SC 1.4.1 – Use of Color).

## Reproduktion / Szenario

1. Dashboard öffnen
2. Portfolio-Section (FEAT-5) und Watchlist-Section (FEAT-6) gleichzeitig im Blick haben
3. In der Portfolio-Section: grüne G/V-Werte = Gewinn
4. In der Watchlist: grüne ETH-Row = im Portfolio
5. Expected: Nutzer versteht den Unterschied intuitiv oder durch einen visuell differenzierten Hinweis
6. Actual: Keine visuelle oder textuelle Unterscheidung der Grün-Bedeutungen. Für einen Nutzer der das erste Mal das Dashboard sieht ist unklar warum ETH grün hinterlegt ist – es könnte "gute Performance" oder "im Bestand" bedeuten.

## Erwartetes Verhalten

Die Portfolio-Overlap-Markierung ist entweder durch eine nicht-farbige Zusatz-Information (Icon, Label, Badge) disambiguiert – oder die gewählte Grün-Nuance ist so eigenständig gesetzt, dass sie sich vom Grün der G/V-Werte visuell klar unterscheidet.

## Tatsächliches Verhalten

Grün bedeutet im gleichen Dashboard gleichzeitig "Gewinn" (Portfolio-Section) und "im Portfolio" (Watchlist-Section) – ohne trennende Information für den Nutzer.

## Impact

Semantik-Verwirrung für neue Nutzer. Die Watchlist-Hervorhebung kommuniziert nicht verlässlich was sie bedeutet. Im Showcase-Kontext ist das besonders kritisch, weil Showcase-Betrachter das Dashboard ohne Vorwissen lesen.

**Empfehlung:**

Entweder eine der folgenden Maßnahmen:

A) Kleines Icon oder `sr-only`-unterstütztes Badge in der hervorgehobenen Row: z.B. ein `Briefcase`- oder `CheckCircle`-Icon (16px, `text-green-500`, `aria-hidden`) rechts neben dem Coin-Namen mit einem `sr-only`-Span "im Portfolio". Das gibt der Hervorhebung eine eigene ikonografische Identität unabhängig von der Farbe.

B) Andere Farbe für die Overlap-Markierung wählen – z.B. `border-violet-500 bg-violet-500/5` (Blau-Violett), das im Dashboard bisher keine eigene Bedeutung hat.

Option A ist vorzuziehen: Sie löst gleichzeitig das A11y-Problem der rein visuellen Unterscheidung (WCAG 1.4.1) und gibt dem Feature eine klarere UX-Botschaft.

**Status:** Fixed – `Briefcase`-Icon (16px, `aria-hidden`) aus `lucide-react` neben dem Coin-Namen in hervorgehobenen Rows eingefügt. Icon gibt der Portfolio-Markierung eine eigene ikonografische Identität unabhängig von der Farbe (WCAG 1.4.1). Layout unverändert: Icon sitzt in der Name-Zeile inline, kein Höhenbruch bei `h-12`.
