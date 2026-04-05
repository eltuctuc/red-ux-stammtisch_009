---
id: BUG-FEAT1-UX-003
feature: FEAT-1
severity: Medium
status: Fixed
---

# BUG-FEAT1-UX-003: Donut-Chart zu klein – innerRadius/outerRadius ergibt effektiven Ring unter Spec-Werten

**Severity:** Medium
**Bereich:** Layout
**Gefunden von:** UX Reviewer

## Beschreibung

Die UX-Spec und das technische Design definieren für den Desktop-Donut konkrete Werte: `innerRadius={60}` / `outerRadius={90}` → 180px Außendurchmesser. Die Implementierung verwendet prozentuale Werte: `innerRadius="52%"` / `outerRadius="75%"`.

Bei einem Container von 180px (Desktop) entspricht das:
- `outerRadius` = 75% von 90px (halbe Höhe) = 67.5px Außenradius → 135px Außendurchmesser (statt 180px)
- `innerRadius` = 52% von 90px = 46.8px

Das bedeutet: Der tatsächlich gerenderte Donut ist ~25% kleiner als spezifiziert. Der visuelle Eindruck des Donut-Dominanzeffekts (BTC >50% auf einen Blick) ist geschwächt. Recharts `ResponsiveContainer` mit 100% Breite/Höhe füllt den 180px Container, aber `cx="50%"` + `cy="50%"` setzt den Mittelpunkt bei 90px – die prozentualen Radius-Werte beziehen sich dann auf diesen Halbraum.

## Erwartetes Verhalten (aus UX-Spec)

Laut technischem Design: `innerRadius={60}` / `outerRadius={90}` für Desktop (180px Container), `innerRadius={45}` / `outerRadius={60}` für Mobile (120px Container). Der Donut sollte den Container annähernd ausfüllen – nicht ~75% davon.

## Tatsächliches Verhalten

Prozentwerte `innerRadius="52%"` / `outerRadius="75%"` erzeugen einen Donut, der optisch kleiner wirkt als der Container nahelegt. Der Showcase-Betrachter sieht einen schwebenden Ring in einem zu großen Whitespace-Quadrat, was nicht produktionsreif wirkt.

## Fix-Vorschlag

Absolute Pixel-Werte laut Spec verwenden. Da die Komponente keine Responsive-Logik für die Radius-Größen hat, entweder zwei separate Renderpfade (Mobile / Desktop) einführen oder zumindest den Desktop-Wert korrekt setzen:

```tsx
// Korrekt nach Spec:
<Pie
  innerRadius={60}
  outerRadius={90}
  ...
>
```

Alternativ die Container-Klassen anpassen: Wenn Prozent-Werte beibehalten werden, müssen sie so kalibriert werden dass `outerRadius` nahezu die Containergröße ausfüllt (z.B. `outerRadius="90%"` wäre 81px von 90px = 162px Durchmesser – deutlich näher an 180px).
