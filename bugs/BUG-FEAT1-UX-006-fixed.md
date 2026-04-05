---
id: BUG-FEAT1-UX-006
feature: FEAT-1
severity: Medium
status: Fixed
---

# BUG-FEAT1-UX-006: G/V-Icon-Größe weicht von Spec ab – 20px implementiert statt 16px

**Severity:** Medium
**Bereich:** Typography
**Gefunden von:** UX Reviewer

## Beschreibung

Die UX-Spec definiert in der Typography-Tabelle: "Pfeil-Icon: 16px". Die Implementierung verwendet `w-5 h-5` für das `TrendingUp`/`TrendingDown`-Icon, was in Tailwind 20px entspricht.

Das ist eine direkte Abweichung von der Spec. Der Effekt ist subtil, aber messbar: Das Icon ist proportional größer als der G/V-Prozentwert (16px / text-base), was die visuelle Hierarchie leicht stört. Laut Spec soll das Icon "identisch" zur G/V-Farbe und Größe des Prozentwerts sein – der Prozentwert selbst ist `text-base` = 16px, das Icon soll ebenfalls 16px sein.

Zusätzlich: Das Icon ist `TrendingUp`/`TrendingDown` aus Lucide – das ist ein Linien-Chart-Icon, kein Pfeil. Die Spec erwähnt explizit "Pfeil-Icon ↑" und "Pfeil-Icon ↓" als Farbsignal für Gewinn/Verlust. Ein Trending-Icon suggeriert eine Zeitreihe, kein direktionales Signal. Für Mia, die schnell scannt, ist ein einfacher Aufwärts-/Abwärtspfeil klarer als ein Kurven-Icon.

## Erwartetes Verhalten (aus UX-Spec)

Pfeil-Icon 16px, identisch zur G/V-Farbe. Icon kommuniziert Richtung (auf/ab), nicht Trend.

## Tatsächliches Verhalten

`w-5 h-5` = 20px (statt 16px). Icon-Typ `TrendingUp`/`TrendingDown` zeigt einen gestrichelten Kurvenanstieg, nicht einen eindeutigen Richtungspfeil.

## Fix-Vorschlag

Zwei Änderungen in `PortfolioSection.tsx`:

1. Icon-Größe auf 16px reduzieren:
```tsx
// Aktuell:
<PnLIcon className="w-5 h-5 shrink-0" aria-hidden />

// Korrekt:
<PnLIcon className="w-4 h-4 shrink-0" aria-hidden />
```

2. Icon-Typ ändern – Lucide bietet `ArrowUp`/`ArrowDown` als klare Richtungsindikatoren:
```tsx
// Aktuell:
import { TrendingUp, TrendingDown } from 'lucide-react'
const PnLIcon = isGain ? TrendingUp : TrendingDown

// Klarer für Mia:
import { ArrowUp, ArrowDown } from 'lucide-react'
const PnLIcon = isGain ? ArrowUp : ArrowDown
```
