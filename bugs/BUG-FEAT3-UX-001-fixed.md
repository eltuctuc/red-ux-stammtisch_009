---
feature: FEAT-3
severity: Medium
status: Fixed
---

# BUG-FEAT3-UX-001: PriceChangeBadge aria-label ist im Neutral-Zustand fehlerhaft

**Severity:** Medium
**Bereich:** A11y
**Status:** Open

## Beschreibung

Wenn der 24h-Prozentwert exakt `0` ist (neutraler Zustand), generiert die `PriceChangeBadge`-Komponente ein semantisch kaputtes `aria-label`. Der Präfix-Teil ergibt einen leeren String, sodass Screen Reader "0.00 Prozent" ohne jede Richtungsangabe vorlesen – mit einem führenden Leerzeichen als Artefakt. Das ist keine korrekte Kommunikation des neutralen Zustands.

## Schritte zur Reproduktion

1. `PriceChangeBadge` mit `value={0}` rendern
2. aria-label im DOM inspizieren
3. Screen Reader (z.B. VoiceOver) aktivieren und die Komponente fokussieren

## Erwartetes Verhalten (aus Spec)

Aus der Architektur-Spec (FEAT-3.md, Abschnitt 3 – A11y-Architektur):
> PriceChangeBadge: Wert screen-reader-lesbar: `"plus 4,21 Prozent"`

Für den Neutral-Zustand fehlt die explizite Spec-Vorgabe – aber das Pattern ist eindeutig: das Label muss vollständig und ohne Artefakte lesbar sein. Erwartetes Ergebnis: `"Unverändert 0.00 Prozent"` oder `"0.00 Prozent unverändert"`.

## Tatsächliches Verhalten (im Code)

In `/projekt/src/components/shared/PriceChangeBadge.tsx`, Zeile 31:

```tsx
aria-label={`${isPositive ? 'Plus' : isNegative ? 'Minus' : ''} ${Math.abs(value).toFixed(2)} Prozent`}
```

Bei `value === 0` ergibt der ternäre Ausdruck einen leeren String `''`. Das resultierende aria-label ist `" 0.00 Prozent"` – mit einem führenden Leerzeichen. Screen Reader lesen den leeren Präfix entweder als Pause oder ignorieren ihn – in beiden Fällen fehlt die semantische Aussage, dass der Wert neutral/unverändert ist.

## Fix-Vorschlag

```tsx
// Vorher
aria-label={`${isPositive ? 'Plus' : isNegative ? 'Minus' : ''} ${Math.abs(value).toFixed(2)} Prozent`}

// Nachher
aria-label={`${isPositive ? 'Plus' : isNegative ? 'Minus' : 'Unverändert'} ${Math.abs(value).toFixed(2)} Prozent`}
```

Damit liest VoiceOver bei `value === 0` korrekt: "Unverändert 0.00 Prozent".
