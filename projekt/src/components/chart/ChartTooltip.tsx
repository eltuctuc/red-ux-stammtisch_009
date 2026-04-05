import type { TooltipProps } from 'recharts'
import { formatCurrency } from '../../utils/format'

interface ChartDataPoint {
  timestamp: string
  price: number
}

type CustomTooltipProps = TooltipProps<number, string> & {
  payload?: Array<{ payload: ChartDataPoint; value: number }>
}

export function ChartTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null

  const point = payload[0].payload
  const date = new Date(point.timestamp)
  const formattedDate = new Intl.DateTimeFormat('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 shadow-lg">
      <p className="text-slate-300 text-xs mb-0.5">{formattedDate}</p>
      <p className="text-white font-semibold text-sm">{formatCurrency(point.price)}</p>
    </div>
  )
}
