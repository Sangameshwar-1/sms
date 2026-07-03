import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, ArrowBack, Edit, Save, People, Assessment, AccessTime, Person } from '@mui/icons-material';
import { ResponsiveTable, GlassStatsCard, FilterPanel } from '../../../components/ui';
import type { TableColumn } from '../../../components/ui';

// Mock Data
const mockEnrolledStudents = [
  { id: 1, name: 'Rahul Sharma', roll: '101', class: '10-A', performance: 'A+' },
  { id: 2, name: 'Priya Gupta', roll: '102', class: '10-A', performance: 'A' },
  { id: 3, name: 'Amit Verma', roll: '103', class: '10-A', performance: 'B+' },
  { id: 4, name: 'Arjun Kumar', roll: '201', class: '10-B', performance: 'A' },
];

const mockSubjectPerformance = [
  { id: 1, class: '10-A', avgScore: '88%', highest: '98%', lowest: '65%' },
  { id: 2, class: '10-B', avgScore: '82%', highest: '95%', lowest: '55%' },
];

const AdminSubjectView = () => {
  const { id: _id } = useParams();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('enrolled');
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState('');
  
  const [subjectDetails, setSubjectDetails] = useState({
    name: 'Mathematics',
    code: 'MATH101',
    assignedTeacher: 'Mrs. S. Patel',
    hoursPerWeek: '6 hours',
    department: 'Science & Math',
  });

  const studentColumns: TableColumn[] = [
    { key: 'roll', label: 'Roll No.' },
    { key: 'name', label: 'Student Name' },
    { key: 'class', label: 'Class' },
    { key: 'performance', label: 'Performance', render: (val) => <span className="font-bold text-indigo-600">{val}</span> },
  ];

  const performanceColumns: TableColumn[] = [
    { key: 'class', label: 'Class' },
    { key: 'avgScore', label: 'Average Score', render: (val) => <span className="font-bold text-emerald-600">{val}</span> },
    { key: 'highest', label: 'Highest Score' },
    { key: 'lowest', label: 'Lowest Score' },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Real app would call API
  };

  const filteredStudents = mockEnrolledStudents.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="pb-8 max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <button 
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold text-sm transition-colors"
        >
          <ArrowBack fontSize="small" /> Back
        </button>

        {/* Header Card */}
        <div className="glass-card p-6 md:p-8 bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-glow-emerald border-none relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner">
                <Book sx={{ fontSize: 32 }} />
              </div>
              <div>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20 mb-1 inline-block">
                  Subject Profile
                </span>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={subjectDetails.name}
                    onChange={(e) => setSubjectDetails({...subjectDetails, name: e.target.value})}
                    className="block w-full bg-white/20 border border-white/30 rounded px-2 py-1 text-white font-black text-2xl outline-none focus:border-white"
                  />
                ) : (
                  <h2 className="text-3xl font-black tracking-tight">{subjectDetails.name}</h2>
                )}
                <p className="text-emerald-100 font-bold mt-1">Code: {subjectDetails.code} • {subjectDetails.department}</p>
              </div>
            </div>
            
            <button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="glass-button bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              {isEditing ? <><Save fontSize="small" /> Save Changes</> : <><Edit fontSize="small" /> Edit Details</>}
            </button>
          </div>
          
          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 relative z-10">
            <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1 opacity-70">
                <Person fontSize="small" /> <span className="text-xs font-bold uppercase tracking-wider">Assigned Teacher</span>
              </div>
              {isEditing ? (
                  <input 
                    type="text" 
                    value={subjectDetails.assignedTeacher}
                    onChange={(e) => setSubjectDetails({...subjectDetails, assignedTeacher: e.target.value})}
                    className="block w-full bg-white/20 border border-white/30 rounded px-2 py-1 text-white font-semibold outline-none text-sm"
                  />
                ) : (
                  <p className="font-semibold text-lg">{subjectDetails.assignedTeacher}</p>
              )}
            </div>
            
            <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1 opacity-70">
                <AccessTime fontSize="small" /> <span className="text-xs font-bold uppercase tracking-wider">Hours Per Week</span>
              </div>
              {isEditing ? (
                  <input 
                    type="text" 
                    value={subjectDetails.hoursPerWeek}
                    onChange={(e) => setSubjectDetails({...subjectDetails, hoursPerWeek: e.target.value})}
                    className="block w-full bg-white/20 border border-white/30 rounded px-2 py-1 text-white font-semibold outline-none text-sm"
                  />
                ) : (
                  <p className="font-semibold text-lg">{subjectDetails.hoursPerWeek}</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 hide-scrollbar">
        <button
          onClick={() => setActiveTab('enrolled')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
            activeTab === 'enrolled' 
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200' 
              : 'bg-white/50 text-slate-600 hover:bg-white/80'
          }`}
        >
          <People fontSize="small" /> Enrolled Students
        </button>
        <button
          onClick={() => setActiveTab('performance')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
            activeTab === 'performance' 
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200' 
              : 'bg-white/50 text-slate-600 hover:bg-white/80'
          }`}
        >
          <Assessment fontSize="small" /> Subject Performance
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
          {activeTab === 'enrolled' && (
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
                  accent="emerald"
                />
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
             <div className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <GlassStatsCard 
                    title="Overall Subject Average"
                    value="85%"
                    icon={<Assessment />}
                    color="emerald"
                 />
                 <GlassStatsCard 
                    title="Total Enrolled"
                    value={mockEnrolledStudents.length.toString()}
                    icon={<People />}
                    color="teal"
                 />
               </div>
               <div className="glass-card">
                  <h3 className="px-6 pt-6 text-lg font-black text-slate-800">Class-wise Performance</h3>
                  <div className="p-2">
                    <ResponsiveTable 
                      columns={performanceColumns}
                      data={mockSubjectPerformance}
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

export default AdminSubjectView;
