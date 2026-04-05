---
id: BUG-FEAT1-UX-002
feature: FEAT-1
severity: High
status: Fixed
---

# BUG-FEAT1-UX-002: Gesamtwert auf Mobile zu klein – 36px vs. text-4xl (implementiert)

**Severity:** High
**Bereich:** Typography
**Gefunden von:** UX Reviewer

## Beschreibung

Die UX-Spec definiert für Mobile eine Gesamtwert-Schriftgröße von 36px. Implementiert ist `text-4xl` (= 36px in Tailwind) ohne Responsive-Anpassung nach unten. Das klingt korrekt – ist es aber nicht vollständig.

Das Problem liegt eine Ebene tiefer: Die UX-Spec gibt `text-5xl` (48px) für Desktop und 36px für Mobile an. Die Implementierung setzt `text-4xl sm:text-5xl` – das bedeutet 36px von 0px bis 639px, und 48px ab 640px. Das ist korrekt.

**Das eigentliche Problem:** Das Label "Portfolio-Gesamtwert" darüber verwendet `text-xs text-slate-500` – also die bewusst vermiedene `slate-500`-Farbe. Die Kontrast-Tabelle in der UX-Spec hält fest: "slate-500 (#64748b) bewusst vermieden für Textelemente – liegt mit ~3.8:1 unter 4.5:1. Stattdessen slate-400 eingesetzt." Die tatsächliche Implementierung des Labels verstößt genau gegen diese Entscheidung.

## Erwartetes Verhalten (aus UX-Spec)

Kontrast-Check in der UX-Spec: `slate-500` explizit als zu schwach ausgeschlossen. Alle sichtbaren Textelemente sollen mindestens `slate-400` (#94a3b8) verwenden, das 4.9:1 gegen `slate-900` erreicht.

## Tatsächliches Verhalten

`PortfolioSection.tsx`, Zeile 22: Das Label "Portfolio-Gesamtwert" ist mit `text-slate-500` implementiert. `slate-500` hat gegen `slate-900` ein Kontrastverhältnis von nur ~3.8:1 – verfehlt WCAG AA (4.5:1) für normalen Text.

Das Label ist kein dekoratives Element, sondern der semantische Kontext für die wichtigste Zahl im Dashboard. Mia kann es bei schlechten Lichtverhältnissen (draußen, mobil) kaum lesen – was laut Personas-Dokument ein zentrales Nutzungsszenario ist.

## Fix-Vorschlag

In `PortfolioSection.tsx`, Zeile 22: `text-slate-500` durch `text-slate-400` ersetzen.

```tsx
// Aktuell (WCAG-Verstoß):
<p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-3">

// Korrekt nach Spec (4.9:1 Kontrast, WCAG AA):
<p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-3">
```
