# BUG-FEAT6-UX-004: Hervorhebung verschwindet ohne Transition – abrupter State-Wechsel

**Severity:** Low
**Bereich:** Darstellung
**Feature:** FEAT-6
**Gefunden:** 2026-04-05

## Beschreibung

Wenn ein Nutzer ETH aus dem Portfolio entfernt (FEAT-5 Delete-Aktion), verschwindet die grüne Hervorhebung der ETH-Row in der Watchlist sofort – kein fade, kein Übergang. Die Row springt abrupt von "grüner Hintergrund + Left-Border" zu "kein Styling". AC-3 ist technisch erfüllt (die Hervorhebung verschwindet bei Portfolio-Änderung), aber der visuelle Übergang fehlt.

Laut UX-Spec (Abschnitt "Reaktivität"): "Bei jeder Änderung wird die Liste neu gerendert." Das ist korrekt beschrieben, aber eine Transition wurde bewusst nicht spezifiziert. Der abrupte Wechsel ist für den Scope eines Showcase-Prototyps diskutabel.

## Reproduktion / Szenario

1. Dashboard öffnen – ETH-Row in der Watchlist ist grün hervorgehoben
2. In der Portfolio-Section ETH-Position entfernen (Trash-Icon)
3. Expected: Grüne Hervorhebung der ETH-Row faded sanft aus (z.B. 200ms ease-out)
4. Actual: Hervorhebung verschwindet sofort und abrupt. Der visuelle Zusammenhang zwischen Aktion (Portfolio-Änderung) und Reaktion (Watchlist-Update) ist zwar vorhanden, aber ohne die narrative Brücke einer Transition nicht unmittelbar als "diese beiden Dinge hängen zusammen" lesbar.

## Erwartetes Verhalten

Ein kurzer Fade-Übergang (150–200ms) beim Erscheinen und Verschwinden der Hervorhebung kommuniziert visuell, dass die Watchlist auf eine Portfolio-Änderung reagiert. Das stärkt das Kernversprechen von FEAT-6: "Dashboard als kohärentes System statt isolierter Widgets."

## Tatsächliches Verhalten

State-Wechsel ist abrupt ohne visuelle Transition.

## Impact

Im Showcase-Kontext schwächt das den wahrgenommenen Zusammenhang zwischen Portfolio und Watchlist – der eigentliche Kernwert von FEAT-6. Low für Showcase-Scope, aber die Transition wäre ein einfacher High-Impact-Fix.

**Fix (minimal):**
In `WatchlistRow.tsx` auf dem Root-`div` `transition-colors duration-200` ergänzen. Tailwind animiert dann `background-color` und `border-color` automatisch beim State-Wechsel. Kosten: eine Klasse. Keine neuen Dependencies.

```tsx
className={`flex items-center justify-between h-12 px-1 transition-colors duration-200 ${borderClass} ${portfolioClass}`}
```

**Status:** Fixed – `transition-colors duration-200` im Root-`div` der `WatchlistRow` ergänzt. Hintergrundfarbe und Border-Color faden sanft beim State-Wechsel (Portfolio-Hinzufügen / Entfernen). Fix wurde im Rahmen von QA-001 (cn()-Refactor) mitgeliefert.
