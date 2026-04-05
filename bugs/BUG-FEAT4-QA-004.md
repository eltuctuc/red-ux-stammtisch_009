---
feature: FEAT-4
severity: Low
status: Open
---

# BUG-FEAT4-QA-004: `formatDate` – tx-1 zeigt "Heute" statt "vor 1 Tag" für den größten Teil des 2026-04-05

**Severity:** Low
**Bereich:** Functional / Datum-Formatierung
**Status:** Open

## Beschreibung

Der Dev-Handoff dokumentiert: `tx-1 (2026-04-04) → "vor 1 Tag"`. Das ist nur für einen Teil des Tages korrekt.

`formatDate` berechnet die Differenz mit `Math.floor(diffMs / 86400000)`:

- `tx-1` Datum: `2026-04-04T10:30:00`
- Wenn `now = 2026-04-05T09:00:00`: `diffMs = 22h 30min` → `diffDays = 0` → `"Heute"`
- Wenn `now = 2026-04-05T11:00:00`: `diffMs = 24h 30min` → `diffDays = 1` → `"vor 1 Tag"`

Für den Zeitraum **2026-04-05T00:00 bis 10:29** zeigt `tx-1` also `"Heute"`, nicht `"vor 1 Tag"`.

Das ist streng genommen korrektes Verhalten (der Tag liegt weniger als 24h zurück), aber die Sprachausgabe "Heute" für eine gestrige Transaktion kann für den Nutzer verwirrend wirken – es stimmt nicht mit dem Kalender-Tag überein (gestern).

Dieselbe Ambiguität gilt für `tx-2` (`2026-04-01T14:15:00`): Der Handoff sagt "vor 4 Tagen", aber je nach Uhrzeit des Aufrufs ist es `vor 3 Tagen` (vor 14:15 Uhr) oder `vor 4 Tagen` (nach 14:15 Uhr).

Kein Issue in den Mock-Daten selbst – das ist ein inherentes Problem der stunden-basierten `Math.floor`-Logik ohne Kalender-Tag-Normalisierung.

## Schritte zur Reproduktion

1. App am 2026-04-05 vor 10:30 Uhr aufrufen
2. `tx-1` in der Transaktionsliste betrachten
3. Erwartet (laut Handoff): "vor 1 Tag"
4. Tatsächlich: "Heute"

## Erwartetes Verhalten

Eine Transaktion vom 2026-04-04 sollte am 2026-04-05 als "vor 1 Tag" oder "gestern" angezeigt werden, nicht als "Heute".

## Tatsächliches Verhalten

Am Morgen des 2026-04-05 (vor 10:30 Uhr) zeigt `tx-1` "Heute", da `diffMs < 24h`.

## Fix-Vorschlag

Kalender-Tag-basierte Differenz statt Stunden:

```typescript
export function formatDate(isoString: string): string {
  const date = new Date(isoString)
  const now = new Date()
  
  // Kalender-Tag-Differenz (ignoriert Uhrzeit)
  const dateDay = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const nowDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const diffDays = Math.round((nowDay.getTime() - dateDay.getTime()) / 86400000)

  if (diffDays === 0) return 'Heute'
  if (diffDays === 1) return 'vor 1 Tag'
  if (diffDays <= 7) return `vor ${diffDays} Tagen`

  return new Intl.DateTimeFormat('de-DE', {
    day: 'numeric', month: 'short', year: 'numeric',
  }).format(date)
}
```

Mit dieser Logik: tx-1 (Kalender-Tag 2026-04-04) am Kalender-Tag 2026-04-05 → `diffDays=1` → `"vor 1 Tag"` – unabhängig von der Uhrzeit.
