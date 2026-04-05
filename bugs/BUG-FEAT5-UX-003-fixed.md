# BUG-FEAT5-UX-003: Kein Fokus-Management nach Submit-Fehler – erstes fehlerhaftes Feld wird nicht fokussiert

**Severity:** Medium
**Bereich:** A11y, Fehlerbehandlung
**Feature:** FEAT-5
**Gefunden:** 2026-04-05

## Beschreibung
Wenn der Nutzer das Formular mit ungültigen Werten abschickt, erscheinen die Fehlermeldungen inline unter den jeweiligen Feldern – das ist korrekt. Jedoch springt der Fokus nach dem fehlgeschlagenen Submit nicht automatisch auf das erste fehlerhafte Feld. Der Nutzer muss selbst erkennen, welches Feld rot markiert ist, und manuell hintabben oder klicken.

## Reproduktion / Szenario
1. Modal öffnen
2. Alle drei Felder leer lassen
3. Tab zu "Hinzufügen" und Enter drücken (oder Button anklicken)
4. Drei Fehlermeldungen erscheinen
5. Fokus bleibt auf dem "Hinzufügen"-Button – nicht auf dem ersten fehlerhaften Feld (Coin-Select)

## Erwartetes Verhalten
Nach einem fehlgeschlagenen Submit wird der Fokus automatisch auf das erste ungültige Feld gesetzt (WCAG 2.1, SC 3.3.1; WCAG Best Practice `focus-management`). Dies gilt besonders bei modalen Formularen, wo der Nutzer keinen visuellen Überblick über den gesamten Kontext hat.

## Tatsächliches Verhalten
In `AddPositionForm.tsx` setzt `handleSubmit` bei Fehler nur `setErrors(errs)` – kein `focus()` auf das erste fehlerhafte Feld. Es gibt keine `useRef`-Refs auf die Felder für programmatisches Fokussieren.

## Impact
Betrifft Tastatur-Nutzer und Screenreader-Nutzer. Für Screenreader-Nutzer ist das Problem kritischer: Sie hören die Fehlermeldungen zwar über `role="alert"`, müssen aber selbst zurücknavigieren. Für den Showcase bleibt der Impact überschaubar.

**Status:** Fixed – Refs auf alle Formfelder; nach Validierungsfehler fokussiert handleSubmit das erste fehlerhafte Feld
