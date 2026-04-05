import type { TooltipProps } from 'recharts'
import { formatCurrency } from '../../utils/format'
import type { TimeRange, ChartDataPoint } from '../../data/chartData'

type CustomTooltipProps = TooltipProps<number, string> & {
  payload?: Array<{ payload: ChartDataPoint; value: number }>
  activeRange?: TimeRange
}

export function ChartTooltip({ active, payload, activeRange }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null

  const point = payload[0].payload
  const date = new Date(point.timestamp)
  const showTime = activeRange === '1T'

  const formattedDate = new Intl.DateTimeFormat('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...(showTime ? { hour: '2-digit', minute: '2-digit' } : {}),
  }).format(date)

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 shadow-lg">
      <p className="text-slate-300 text-xs mb-0.5">{formattedDate}</p>
      <p className="text-white font-semibold text-sm">{formatCurrency(point.price)}</p>
    </div>
  )
}
