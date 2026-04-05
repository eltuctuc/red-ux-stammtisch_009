# BUG-FEAT5-QA-003: Kein Fokus-Return auf Trigger-Button nach Modal schließen

**Severity:** Medium
**Bereich:** A11y / Modal
**Feature:** FEAT-5
**Gefunden:** 2026-04-05

## Beschreibung

`AddPositionModal.tsx` implementiert keinen Fokus-Return auf den auslösenden Button, wenn das Modal geschlossen wird. Nach dem Schließen (via ESC, Backdrop-Klick, "Abbrechen" oder erfolgreichem Submit) bleibt der Fokus an unbekannter Position im Dokument — typischerweise springt er auf das `<body>`-Element.

Die Tech-Spec definiert explizit: "beim Schließen Fokus zurück auf Trigger-Button". Auch WCAG 2.1 SC 2.4.3 (Focus Order) verlangt, dass der Fokus nach dem Schließen eines Dialogs zum auslösenden Element zurückkehrt.

Im aktuellen Code gibt es keinen `triggerRef`, keinen `document.getElementById`-Lookup, keine `useCallback`-Ref auf den öffnenden Button — es existiert schlicht keine Fokus-Return-Logik.

## Schritte zur Reproduktion

1. App laden, ausschließlich Tastatur verwenden
2. Tab bis zum "Position hinzufügen"-Button navigieren
3. Enter drücken → Modal öffnet sich
4. ESC drücken → Modal schließt sich
5. Beobachten: Fokus ist nicht mehr auf "Position hinzufügen"-Button
6. Nächster Tab-Schritt beginnt irgendwo im Dokument

## Erwartetes Verhalten

Nach dem Schließen des Modals liegt der Fokus wieder auf dem "Position hinzufügen"-Button, sodass Keyboard-User den Flow nahtlos fortsetzen können.

## Tatsächliches Verhalten

Fokus verschwindet nach Modal-Schließen. Der User verliert seine Position im Dokument und muss von vorn navigieren.

## Fix

```tsx
// In PortfolioSection.tsx: ref auf den Add-Button
const addButtonRef = useRef<HTMLButtonElement>(null)

// ref weiterleiten oder als Callback via onOpenModal mitgeben
// In AddPositionModal: triggerRef als optionaler Prop
interface AddPositionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (position: Omit<PortfolioPosition, 'id'>) => void
  triggerRef?: React.RefObject<HTMLButtonElement>  // für Fokus-Return
}

// Im Modal useEffect für Cleanup:
useEffect(() => {
  if (!isOpen) {
    triggerRef?.current?.focus()
  }
}, [isOpen, triggerRef])
```

## Referenz

Tech-Design: "beim Schließen Fokus zurück auf Trigger-Button" / WCAG 2.1 SC 2.4.3 (Focus Order)

## Priority

Fix before release

**Status:** Fixed – triggerRef als Prop an AddPositionModal übergeben; useEffect ruft focus() beim Schließen auf
