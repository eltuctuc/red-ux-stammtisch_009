---
feature: FEAT-4
severity: Medium
status: Fixed
---

# BUG-FEAT4-QA-002: `formatQuantity` schneidet Spec-Beispielwert 0.00034 auf 0.0003 ab

**Severity:** Medium
**Bereich:** Functional / Edge Case
**Status:** Open

## Beschreibung

Die Spec definiert explizit den Edge Case: "Sehr kleine Menge (z.B. 0.00034 BTC) → Korrekt formatiert, kein Runden auf 0".

`formatQuantity` in `utils/format.ts` behandelt Werte im Bereich `[0.0001, 1)` mit `toFixed(4)`:

```typescript
} else if (value >= 0.0001) {
  formatted = value.toFixed(4).replace(/\.?0+$/, '')
}
```

`(0.00034).toFixed(4)` ergibt `'0.0003'` – die letzte signifikante Stelle `4` wird abgeschnitten. Der Wert wird nicht auf 0 gerundet (das primäre Spec-Requirement), aber er ist auch nicht korrekt formatiert: `0.00034 BTC` wird als `0.0003 BTC` angezeigt, was einem Fehler von ~15% entspricht.

Die Spec formuliert "korrekt formatiert" als positives Requirement – das schließt korrekte Präzision ein, nicht nur "ungleich null".

**Betroffener Wertebereich:** Alle Mengen im Bereich `[0.0001, 0.001)` mit mehr als 4 relevanten Dezimalstellen, z.B. `0.00034`, `0.00056`, `0.00078`.

Werte kleiner als `0.0001` landen korrekt im `toFixed(8)`-Branch und behalten ihre Präzision.

## Schritte zur Reproduktion

1. `formatQuantity(0.00034, 'BTC')` aufrufen (oder als Mock-Transaktion mit diesem Wert)
2. Erwarteter Output: `'0.00034 BTC'`
3. Tatsächlicher Output: `'0.0003 BTC'`

```javascript
formatQuantity(0.00034, 'BTC')  // → '0.0003 BTC'  (WRONG)
formatQuantity(0.000034, 'BTC') // → '0.000034 BTC' (CORRECT - fällt in toFixed(8)-Branch)
```

## Erwartetes Verhalten

`formatQuantity(0.00034, 'BTC')` → `'0.00034 BTC'` (alle signifikanten Stellen erhalten)

## Tatsächliches Verhalten

`formatQuantity(0.00034, 'BTC')` → `'0.0003 BTC'` (letzte signifikante Stelle abgeschnitten)

## Fix-Vorschlag

Den Branch `>= 0.0001` auf 5 Dezimalstellen erweitern, oder die Logik so anpassen, dass signifikante Stellen erhalten bleiben:

```typescript
} else if (value >= 0.0001) {
  formatted = value.toFixed(5).replace(/\.?0+$/, '')  // 5 statt 4
}
```

Damit: `(0.00034).toFixed(5)` = `'0.00034'` → nach trim `'0.00034'` ✓

Alternativ: dynamisch die Anzahl signifikanter Stellen ermitteln statt fixer Dezimalstellen.
