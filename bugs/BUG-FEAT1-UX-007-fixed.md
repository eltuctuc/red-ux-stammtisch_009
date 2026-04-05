---
id: BUG-FEAT1-UX-007
feature: FEAT-1
severity: Medium
status: Fixed
---

# BUG-FEAT1-UX-007: AssetList scrollbar auf Mobile nicht signalisiert – Leer-Zustand fehlt komplett

**Severity:** Medium
**Bereich:** A11y / Flow
**Gefunden von:** UX Reviewer

## Beschreibung

Zwei separate Probleme in `AssetList.tsx`:

**Problem 1 – Kein Scroll-Affordance-Signal:**
`AssetList` verwendet `overflow-y-auto max-h-[300px]` für Mobile. Auf kleinen Viewports (375px) ist die Liste scrollbar, wenn alle 6 Assets nicht in 300px passen (6 × 40px = 240px, also kein Scroll nötig). Bei anderen Implementierungen oder mehr Assets könnte Scroll nötig sein – aber selbst wenn Scroll nötig wäre: Es gibt keinen visuellen Hinweis (kein Gradient-Fade am Ende, keine Scroll-Indicator). Mia, die mobil nutzt, könnte denken die Liste ist vollständig, obwohl sie scrollbar ist.

Tatsächlich: 6 × 40px = 240px ist kleiner als `max-h-[300px]` – bei den aktuellen Mock-Daten tritt das Scroll-Problem nicht ein. Aber die UX-Spec sagt "Asset-Liste scrollbar" für Mobile – das impliziert, dass Scroll bewusst möglich sein soll. Der `max-h-[300px]`-Wert auf Mobile ist zu großzügig und hat keinen Effekt, macht aber den Code trügerisch: ein zukünftiger Entwickler könnte denken "scrollbar = gut" ohne zu merken, dass der Scroll nie auslöst.

**Problem 2 – Kein Leer-Zustand:**
`AssetList` zeigt bei `visible.length === 0` schlicht nichts. Die UX-Spec definiert den Edge Case "0%-Assets werden nicht angezeigt" (für den Donut, aber die Asset-Liste filtert ebenso). Wenn alle Assets 0% hätten (Edge Case: alle Assets im Minus + manuelle Filterlogik), wäre die rechte Hälfte des Dashboards leer. Das ist kein wahrscheinliches Szenario mit aktuellen Mock-Daten, aber für Robustheit und Showcase-Glaubwürdigkeit relevant.

## Erwartetes Verhalten (aus UX-Spec)

Edge Case Tabelle: "Alle Assets im Minus → Gesamtwert rot, G/V-Wert negativ, kein visueller Bruch". Die Übersicht soll in allen Zuständen strukturell stabil wirken.

## Tatsächliches Verhalten

Kein Leer-Zustand in `AssetList.tsx`. Kein visuelles Scroll-Signal bei `overflow-y-auto`.

## Fix-Vorschlag

1. Leer-Zustand in `AssetList.tsx` hinzufügen:
```tsx
if (visible.length === 0) {
  return (
    <div className="flex-1 flex items-center justify-center py-4">
      <p className="text-sm text-slate-500">Keine Assets verfügbar</p>
    </div>
  )
}
```

2. Den `max-h`-Wert auf Mobile anpassen, sodass er tatsächlich einen Scroll-Effekt erzeugt wenn mehr Assets hinzukommen – oder auf `sm:max-h-none` ein klares Fade-Signal setzen:
```tsx
// Fade-Gradient am Ende der Liste als Scroll-Affordance:
<div className="relative flex-1 min-w-0">
  <div className="overflow-y-auto max-h-[200px] sm:max-h-none">
    {/* rows */}
  </div>
  {/* optional: fade-out Gradient unten */}
</div>
```
