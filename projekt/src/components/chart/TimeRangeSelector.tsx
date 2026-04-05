import { cn } from '../../utils/cn'
import type { TimeRange } from '../../data/chartData'

const RANGES: { value: TimeRange; label: string }[] = [
  { value: '1T', label: '1T' },
  { value: '1W', label: '1W' },
  { value: '1M', label: '1M' },
  { value: '1J', label: '1J' },
]

const ARIA_LABELS: Record<TimeRange, string> = {
  '1T': 'Zeitraum 1 Tag',
  '1W': 'Zeitraum 1 Woche',
  '1M': 'Zeitraum 1 Monat',
  '1J': 'Zeitraum 1 Jahr',
}

interface TimeRangeSelectorProps {
  activeRange: TimeRange
  onChange: (range: TimeRange) => void
}

export function TimeRangeSelector({ activeRange, onChange }: TimeRangeSelectorProps) {
  return (
    <div className="bg-slate-800 rounded-lg p-1 flex gap-1" role="group" aria-label="Zeitraum wählen">
      {RANGES.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          aria-pressed={activeRange === value}
          aria-label={ARIA_LABELS[value]}
          className={cn(
            'h-11 min-w-[48px] px-3 rounded-md text-sm font-medium transition-colors',
            activeRange === value
              ? 'bg-slate-700 text-white'
              : 'text-slate-400 hover:text-slate-200'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
