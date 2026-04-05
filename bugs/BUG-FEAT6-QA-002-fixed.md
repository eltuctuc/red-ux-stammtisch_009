# BUG-FEAT6-QA-002: TypeScript Build-Fehler in PortfolioSection.tsx (Regression FEAT-5)

**Severity:** Medium
**Bereich:** Regression
**Feature:** FEAT-6 (Regression aus FEAT-5)
**Gefunden:** 2026-04-05

## Beschreibung

`npx tsc -b --noEmit` (Build-Reference-Modus, wie Vite ihn intern nutzt) schlägt mit einem Type-Error in `PortfolioSection.tsx` fehl. Der Fehler existiert bereits seit dem FEAT-5-Implementierungs-Commit und wurde durch FEAT-6 nicht eingeführt, aber auch nicht behoben.

```
src/components/portfolio/PortfolioSection.tsx(87,40): error TS2345:
Argument of type 'RefObject<HTMLButtonElement | null>' is not assignable to
parameter of type 'RefObject<HTMLButtonElement>'.
  Type 'HTMLButtonElement | null' is not assignable to type 'HTMLButtonElement'.
    Type 'null' is not assignable to type 'HTMLButtonElement'.
```

**Ursache:** `useRef<HTMLButtonElement>(null)` erzeugt in React 19 / @types/react 19 einen `RefObject<HTMLButtonElement | null>`. `onOpenModal` erwartet `RefObject<HTMLButtonElement>` (ohne null). Typinkompatibilität.

**Warum bisher unentdeckt:** Der im QA-Auftrag dokumentierte Check-Command `npx tsc --noEmit` (ohne `-b`) findet diesen Fehler nicht, weil `tsconfig.json` auf einen Project-Reference-Mode mit `tsconfig.app.json` setzt, der ohne `-b`-Flag nicht ausgewertet wird. Der `tsc -b`-Lauf entspricht dem, was `npm run build` intern tut — und dort schlägt der Build fehl.

## Schritte zur Reproduktion

1. Im Verzeichnis `projekt/` ausführen: `npx tsc -b --noEmit`
2. Oder: `npm run build`

## Erwartetes Verhalten

Kein TypeScript-Fehler. Build und Type-Check sind sauber.

## Tatsächliches Verhalten

```
error TS2345: Argument of type 'RefObject<HTMLButtonElement | null>' is not
assignable to parameter of type 'RefObject<HTMLButtonElement>'.
```

Exit code 2 — Build schlägt fehl.

## Fix

In `PortfolioSection.tsx` den Prop-Typ anpassen:

```tsx
onOpenModal: (ref: React.RefObject<HTMLButtonElement | null>) => void
```

Entsprechend in `App.tsx` `handleOpenModal`:

```tsx
function handleOpenModal(ref: React.RefObject<HTMLButtonElement | null>) {
```

## Referenz

- `projekt/src/components/portfolio/PortfolioSection.tsx` Zeile 11 und 87
- `projekt/src/App.tsx` Zeile 109
- Introduced: Commit `28ac057` (feat: implement FEAT-5 + FEAT-6)

## Priority

Fix before release

**Status:** Fixed – `RefObject<HTMLButtonElement | null>` in `PortfolioSection.tsx` (Prop-Interface), `App.tsx` (`handleOpenModal`-Signatur + `triggerRef`-Typ) und `AddPositionModal.tsx` (Prop-Interface) angepasst. `npx tsc -b --noEmit` gibt 0 Errors zurück.
