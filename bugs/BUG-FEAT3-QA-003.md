---
feature: FEAT-3
severity: Low
status: Open
---

# BUG-FEAT3-QA-003: AssetIcon zeigt kurzzeitig broken-image-Symbol vor Fallback-Render

**Severity:** Low
**Bereich:** Functional
**Status:** Open

## Beschreibung

`AssetIcon` in `projekt/src/components/shared/AssetIcon.tsx` versucht beim ersten Render, eine PNG-Datei unter `/coins/{symbol}.png` zu laden. Da das Verzeichnis `public/coins/` nicht existiert (dokumentierter Tech-Debt), schlägt der Lade-Request für alle 6 Assets fehl.

Der Ablauf:
1. Komponente rendert `<img src="/coins/link.png" ...>` 
2. Browser-Request schlägt fehl (404)
3. Browser zeigt das native broken-image-Symbol
4. `onError` feuert → `setImgError(true)` → Fallback-Circle wird gerendert

Das Resultat ist ein sichtbares Flackern bei allen 6 Watchlist-Icons beim ersten Laden der Seite: Für eine kurze Zeit (je nach Netzwerk/Cache-Verhalten, teils wenige Frames) zeigt jedes Icon ein gebrochenes Bild-Symbol statt des farbigen Fallback-Circles. In der Produktion (mit aktivem HTTP-Caching) ist der Effekt nach dem ersten Besuch nicht mehr sichtbar – beim ersten Seitenaufruf oder nach Cache-Invalidierung ist er jedoch reproduzierbar.

Für einen Showcase, der Erstbesucher bewerten, ist dieser Zustand direkt relevant.

## Schritte zur Reproduktion

1. Browser-Cache leeren (Hard Reload / Inkognito)
2. App laden und Watchlist-Bereich beobachten
3. Bei langsamerer Verbindung (Network-Throttling in DevTools auf "Slow 3G") ist der Effekt dauerhafter sichtbar

## Erwartetes Verhalten

Die 6 Watchlist-Icons rendern sofort als farbige Fallback-Circles, kein broken-image-Symbol sichtbar.

## Tatsächliches Verhalten

Beim ersten Laden zeigen alle 6 Icons kurzzeitig das native broken-image-Symbol des Browsers, bevor der `onError`-Handler den Fallback-Circle aktiviert.

## Fix-Vorschlag

**Option A (minimal, sofort):** `imgError`-State mit `true` initialisieren, wenn bekannt ist, dass keine PNGs existieren – entfernt den unnötigen Load-Versuch komplett:

```tsx
const [imgError, setImgError] = useState(true) // keine PNGs vorhanden
```

**Option B (sauber):** Initialen State weiterhin `false` lassen, aber das `<img>`-Element mit `style={{ display: 'none' }}` rendern bis `onLoad` erfolgreich feuert. Erst dann sichtbar schalten – kein Flackern bei Fehler.

**Option C (nachhaltig):** PNGs unter `projekt/public/coins/` ablegen (link.png, dot.png, matic.png, avax.png, atom.png, ltc.png) – löst das Problem vollständig und liefert Showcase-Qualität.

Option A ist der schnellste Fix ohne neue Assets. Option C ist die Zielversion.
