import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import type { Asset } from '@/data/portfolio'

interface PortfolioDonutProps {
  assets: Asset[]
}

export function PortfolioDonut({ assets }: PortfolioDonutProps) {
  // Edge case: skip assets with 0% weighting
  const data = assets.filter((a) => a.portfolioPercent > 0)

  const ariaLabel = data
    .map((a) => `${a.name} ${a.portfolioPercent}%`)
    .join(', ')

  return (
    <div
      role="img"
      aria-label={`Asset-Verteilung: ${ariaLabel}`}
      className="w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] shrink-0"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="52%"
            outerRadius="75%"
            dataKey="portfolioPercent"
            strokeWidth={2}
            stroke="#0f172a"
            isAnimationActive={false}
            paddingAngle={0}
          >
            {data.map((entry) => (
              <Cell key={entry.symbol} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
