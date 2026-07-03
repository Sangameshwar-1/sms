import { useState } from 'react';
import { motion } from 'framer-motion';
import { Add } from '@mui/icons-material';
import { ResponsiveTable, FilterPanel } from '../../../components/ui';
import type { TableColumn, QuickFilter, FilterOption } from '../../../components/ui';

const dummyParents = [
  { id: 'PAR001', name: 'Mr. Ramesh Sharma', children: 'Rahul Sharma (10-A)', occupation: 'Engineer', phone: '+91 9876543210', email: 'ramesh.sharma@email.com', status: 'Active' },
  { id: 'PAR002', name: 'Mrs. Sunita Rathore', children: 'Vikram Rathore (10-B), Meera Rathore (7-A)', occupation: 'Teacher', phone: '+91 9876543211', email: 'sunita.r@email.com', status: 'Active' },
  { id: 'PAR003', name: 'Mr. Sanjay Singh', children: 'Priya Singh (9-B)', occupation: 'Business', phone: '+91 9876543212', email: 'sanjay.singh@email.com', status: 'Active' },
  { id: 'PAR004', name: 'Mr. Rajiv Patel', children: 'Sneha Patel (8-C), Arjun Patel (5-A)', occupation: 'Doctor', phone: '+91 9876543213', email: 'rajiv.patel@email.com', status: 'Inactive' },
  { id: 'PAR005', name: 'Mr. Nitin Joshi', children: 'Meera Joshi (9-A)', occupation: 'Government Employee', phone: '+91 9876543214', email: 'nitin.j@email.com', status: 'Active' },
];

const columns: TableColumn[] = [
  {
    key: 'name',
    label: 'Parent',
    render: (val, row) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-100 to-rose-100 text-pink-600 flex items-center justify-center font-black text-sm">
          {val?.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-slate-800">{val}</p>
          <p className="text-xs text-slate-400 font-semibold">{row.email}</p>
        </div>
      </div>
    )
  },
  {
    key: 'children',
    label: 'Children',
    render: (val) => (
      <div className="flex flex-wrap gap-1">
        {val?.split(', ').map((child: string, idx: number) => (
          <span key={idx} className="bg-pink-50 text-pink-600 px-2 py-0.5 rounded-lg font-bold text-xs">
            {child}
          </span>
        ))}
      </div>
    )
  },
  { key: 'occupation', label: 'Occupation' },
  { key: 'phone', label: 'Phone', hideOnMobile: true },
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
  { label: 'Active', value: 'Active' },
  { label: 'Multiple Children', value: 'MultipleChildren' },
];

const advancedFilters: FilterOption[] = [
  { key: 'class', label: 'Class', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
  { key: 'status', label: 'Status', options: ['Active', 'Inactive'] },
];

const ParentList = () => {
  const [search, setSearch] = useState('');
  const [activeChip, setActiveChip] = useState('All');

  const filteredParents = dummyParents.filter(p => {
    const matchesSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.children.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search);
    const matchesChip = activeChip === 'All' ||
      (activeChip === 'Active' && p.status === 'Active') ||
      (activeChip === 'MultipleChildren' && p.children.includes(', '));
    return matchesSearch && matchesChip;
  });

  return (
    <div className="pb-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black gradient-text tracking-tight uppercase">Parents</h2>
          <button className="glass-button flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-glow-rose border-0">
            <Add fontSize="small" /> Add Parent
          </button>
        </div>

        <FilterPanel
          searchPlaceholder="Search Parent (Name, Child Name, Phone)..."
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
          data={filteredParents}
        />
      </motion.div>
    </div>
  );
};

export default ParentList;
