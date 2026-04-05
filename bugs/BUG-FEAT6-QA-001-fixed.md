# BUG-FEAT6-QA-001: Layout-Shift-Kompensation scheitert durch Tailwind-Klassen-Konflikt

**Severity:** High
**Bereich:** Functional
**Feature:** FEAT-6
**Gefunden:** 2026-04-05

## Beschreibung

`WatchlistRow.tsx` setzt bei `isInPortfolio=true` die Klasse `pl-[2px]` zusätzlich zu dem dauerhaft gesetzten `px-1` (= padding-left: 4px). Beide Klassen schreiben auf dieselbe CSS-Property (`padding-left`). Da kein `cn()` / `tailwind-merge` verwendet wird, sondern simple String-Konkatenation, ist das Ergebnis abhängig von der Reihenfolge der generierten CSS-Regeln im Tailwind v4 Output-Stylesheet — nicht von der Reihenfolge im className-String.

**Tatsächlich wirksamer Wert:** unbestimmt / compiler-abhängig. In der Praxis gewinnt `pl-[2px]` in vielen Tailwind v4-Builds, weil arbitrary values nach Standard-Utilities generiert werden — aber das ist kein garantiertes Verhalten und kann sich mit Tailwind-Updates ändern.

**Wer verletzt wird:** AC-2 ("kein Layout-Shift, keine Größenänderung der Rows") und die UX-Spezifikation (Abschnitt Highlight-Stil: "border-l ersetzt bestehenden left-padding nicht — es kommt außen dazu, also padding-left leicht anpassen: `pl-[calc(0.75rem-2px)]`").

Das `cn()` utility (via `tailwind-merge`) ist im Projekt unter `src/utils/cn.ts` vorhanden und wird in anderen Komponenten verwendet. In `WatchlistRow.tsx` wird es nicht importiert.

## Schritte zur Reproduktion

1. ETH aus `INITIAL_POSITIONS` ist im Portfolio
2. Watchlist-Row für ETH rendert mit `border-l-2 border-green-500 bg-green-500/5 pl-[2px]` UND `px-1`
3. Im Browser: padding-left der ETH-Row prüfen (DevTools → Computed Styles → padding-left)
4. Expected: padding-left = 2px (Border 2px + Padding 2px = 4px gesamt, kein Shift)
5. Actual: padding-left = 4px (wenn `px-1` gewinnt) oder 2px (wenn `pl-[2px]` gewinnt) — browsersession- und build-abhängig

## Erwartetes Verhalten

Die padding-left der hervorgehobenen Row beträgt 2px, sodass Border (2px) + Padding (2px) = 4px gesamt, identisch mit der Baseline-Row (px-1 = 4px padding-left ohne Border). Kein Layout-Shift.

## Tatsächliches Verhalten

Der Klassen-Konflikt zwischen `px-1` und `pl-[2px]` wird nicht durch `tailwind-merge` aufgelöst. Das tatsächliche Rendering ist build-abhängig. Bei `px-1`-Gewinn: 4px padding + 2px border = 6px linker Gesamtabstand → 2px Layout-Shift für alle hervorgehobenen Rows.

## Fix

In `WatchlistRow.tsx` `cn()` aus `@/utils/cn` importieren und `className` über `cn()` bauen, damit `tailwind-merge` den `px-1`/`pl-[2px]`-Konflikt korrekt auflöst:

```tsx
import { cn } from '@/utils/cn'

className={cn(
  'flex items-center justify-between h-12 px-1',
  !isLast && 'border-b border-slate-800',
  isInPortfolio && 'border-l-2 border-green-500 bg-green-500/5 pl-[2px]'
)}
```

`tailwind-merge` erkennt den `px-1`/`pl-[2px]`-Konflikt und behält nur das spätere `pl-[2px]`.

## Referenz

- `projekt/src/components/watchlist/WatchlistRow.tsx` Zeile 23
- `projekt/src/utils/cn.ts`
- FEAT-6 UX-Design, Abschnitt "Highlight-Stil": "border-l ersetzt bestehenden left-padding nicht"
- AC-2: "kein Layout-Shift, keine Größenänderung der Rows"

## Priority

Fix before release

**Status:** Fixed – `cn()` aus `@/utils/cn` importiert, `className` in `WatchlistRow.tsx` über `cn()` gebaut. `tailwind-merge` löst den `px-1`/`pl-[2px]`-Konflikt auf; `pl-[2px] pr-1` explizit gesetzt (kein `px-1` mehr in der gemeinsamen Basis). Gleichzeitig UX-001 (symmetrisches Padding) und UX-004 (Transition) mitgelöst.
