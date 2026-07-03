import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Assessment, ArrowForward, TrendingUp, EmojiEvents, BarChart } from '@mui/icons-material';
import GradeDistributionGraph from '../../components/shared/GradeDistributionGraph';

const examsData = [
  { id: 1, class: 'Class 10-A', subject: 'Mathematics', subjectId: 'mathematics', examName: 'FA1', date: '15-Jul-2026', avgScore: 82, highest: 98, status: 'Completed' },
  { id: 2, class: 'Class 10-A', subject: 'Mathematics', subjectId: 'mathematics', examName: 'SA1', date: '15-Dec-2026', avgScore: null, highest: null, status: 'Upcoming' },
  { id: 3, class: 'Class 10-B', subject: 'Science', subjectId: 'science', examName: 'FA1', date: '16-Jul-2026', avgScore: 78, highest: 95, status: 'Completed' },
];

const TeacherExams = () => {
  const navigate = useNavigate();
  const [expandedExamGraph, setExpandedExamGraph] = useState<number | null>(null);

  return (
    <div className="pb-8 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black gradient-text tracking-tight uppercase flex items-center gap-3">
            <Assessment fontSize="large" className="text-indigo-500" /> Exam Management
          </h2>
        </div>
        <div className="mb-8 bg-white/40 p-4 rounded-xl border border-white/60">
          <p className="text-sm font-bold text-slate-500">Monitor class performance and manage marks entry for your assigned subjects.</p>
        </div>

        <div className="glass-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Exam</th>
                <th className="text-left py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Subject & Class</th>
                <th className="text-center py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Status</th>
                <th className="text-center py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Class Avg</th>
                <th className="text-center py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Highest</th>
                <th className="text-right py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Action</th>
              </tr>
            </thead>
            <tbody>
              {examsData.map((exam, _idx) => (
                <React.Fragment key={exam.id}>
                  <tr 
                    className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/classes/${exam.class.split(' ')[1]}/exams/${exam.id}`)}
                  >
                    <td className="py-4 px-6">
                      <span className="font-black text-slate-800 text-lg block">{exam.examName}</span>
                      <span className="text-xs font-bold text-slate-400">{exam.date}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-slate-700 block">{exam.subject}</span>
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-wider">{exam.class}</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        exam.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>
                        {exam.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {exam.avgScore ? (
                        <span className="font-black text-indigo-600 flex items-center justify-center gap-1"><TrendingUp fontSize="inherit" /> {exam.avgScore}%</span>
                      ) : (
                        <span className="text-slate-300 font-bold">-</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {exam.highest ? (
                        <span className="font-black text-slate-700 flex items-center justify-center gap-1"><EmojiEvents fontSize="inherit" className="text-amber-500" /> {exam.highest}%</span>
                      ) : (
                        <span className="text-slate-300 font-bold">-</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setExpandedExamGraph(expandedExamGraph === exam.id ? null : exam.id); 
                          }}
                          className={`p-1.5 rounded-lg transition-colors ${
                            expandedExamGraph === exam.id ? 'bg-indigo-600 text-white shadow-md' : 'text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 border border-indigo-100'
                          }`}
                          title="View Grade Distribution"
                        >
                          <BarChart fontSize="small" />
                        </button>
                        <button className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition-colors flex items-center gap-2">
                          <span className="text-xs font-bold hidden sm:inline">{exam.status === 'Completed' ? 'View Details' : 'Enter Marks'}</span>
                          <ArrowForward fontSize="small" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <AnimatePresence>
                    {expandedExamGraph === exam.id && (
                      <tr>
                        <td colSpan={6} className="p-0 border-b border-slate-100 bg-slate-50/30">
                          <GradeDistributionGraph isVisible={true} />
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default TeacherExams;
