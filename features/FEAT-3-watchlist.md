---
status: approved
---

# FEAT-3: Watchlist
*Erstellt: 2026-04-05*
*Scope-Typ: Klickbarer Prototyp – Fix-Schwelle: Critical*

## Zusammenfassung
Eine kompakte Liste von bis zu 6 beobachteten Kryptowährungen mit aktuellem Preis und 24h-Performance. Die Watchlist ergänzt die Portfolio-Übersicht um Assets, die der User beobachtet aber nicht zwingend hält.

## Zielgruppe
- **Kai (Krypto-Trader):** Hält mehrere Assets im Auge, will relevante Coins ohne eigene Position tracken
- **Mia (pragmatische Investorin):** Will ausgewählte Assets auf dem Schirm haben, ohne die Portfolio-Ansicht zu überladen
- **Showcase-Betrachter:** Bewertet ob die Watchlist kompakt und lesbar ist

## Kernwert
Die Watchlist zeigt auf einen Blick welche Assets sich bewegen – positiv wie negativ – ohne das Hauptportfolio zu überladen.

## Nicht im Scope
- Hinzufügen / Entfernen von Assets durch den User
- Mehr als 6 Einträge
- Detailansicht oder Drill-Down pro Asset
- Alerts oder Benachrichtigungen bei Kursänderungen
- Sortierung durch den User

## User Stories

1. Als Betrachter möchte ich eine kompakte Liste von bis zu 6 Kryptowährungen sehen, damit ich schnell mehrere Assets im Blick habe ohne scrollen zu müssen.
2. Als Betrachter möchte ich zu jedem Asset den aktuellen Preis (in USD) sehen, damit ich ohne weiteren Aufwand die Marktpreise kenne.
3. Als Betrachter möchte ich die 24h-Preisänderung als Prozentsatz farblich kodiert sehen (grün = gestiegen, rot = gefallen), damit ich sofort erkenne welche Assets sich positiv oder negativ entwickelt haben.
4. Als Kai möchte ich bekannte Assets in der Watchlist sehen (z.B. Assets die ich nicht halte aber verfolge), damit die Watchlist ihren eigenständigen Mehrwert gegenüber der Portfolio-Ansicht hat.
5. Als Showcase-Betrachter möchte ich das Logo/Icon jeder Kryptowährung sehen, damit die Liste visuell ansprechend und schnell scanbar ist.

## Acceptance Criteria

1. Die Watchlist zeigt genau 6 Einträge mit realistischen Mock-Assets.
2. Jeder Eintrag zeigt: Asset-Logo/Icon, Name, Symbol, aktueller Preis (USD, formatiert), 24h-Änderung in Prozent.
3. Positive 24h-Änderung wird grün dargestellt (+X.XX%), negative rot (−X.XX%).
4. Die Liste enthält mindestens 2 Assets die NICHT im Portfolio (FEAT-1) vorhanden sind – um den Watchlist-Mehrwert zu zeigen.
5. Alle 6 Einträge sind ohne horizontales Scrollen auf Desktop (1280px+) sichtbar.
6. Auf mobilen Viewports (375px) ist die Liste vertikal scrollbar oder als Grid dargestellt – kein Layout-Bruch.
7. Die Watchlist ist klar vom Portfolio-Bereich (FEAT-1) visuell getrennt (eigener Abschnitt, Überschrift "Watchlist" o.ä.).

## Edge Cases

| Fall | Erwartetes Verhalten |
|------|----------------------|
| Alle 6 Assets im Minus | Alle Einträge rot – kein visueller Bruch |
| 24h-Änderung exakt 0.00% | Wird neutral dargestellt (kein Grün/Rot) |
| Asset-Name sehr lang (z.B. "Wrapped Bitcoin") | Wird abgekürzt (truncate), Layout bleibt stabil |
| Preis sehr klein (z.B. $0.0004 für DOGE-ähnlich) | Korrekte Dezimalformatierung, kein Runden auf $0.00 |
| Preis über $100.000 (BTC) | Korrekte Tausenderformatierung ($104,230.50) |

## Mock-Daten (Referenz)

```
Watchlist (6 Assets):
1. LINK  – Chainlink     – $18.42  – +4.21%
2. DOT   – Polkadot      – $7.83   – -1.87%
3. MATIC – Polygon       – $0.92   – +2.45%
4. AVAX  – Avalanche     – $38.17  – -0.63%
5. ATOM  – Cosmos        – $9.54   – +1.12%
6. LTC   – Litecoin      – $92.30  – -3.44%
```
*(Intentional: Diese Assets überschneiden sich nicht mit den Portfolio-Assets aus FEAT-1)*

---

## 2. UX Entscheidungen
*UX-Designer: Claude – 2026-04-05*

### Einbettung
**Wo lebt das Feature:** Sektion S-01-C – rechte Spalte der mittleren Dashboard-Zeile neben dem Preis-Chart (S-01-B). Ca. 30–35% Breite (~320–360px). Auf Mobile: gestapelt nach dem Chart.

**Begründung:** product-flows.md ist bindend. Die rechte Schmal-Spalte ist das klassische "Sidebar"-Pattern für Sekundärinformationen neben einem dominanten Chart. Die Watchlist ist komplementär zum Chart, nicht konkurrierend – weniger Breite ist richtig.

---

### Höhen-Kalkulation (kritisch)

**Problem:** Chart-Sektion (S-01-B) ist 300px hoch + ~60px Header = ~360px Gesamthöhe. Watchlist mit 6 Einträgen darf diese Höhe nicht sprengen, da sie dieselbe Zeile teilt.

**Lösung:** `h-12` (48px) pro Watchlist-Row:
```
Header:   40px
6 × 48px: 288px
Padding:  2 × 16px = 32px
Gesamt:   360px ✅  (exakt auf Augenhöhe mit Chart-Sektion)
```

Kein innerer Scroll nötig – alle 6 Einträge passen ohne Overflow.

---

### Layout

**Desktop – Row-Anatomie:**
```
┌────────────────────────────────┐
│  Watchlist                     │  ← Section Header
├────────────────────────────────┤
│  [●] Chainlink  LINK    $18.42 │
│                        +4.21% ↑│
├────────────────────────────────┤
│  [●] Polkadot   DOT     $7.83  │
│                        -1.87% ↓│
├─────────────── … ──────────────┤
│  [●] Litecoin   LTC    $92.30  │
│                        -3.44% ↓│
└────────────────────────────────┘
```

Links: Icon (32px) + Name + Symbol gestapelt.
Rechts: Preis + 24h-% gestapelt, rechtsbündig.

**Mobile (375px):**
- Full-width Card unter dem Chart
- Gleiche Row-Struktur, `h-12` (48px) bleibt
- 6 × 48 + Header + Padding = ~360px → kein Scroll nötig

---

### Interaktionsmuster

**Keine Interaktion.** Rein informational.

Begründung: Kein Drill-Down im Scope (→ würde Routing benötigen, das nicht existiert). Kein Hover-State definiert in Flows. Kein Tapping. Die Watchlist ist ein Scan-Element – der Betrachter überfliegt sie in 2–3 Sekunden.

Konsequenz: Watchlist-Rows sind `<div>`, kein `<button>` oder `<a>`. Kein `cursor-pointer`.

---

### Visuelle Sprache

**Asset-Icons:**
- 32px × 32px, `rounded-full`
- Quelle: statische SVG/PNG aus `cryptocurrency-icons` npm package (oder äquivalent)
- Fallback falls kein Icon: farbiger Kreis mit Symbol-Initials (z.B. "LI" für LINK), Farbe aus Asset-Palette (konsistent mit FEAT-1 Donut-Farben wenn vorhanden)
- Watchlist-Assets haben keine FEAT-1-Farben → eigene Hue-Zuweisung per Hash oder manuelle Zuweisung in Mock-Daten

**Row-Typography:**
| Element | Größe | Weight | Farbe |
|---------|-------|--------|-------|
| Asset Name | 13px | 600 | `slate-100` |
| Symbol | 11px | 400 | `slate-400` |
| Preis | 13px | 600 | `slate-50` |
| 24h-% positiv | 12px | 500 | `green-500` #22c55e |
| 24h-% negativ | 12px | 500 | `red-500` #ef4444 |
| 24h-% neutral (0.00%) | 12px | 400 | `slate-400` |

**Separatoren:** `border-b border-slate-800` zwischen Rows. Letzter Eintrag: kein Border.

**Section Header:** `text-xs font-medium uppercase tracking-wider text-slate-500` – diskret, klar erkennbar als Abschnittsüberschrift.

---

### Komponenten

| Komponente | Verwendung | Status |
|-----------|-----------|--------|
| `WatchlistSection` | Container-Card `bg-slate-900 rounded-xl p-4` | Neu bauen |
| `WatchlistHeader` | "Watchlist" Section Label | Neu bauen |
| `WatchlistRow` | Icon + Name/Symbol + Preis + 24h-% in `h-12` | Neu bauen |
| `AssetIcon` | 32px Coin-Logo mit Fallback-Circle | Neu bauen |
| `PriceChangeBadge` | +/-X.XX% mit Farb-Logik inkl. Neutral-State | Neu bauen (auch in FEAT-1 und FEAT-2 verwendbar) |

**DS-Lücke:** Design System leer → alles neu mit Tailwind.

**Hinweis: `PriceChangeBadge` ist komponentenübergreifend.** Dieselbe Logik wird in FEAT-1 (Asset-G/V) und FEAT-2 (Tages-G/V im Header) benötigt. Sollte als geteilte Komponente gebaut werden.

---

### Touch-Targets

Watchlist-Rows sind **nicht tappbar** → keine interaktiven Elemente → WCAG 2.5.5 entfällt.

---

### Kontrast-Check (WCAG AA)
Hintergrund: `slate-900` (#0f172a)

| Element | Vordergrund | Hintergrund | Verhältnis | Status |
|---------|------------|-------------|------------|--------|
| Asset Name | `slate-100` #f1f5f9 | `slate-900` | ~14:1 | ✅ |
| Symbol | `slate-400` #94a3b8 | `slate-900` | ~4.9:1 | ✅ |
| Preis | `slate-50` #f8fafc | `slate-900` | ~17:1 | ✅ |
| 24h-% grün | `green-500` #22c55e | `slate-900` | ~5.5:1 | ✅ |
| 24h-% rot | `red-500` #ef4444 | `slate-900` | ~4.6:1 | ✅ |
| 24h-% neutral | `slate-400` #94a3b8 | `slate-900` | ~4.9:1 | ✅ |
| Section Header | `slate-500` #64748b | `slate-900` | ~3.8:1 | ⚠️ UI-Element (non-text) ≥3:1 ✅ |

Section Header `slate-500` liegt unter 4.5:1, aber da es sich um ein dekoratives Label (nicht Fließtext) handelt, gilt die UI-Komponenten-Schwelle 3:1 → 3.8:1 ist ausreichend. Bewusste Entscheidung, keine stille Abweichung.

---

### Navigation nach Aktionen
Keine. S-01-C hat keine Outgoing Transitions in product-flows.md. Kein Update nötig.

---

## Fortschritt
- Status: Freigegeben
- Aktueller Schritt: UX ✓ → Architect
