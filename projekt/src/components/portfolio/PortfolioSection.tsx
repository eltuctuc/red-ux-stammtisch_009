import { useRef } from 'react'
import { TrendingUp, TrendingDown, Plus } from 'lucide-react'
import type { PortfolioPosition } from '@/data/coinRegistry'
import { computePortfolioTotals, deriveAssets } from '@/utils/portfolioUtils'
import { formatCurrency, formatCurrencyWithSign, formatPercent } from '@/utils/format'
import { PortfolioDonut } from './PortfolioDonut'
import { PortfolioPositionList } from './PortfolioPositionList'

interface PortfolioSectionProps {
  positions: PortfolioPosition[]
  onOpenModal: (ref: React.RefObject<HTMLButtonElement>) => void
  onRemovePosition: (id: string) => void
}

export function PortfolioSection({ positions, onOpenModal, onRemovePosition }: PortfolioSectionProps) {
  const addButtonRef = useRef<HTMLButtonElement>(null)
  const totals = computePortfolioTotals(positions)
  const assets = deriveAssets(positions)

  const isGain = totals.totalGainLossUSD >= 0
  const pnlColor = isGain ? 'text-green-500' : 'text-red-500'
  const PnLIcon = isGain ? TrendingUp : TrendingDown

  return (
    <section
      aria-label="Portfolio-Übersicht"
      className="bg-slate-900 rounded-xl px-6 py-8 sm:px-8 sm:py-10"
    >
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:items-start">

        {/* Left: total value + G/V summary + donut */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-3">
            Portfolio-Gesamtwert
          </p>
          <p
            className="text-4xl sm:text-5xl font-bold text-slate-50 leading-none mb-4"
            aria-label={`Portfolio-Gesamtwert: ${formatCurrency(totals.totalValue)}`}
          >
            {formatCurrency(totals.totalValue)}
          </p>

          {/* G/V seit Kauf */}
          <div className={`flex items-center gap-2 flex-wrap ${pnlColor}`}>
            <PnLIcon className="w-4 h-4 shrink-0" aria-hidden />
            <span
              className="text-xl font-medium"
              aria-label={`Gewinn/Verlust: ${formatCurrencyWithSign(totals.totalGainLossUSD)}`}
            >
              {formatCurrencyWithSign(totals.totalGainLossUSD)}
            </span>
            <span
              className="text-base font-normal"
              aria-label={`${formatPercent(totals.totalGainLossPercent)}`}
            >
              {formatPercent(totals.totalGainLossPercent)}
            </span>
            <span className="text-sm text-slate-400 font-normal">seit Kauf</span>
          </div>

          {/* Donut visible below totals on xl */}
          {assets.length > 0 && (
            <div className="mt-6 hidden xl:flex justify-start">
              <PortfolioDonut assets={assets} />
            </div>
          )}
        </div>

        {/* Right: position list */}
        <div>
          {/* Desktop column headers */}
          <div className="hidden md:flex items-center gap-2 px-1 pb-1 border-b border-slate-800 mb-0.5">
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500 w-36 shrink-0">Coin</p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500 w-24 text-right">Menge</p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500 w-24 text-right">Kaufpreis</p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500 w-24 text-right">Akt. Wert</p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500 w-24 text-right">G/V USD</p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500 w-16 text-right">G/V %</p>
            <p className="w-8 shrink-0" />
          </div>

          <PortfolioPositionList positions={positions} onRemove={onRemovePosition} />

          {/* Add position button */}
          <button
            ref={addButtonRef}
            onClick={() => onOpenModal(addButtonRef)}
            aria-label="Position zum Portfolio hinzufügen"
            className="mt-3 w-full flex items-center justify-center gap-2 py-2 px-4 text-sm text-slate-400 border border-dashed border-slate-600 rounded-lg hover:border-slate-400 hover:text-slate-200 transition-colors"
          >
            <Plus className="w-4 h-4" aria-hidden />
            Position hinzufügen
          </button>
        </div>

      </div>

      {/* Donut below on mobile / non-xl */}
      {assets.length > 0 && (
        <div className="mt-6 flex justify-center xl:hidden">
          <PortfolioDonut assets={assets} />
        </div>
      )}
    </section>
  )
}
