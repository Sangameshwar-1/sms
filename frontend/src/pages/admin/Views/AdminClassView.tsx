import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Class, ArrowBack, People, FactCheck, Edit, Save, SupervisorAccount, Room } from '@mui/icons-material';
import { ResponsiveTable, FilterPanel, GlassStatsCard } from '../../../components/ui';
import type { TableColumn } from '../../../components/ui';

// Mock Data
const mockStudents = [
  { id: 1, name: 'Rahul Sharma', roll: '101', attendance: '95%', avgMarks: '88%' },
  { id: 2, name: 'Priya Gupta', roll: '102', attendance: '90%', avgMarks: '92%' },
  { id: 3, name: 'Amit Verma', roll: '103', attendance: '88%', avgMarks: '78%' },
  { id: 4, name: 'Neha Singh', roll: '104', attendance: '96%', avgMarks: '85%' },
  { id: 5, name: 'Vikram Patel', roll: '105', attendance: '82%', avgMarks: '72%' },
];

const mockAttendance = [
  { id: 1, date: '2026-07-01', present: 42, absent: 3, rate: '93%' },
  { id: 2, date: '2026-06-30', present: 44, absent: 1, rate: '97%' },
  { id: 3, date: '2026-06-29', present: 40, absent: 5, rate: '88%' },
];

const AdminClassView = () => {
  const { id: _id } = useParams();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('students');
  const [isEditing, setIsEditing] = useState(false);
  const [classDetails, setClassDetails] = useState({
    name: 'Class 10-A',
    classTeacher: 'Mr. John Doe',
    room: '101',
    schedule: 'Mon-Fri 8:00 AM - 2:30 PM',
  });
  
  // Search state for students
  const [search, setSearch] = useState('');

  const studentColumns: TableColumn[] = [
    { key: 'roll', label: 'Roll No.' },
    { key: 'name', label: 'Name' },
    { key: 'attendance', label: 'Attendance' },
    { key: 'avgMarks', label: 'Avg Marks' },
  ];

  const attendanceColumns: TableColumn[] = [
    { key: 'date', label: 'Date' },
    { key: 'present', label: 'Present' },
    { key: 'absent', label: 'Absent' },
    { key: 'rate', label: 'Rate', render: (value: any) => <span className="font-bold text-emerald-600">{value}</span> },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, API call goes here
  };

  const filteredStudents = mockStudents.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="pb-8 max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <button 
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold text-sm transition-colors"
        >
          <ArrowBack fontSize="small" /> Back
        </button>

        {/* Header Card */}
        <div className="glass-card p-6 md:p-8 bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-glow-indigo border-none relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner">
                <Class sx={{ fontSize: 32 }} />
              </div>
              <div>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20 mb-1 inline-block">
                  Class Profile
                </span>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={classDetails.name}
                    onChange={(e) => setClassDetails({...classDetails, name: e.target.value})}
                    className="block w-full bg-white/20 border border-white/30 rounded px-2 py-1 text-white font-black text-2xl outline-none focus:border-white"
                  />
                ) : (
                  <h2 className="text-3xl font-black tracking-tight">{classDetails.name}</h2>
                )}
              </div>
            </div>
            
            <button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="glass-button bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              {isEditing ? <><Save fontSize="small" /> Save Changes</> : <><Edit fontSize="small" /> Edit Profile</>}
            </button>
          </div>
          
          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 relative z-10">
            <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1 opacity-70">
                <SupervisorAccount fontSize="small" /> <span className="text-xs font-bold uppercase tracking-wider">Class Teacher</span>
              </div>
              {isEditing ? (
                  <input 
                    type="text" 
                    value={classDetails.classTeacher}
                    onChange={(e) => setClassDetails({...classDetails, classTeacher: e.target.value})}
                    className="block w-full bg-white/20 border border-white/30 rounded px-2 py-1 text-white font-semibold outline-none text-sm"
                  />
                ) : (
                  <p className="font-semibold text-lg">{classDetails.classTeacher}</p>
              )}
            </div>
            
            <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1 opacity-70">
                <Room fontSize="small" /> <span className="text-xs font-bold uppercase tracking-wider">Room</span>
              </div>
              {isEditing ? (
                  <input 
                    type="text" 
                    value={classDetails.room}
                    onChange={(e) => setClassDetails({...classDetails, room: e.target.value})}
                    className="block w-full bg-white/20 border border-white/30 rounded px-2 py-1 text-white font-semibold outline-none text-sm"
                  />
                ) : (
                  <p className="font-semibold text-lg">{classDetails.room}</p>
              )}
            </div>

            <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
               <div className="flex items-center gap-2 mb-1 opacity-70">
                <Class fontSize="small" /> <span className="text-xs font-bold uppercase tracking-wider">Schedule</span>
              </div>
              {isEditing ? (
                  <input 
                    type="text" 
                    value={classDetails.schedule}
                    onChange={(e) => setClassDetails({...classDetails, schedule: e.target.value})}
                    className="block w-full bg-white/20 border border-white/30 rounded px-2 py-1 text-white font-semibold outline-none text-sm"
                  />
                ) : (
                  <p className="font-semibold text-lg">{classDetails.schedule}</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 hide-scrollbar">
        <button
          onClick={() => setActiveTab('students')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
            activeTab === 'students' 
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
              : 'bg-white/50 text-slate-600 hover:bg-white/80'
          }`}
        >
          <People fontSize="small" /> Students
        </button>
        <button
          onClick={() => setActiveTab('attendance')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
            activeTab === 'attendance' 
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
              : 'bg-white/50 text-slate-600 hover:bg-white/80'
          }`}
        >
          <FactCheck fontSize="small" /> Attendance Overview
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'students' && (
            <div className="space-y-4">
              <FilterPanel 
                searchPlaceholder="Search students..."
                searchValue={search}
                onSearchChange={setSearch}
              />
              <div className="glass-card">
                <ResponsiveTable 
                  columns={studentColumns}
                  data={filteredStudents}
                  idKey="id"
                  accent="indigo"
                />
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
             <div className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <GlassStatsCard 
                    title="Average Attendance"
                    value="92%"
                    icon={<FactCheck />}
                    trend="+2% this month"
                    trendUp={true}
                    color="emerald"
                 />
                 <GlassStatsCard 
                    title="Total Classes Held"
                    value="45"
                    icon={<Class />}
                    color="indigo"
                 />
               </div>
               <div className="glass-card">
                  <h3 className="px-6 pt-6 text-lg font-black text-slate-800">Recent Attendance Records</h3>
                  <div className="p-2">
                    <ResponsiveTable 
                      columns={attendanceColumns}
                      data={mockAttendance}
                      idKey="id"
                      accent="emerald"
                    />
                  </div>
               </div>
             </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AdminClassView;
