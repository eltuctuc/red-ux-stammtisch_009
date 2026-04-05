import './App.css'
import { PortfolioSection } from './components/portfolio/PortfolioSection'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-[1440px] mx-auto px-4 py-6 sm:px-6 space-y-6">

        {/* S-01-A: Portfolio Overview */}
        <PortfolioSection />

        {/* S-01-B + S-01-C: Price Chart + Watchlist (FEAT-2, FEAT-3) */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          {/* placeholders – implemented in FEAT-2 and FEAT-3 */}
        </div>

        {/* S-01-D: Transaction History (FEAT-4) */}
        {/* placeholder – implemented in FEAT-4 */}

      </div>
    </div>
  )
}
