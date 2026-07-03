import { useState } from 'react';
import { Search, FilterList, ViewModule, ViewList, Tune } from '@mui/icons-material';
import { useResponsive } from '../../hooks/useResponsive';
import GlassBottomSheet from './GlassBottomSheet';

export interface FilterOption {
  key: string;
  label: string;
  options: string[];
}

export interface QuickFilter {
  label: string;
  value: string;
}

interface FilterPanelProps {
  searchPlaceholder?: string;
  searchValue?: string;
  searchQuery?: string;
  hideFilters?: boolean;
  onSearchChange?: (value: string) => void;
  quickFilters?: QuickFilter[];
  activeQuickFilter?: string;
  onQuickFilterChange?: (value: string) => void;
  advancedFilters?: FilterOption[];
  onAdvancedFilterChange?: (key: string, value: string) => void;
  sortOptions?: string[];
  onSortChange?: (value: string) => void;
  viewMode?: 'card' | 'list';
  onViewModeChange?: (mode: 'card' | 'list') => void;
  showViewToggle?: boolean;
}

/**
 * Standardized Search + Quick Filter + Advanced Filter + Sort panel.
 * On mobile, advanced filters open as a GlassBottomSheet.
 * On desktop, they render inline as a persistent side/top panel.
 */
const FilterPanel: React.FC<FilterPanelProps> = ({
  searchPlaceholder = 'Search...',
  searchValue = '',
  onSearchChange,
  quickFilters = [],
  activeQuickFilter = 'All',
  onQuickFilterChange,
  advancedFilters = [],
  onAdvancedFilterChange,
  sortOptions = [],
  onSortChange,
  viewMode = 'list',
  onViewModeChange,
  showViewToggle = false,
}) => {
  const { isMobile } = useResponsive();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const advancedContent = (
    <div className="space-y-4">
      {advancedFilters.map(filter => (
        <div key={filter.key}>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
            {filter.label}
          </label>
          <select
            className="glass-input w-full px-3 py-2.5 text-sm font-semibold text-slate-700"
            onChange={(e) => onAdvancedFilterChange?.(filter.key, e.target.value)}
          >
            <option value="">All</option>
            {filter.options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      ))}
      {sortOptions.length > 0 && (
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
            Sort By
          </label>
          <select
            className="glass-input w-full px-3 py-2.5 text-sm font-semibold text-slate-700"
            onChange={(e) => onSortChange?.(e.target.value)}
          >
            {sortOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );

  return (
    <div className="mb-6 space-y-4">
      {/* ─── Search Bar ─── */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder={searchPlaceholder}
          className="glass-card w-full pl-12 pr-4 py-4 text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-lg border-0"
        />
      </div>

      {/* ─── Quick Filter Chips + View Toggle Row ─── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <div className="flex gap-2 flex-1 overflow-x-auto">
          {quickFilters.map(chip => (
            <button
              key={chip.value}
              onClick={() => onQuickFilterChange?.(chip.value)}
              className={`px-4 py-2 rounded-full font-bold text-xs transition-all whitespace-nowrap ${
                activeQuickFilter === chip.value
                  ? 'bg-indigo-600 text-white shadow-glow-indigo'
                  : 'bg-white/50 text-slate-600 hover:bg-indigo-50 border border-white/60'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        {showViewToggle && (
          <div className="flex bg-slate-100 rounded-lg p-0.5">
            <button
              onClick={() => onViewModeChange?.('list')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow text-indigo-600' : 'text-slate-400'}`}
            >
              <ViewList fontSize="small" />
            </button>
            <button
              onClick={() => onViewModeChange?.('card')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'card' ? 'bg-white shadow text-indigo-600' : 'text-slate-400'}`}
            >
              <ViewModule fontSize="small" />
            </button>
          </div>
        )}

        {/* Advanced Filter Toggle */}
        {advancedFilters.length > 0 && (
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs transition-all whitespace-nowrap
              ${showAdvanced ? 'bg-slate-800 text-white' : 'bg-white/50 text-slate-600 hover:bg-slate-100 border border-white/60'}`}
          >
            <Tune fontSize="small" /> Filters
          </button>
        )}
      </div>

      {/* ─── Advanced Filters (Responsive) ─── */}
      {isMobile ? (
        <GlassBottomSheet
          open={showAdvanced}
          onClose={() => setShowAdvanced(false)}
          title="Advanced Filters"
        >
          {advancedContent}
        </GlassBottomSheet>
      ) : (
        showAdvanced && (
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <FilterList className="text-indigo-500" fontSize="small" />
              <h3 className="font-bold text-slate-700 uppercase tracking-wider text-xs">Advanced Filters</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {advancedFilters.map(filter => (
                <select
                  key={filter.key}
                  className="glass-input px-3 py-2 text-sm font-semibold text-slate-700"
                  onChange={(e) => onAdvancedFilterChange?.(filter.key, e.target.value)}
                >
                  <option value="">{filter.label}</option>
                  {filter.options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ))}
              {sortOptions.length > 0 && (
                <select
                  className="glass-input px-3 py-2 text-sm font-semibold text-slate-700"
                  onChange={(e) => onSortChange?.(e.target.value)}
                >
                  <option>Sort By</option>
                  {sortOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default FilterPanel;
