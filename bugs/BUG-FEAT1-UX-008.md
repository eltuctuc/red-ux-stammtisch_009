---
id: BUG-FEAT1-UX-008
feature: FEAT-1
severity: Low
status: Open
---

# BUG-FEAT1-UX-008: Donut-Segmente ohne paddingAngle – BTC-Dominanz visuell schwächer als nötig

**Severity:** Low
**Bereich:** Layout / Visuell
**Gefunden von:** UX Reviewer

## Beschreibung

Der Donut-Chart verwendet `paddingAngle={0}` – kein Abstand zwischen den Segmenten. Das ist eine Abweichung von gängiger Donut-Praxis, hat aber einen konkreten UX-Effekt: Ohne Segment-Trenner fließen die Farben direkt ineinander. BTC-Orange (#f97316) grenzt direkt an ETH-Violett (#8b5cf6) – zwei gesättigte Farben, die ohne Abstand optisch ineinander bluten können, besonders auf älteren Displays.

Die UX-Spec erwähnt zu paddingAngle nichts explizit. Aber das Showcase-Ziel verlangt, dass die Segment-Struktur klar erkennbar ist und der Donut "echt" wirkt. Professionelle Dashboards (Coinbase, CoinStats) nutzen typischerweise einen minimalen paddingAngle von 2px–4px, der die Segmente sauber trennt.

Zusätzlich: `strokeWidth={2}` mit `stroke="#0f172a"` (slate-950 = App-Hintergrundfarbe) erzeugt eine dünne Trennlinie – das ist ein Workaround für den fehlenden paddingAngle, aber weniger kontrolliert. Bei kleinen Segmenten (XRP mit 0.6%) kann der Stroke das Segment optisch fast verschwinden lassen.

## Erwartetes Verhalten (aus UX-Spec)

Keine explizite Vorgabe für paddingAngle, aber implizit aus dem Showcase-Anspruch: klare, professionelle Segment-Trennung wie in produktionsreifen Dashboards.

## Tatsächliches Verhalten

`paddingAngle={0}` mit `strokeWidth={2}` als Ersatz. Segmente grenzen direkt aneinander, was bei benachbarten gesättigten Farben (BTC/ETH) visuell unruhig wirken kann.

## Fix-Vorschlag

`paddingAngle` auf einen kleinen Wert setzen und `strokeWidth` anpassen:

```tsx
// Aktuell:
paddingAngle={0}
strokeWidth={2}
stroke="#0f172a"

// Klarer und professioneller:
paddingAngle={2}
strokeWidth={0}
```

`paddingAngle={2}` erzeugt saubere Segment-Trenner, `strokeWidth={0}` entfernt den undefinierten Stroke. Für sehr kleine Segmente wie XRP (0.6%) kann ein minPaddingAngle überlegt werden.
