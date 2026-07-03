import { useState } from 'react';
import { motion } from 'framer-motion';
import { Add } from '@mui/icons-material';
import { ResponsiveTable, FilterPanel } from '../../../components/ui';
import type { TableColumn, QuickFilter, FilterOption } from '../../../components/ui';

const dummyAdmins = [
  { id: 'ADM001', name: 'Rajesh Kumar', role: 'Super Admin', email: 'rajesh.kumar@school.com', lastLogin: '2026-06-30, 10:45 AM', status: 'Active' },
  { id: 'ADM002', name: 'Priya Mehta', role: 'Moderator', email: 'priya.mehta@school.com', lastLogin: '2026-06-29, 03:20 PM', status: 'Active' },
  { id: 'ADM003', name: 'Vikram Desai', role: 'Viewer', email: 'vikram.desai@school.com', lastLogin: '2026-06-25, 09:15 AM', status: 'Inactive' },
];

const columns: TableColumn[] = [
  {
    key: 'name',
    label: 'Admin',
    render: (val, row) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-600 flex items-center justify-center font-black text-sm">
          {val?.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-slate-800">{val}</p>
          <p className="text-xs text-slate-400 font-semibold">{row.id}</p>
        </div>
      </div>
    )
  },
  {
    key: 'role',
    label: 'Role',
    render: (val) => (
      <span className={`px-3 py-1 rounded-lg font-bold text-xs ${
        val === 'Super Admin' ? 'bg-emerald-50 text-emerald-600' :
        val === 'Moderator' ? 'bg-blue-50 text-blue-600' :
        'bg-slate-100 text-slate-600'
      }`}>
        {val}
      </span>
    )
  },
  { key: 'email', label: 'Email' },
  { key: 'lastLogin', label: 'Last Login', hideOnMobile: true },
  {
    key: 'status',
    label: 'Status',
    render: (val) => (
      <span className={`px-3 py-1 rounded-lg font-bold text-xs ${
        val === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
      }`}>
        {val}
      </span>
    )
  },
];

const quickFilters: QuickFilter[] = [
  { label: 'All', value: 'All' },
  { label: 'Super Admin', value: 'SuperAdmin' },
  { label: 'Moderator', value: 'Moderator' },
];

const advancedFilters: FilterOption[] = [
  { key: 'role', label: 'Role', options: ['Super Admin', 'Moderator', 'Viewer'] },
  { key: 'status', label: 'Status', options: ['Active', 'Inactive'] },
];

const AdminList = () => {
  const [search, setSearch] = useState('');
  const [activeChip, setActiveChip] = useState('All');

  const filteredAdmins = dummyAdmins.filter(a => {
    const matchesSearch = !search ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.role.toLowerCase().includes(search.toLowerCase());
    const matchesChip = activeChip === 'All' ||
      (activeChip === 'SuperAdmin' && a.role === 'Super Admin') ||
      (activeChip === 'Moderator' && a.role === 'Moderator');
    return matchesSearch && matchesChip;
  });

  return (
    <div className="pb-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black gradient-text tracking-tight uppercase">Administrators</h2>
          <button className="glass-button flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-glow-emerald border-0">
            <Add fontSize="small" /> Add Admin
          </button>
        </div>

        <FilterPanel
          searchPlaceholder="Search Admin (Name, Email, Role)..."
          searchValue={search}
          onSearchChange={setSearch}
          quickFilters={quickFilters}
          activeQuickFilter={activeChip}
          onQuickFilterChange={setActiveChip}
          advancedFilters={advancedFilters}
          sortOptions={['Name A-Z', 'Name Z-A', 'Newest', 'Oldest']}
        />

        <ResponsiveTable
          columns={columns}
          data={filteredAdmins}
        />
      </motion.div>
    </div>
  );
};

export default AdminList;
