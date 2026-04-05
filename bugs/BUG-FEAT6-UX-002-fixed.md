# BUG-FEAT6-UX-002: aria-label auf Row-Ebene verschluckt Preis- und Kursänderungs-Information für Screenreader

**Severity:** Medium
**Bereich:** A11y
**Feature:** FEAT-6
**Gefunden:** 2026-04-05

## Beschreibung

`WatchlistRow` setzt auf dem `role="listitem"` div ein `aria-label`, das den gesamten accessible name des Elements überschreibt:

```
aria-label={isInPortfolio ? `${asset.name} – im Portfolio` : asset.name}
```

Ein Screenreader liest damit nur "Ethereum – im Portfolio" – und ignoriert den gesamten Inhalt der Row (Preis `$2,800.00`, Kursänderung `+1.42%`). Die eigentlichen Kerninformationen der Watchlist-Row sind für Screenreader-Nutzer nicht mehr zugänglich.

Das ist eine bekannte aria-label-Falle: Sobald ein `aria-label` auf einem Container-Element sitzt, werden alle Kind-Elemente vom accessibility tree als accessible name dieses Containers zusammengefasst – und durch das explizite `aria-label` überschrieben.

Erschwerend: Im Default-Zustand (kein Portfolio-Overlap) gibt es `aria-label={asset.name}` = nur "Chainlink", "Polkadot" etc. – ohne Preis und Kursänderung. Das war schon vor FEAT-6 ein A11y-Problem, aber FEAT-6 hat es explizit gemacht.

## Reproduktion / Szenario

1. Screenreader aktivieren (z.B. macOS VoiceOver, Tastenkürzel Cmd+F5)
2. Dashboard öffnen
3. Watchlist-Section mit Tab oder VoiceOver-Navigation ansteuern
4. Expected: Screenreader liest "Ethereum, $2.800, plus 1,42 Prozent, im Portfolio"
5. Actual: Screenreader liest nur "Ethereum – im Portfolio" und überspringt Preis und Kursänderung vollständig

## Erwartetes Verhalten

Alle inhaltlich relevanten Daten der Row (Name, Preis, Kursänderung, Portfolio-Status) sind für Screenreader zugänglich. Das `aria-label` auf der Row sollte entweder entfernt werden (und der Portfolio-Status über `aria-describedby` oder einen `sr-only` span kommuniziert werden) – oder alle relevanten Werte in das `aria-label` einbeziehen.

## Tatsächliches Verhalten

Das `aria-label` enthält nur Name (+ optionaler Portfolio-Hinweis). Preis und Kursänderung sind für Screenreader unsichtbar.

## Impact

WCAG 2.1 Criterion 1.3.1 (Info and Relationships) und 4.1.2 (Name, Role, Value) verletzt. Nutzer die auf einen Screenreader angewiesen sind, können die Watchlist-Preise nicht ablesen.

**Fix-Optionen (aufsteigend nach Komplexität):**

Option A (minimal): `aria-label` von der Row entfernen. Der Screenreader liest dann den natürlichen Textinhalt der Kind-Elemente. Den Portfolio-Status als `sr-only` span nach dem Coin-Namen einbauen:
```tsx
<span className="sr-only">{isInPortfolio ? ', im Portfolio' : ''}</span>
```

Option B (vollständig): Vollständiges `aria-label` mit allen Werten:
```tsx
aria-label={`${asset.name}, $${asset.priceUSD}, ${asset.change24hPercent > 0 ? '+' : ''}${asset.change24hPercent}%${isInPortfolio ? ', im Portfolio' : ''}`}
```

Option A ist vorzuziehen – weniger Maintenance-Aufwand, natürlicher Lesefluss.

**Status:** Fixed – `aria-label` vom Root-`div` entfernt. Portfolio-Status als `<span className="sr-only">, im Portfolio</span>` nach dem Symbol eingefügt (nur wenn `isInPortfolio === true`). Screenreader liest jetzt den natürlichen Inhalt: Name, Preis, Kursänderung, Portfolio-Status.
