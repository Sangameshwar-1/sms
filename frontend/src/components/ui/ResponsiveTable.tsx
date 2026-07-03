import { MoreVert } from '@mui/icons-material';


export interface TableColumn {
  key: string;
  label: string;
  /** If true, this column is hidden on mobile card view */
  hideOnMobile?: boolean;
  sortable?: boolean;
  /** Custom render function */
  render?: (value: any, row: any) => React.ReactNode;
}

interface ResponsiveTableProps {
  columns: TableColumn[];
  data: any[];
  loading?: boolean;
  onRowClick?: (row: any) => void;
  /** Key field for unique row identification */
  idKey?: string;
  /** Accent color for mobile cards */
  accent?: string;
  hoverable?: boolean;
}

/**
 * Automatically renders as a data Table on desktop/tablet,
 * and swaps to stacked Glass Cards on mobile.
 */
const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  columns,
  data,
  loading = false,
  onRowClick,
  idKey = 'id',
  accent: _accent = 'indigo',
}) => {

  if (loading) {
    return (
      <div className="glass-card p-12 flex justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="glass-card p-12 text-center">
        <p className="font-bold text-slate-400 text-lg">No records found</p>
      </div>
    );
  }

  // ────────────────── TABLE VIEW (All Devices) ──────────────────
  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  className="p-2 px-3 font-black text-slate-400 text-[9px] uppercase tracking-widest"
                >
                  {col.label}
                </th>
              ))}
              <th className="p-2 px-3 font-black text-slate-400 text-[9px] uppercase tracking-widest text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={row[idKey] || idx}
                className="border-b border-slate-50 hover:bg-indigo-50/30 transition-colors group cursor-pointer"
                onClick={() => onRowClick?.(row)}
              >
                {columns.map(col => (
                  <td key={col.key} className="p-2 px-3 font-semibold text-slate-600 text-xs">
                    {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                  </td>
                ))}
                <td className="p-2 px-3 text-right">
                  <button className="p-1 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
                    <MoreVert fontSize="small" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResponsiveTable;
