---
id: BUG-FEAT1-UX-001
feature: FEAT-1
severity: High
status: Fixed
---

# BUG-FEAT1-UX-001: Desktop-Breakpoint zu früh – Zwei-Spalten-Layout greift ab 1024px statt 1280px

**Severity:** High
**Bereich:** Layout
**Gefunden von:** UX Reviewer

## Beschreibung

Die UX-Spec definiert das Zwei-Spalten-Hero-Layout explizit für "Desktop (≥1280px)". Die Implementierung verwendet `lg:grid-cols-2`, was in Tailwind dem Breakpoint `1024px` entspricht. Das bedeutet: zwischen 1024px und 1279px zeigt das Dashboard das Desktop-Layout, obwohl in diesem Bereich der Raum für die rechte Spalte (Donut + Asset-Liste) deutlich zu knapp ist.

Konkret: Bei 1024px–1100px ist die Asset-Liste so schmal, dass Zahlen wie "$71,570.00" und der Name "Bitcoin" potenziell eng werden – der Donut mit 180px (greift ab `sm:` = 640px) nimmt dabei bereits einen relevanten Anteil der rechten Spalte ein.

## Erwartetes Verhalten (aus UX-Spec)

Desktop-Layout (Zwei-Spalten) ab ≥1280px. Unterhalb: gestapeltes Single-Column-Layout.

## Tatsächliches Verhalten

`lg:grid-cols-2` in PortfolioSection.tsx aktiviert das Zwei-Spalten-Layout bereits bei ≥1024px. Die Spec-Anforderung von 1280px wird verfehlt.

Der fehlende Breakpoint `xl:` (1280px in Tailwind) wäre korrekt:
```tsx
// Aktuell (falsch für Spec):
className="grid grid-cols-1 lg:grid-cols-2 ..."

// Korrekt nach Spec:
className="grid grid-cols-1 xl:grid-cols-2 ..."
```

## Fix-Vorschlag

In `PortfolioSection.tsx`, Zeile 18: `lg:grid-cols-2` durch `xl:grid-cols-2` ersetzen. Damit entspricht der Breakpoint dem Spec-Wert von 1280px. Gleichzeitig prüfen ob der `items-center`-Wert für das gestapelte Layout (375px–1279px) noch passt – bei gestapeltem Layout sollte `items-start` oder kein `items-center` verwendet werden, damit der Donut nicht optisch mittig schwebt.
