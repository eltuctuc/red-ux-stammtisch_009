import type { WatchlistAsset } from '@/data/watchlist'
import { formatCurrency } from '@/utils/format'
import { AssetIcon } from '@/components/shared/AssetIcon'
import { PriceChangeBadge } from '@/components/shared/PriceChangeBadge'
import { cn } from '@/utils/cn'
import { Briefcase } from 'lucide-react'

interface WatchlistRowProps {
  asset: WatchlistAsset
  isLast: boolean
  isInPortfolio: boolean
}

export function WatchlistRow({ asset, isLast, isInPortfolio }: WatchlistRowProps) {
  return (
    <div
      role="listitem"
      className={cn(
        'flex items-center justify-between h-12 transition-colors duration-200',
        !isLast && 'border-b border-slate-800',
        isInPortfolio
          ? 'border-l-2 border-green-500 bg-green-500/5 pl-[2px] pr-1'
          : 'px-1'
      )}
    >
      {/* Left: Icon + Name/Symbol */}
      <div className="flex items-center gap-3 min-w-0">
        <AssetIcon symbol={asset.symbol} name={asset.name} color={asset.iconColor} />
        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <p className="text-[13px] font-semibold text-slate-100 truncate leading-tight">{asset.name}</p>
            {/* BUG-FEAT6-UX-003: Briefcase-Icon als nicht-farbige Zusatz-Information (WCAG 1.4.1) */}
            {isInPortfolio && (
              <Briefcase className="w-3.5 h-3.5 text-green-500 shrink-0" aria-hidden />
            )}
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            {asset.symbol}
            {/* BUG-FEAT6-UX-002: sr-only Portfolio-Status – kein aria-label auf Root, Screenreader liest natürlichen Inhalt */}
            {isInPortfolio && <span className="sr-only">, im Portfolio</span>}
          </p>
        </div>
      </div>

      {/* Right: Price + Change */}
      <div className="flex flex-col items-end flex-shrink-0 ml-2">
        <p className="text-[13px] font-semibold text-slate-50 leading-tight">{formatCurrency(asset.priceUSD)}</p>
        <PriceChangeBadge value={asset.change24hPercent} size="sm" />
      </div>
    </div>
  )
}
