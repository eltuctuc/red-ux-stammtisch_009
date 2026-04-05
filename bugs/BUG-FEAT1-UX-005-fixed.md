---
id: BUG-FEAT1-UX-005
feature: FEAT-1
severity: Medium
status: Fixed
---

# BUG-FEAT1-UX-005: Donut auf Mobile (640px–1023px) mit 180px zu groß – dominiert die Rechte Spalte

**Severity:** Medium
**Bereich:** Mobile / Layout
**Gefunden von:** UX Reviewer

## Beschreibung

Bei 640px–1023px (Tailwind `sm`-Breakpoint bis `lg`) wechselt der Donut von 120px auf 180px (`sm:w-[180px] sm:h-[180px]`). Gleichzeitig ist das Gesamtlayout noch single-column (`grid-cols-1`). Das bedeutet: Die rechte Spalte (Donut + Asset-Liste) ist in diesem Bereich weiterhin full-width – der Donut und die Asset-Liste sind horizontal nebeneinander (`sm:flex-row` in der rechten Div ab Zeile 52 in PortfolioSection.tsx).

Das ist konzeptionell schwierig: Bei 640px steht ein 180px großer Donut neben einer Asset-Liste, die gemeinsam full-width in einem gestapelten Layout erscheinen – unterhalb des Wert-Blocks. Das Resultat ist eine "halbe" Desktop-Ansicht ohne die zweispaltige Strukturierung, aber mit Desktop-Donut-Größe. Mia sieht auf einem typischen Tablet (768px) einen übergroßen Donut der die Asset-Liste nach rechts quetscht, aber keinen echten Desktop-Vorteil erhält.

Die UX-Spec sieht für Mobile 120px vor und definiert kein Intermediate-Layout für den 640px–1280px-Bereich.

## Erwartetes Verhalten (aus UX-Spec)

UX-Spec definiert nur zwei Zustände: Desktop (≥1280px) mit Zwei-Spalten und 180px Donut, und Mobile (375px) mit gestapeltem Layout und 120px Donut. Der mittlere Bereich (640px–1279px) ist nicht spezifiziert – die Implementierung hätte hier konservativ bleiben müssen.

## Tatsächliches Verhalten

Ab 640px: Donut springt auf 180px und Donut + Asset-Liste wechseln auf `flex-row`. Das erzeugt ein unspezifiziertes Zwischenlayout, das weder dem Mobile- noch dem Desktop-Flow entspricht. Auf einem typischen iPad (768px) erscheint das Layout als gestreckte Horizontal-Gruppe unter dem Wert-Block.

## Fix-Vorschlag

Den Donut-Größensprung an den Layout-Breakpoint binden. Da das Zwei-Spalten-Layout (nach Fix von BUG-001) bei `xl:` (1280px) greift, sollte der Donut auch erst dort auf 180px wachsen:

```tsx
// PortfolioDonut.tsx – Aktuell:
className="w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] shrink-0"

// Korrekt (Größe folgt Layout-Breakpoint):
className="w-[120px] h-[120px] xl:w-[180px] xl:h-[180px] shrink-0"
```

Ebenso in `PortfolioSection.tsx` den `flex-row`-Wechsel auf `xl:flex-row` verschieben:

```tsx
// Aktuell:
className="flex flex-col sm:flex-row items-center sm:items-start gap-6"

// Korrekt:
className="flex flex-col xl:flex-row items-center xl:items-start gap-6"
```
