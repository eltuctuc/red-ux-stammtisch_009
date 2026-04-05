# BUG-FEAT5-UX-002: Formular-State bleibt nach erfolgreichem Submit oder Abbrechen erhalten

**Severity:** High
**Bereich:** Flow, Fehlerbehandlung
**Feature:** FEAT-5
**Gefunden:** 2026-04-05

## Beschreibung
`AddPositionForm` hält seinen lokalen State (`coin`, `quantity`, `purchasePrice`, `errors`) persistent im React-State – ohne Reset beim Schließen des Modals. Da das Modal via `if (!isOpen) return null` aus dem DOM entfernt wird, wird die Komponente vollständig unmounted und der State dabei zufällig zurückgesetzt. Das klingt nach korrektem Verhalten – ist aber eine fragile Abhängigkeit vom Unmount-Lifecycle, kein gezielter Reset.

Das eigentliche Problem: Wenn in einer späteren Iteration das Modal auf `display:none`/`visibility:hidden` umgestellt wird (etwa für Animationen), oder wenn React in Concurrent Mode die Komponente nicht unmountet, bleiben alte Werte und alte Fehlermeldungen im Formular stehen. Schon heute ist es ein konzeptuelles UX-Problem: Das Formular hat keinen expliziten Reset-Pfad.

Konkreter Grenzfall bereits heute: Nutzer öffnet Modal → gibt ungültige Werte ein → sieht Fehlermeldungen → schließt über Backdrop → öffnet Modal erneut. Abhängig davon, ob React die Komponente recycelt oder neu mountet, kann der Fehlerzustand sichtbar sein.

## Reproduktion / Szenario
1. Modal öffnen
2. Formular absichtlich falsch ausfüllen (z.B. Menge leer lassen), auf "Hinzufügen" klicken → Fehlermeldungen erscheinen
3. Modal über X-Button schließen (Abbrechen)
4. Modal erneut öffnen
5. Je nach React-Verhalten: Fehlermeldungen aus vorheriger Session noch sichtbar

## Erwartetes Verhalten
Beim Öffnen des Modals startet das Formular immer im sauberen Initialzustand – kein Pre-fill von vorherigen Eingaben, keine alten Fehlermeldungen. Dies entspricht dem dokumentierten State-Machine-Verhalten: `CLOSE_MODAL → idle (kein State-Change in Portfolio)` – analog sollte auch der Form-State zurückgesetzt werden.

## Tatsächliches Verhalten
Es gibt keinen expliziten Reset. Der Form-State wird durch das Unmounting der Komponente geleert – ein Nebeneffekt, kein Design.

## Impact
Mittel: Betrifft primär den Showcase-Betrachter, der mehrfach mit dem Modal interagiert. Kai (Trader), der systematisch mehrere Positionen einträgt, könnte alte Fehlermeldungen sehen, die ihn verwirren.

**Status:** Fixed – formKey in App.tsx wird bei jedem Modal-Öffnen inkrementiert; key-Prop auf AddPositionForm erzwingt vollständigen Reset
