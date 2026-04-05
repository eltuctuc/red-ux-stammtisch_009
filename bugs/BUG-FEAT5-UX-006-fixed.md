# BUG-FEAT5-UX-006: Overlay-Wrapper des Modals fehlt aria-Rolle und ist für Screenreader nicht transparent

**Severity:** Medium
**Bereich:** A11y
**Feature:** FEAT-5
**Gefunden:** 2026-04-05

## Beschreibung
Das äußere `<div>` des Modals (der schwarze Backdrop) in `AddPositionModal.tsx` trägt `aria-hidden="false"`. Das ist semantisch bedeutungslos – `aria-hidden="false"` ist der Default-Wert und hat keine Wirkung. Was fehlt: Das Overlay-Div wird von Screenreadern als normales `<div>` im DOM wahrgenommen, ohne Kontext, dass es ein modaler Backdrop ist.

Das eigentliche Dialog-Element (`role="dialog"`) ist korrekt gesetzt – das ist gut. Aber das Overlay-Div sollte entweder gar kein `aria-hidden` tragen (es ist kein semantisches Element), oder es sollte sichergestellt sein, dass der restliche Seiteninhalt beim Öffnen des Modals mit `aria-hidden="true"` ausgeblendet wird (inert-Pattern).

Ohne `inert` oder `aria-hidden` auf dem restlichen DOM können Screenreader-Nutzer hinter das Modal navigieren, obwohl das visuell nicht möglich ist. Der Fokus-Trap verhindert Tab-Navigation, aber AT (Assistive Technology) kann dennoch auf den Hintergrundinhalt zugreifen.

## Reproduktion / Szenario
1. Modal öffnen
2. Mit einem Screenreader (z.B. VoiceOver auf macOS) die virtuelle Navigation (Pfeiltasten) verwenden
3. Man kann trotz Fokus-Trap den Hintergrund-Content erreichen

## Erwartetes Verhalten
Beim Öffnen des Modals sollte der Rest des `<body>` mit `inert` oder `aria-hidden="true"` ausgeblendet werden, sodass Screenreader ausschließlich den Modal-Inhalt navigieren. Dies ist die aktuelle A11y-Empfehlung (ARIA Authoring Practices Guide 1.2, Dialog Pattern).

## Tatsächliches Verhalten
`aria-hidden="false"` auf dem Backdrop (nutzlos), kein `inert` auf dem Hintergrundinhalt, kein `aria-hidden` auf dem App-Root beim Modal-Öffnen.

## Impact
Betrifft Screenreader-Nutzer direkt. Im Showcase-Kontext weniger kritisch, aber für ein "Showcase-Qualität"-Feature, das Kompetenz demonstrieren soll, ist dieser bekannte A11y-Gap auffällig.

**Status:** Fixed – Modal via createPortal nach document.body ausgelagert; App-Wrapper erhält aria-hidden={true} wenn Modal offen
