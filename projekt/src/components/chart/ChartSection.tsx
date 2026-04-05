import { useState } from 'react'
import { btcChartData, btcAssetInfo, type TimeRange } from '../../data/chartData'
import { ChartHeader } from './ChartHeader'
import { TimeRangeSelector } from './TimeRangeSelector'
import { PriceAreaChart } from './PriceAreaChart'

export function ChartSection() {
  const [activeRange, setActiveRange] = useState<TimeRange>('1M')

  const data = btcChartData[activeRange]
  const isPositive = data[data.length - 1].price >= data[0].price
  const trendColor = isPositive ? '#22c55e' : '#f87171'

  return (
    <section aria-label="Preis-Chart" className="bg-slate-900 rounded-xl p-6">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
        <ChartHeader
          name={btcAssetInfo.name}
          symbol={btcAssetInfo.symbol}
          currentPrice={btcAssetInfo.currentPrice}
          change24hPercent={btcAssetInfo.change24hPercent}
        />
        <TimeRangeSelector activeRange={activeRange} onChange={setActiveRange} />
      </div>
      <PriceAreaChart
        data={data}
        activeRange={activeRange}
        trendColor={trendColor}
        isPositive={isPositive}
      />
    </section>
  )
}
