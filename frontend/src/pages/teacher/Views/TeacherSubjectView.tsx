import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuBook, ArrowBack, Assignment, People, Folder, Add, Edit } from '@mui/icons-material';
import { ResponsiveTable, FilterPanel } from '../../../components/ui';
import type { TableColumn } from '../../../components/ui';

// ── Mock Data ──
const subjectDataMap: Record<string, any> = {
  'MAT-101': {
    id: 'MAT-101', name: 'Mathematics', code: 'MAT-101', class: '10-A', studentsCount: 45,
    students: [
      { id: 'STU001', name: 'Rahul Sharma', roll: '101', fa1: 45, sa1: 88, maxFa1: 50, maxSa1: 100 },
      { id: 'STU002', name: 'Priya Singh', roll: '102', fa1: 42, sa1: 85, maxFa1: 50, maxSa1: 100 },
      { id: 'STU003', name: 'Amit Verma', roll: '103', fa1: 38, sa1: null, maxFa1: 50, maxSa1: 100 },
    ],
    assignments: [
      { id: 1, title: 'Linear Equations Worksheet', due: '10-Aug-2026', submitted: 40, total: 45, status: 'Active' },
      { id: 2, title: 'Real Numbers Practice Set', due: '25-Jul-2026', submitted: 45, total: 45, status: 'Closed' },
    ],
    resources: [
      { id: 1, title: 'Chapter 1 Notes', type: 'PDF', size: '2.4 MB', date: '01-Jul-2026' },
      { id: 2, title: 'Quadratic Equations Formula Sheet', type: 'Image', size: '800 KB', date: '05-Jul-2026' },
    ]
  }
};

const TeacherSubjectView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const data = subjectDataMap[id || 'MAT-101'] || subjectDataMap['MAT-101'];
  
  const [activeTab, setActiveTab] = useState('students');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'students', label: 'Students & Marks', icon: <People fontSize="small" /> },
    { id: 'assignments', label: 'Assignments', icon: <Assignment fontSize="small" /> },
    { id: 'resources', label: 'Resources', icon: <Folder fontSize="small" /> },
  ];

  // ── Handlers ──
  const handleViewStudent = (student: any) => {
    navigate(`/classes/${data.class.replace('Class ', '')}/students/${student.id}`);
  };

  // ── Table Columns ──
  const studentColumns: TableColumn[] = [
    { key: 'roll', label: 'Roll No', sortable: true },
    { key: 'name', label: 'Student Name', sortable: true },
    { 
      key: 'fa1', 
      label: 'FA1 (50)', 
      render: (val, _row) => (
        <span className="font-bold text-slate-700">{val !== null ? val : '-'}</span>
      )
    },
    { 
      key: 'sa1', 
      label: 'SA1 (100)', 
      render: (val, _row) => (
        <span className="font-bold text-slate-700">{val !== null ? val : '-'}</span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <button 
          onClick={(e) => { e.stopPropagation(); handleViewStudent(row); }}
          className="text-indigo-600 font-bold text-xs bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors"
        >
          View Profile
        </button>
      )
    }
  ];

  const filteredStudents = data.students.filter((s: any) => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.roll.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-8 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold text-sm transition-colors"
        >
          <ArrowBack fontSize="small" /> Back to Dashboard
        </button>

        {/* Banner */}
        <div className="glass-card p-6 md:p-8 bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-xl mb-8 border-none relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner">
              <MenuBook sx={{ fontSize: 40 }} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20 mb-2 inline-block">
                My Subject
              </span>
              <h2 className="text-3xl font-black tracking-tight">{data.name}</h2>
              <p className="text-indigo-100 font-bold mt-1">
                Code: {data.code} • Class: {data.class} • {data.studentsCount} Students
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-6 hide-scrollbar pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                  : 'glass-card text-slate-600 hover:bg-white/80'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="glass-card min-h-[400px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-6"
            >
              {/* STUDENTS TAB */}
              {activeTab === 'students' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <h3 className="font-black text-lg text-slate-800 flex items-center gap-2">
                      <People className="text-indigo-500" /> Enrolled Students
                    </h3>
                    <div className="w-full sm:w-auto">
                      <FilterPanel
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        hideFilters={true}
                      />
                    </div>
                  </div>
                  <ResponsiveTable
                    columns={studentColumns}
                    data={filteredStudents}
                    onRowClick={handleViewStudent}
                    hoverable
                  />
                </div>
              )}

              {/* ASSIGNMENTS TAB */}
              {activeTab === 'assignments' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-black text-lg text-slate-800 flex items-center gap-2">
                      <Assignment className="text-indigo-500" /> Manage Assignments
                    </h3>
                    <button className="glass-button flex items-center gap-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-sm">
                      <Add fontSize="small" /> New Assignment
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100 bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                    {data.assignments?.map((a: any) => (
                      <div key={a.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-50 transition-colors">
                        <div>
                          <p className="font-bold text-slate-800 text-base">{a.title}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Due: {a.due}</p>
                        </div>
                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                          <div className="text-right">
                            <p className="text-sm font-bold text-slate-700">{a.submitted} / {a.total}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Submitted</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
                            a.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {a.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* RESOURCES TAB */}
              {activeTab === 'resources' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-black text-lg text-slate-800 flex items-center gap-2">
                      <Folder className="text-amber-500" /> Study Materials
                    </h3>
                    <button className="glass-button flex items-center gap-1 bg-amber-50 text-amber-700 hover:bg-amber-100 font-bold text-sm">
                      <Add fontSize="small" /> Upload
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.resources?.map((r: any) => (
                      <div key={r.id} className="border border-slate-200 rounded-xl p-4 flex items-center gap-4 hover:border-amber-300 transition-colors bg-white">
                        <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                          <Folder />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-slate-800 text-sm line-clamp-1">{r.title}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                            {r.type} • {r.size} • {r.date}
                          </p>
                        </div>
                        <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                          <Edit fontSize="small" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default TeacherSubjectView;
