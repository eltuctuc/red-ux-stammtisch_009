import { Trash2 } from 'lucide-react'
import type { PortfolioPosition } from '@/data/coinRegistry'
import { computePositionMetrics } from '@/utils/portfolioUtils'
import { formatCurrency, formatQuantity, formatPercent } from '@/utils/format'
import { AssetIcon } from '@/components/shared/AssetIcon'

interface PortfolioPositionRowProps {
  position: PortfolioPosition
  isLast: boolean
  onRemove: (id: string) => void
}

function gainLossColor(percent: number): string {
  if (percent > 0) return 'text-green-400'
  if (percent < 0) return 'text-red-400'
  return 'text-slate-400'
}

function gainLossSign(value: number): string {
  if (value > 0) return '+'
  if (value < 0) return '-'
  return ''
}

export function PortfolioPositionRow({ position, isLast, onRemove }: PortfolioPositionRowProps) {
  const { currentValueUSD, gainLossUSD, gainLossPercent, isLossTen } = computePositionMetrics(position)
  const glColor = gainLossColor(gainLossPercent)
  const borderClass = !isLast ? 'border-b border-slate-800' : ''
  const lossClass = isLossTen ? 'bg-red-500/10' : ''

  return (
    <li
      className={`list-none ${borderClass} ${lossClass}`}
      aria-label={`${position.name}${isLossTen ? ' – Verlust über 10 Prozent' : ''}`}
    >
      {/* Desktop layout (md+) */}
      <div className="hidden md:flex items-center justify-between gap-2 py-2.5 px-1">
        {/* Coin: icon + name */}
        <div className="flex items-center gap-2 min-w-0 w-36 shrink-0">
          <AssetIcon symbol={position.symbol} name={position.name} color={position.color} size={28} />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-100 truncate leading-tight">{position.name}</p>
            <p className="text-xs text-slate-400 leading-tight">{position.symbol}</p>
          </div>
        </div>

        {/* Menge */}
        <div className="w-24 text-right tabular-nums">
          <p className="text-sm text-slate-300">{formatQuantity(position.quantity)}</p>
        </div>

        {/* Kaufpreis/Einheit */}
        <div className="w-24 text-right tabular-nums">
          <p className="text-sm text-slate-300">{formatCurrency(position.purchasePricePerUnit)}</p>
        </div>

        {/* Aktueller Wert */}
        <div className="w-24 text-right tabular-nums">
          <p className="text-sm font-semibold text-slate-50">{formatCurrency(currentValueUSD)}</p>
        </div>

        {/* G/V USD */}
        <div className={`w-24 text-right tabular-nums ${glColor}`}>
          <p className="text-sm font-medium">
            {gainLossSign(gainLossUSD)}{formatCurrency(Math.abs(gainLossUSD))}
          </p>
        </div>

        {/* G/V % */}
        <div className={`w-16 text-right tabular-nums ${glColor}`}>
          <p className="text-sm font-medium">{formatPercent(gainLossPercent)}</p>
        </div>

        {/* Entfernen */}
        <button
          onClick={() => onRemove(position.id)}
          aria-label={`${position.name} aus Portfolio entfernen`}
          className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-500 hover:text-red-400 transition-colors rounded shrink-0"
        >
          <Trash2 className="w-4 h-4" aria-hidden />
        </button>
      </div>

      {/* Mobile layout (<md) */}
      <div className="md:hidden py-2.5 px-1">
        {/* Row 1: icon + name + trash */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2 min-w-0">
            <AssetIcon symbol={position.symbol} name={position.name} color={position.color} size={28} />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-100 truncate leading-tight">{position.name}</p>
              <p className="text-xs text-slate-400 leading-tight">
                {position.symbol}
                <span className="ml-1.5 text-slate-500">{formatQuantity(position.quantity)}</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => onRemove(position.id)}
            aria-label={`${position.name} aus Portfolio entfernen`}
            className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-500 hover:text-red-400 transition-colors rounded shrink-0"
          >
            <Trash2 className="w-4 h-4" aria-hidden />
          </button>
        </div>

        {/* Row 2: 3-column grid */}
        <div className="grid grid-cols-3 gap-1 text-right">
          <div>
            <p className="text-[10px] text-slate-500 leading-tight">Kaufpreis</p>
            <p className="text-xs text-slate-300 tabular-nums">{formatCurrency(position.purchasePricePerUnit)}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 leading-tight">Akt. Wert</p>
            <p className="text-xs font-semibold text-slate-50 tabular-nums">{formatCurrency(currentValueUSD)}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 leading-tight">G/V</p>
            <p className={`text-xs font-medium tabular-nums ${glColor}`}>
              {formatPercent(gainLossPercent)}
            </p>
            <p className={`text-[10px] tabular-nums ${glColor}`}>
              {gainLossSign(gainLossUSD)}{formatCurrency(Math.abs(gainLossUSD))}
            </p>
          </div>
        </div>
      </div>
    </li>
  )
}
