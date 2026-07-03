import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { School, MenuBook, ExpandMore, ExpandLess, InsertChartOutlined } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const subjects = [
  { id: 1, name: 'Mathematics', code: 'MAT101', teacher: 'John Doe', hours: 6, progress: 85, lastScore: '92%', nextExam: '15-Aug-2026' },
  { id: 2, name: 'Science', code: 'SCI101', teacher: 'Jane Smith', hours: 5, progress: 70, lastScore: '88%', nextExam: '18-Aug-2026' },
  { id: 3, name: 'English', code: 'ENG101', teacher: 'Emily Davis', hours: 4, progress: 95, lastScore: '95%', nextExam: '20-Aug-2026' },
  { id: 4, name: 'Social Studies', code: 'SST101', teacher: 'Robert Brown', hours: 4, progress: 60, lastScore: '81%', nextExam: '22-Aug-2026' },
  { id: 5, name: 'Computer Science', code: 'CSC101', teacher: 'Alan Turing', hours: 3, progress: 40, lastScore: '98%', nextExam: '25-Aug-2026' },
  { id: 6, name: 'Physical Ed.', code: 'PED101', teacher: 'Mike Tyson', hours: 2, progress: 100, lastScore: 'A+', nextExam: 'N/A' },
];

const AcademicsSummary = () => {
  const { role, activeChild } = useAuth();
  const [expandedSubj, setExpandedSubj] = useState<number | null>(null);
  const [showPrevious, setShowPrevious] = useState(false);

  return (
    <div className="pb-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        
        {/* Top Profile Card */}
        <div className="glass-card p-6 md:p-8 mb-8 bg-gradient-to-br from-indigo-500 to-purple-600 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
              <School sx={{ fontSize: 48 }} />
            </div>
            <div className="text-center md:text-left">
              {role === 'Parent' && activeChild ? (
                <>
                  <h2 className="text-3xl font-black tracking-tight mb-2">{activeChild.name}</h2>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <span className="bg-black/20 px-3 py-1 rounded-lg text-sm font-bold">{activeChild.class}</span>
                    <span className="bg-black/20 px-3 py-1 rounded-lg text-sm font-bold">Academic Year: 2026-2027</span>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-black tracking-tight mb-2">Class 10-A</h2>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <span className="bg-black/20 px-3 py-1 rounded-lg text-sm font-bold">Academic Year: 2026-2027</span>
                    <span className="bg-black/20 px-3 py-1 rounded-lg text-sm font-bold">Class Teacher: John Doe</span>
                    <span className="bg-black/20 px-3 py-1 rounded-lg text-sm font-bold">Room: 101</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase mb-6 flex items-center gap-2">
          <MenuBook className="text-indigo-500" /> Current Subjects
        </h3>

        <div className="glass-card overflow-hidden mb-12">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Subject</th>
                <th className="text-left py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Teacher</th>
                <th className="text-center py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Hours/Week</th>
                <th className="text-center py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Progress</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subj, _idx) => (
                <React.Fragment key={subj.id}>
                  <tr 
                    className={`border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors ${expandedSubj === subj.id ? 'bg-indigo-50/30' : ''}`}
                    onClick={() => setExpandedSubj(expandedSubj === subj.id ? null : subj.id)}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-800 text-base">{subj.name}</span>
                        <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{subj.code}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-600">{subj.teacher}</td>
                    <td className="py-4 px-6 text-center font-bold text-slate-500">{subj.hours}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3 justify-center">
                        <span className="font-black text-indigo-600 w-8 text-right">{subj.progress}%</span>
                        <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div className="h-full rounded-full bg-indigo-500" style={{ width: `${subj.progress}%` }} />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <AnimatePresence>
                    {expandedSubj === subj.id && (
                      <tr>
                        <td colSpan={4} className="p-0 border-b border-slate-100">
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            className="bg-indigo-50/50 p-6 flex flex-wrap gap-8 justify-center overflow-hidden"
                          >
                            <div className="text-center">
                              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 block mb-1">Syllabus Progress</span>
                              <span className="text-2xl font-black text-indigo-700">{subj.progress}%</span>
                            </div>
                            <div className="text-center">
                              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 block mb-1">Last Test Score</span>
                              <span className="text-2xl font-black text-emerald-600">{subj.lastScore}</span>
                            </div>
                            <div className="text-center">
                              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block mb-1">Next Examination</span>
                              <span className="text-xl font-black text-slate-700 flex items-center gap-1 justify-center">
                                <InsertChartOutlined fontSize="small" className="text-slate-400" /> {subj.nextExam}
                              </span>
                            </div>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Previous Classes Accordion */}
        <div className="glass-card overflow-hidden">
          <div 
            className="p-6 flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => setShowPrevious(!showPrevious)}
          >
            <h3 className="text-lg font-black text-slate-700 uppercase tracking-widest flex items-center gap-2">
              Academic History
            </h3>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
              {showPrevious ? <ExpandLess /> : <ExpandMore />}
            </div>
          </div>
          
          <AnimatePresence>
            {showPrevious && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="border-t border-slate-100"
              >
                <div className="divide-y divide-slate-100">
                  <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                    <div>
                      <h4 className="font-black text-lg text-slate-800">Class 9-A <span className="text-xs text-slate-400 font-bold ml-2 tracking-widest uppercase">(2025-2026)</span></h4>
                      <p className="text-sm font-semibold text-slate-600 mt-1">Promoted to Class 10 with distinction in Mathematics and Science.</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-lg font-black text-sm w-max">Final Grade: 89%</span>
                  </div>
                  <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                    <div>
                      <h4 className="font-black text-lg text-slate-800">Class 8-B <span className="text-xs text-slate-400 font-bold ml-2 tracking-widest uppercase">(2024-2025)</span></h4>
                      <p className="text-sm font-semibold text-slate-600 mt-1">Promoted to Class 9.</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-lg font-black text-sm w-max">Final Grade: 84%</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
};

export default AcademicsSummary;
