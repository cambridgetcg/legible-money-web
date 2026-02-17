import { cn } from '@/lib/utils'

type Row = {
  feature: string
  values: string[]
}

type ComparisonTableProps = {
  headers: string[]
  rows: Row[]
  highlightColumn?: number
  className?: string
}

export function ComparisonTable({ headers, rows, highlightColumn, className }: ComparisonTableProps) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full text-sm border border-[#333] rounded-[4px]">
        <thead>
          <tr className="border-b border-[#333] bg-[#0d0d0d]">
            {headers.map((header, i) => (
              <th
                key={header}
                className={cn(
                  'px-4 py-3 text-left font-bold',
                  i === highlightColumn
                    ? 'text-[#00ff41] bg-[#00ff41]/5'
                    : 'text-[#e0e0e0]',
                )}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.feature} className="border-b border-[#333]/50 hover:bg-[#ffffff04]">
              <td className="px-4 py-3 text-[#e0e0e0] font-medium">{row.feature}</td>
              {row.values.map((value, i) => (
                <td
                  key={i}
                  className={cn(
                    'px-4 py-3',
                    i + 1 === highlightColumn
                      ? 'text-[#00ff41] bg-[#00ff41]/5'
                      : 'text-[#e0e0e0]/70',
                  )}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
