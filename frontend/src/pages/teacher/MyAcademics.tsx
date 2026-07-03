import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Class, MenuBook, ArrowForward, TrendingUp, FactCheck, Feed, People } from '@mui/icons-material';

const dummyClasses = [
  { id: '10A', name: 'Class 10-A', students: 45, attendance: '92%', classTeacher: true, avgMarks: '85%', pendingLeaves: 2 },
  { id: '10B', name: 'Class 10-B', students: 42, attendance: '88%', classTeacher: false, avgMarks: '78%', pendingLeaves: 0 },
];

const initialSubjects = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    class: 'Class 10-A',
    students: 45,
    chapters: [
      { id: 'C1', name: 'Real Numbers', status: 'Completed' },
      { id: 'C2', name: 'Polynomials', status: 'Completed' },
      { id: 'C3', name: 'Pair of Linear Equations', status: 'In Progress' },
    ]
  },
  {
    id: 'science',
    name: 'Science',
    class: 'Class 10-B',
    students: 42,
    chapters: [
      { id: 'C1', name: 'Chemical Reactions', status: 'Completed' },
      { id: 'C2', name: 'Acids, Bases and Salts', status: 'In Progress' },
    ]
  },
];

const MyAcademics = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('classes');

  const calculateProgress = (chapters: any[]) => {
    if (chapters.length === 0) return 0;
    const completed = chapters.filter(c => c.status === 'Completed').length;
    const inProgress = chapters.filter(c => c.status === 'In Progress').length;
    return Math.round(((completed + (inProgress * 0.5)) / chapters.length) * 100);
  };

  return (
    <div className="pb-8 max-w-7xl mx-auto space-y-6">
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-black gradient-text tracking-tight uppercase flex items-center gap-3">
          <Class fontSize="large" className="text-indigo-500" /> Academics Hub
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('classes')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
            activeTab === 'classes'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'bg-white/50 text-slate-600 hover:bg-white/80'
          }`}
        >
          <Class fontSize="small" /> My Assigned Classes
        </button>
        <button
          onClick={() => setActiveTab('subjects')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
            activeTab === 'subjects'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
              : 'bg-white/50 text-slate-600 hover:bg-white/80'
          }`}
        >
          <MenuBook fontSize="small" /> My Subjects
        </button>
      </div>

      <div className="glass-card min-h-[400px]">
        {activeTab === 'classes' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Class</th>
                  <th className="text-center py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Students</th>
                  <th className="text-center py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Avg Attendance</th>
                  <th className="text-center py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Avg Marks</th>
                  <th className="text-center py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Pending Leaves</th>
                  <th className="text-right py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Action</th>
                </tr>
              </thead>
              <tbody>
                {dummyClasses.filter(c => c.classTeacher).map((cls, _idx) => (
                  <tr 
                    key={_idx}
                    className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/classes/${cls.id}`)}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center font-bold">
                          {cls.id}
                        </div>
                        <div>
                          <span className="font-bold text-slate-800 block">{cls.name}</span>
                          {cls.classTeacher && (
                            <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest inline-block mt-1">Class Teacher</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-slate-600">{cls.students}</td>
                    <td className="py-4 px-6 text-center font-bold text-emerald-600">
                      <div className="flex items-center justify-center gap-1"><FactCheck sx={{ fontSize: 14 }} className="text-emerald-400" /> {cls.attendance}</div>
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-sky-600">
                      <div className="flex items-center justify-center gap-1"><TrendingUp sx={{ fontSize: 14 }} className="text-sky-400" /> {cls.avgMarks}</div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {cls.pendingLeaves > 0 ? (
                        <span className="bg-amber-50 text-amber-600 border border-amber-100 px-3 py-1 rounded-full font-bold text-xs flex items-center justify-center gap-1 w-max mx-auto">
                          <Feed sx={{ fontSize: 12 }} /> {cls.pendingLeaves}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-semibold">-</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition-colors flex items-center justify-end w-full">
                        <ArrowForward fontSize="small" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {activeTab === 'subjects' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Subject</th>
                  <th className="text-left py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Class</th>
                  <th className="text-center py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Students</th>
                  <th className="text-left py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Syllabus Progress</th>
                  <th className="text-right py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Action</th>
                </tr>
              </thead>
              <tbody>
                {initialSubjects.map((subj, _idx) => {
                  const progress = calculateProgress(subj.chapters);
                  return (
                    <tr 
                      key={subj.id}
                      className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                      onClick={() => navigate(`/subject/${subj.id}`)}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                            <MenuBook sx={{ fontSize: 16 }} />
                          </div>
                          <span className="font-bold text-slate-800">{subj.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-600">
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">{subj.class}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-1 font-bold text-slate-600">
                          <People sx={{ fontSize: 14 }} className="text-slate-400" /> {subj.students}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <span className="font-black text-emerald-600 w-10">{progress}%</span>
                          <div className="flex-1 max-w-[150px] bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" style={{ width: `${progress}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-emerald-600 hover:bg-emerald-50 p-2 rounded-lg transition-colors flex items-center justify-end w-full">
                          <ArrowForward fontSize="small" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyAcademics;

