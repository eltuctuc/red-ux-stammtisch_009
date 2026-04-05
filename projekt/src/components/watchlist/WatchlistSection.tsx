import { watchlistData } from '@/data/watchlist'
import { WatchlistRow } from './WatchlistRow'

interface WatchlistSectionProps {
  portfolioSymbols: Set<string>
}

export function WatchlistSection({ portfolioSymbols }: WatchlistSectionProps) {
  return (
    <section aria-label="Watchlist" className="bg-slate-900 rounded-xl p-4">
      <h2 className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">
        Watchlist
      </h2>
      <div role="list">
        {watchlistData.map((asset, index) => (
          <WatchlistRow
            key={asset.symbol}
            asset={asset}
            isLast={index === watchlistData.length - 1}
            isInPortfolio={portfolioSymbols.has(asset.symbol)}
          />
        ))}
      </div>
    </section>
  )
}
