import { Briefcase } from 'lucide-react'

export function PortfolioEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <Briefcase className="w-10 h-10 text-slate-600 mb-3" aria-hidden />
      <p className="text-sm font-medium text-slate-400">Keine Positionen</p>
      <p className="text-sm text-slate-500 mt-1">Füge deinen ersten Coin hinzu</p>
    </div>
  )
}
