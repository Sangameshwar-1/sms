import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Person, ArrowBack, Edit, Save, Assessment, FactCheck, Feed, Email, Phone, FamilyRestroom } from '@mui/icons-material';
import { ResponsiveTable, GlassStatsCard } from '../../../components/ui';
import type { TableColumn } from '../../../components/ui';

// Mock Data
const mockAcademic = [
  { id: 1, subject: 'Mathematics', score: '95', grade: 'A+', term: 'Mid-Term' },
  { id: 2, subject: 'Science', score: '88', grade: 'A', term: 'Mid-Term' },
  { id: 3, subject: 'English', score: '92', grade: 'A+', term: 'Mid-Term' },
];

const mockAttendance = [
  { id: 1, month: 'June 2026', present: 20, absent: 2, rate: '90%' },
  { id: 2, month: 'May 2026', present: 22, absent: 0, rate: '100%' },
];

const mockLeaves = [
  { id: 1, type: 'Sick Leave', from: '2026-06-15', to: '2026-06-16', status: 'Approved' },
  { id: 2, type: 'Family Event', from: '2026-07-10', to: '2026-07-11', status: 'Pending' },
];

const AdminStudentView = () => {
  const { id: _id } = useParams();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('academic');
  const [isEditing, setIsEditing] = useState(false);
  
  const [studentInfo, setStudentInfo] = useState({
    name: 'Rahul Sharma',
    roll: '101',
    className: 'Class 10-A',
    email: 'rahul.s@school.edu',
    phone: '+91 9876543210',
    parentName: 'Mr. Anil Sharma',
  });

  const academicColumns: TableColumn[] = [
    { key: 'subject', label: 'Subject' },
    { key: 'score', label: 'Score', render: (val) => <span className="font-bold text-sky-600">{val}</span> },
    { key: 'grade', label: 'Grade' },
    { key: 'term', label: 'Term' },
  ];

  const attendanceColumns: TableColumn[] = [
    { key: 'month', label: 'Month' },
    { key: 'present', label: 'Present Days' },
    { key: 'absent', label: 'Absent Days' },
    { key: 'rate', label: 'Attendance Rate', render: (val) => <span className="font-bold text-emerald-600">{val}</span> },
  ];

  const leaveColumns: TableColumn[] = [
    { key: 'type', label: 'Leave Type' },
    { key: 'from', label: 'From Date' },
    { key: 'to', label: 'To Date' },
    { key: 'status', label: 'Status', render: (val) => (
      <span className={`px-2 py-1 rounded text-xs font-bold ${val === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
        {val}
      </span>
    ) },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Real app would call API
  };

  return (
    <div className="pb-8 max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <button 
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-slate-500 hover:text-sky-600 font-bold text-sm transition-colors"
        >
          <ArrowBack fontSize="small" /> Back
        </button>

        {/* Header Card */}
        <div className="glass-card p-6 md:p-8 bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-glow-sky border-none relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner">
                <Person sx={{ fontSize: 32 }} />
              </div>
              <div>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20 mb-1 inline-block">
                  Student Profile
                </span>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={studentInfo.name}
                    onChange={(e) => setStudentInfo({...studentInfo, name: e.target.value})}
                    className="block w-full bg-white/20 border border-white/30 rounded px-2 py-1 text-white font-black text-2xl outline-none focus:border-white"
                  />
                ) : (
                  <h2 className="text-3xl font-black tracking-tight">{studentInfo.name}</h2>
                )}
                <p className="text-sky-100 font-bold mt-1">{studentInfo.className} • Roll {studentInfo.roll}</p>
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
                <Email fontSize="small" /> <span className="text-xs font-bold uppercase tracking-wider">Email</span>
              </div>
              {isEditing ? (
                  <input 
                    type="email" 
                    value={studentInfo.email}
                    onChange={(e) => setStudentInfo({...studentInfo, email: e.target.value})}
                    className="block w-full bg-white/20 border border-white/30 rounded px-2 py-1 text-white font-semibold outline-none text-sm"
                  />
                ) : (
                  <p className="font-semibold">{studentInfo.email}</p>
              )}
            </div>
            
            <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1 opacity-70">
                <Phone fontSize="small" /> <span className="text-xs font-bold uppercase tracking-wider">Phone</span>
              </div>
              {isEditing ? (
                  <input 
                    type="text" 
                    value={studentInfo.phone}
                    onChange={(e) => setStudentInfo({...studentInfo, phone: e.target.value})}
                    className="block w-full bg-white/20 border border-white/30 rounded px-2 py-1 text-white font-semibold outline-none text-sm"
                  />
                ) : (
                  <p className="font-semibold">{studentInfo.phone}</p>
              )}
            </div>

            <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
               <div className="flex items-center gap-2 mb-1 opacity-70">
                <FamilyRestroom fontSize="small" /> <span className="text-xs font-bold uppercase tracking-wider">Parent/Guardian</span>
              </div>
              {isEditing ? (
                  <input 
                    type="text" 
                    value={studentInfo.parentName}
                    onChange={(e) => setStudentInfo({...studentInfo, parentName: e.target.value})}
                    className="block w-full bg-white/20 border border-white/30 rounded px-2 py-1 text-white font-semibold outline-none text-sm"
                  />
                ) : (
                  <p className="font-semibold">{studentInfo.parentName}</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 hide-scrollbar">
        <button
          onClick={() => setActiveTab('academic')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
            activeTab === 'academic' 
              ? 'bg-sky-500 text-white shadow-md shadow-sky-200' 
              : 'bg-white/50 text-slate-600 hover:bg-white/80'
          }`}
        >
          <Assessment fontSize="small" /> Academic Performance
        </button>
        <button
          onClick={() => setActiveTab('attendance')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
            activeTab === 'attendance' 
              ? 'bg-sky-500 text-white shadow-md shadow-sky-200' 
              : 'bg-white/50 text-slate-600 hover:bg-white/80'
          }`}
        >
          <FactCheck fontSize="small" /> Attendance
        </button>
        <button
          onClick={() => setActiveTab('leaves')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
            activeTab === 'leaves' 
              ? 'bg-sky-500 text-white shadow-md shadow-sky-200' 
              : 'bg-white/50 text-slate-600 hover:bg-white/80'
          }`}
        >
          <Feed fontSize="small" /> Leaves
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
          {activeTab === 'academic' && (
            <div className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <GlassStatsCard 
                    title="Average Score"
                    value="91.6%"
                    icon={<Assessment />}
                    color="sky"
                 />
                 <GlassStatsCard 
                    title="Current Rank"
                    value="4th"
                    icon={<Person />}
                    color="indigo"
                 />
               </div>
               <div className="glass-card">
                  <h3 className="px-6 pt-6 text-lg font-black text-slate-800">Recent Exam Results</h3>
                  <div className="p-2">
                    <ResponsiveTable 
                      columns={academicColumns}
                      data={mockAcademic}
                      idKey="id"
                      accent="sky"
                    />
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'attendance' && (
             <div className="space-y-4">
               <div className="glass-card">
                  <h3 className="px-6 pt-6 text-lg font-black text-slate-800">Attendance History</h3>
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

          {activeTab === 'leaves' && (
             <div className="space-y-4">
               <div className="glass-card">
                  <h3 className="px-6 pt-6 text-lg font-black text-slate-800">Leave Requests</h3>
                  <div className="p-2">
                    <ResponsiveTable 
                      columns={leaveColumns}
                      data={mockLeaves}
                      idKey="id"
                      accent="amber"
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

export default AdminStudentView;
