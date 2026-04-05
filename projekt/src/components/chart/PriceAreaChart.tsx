import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { format, parseISO } from 'date-fns'
import { de } from 'date-fns/locale'
import type { ChartDataPoint, TimeRange } from '../../data/chartData'
import { formatCurrencyCompact } from '../../utils/format'
import { ChartTooltip } from './ChartTooltip'

const GRADIENT_ID = 'chartGradient'

const xAxisFormatters: Record<TimeRange, (v: string) => string> = {
  '1T': (v: string) => format(parseISO(v), 'HH:mm'),
  '1W': (v: string) => format(parseISO(v), 'EEE', { locale: de }),
  '1M': (v: string) => format(parseISO(v), 'dd.MM'),
  '1J': (v: string) => format(parseISO(v), 'MMM', { locale: de }),
}

interface PriceAreaChartProps {
  data: ChartDataPoint[]
  activeRange: TimeRange
  trendColor: string
  isPositive: boolean
}

export function PriceAreaChart({ data, activeRange, trendColor, isPositive }: PriceAreaChartProps) {
  const gradientOpacity = isPositive ? 0.35 : 0.25

  return (
    <div
      role="img"
      aria-label={`BTC Preisverlauf, Zeitraum ${activeRange}`}
      className="h-[200px] md:h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id={GRADIENT_ID} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={trendColor} stopOpacity={gradientOpacity} />
              <stop offset="95%" stopColor={trendColor} stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1e293b"
            vertical={false}
          />

          <XAxis
            dataKey="timestamp"
            tickFormatter={xAxisFormatters[activeRange]}
            interval="preserveStartEnd"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickCount={6}
          />

          <YAxis
            domain={['dataMin * 0.995', 'dataMax * 1.005']}
            tickFormatter={formatCurrencyCompact}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={52}
          />

          <Tooltip
            content={<ChartTooltip activeRange={activeRange} />}
            cursor={false}
          />

          <Area
            type="monotone"
            dataKey="price"
            stroke={trendColor}
            strokeWidth={2}
            fill={`url(#${GRADIENT_ID})`}
            dot={false}
            activeDot={{ r: 5, fill: trendColor, strokeWidth: 0 }}
            isAnimationActive={true}
            animationDuration={300}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
