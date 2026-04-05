import type { PortfolioPosition } from '@/data/coinRegistry'
import { PortfolioPositionRow } from './PortfolioPositionRow'
import { PortfolioEmptyState } from './PortfolioEmptyState'

interface PortfolioPositionListProps {
  positions: PortfolioPosition[]
  onRemove: (id: string) => void
}

export function PortfolioPositionList({ positions, onRemove }: PortfolioPositionListProps) {
  if (positions.length === 0) {
    return <PortfolioEmptyState />
  }

  return (
    <ul
      role="list"
      aria-label="Portfolio-Positionen"
      className="w-full"
    >
      {positions.map((pos, i) => (
        <PortfolioPositionRow
          key={pos.id}
          position={pos}
          isLast={i === positions.length - 1}
          onRemove={onRemove}
        />
      ))}
    </ul>
  )
}
