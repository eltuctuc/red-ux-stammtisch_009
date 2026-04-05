---
id: BUG-FEAT1-QA-002
feature: FEAT-1
severity: Medium
status: Fixed
---

# BUG-FEAT1-QA-002: "24h"-Label verwendet text-slate-500 – WCAG AA Kontrast-Verletzung

**Severity:** Medium
**Bereich:** A11y
**Gefunden von:** QA Engineer

## Beschreibung

In `PortfolioSection.tsx`, Zeile 47, verwendet das "24h"-Suffix-Label die Klasse `text-slate-500`. Die UX-Spec hält in der Kontrast-Tabelle explizit fest: "slate-500 (#64748b) bewusst vermieden für Textelemente – liegt mit ~3.8:1 unter 4.5:1." Damit verletzt dieses Element WCAG AA (Mindestkontrast 4.5:1 für normalen Text).

Das Label ist zwar sekundärer Kontext, aber kein dekoratives Element: Es qualifiziert die direkt danebenstehenden G/V-Werte zeitlich ("24h"). Ohne ausreichenden Kontrast können Low-Vision-User den Zeitraum nicht zuverlässig lesen.

Hinweis: BUG-FEAT1-UX-002 dokumentiert denselben Verstoß für das "Portfolio-Gesamtwert"-Label. Dieses Bug-File betrifft ein zweites, separates Element das von UX-002 nicht erfasst wurde.

## Erwartetes Verhalten (aus UX-Spec)

Alle lesbaren Textelemente verwenden mindestens `slate-400` (#94a3b8), das gegen `slate-900` ein Verhältnis von ~4.9:1 erreicht (WCAG AA konform).

## Tatsächliches Verhalten

`PortfolioSection.tsx` Zeile 47:
```tsx
<span className="text-sm text-slate-500 font-normal">24h</span>
```

`slate-500` (#64748b) gegen `slate-900` (#0f172a): ~3.8:1 — verfehlt WCAG AA.

## Schritte zur Reproduktion

1. Dashboard in Chrome DevTools auf 375px reduzieren
2. G/V-Zeile betrachten: "+$3,241.18 +2.68% 24h"
3. "24h"-Text ist deutlich schwächer als die benachbarten grünen Werte
4. Kontrast per DevTools Accessibility Panel prüfen: ~3.8:1 gegen Hintergrund slate-900

## Fix-Vorschlag

In `PortfolioSection.tsx`, Zeile 47: `text-slate-500` durch `text-slate-400` ersetzen.

```tsx
// Aktuell (WCAG-Verstoß):
<span className="text-sm text-slate-500 font-normal">24h</span>

// Korrekt nach Spec (4.9:1 Kontrast, WCAG AA):
<span className="text-sm text-slate-400 font-normal">24h</span>
```
