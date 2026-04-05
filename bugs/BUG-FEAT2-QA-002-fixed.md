---
feature: FEAT-2
severity: Medium
status: Fixed
---

# BUG-FEAT2-QA-002: 1M-Daten – abrupter 5.3%-Einbruch durch kopierten 1W-Startwert bricht Aufwärtstrend

**Severity:** Medium
**Bereich:** Functional (Mock-Daten / AC-8)
**Status:** Open

## Beschreibung

Die 1M-Mock-Daten ab `chartData.ts` zeigen einen stetigen Aufwärtstrend von `72.450` (6. März) bis `82.890` (29. März), gefolgt von einem abrupten Einbruch auf `78.480` am 30. März (-5,3 %) – und danach wieder Anstieg auf `84.230`.

Ursache: Der Wert für den 30. März (`78.480`) wurde aus den 1W-Daten übernommen, wo er der Startwert der Wochenkurve ist. Im 1M-Kontext wirkt er als unerklärter Absturz.

AC-8 fordert: "Trend erkennbar (z.B. Aufwärtstrend)". Ein scharfer V-förmiger Einbruch am vorletzten Fünftel des Charts widerspricht diesem Kriterium.

Der Dev-Handoff erwähnt das bereits als bekannte Besonderheit ("1M-Daten enthalten March 30 zweimal – optisch unauffällig"), bewertet die Auswirkung aber falsch: Der Einbruch ist auf dem Chart klar sichtbar und schadet dem "professional wirkendem Showcase".

## Schritte zur Reproduktion

1. Dashboard laden, Zeitraum "1M" auswählen (ist Default)
2. Chart beobachten: stetiger Aufwärtstrend bis ca. 29. März, dann scharfer Absturz, dann Erholung

## Erwartetes Verhalten

1M-Chart zeigt einen erkennbaren Aufwärtstrend ohne abrupte Einbrüche (AC-8). Die letzten Tage (30. März – 5. April) sollten nahtlos auf dem Aufwärtsniveau der vorherigen Woche anschließen.

## Tatsächliches Verhalten

Einbruch von `82.890` auf `78.480` am 30. März (-5,3 %) ist im Chart deutlich sichtbar. Der Verlauf wirkt wie ein W, nicht wie ein Aufwärtstrend.

## Fix-Vorschlag

Den 30. März in den 1M-Daten mit einem realistischen Wert ersetzen, der den Aufwärtstrend fortsetzt – z.B. `83.150`. Die 1W-Daten bleiben unverändert; beide Datensätze müssen nicht identisch sein.

```ts
// chartData.ts – 1M, Zeile ~73
{ timestamp: '2026-03-30T12:00:00', price: 83150 },  // war: 78480
```
