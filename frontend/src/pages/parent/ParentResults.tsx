import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grade, Assessment, ExpandLess, ExpandMore, BarChart } from '@mui/icons-material';
import GradeDistributionGraph from '../../components/shared/GradeDistributionGraph';
import { useAuth } from '../../context/AuthContext';

const examResultsData = {
  'FA1': {
    examName: 'Formative Assessment 1 (FA1)',
    date: 'July 2026',
    subjects: [
      { name: 'Mathematics', marks: 45, max: 50, color: 'from-sky-400 to-indigo-500' },
      { name: 'Science', marks: 42, max: 50, color: 'from-emerald-400 to-teal-500' },
      { name: 'English', marks: 40, max: 50, color: 'from-amber-400 to-orange-500' },
      { name: 'Social Studies', marks: 38, max: 50, color: 'from-rose-400 to-pink-500' }
    ]
  },
  'SA1': {
    examName: 'Summative Assessment 1 (SA1)',
    date: 'October 2026',
    subjects: [
      { name: 'Mathematics', marks: 88, max: 100, color: 'from-sky-400 to-indigo-500' },
      { name: 'Science', marks: 92, max: 100, color: 'from-emerald-400 to-teal-500' },
      { name: 'English', marks: 78, max: 100, color: 'from-amber-400 to-orange-500' },
      { name: 'Social Studies', marks: 85, max: 100, color: 'from-rose-400 to-pink-500' }
    ]
  }
};

const calculateGrade = (percentage: number) => {
  if (percentage >= 91) return 'A1';
  if (percentage >= 81) return 'A2';
  if (percentage >= 71) return 'B1';
  if (percentage >= 61) return 'B2';
  if (percentage >= 51) return 'C1';
  if (percentage >= 41) return 'C2';
  if (percentage >= 33) return 'D';
  return 'E';
};

const ParentResults = () => {
  const { activeChild } = useAuth();
  const [selectedYear, setSelectedYear] = useState('10');
  const [expandedExam, setExpandedExam] = useState<string | null>('SA1');
  const [expandedExamGraph, setExpandedExamGraph] = useState<string | null>(null);
  
  if (!activeChild) return null;
  
  return (
    <div className="pb-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black gradient-text tracking-tight uppercase flex items-center gap-3">
            <Grade fontSize="large" className="text-indigo-500" /> {activeChild.name}'s Report Card
          </h2>
          <div className="flex gap-2">
            <select 
              className="glass-input px-4 py-2 font-bold text-sm text-slate-700 bg-white/50"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="10">Class 10 (Current)</option>
              <option value="9">Class 9 (2024-25)</option>
              <option value="8">Class 8 (2023-24)</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {Object.keys(examResultsData).map((examKey) => {
            const currentData = examResultsData[examKey as keyof typeof examResultsData];
            const isExpanded = expandedExam === examKey;
            
            const totalMarks = currentData.subjects.reduce((acc, curr) => acc + curr.marks, 0);
            const totalMax = currentData.subjects.reduce((acc, curr) => acc + curr.max, 0);
            const overallPercentage = Math.round((totalMarks / totalMax) * 100);
            const overallGrade = calculateGrade(overallPercentage);

            return (
              <div key={examKey} className="glass-card overflow-hidden border-none shadow-sm">
                <div 
                  className={`p-6 cursor-pointer flex justify-between items-center transition-colors ${isExpanded ? 'bg-indigo-50/50' : 'hover:bg-slate-50/50'}`}
                  onClick={() => setExpandedExam(isExpanded ? null : examKey)}
                >
                  <div>
                    <h3 className="font-black text-xl text-slate-800">{currentData.examName}</h3>
                    <p className="text-xs font-bold text-slate-500">{currentData.date}</p>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6">
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        setExpandedExamGraph(expandedExamGraph === examKey ? null : examKey); 
                      }}
                      className={`p-2 rounded-xl transition-colors ${
                        expandedExamGraph === examKey ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 border border-indigo-100'
                      }`}
                      title="View Class Performance"
                    >
                      <BarChart fontSize="small" />
                    </button>
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Score</p>
                      <p className="font-black text-indigo-600">{overallPercentage}%</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-400">
                      {isExpanded ? <ExpandLess /> : <ExpandMore />}
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  <GradeDistributionGraph isVisible={expandedExamGraph === examKey} />
                </AnimatePresence>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 border-t border-slate-100 bg-white/30">
                        {/* Overall Stats Banner */}
                        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 rounded-2xl p-6 mb-6 text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-md relative overflow-hidden">
                          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                          <div>
                            <p className="text-indigo-100 font-bold">Total Score: {totalMarks} / {totalMax}</p>
                          </div>
                          <div className="flex gap-4">
                            <div className="text-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                              <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">Percentage</p>
                              <p className="text-2xl font-black text-white">{overallPercentage}%</p>
                            </div>
                            <div className="text-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                              <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">Grade</p>
                              <p className="text-2xl font-black text-amber-300">{overallGrade}</p>
                            </div>
                          </div>
                        </div>

                        {/* Subject wise marks */}
                        <div>
                          <h4 className="font-black text-sm text-slate-700 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Assessment className="text-indigo-500" fontSize="small" /> Subject Breakdown
                          </h4>
                          <div className="space-y-4">
                            {currentData.subjects.map((sub, idx) => {
                              const width = `${(sub.marks / sub.max) * 100}%`;
                              const subGrade = calculateGrade((sub.marks / sub.max) * 100);
                              return (
                                <div key={idx} className="group">
                                  <div className="flex justify-between items-end mb-1">
                                    <h5 className="font-bold text-slate-700 text-sm">{sub.name}</h5>
                                    <div className="text-right flex items-center gap-2">
                                      <span className="font-black text-slate-400 text-xs">Grade {subGrade}</span>
                                      <span className="font-black text-slate-800">{sub.marks} <span className="text-[10px] text-slate-400 font-bold">/ {sub.max}</span></span>
                                    </div>
                                  </div>
                                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden shadow-inner">
                                    <motion.div 
                                      initial={{ width: 0 }} 
                                      animate={{ width }} 
                                      transition={{ duration: 1, ease: "easeOut" }}
                                      className={`h-full rounded-full bg-gradient-to-r ${sub.color}`}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </motion.div>
    </div>
  );
};

export default ParentResults;
