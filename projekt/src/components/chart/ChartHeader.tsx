import { formatCurrency } from '../../utils/format'
import { PriceChangeBadge } from '../shared/PriceChangeBadge'

interface ChartHeaderProps {
  name: string
  symbol: string
  currentPrice: number
  change24hPercent: number
}

export function ChartHeader({ name, symbol, currentPrice, change24hPercent }: ChartHeaderProps) {
  return (
    <div>
      <div className="flex items-baseline gap-2">
        <span className="text-base font-semibold text-slate-100">{name}</span>
        <span className="text-sm text-slate-400">{symbol}</span>
      </div>
      <div className="flex items-center gap-3 mt-1">
        <span className="text-2xl font-bold text-slate-50">{formatCurrency(currentPrice)}</span>
        <PriceChangeBadge value={change24hPercent} size="sm" />
        <span className="text-sm text-slate-400">heute</span>
      </div>
    </div>
  )
}
