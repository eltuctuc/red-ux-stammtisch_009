import { transactionsData } from '@/data/transactions'
import { TransactionRow } from './TransactionRow'

export function TransactionTable() {
  return (
    <>
      {/* Desktop table */}
      <table
        className="w-full hidden md:table"
        aria-label="Letzte Transaktionen"
      >
        <thead>
          <tr className="border-b border-slate-700">
            {(['Typ', 'Asset', 'Menge', 'Preis/Einheit', 'Gesamtbetrag', 'Datum'] as const).map(
              (header, i) => (
                <th
                  key={header}
                  scope="col"
                  className={`pb-3 text-xs font-medium uppercase tracking-wider text-slate-500 ${
                    i >= 2 ? 'text-right pr-4' : i === 0 ? 'text-left pl-2 pr-4' : 'text-left pr-4'
                  }`}
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {transactionsData.map((tx, index) => (
            <TransactionRow key={tx.id} tx={tx} isEven={index % 2 === 1} />
          ))}
        </tbody>
      </table>

      {/* Mobile: card list */}
      <div className="md:hidden" role="list" aria-label="Letzte Transaktionen">
        {transactionsData.map((tx, index) => (
          <TransactionRow key={tx.id} tx={tx} isEven={index % 2 === 1} />
        ))}
      </div>
    </>
  )
}
