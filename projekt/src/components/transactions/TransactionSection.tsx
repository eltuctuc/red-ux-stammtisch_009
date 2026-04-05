import { TransactionTable } from './TransactionTable'

export function TransactionSection() {
  return (
    <section aria-label="Transaktionshistorie" className="bg-slate-900 rounded-xl p-6">
      <h2 className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-4">
        Letzte Transaktionen
      </h2>
      <TransactionTable />
    </section>
  )
}
