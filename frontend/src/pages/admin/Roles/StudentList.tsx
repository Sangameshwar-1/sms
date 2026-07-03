import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Add } from '@mui/icons-material';
import { ResponsiveTable, FilterPanel } from '../../../components/ui';
import type { TableColumn, QuickFilter, FilterOption } from '../../../components/ui';

const dummyStudents = [
  { id: 'STU001', name: 'Rahul Sharma', class: '10', section: 'A', admissionNo: 'SMS-2023-001', rollNo: '12', parentName: 'Mr. Ramesh Sharma', gender: 'Male', status: 'Active' },
  { id: 'STU002', name: 'Priya Singh', class: '9', section: 'B', admissionNo: 'SMS-2023-045', rollNo: '24', parentName: 'Mr. Sanjay Singh', gender: 'Female', status: 'Active' },
  { id: 'STU003', name: 'Arjun Kumar', class: '10', section: 'A', admissionNo: 'SMS-2023-003', rollNo: '05', parentName: 'Mr. Anil Kumar', gender: 'Male', status: 'Active' },
  { id: 'STU004', name: 'Sneha Patel', class: '8', section: 'C', admissionNo: 'SMS-2024-112', rollNo: '18', parentName: 'Mr. Rajiv Patel', gender: 'Female', status: 'Active' },
  { id: 'STU005', name: 'Vikram Rathore', class: '10', section: 'B', admissionNo: 'SMS-2023-078', rollNo: '31', parentName: 'Mrs. Sunita Rathore', gender: 'Male', status: 'Inactive' },
  { id: 'STU006', name: 'Meera Joshi', class: '9', section: 'A', admissionNo: 'SMS-2024-023', rollNo: '07', parentName: 'Mr. Nitin Joshi', gender: 'Female', status: 'Active' },
];

const columns: TableColumn[] = [
  { 
    key: 'name', 
    label: 'Student', 
    render: (val, row) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 flex items-center justify-center font-black text-sm">
          {val?.charAt(0)}
        </div>
        <div>
          <Link to={`/classes/${row.class}-${row.section}/students/${row.id}`} className="font-bold text-indigo-600 hover:underline">{val}</Link>
          <p className="text-xs text-slate-400 font-semibold">Roll No: {row.rollNo}</p>
        </div>
      </div>
    )
  },
  { 
    key: 'class', 
    label: 'Class & Section',
    render: (val, row) => (
      <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg font-bold text-xs">
        {val}-{row.section}
      </span>
    )
  },
  { key: 'admissionNo', label: 'Admission No' },
  { key: 'parentName', label: 'Parent' },
  { key: 'gender', label: 'Gender', hideOnMobile: true },
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
  { label: 'New Admissions', value: 'New' },
  { label: 'Low Attendance', value: 'LowAtt' },
  { label: 'Top Performers', value: 'Top' },
];

const advancedFilters: FilterOption[] = [
  { key: 'class', label: 'Class', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
  { key: 'section', label: 'Section', options: ['A', 'B', 'C'] },
  { key: 'gender', label: 'Gender', options: ['Male', 'Female'] },
  { key: 'status', label: 'Status', options: ['Active', 'Inactive'] },
];

const StudentList = () => {
  const [search, setSearch] = useState('');
  const [activeChip, setActiveChip] = useState('All');

  const filteredStudents = dummyStudents.filter(s => {
    const matchesSearch = !search || 
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.admissionNo.toLowerCase().includes(search.toLowerCase()) ||
      s.parentName.toLowerCase().includes(search.toLowerCase());
    const matchesChip = activeChip === 'All' || 
      (activeChip === 'Active' && s.status === 'Active') ||
      (activeChip !== 'Active' && activeChip !== 'All');
    return matchesSearch && matchesChip;
  });

  return (
    <div className="pb-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black gradient-text tracking-tight uppercase">Students</h2>
          <button className="glass-button flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-glow-indigo border-0">
            <Add fontSize="small" /> Add Student
          </button>
        </div>

        <FilterPanel
          searchPlaceholder="Search Student (Name, Admission No, Parent)..."
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
          data={filteredStudents} 
        />
      </motion.div>
    </div>
  );
};

export default StudentList;
