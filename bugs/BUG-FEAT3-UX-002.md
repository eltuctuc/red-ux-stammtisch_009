---
feature: FEAT-3
severity: Low
status: Open
---

# BUG-FEAT3-UX-002: PriceChangeBadge fehlt `showIcon` prop – API-Abweichung von Architektur-Spec

**Severity:** Low
**Bereich:** Konsistenz
**Status:** Open

## Beschreibung

Die Architektur-Spec definiert `showIcon?: boolean` als expliziten prop der `PriceChangeBadge`-Komponente. Die Implementierung lässt diesen prop weg. Da die Komponente als geteilte Komponente für FEAT-1, FEAT-2 und FEAT-3 konzipiert ist, fehlt die Flexibilität, in bestimmten Kontexten das Icon zu unterdrücken – ein Anwendungsfall, der in der Spec explizit antizipiert wird.

Aktuell werden Icons in allen Kontexten immer angezeigt. Das ist für FEAT-3 (Watchlist) funktional in Ordnung – der Bug liegt im fehlenden API-Vertrag, der andere Features einschränkt.

## Schritte zur Reproduktion

1. `PriceChangeBadge` mit `showIcon={false}` verwenden wollen (z.B. in FEAT-2 ChartHeader)
2. TypeScript-Compiler zeigt keinen Fehler aber den prop ignoriert
3. Das Icon wird trotzdem gerendert – kein Opt-out möglich

## Erwartetes Verhalten (aus Spec)

Aus der Architektur-Spec (FEAT-3.md, Abschnitt 3 – Shared PriceChangeBadge):
```
Props:
  value: number
  showIcon?: boolean   // default true (↑/↓ Icon)
  size?: 'sm' | 'md'
```

Der prop `showIcon` soll optional sein (default `true`) und das Trending-Icon bei Bedarf ausblenden.

## Tatsächliches Verhalten (im Code)

In `/projekt/src/components/shared/PriceChangeBadge.tsx`, Zeile 5–9:

```tsx
interface PriceChangeBadgeProps {
  value: number
  size?: 'sm' | 'md'
  className?: string
}
```

`showIcon` fehlt im Interface und in der Render-Logik vollständig. Das Icon wird bedingungslos gerendert, wenn `isPositive` oder `isNegative` zutrifft.

## Fix-Vorschlag

```tsx
interface PriceChangeBadgeProps {
  value: number
  showIcon?: boolean   // neu: default true
  size?: 'sm' | 'md'
  className?: string
}

export function PriceChangeBadge({ value, showIcon = true, size = 'sm', className }: PriceChangeBadgeProps) {
  const isPositive = value > 0
  const isNegative = value < 0

  return (
    <span ...>
      {showIcon && isPositive && <TrendingUp className="w-3 h-3" aria-hidden />}
      {showIcon && isNegative && <TrendingDown className="w-3 h-3" aria-hidden />}
      {formatPercent(value)}
    </span>
  )
}
```

Kein Breaking Change – `showIcon` ist optional mit `default true`, bestehende Aufrufe bleiben unverändert.
