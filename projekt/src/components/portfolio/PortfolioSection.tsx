import { TrendingUp, TrendingDown } from 'lucide-react'
import { portfolioData } from '@/data/portfolio'
import { formatCurrency, formatCurrencyWithSign, formatPercent } from '@/utils/format'
import { PortfolioDonut } from './PortfolioDonut'
import { AssetList } from './AssetList'

export function PortfolioSection() {
  const { totalValue, change24hAbsolute, change24hPercent, assets } = portfolioData
  const isGain = change24hAbsolute >= 0
  const pnlColor = isGain ? 'text-green-500' : 'text-red-500'
  const PnLIcon = isGain ? TrendingUp : TrendingDown

  return (
    <section
      aria-label="Portfolio-Übersicht"
      className="bg-slate-900 rounded-xl px-6 py-8 sm:px-8 sm:py-10"
    >
      {/* xl: = 1280px → matches spec "Desktop ≥1280px" */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:items-center">

        {/* Left: total value + P&L */}
        <div>
          {/* FIX UX-002 / QA-002: slate-400 (4.9:1) statt slate-500 (3.8:1) */}
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-3">
            Portfolio-Gesamtwert
          </p>
          <p
            className="text-4xl sm:text-5xl font-bold text-slate-50 leading-none mb-4"
            aria-label={`Portfolio-Gesamtwert: ${formatCurrency(totalValue)}`}
          >
            {formatCurrency(totalValue)}
          </p>

          {/* P&L row */}
          <div className={`flex items-center gap-2 flex-wrap ${pnlColor}`}>
            {/* FIX UX-006: w-4 h-4 (16px) statt w-5 h-5 (20px) */}
            <PnLIcon className="w-4 h-4 shrink-0" aria-hidden />
            <span
              className="text-xl font-medium"
              aria-label={`24h Gewinn/Verlust absolut: ${formatCurrencyWithSign(change24hAbsolute)}`}
            >
              {formatCurrencyWithSign(change24hAbsolute)}
            </span>
            <span
              className="text-base font-normal"
              aria-label={`24h Gewinn/Verlust prozentual: ${formatPercent(change24hPercent)}`}
            >
              {formatPercent(change24hPercent)}
            </span>
            {/* FIX QA-002: slate-400 statt slate-500 */}
            <span className="text-sm text-slate-400 font-normal">24h</span>
          </div>
        </div>

        {/* Right: donut + asset list */}
        {/* FIX UX-001/UX-005: xl:flex-row statt sm:flex-row → Donut-Layout erst bei 1280px */}
        <div className="flex flex-col xl:flex-row items-center xl:items-start gap-6">
          <PortfolioDonut assets={assets} />
          <AssetList assets={assets} />
        </div>

      </div>
    </section>
  )
}
