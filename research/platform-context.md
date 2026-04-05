---
status: approved
---

# Platform & Nutzungskontext
*Abgeleitet aus PRD von: /red:proto-research — 2026-04-05*

## Primäres Gerät
Desktop / Laptop – Browser, Maus & Tastatur. Das Dashboard ist ein Showcase, der primär auf einem Bildschirm präsentiert wird.

## Nutzungskontext
Fokussierte Präsentation / Demo: Das Dashboard wird Designern, Entwicklern und potenziellen Auftraggebern gezeigt – entweder im Meeting, in einem Portfolio oder auf einem UX-Event (UX-Stammtisch). Keine echte Nutzungsintensität, aber höchste Anforderung an visuellen ersten Eindruck.

## Mobile-Typ
Mobile Web (Responsive) – kein nativer App-Bedarf. Das PRD definiert explizit "Desktop-first, mobile-fähig". Mobile ist ein Nice-to-have für Demonstrationszwecke, nicht das primäre Erlebnis.

## Nutzungsfrequenz
Nicht anwendbar im klassischen Sinne – das Produkt ist ein Showcase, keine Habit-App. Relevant ist: schnelles Laden, keine Fehler beim ersten Eindruck.

## Implikationen für Tech-Stack
- Web-only, kein nativer App-Wrapper nötig – React/Vue/Svelte als SPA ausreichend
- Performance beim ersten Laden ist kritisch (Showcase-Kontext: keine zweite Chance)
- Chart-Library sollte smooth und interaktiv sein – visuelle Qualität > Datenmenge
