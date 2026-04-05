# BUG-FEAT5-QA-002: Modal-Initialfokus landet auf X-Button statt erstem Formfeld

**Severity:** Medium
**Bereich:** A11y / Modal
**Feature:** FEAT-5
**Gefunden:** 2026-04-05

## Beschreibung

Der Fokus-Trap in `AddPositionModal.tsx` ruft `querySelectorAll` auf dem `dialogRef`-Element auf und fokussiert das erste zurückgegebene fokussierbare Element. Im DOM steht der X-Schließen-Button (`<button aria-label="Modal schließen">`) vor dem Formular, weshalb er als erstes Element zurückgegeben wird. Der initiale Fokus landet damit auf dem Schließen-Button, nicht auf dem ersten Formfeld (Coin-Select).

```tsx
// AddPositionModal.tsx, Zeile 28–33:
const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
)
const first = focusable[0]  // ← X-Button, nicht Coin-Select
first?.focus()
```

DOM-Reihenfolge im dialogRef:
1. X-Button (Header)
2. Coin-Select (Form)
3. Menge-Input
4. Kaufpreis-Input
5. Abbrechen-Button
6. Hinzufügen-Button

Die Tech-Spec definiert explizit: "beim Öffnen Fokus auf erstes Feld".

## Schritte zur Reproduktion

1. App laden
2. "Position hinzufügen"-Button klicken (oder Tab + Enter)
3. Beobachten, welches Element den initialen Fokus erhält
4. Erwartung: Coin-Select ist fokussiert
5. Tatsächlich: X-Button ist fokussiert (erkennbar am Focus-Ring)

## Erwartetes Verhalten

Beim Öffnen des Modals soll der Fokus auf dem ersten Formfeld (Coin-Select) liegen, damit Keyboard-User direkt mit der Eingabe beginnen können.

## Tatsächliches Verhalten

Fokus landet auf dem X-Schließen-Button. Keyboard-User muss erst Tab drücken, um zum ersten Formfeld zu gelangen.

## Fix

`querySelectorAll` entweder auf das Formular statt den gesamten Dialog anwenden, oder den ersten fokussierbaren Formular-Input via `ref` direkt fokussieren:

```tsx
// Option A: Ersten Select/Input im Form direkt fokussieren
const firstFormField = dialogRef.current.querySelector<HTMLElement>('select, input')
firstFormField?.focus()

// Option B: Ref auf den Select im AddPositionForm weiterleiten (erfordert forwardRef)
```

## Referenz

Tech-Design: "beim Öffnen Fokus auf erstes Feld" / WCAG 2.1 SC 2.4.3 (Focus Order)

## Priority

Fix before release

**Status:** Fixed – querySelectorAll ersetzt durch querySelector('select, input') für Initialfokus auf erstes Formfeld
