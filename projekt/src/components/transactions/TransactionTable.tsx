import { transactionsData } from '@/data/transactions'
import { DesktopTransactionRow, MobileTransactionCard } from './TransactionRow'

const HEADERS = [
  { label: 'Typ',          align: 'left'  },
  { label: 'Asset',        align: 'left'  },
  { label: 'Menge',        align: 'right' },
  { label: 'Preis/Einheit',align: 'right' },
  { label: 'Gesamtbetrag', align: 'right' },
  { label: 'Datum',        align: 'right' },
] as const

export function TransactionTable() {
  return (
    <>
      {/* Desktop table – only valid <tr> inside <tbody> */}
      <table
        className="w-full hidden md:table"
        aria-label="Letzte Transaktionen"
      >
        <thead>
          <tr className="border-b border-slate-700">
            {HEADERS.map(({ label, align }) => (
              <th
                key={label}
                scope="col"
                className={`pb-3 text-xs font-medium uppercase tracking-wider text-slate-500 whitespace-nowrap ${
                  align === 'right' ? 'text-right pr-4' : 'text-left pl-2 pr-4'
                }`}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactionsData.map((tx, index) => (
            <DesktopTransactionRow key={tx.id} tx={tx} isEven={index % 2 === 1} />
          ))}
        </tbody>
      </table>

      {/* Mobile card list – only valid <div> inside <div role="list"> */}
      <div className="md:hidden" role="list" aria-label="Letzte Transaktionen">
        {transactionsData.map((tx, index) => (
          <MobileTransactionCard key={tx.id} tx={tx} isEven={index % 2 === 1} />
        ))}
      </div>
    </>
  )
}
