import type { DataTableProps } from '../types'

export default function DataTable<T>({ columns, rows, rowKey }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left px-4 py-3 font-sans font-bold text-[13px] tracking-wide text-muted uppercase"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={rowKey(row)} className={i % 2 === 0 ? 'bg-surface' : 'bg-white'}>
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 font-sans text-[15px] text-ink">
                  {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
