import { useState } from 'react';
import { motion } from 'framer-motion';
import { Add } from '@mui/icons-material';
import { ResponsiveTable, FilterPanel } from '../../../components/ui';
import type { TableColumn, QuickFilter, FilterOption } from '../../../components/ui';

const dummyTeachers = [
  { id: 'TCH001', name: 'Dr. Emily Chen', department: 'Mathematics', experience: '12 Years', qualification: 'Ph.D', subjects: 'Algebra, Calculus', status: 'Active' },
  { id: 'TCH002', name: 'Mr. Robert Smith', department: 'Science', experience: '8 Years', qualification: 'M.Sc', subjects: 'Physics, Chemistry', status: 'Active' },
  { id: 'TCH003', name: 'Ms. Sarah Johnson', department: 'English', experience: '5 Years', qualification: 'M.A', subjects: 'Literature, Grammar', status: 'On Leave' },
  { id: 'TCH004', name: 'Mr. Anil Verma', department: 'Social Studies', experience: '15 Years', qualification: 'M.Ed', subjects: 'History, Geography', status: 'Active' },
  { id: 'TCH005', name: 'Ms. Priya Nair', department: 'CS', experience: '3 Years', qualification: 'B.Tech', subjects: 'Programming, Web Dev', status: 'Active' },
];

const columns: TableColumn[] = [
  {
    key: 'name',
    label: 'Teacher',
    render: (val, row) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600 flex items-center justify-center font-black text-sm">
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
    key: 'department',
    label: 'Department',
    render: (val) => (
      <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-lg font-bold text-xs">
        {val}
      </span>
    )
  },
  { key: 'experience', label: 'Experience' },
  { key: 'qualification', label: 'Qualification', hideOnMobile: true },
  {
    key: 'status',
    label: 'Status',
    render: (val) => (
      <span className={`px-3 py-1 rounded-lg font-bold text-xs ${
        val === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
      }`}>
        {val}
      </span>
    )
  },
];

const quickFilters: QuickFilter[] = [
  { label: 'All', value: 'All' },
  { label: 'Active', value: 'Active' },
  { label: 'On Leave', value: 'OnLeave' },
  { label: 'Senior', value: 'Senior' },
  { label: 'Junior', value: 'Junior' },
];

const advancedFilters: FilterOption[] = [
  { key: 'department', label: 'Department', options: ['Mathematics', 'Science', 'English', 'Social Studies', 'CS'] },
  { key: 'status', label: 'Status', options: ['Active', 'On Leave'] },
];

const TeacherList = () => {
  const [search, setSearch] = useState('');
  const [activeChip, setActiveChip] = useState('All');

  const filteredTeachers = dummyTeachers.filter(t => {
    const matchesSearch = !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.department.toLowerCase().includes(search.toLowerCase()) ||
      t.subjects.toLowerCase().includes(search.toLowerCase());
    const matchesChip = activeChip === 'All' ||
      (activeChip === 'Active' && t.status === 'Active') ||
      (activeChip === 'OnLeave' && t.status === 'On Leave') ||
      (activeChip === 'Senior' && parseInt(t.experience) >= 10) ||
      (activeChip === 'Junior' && parseInt(t.experience) < 5);
    return matchesSearch && matchesChip;
  });

  return (
    <div className="pb-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black gradient-text tracking-tight uppercase">Teachers</h2>
          <button className="glass-button flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-glow-rose border-0">
            <Add fontSize="small" /> Add Teacher
          </button>
        </div>

        <FilterPanel
          searchPlaceholder="Search Teacher (Name, Department, Subject)..."
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
          data={filteredTeachers}
        />
      </motion.div>
    </div>
  );
};

export default TeacherList;
