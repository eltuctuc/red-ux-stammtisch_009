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
      // FIX UX-001/UX-005: xl: statt sm: – Donut wächst erst wenn das Zwei-Spalten-Layout aktiv ist
      className="w-[140px] h-[140px] xl:w-[180px] xl:h-[180px] shrink-0"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            // FIX UX-003: 85%/58% statt 75%/52% – Donut-Ring sichtbar größer
            // Bei 180px Container: outerRadius=76.5px, innerRadius=52.2px, Ring=24.3px
            // Bei 140px Container: outerRadius=59.5px, innerRadius=40.6px, Ring=18.9px
            innerRadius="58%"
            outerRadius="85%"
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
