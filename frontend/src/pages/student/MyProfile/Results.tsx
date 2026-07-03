import { useState } from 'react';
import { motion } from 'framer-motion';
import { KeyboardArrowDown, Grade } from '@mui/icons-material';

const StudentResults = () => {
  const [selectedExam, setSelectedExam] = useState<string>('');
  
  const exams = ['FA1', 'FA2', 'SA1', 'SA2'];
  
  // Dummy results for the logged-in student
  const dummyResults = [
    { subject: 'Mathematics', marks: 85, max: 100, grade: 'A2' },
    { subject: 'Science', marks: 90, max: 100, grade: 'A1' },
    { subject: 'English', marks: 88, max: 100, grade: 'A2' },
    { subject: 'Social Studies', marks: 78, max: 100, grade: 'B1' },
  ];

  return (
    <div className="pb-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h2 className="text-3xl font-black gradient-text tracking-tight uppercase mb-6">My Results</h2>

        <div className="glass-card p-6 mb-6">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Select Exam Term</label>
          <div className="relative max-w-sm">
            <select 
              className="glass-input w-full px-4 py-3 text-slate-700 font-semibold appearance-none cursor-pointer"
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
            >
              <option value="">-- Choose Exam --</option>
              {exams.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
            <KeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {selectedExam && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <h3 className="text-xl font-black text-slate-800">{selectedExam} Results</h3>
              <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg font-black text-sm border border-emerald-100">Overall: 85.2%</span>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {dummyResults.map((res, idx) => (
                <div key={idx} className="flex justify-between items-center p-5 bg-white/40 rounded-2xl border border-white/60 hover:bg-white/60 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                      <Grade fontSize="small" />
                    </div>
                    <h4 className="font-bold text-slate-800 text-lg">{res.subject}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-indigo-600">{res.marks}<span className="text-sm text-slate-400">/{res.max}</span></p>
                    <p className="text-xs font-bold text-slate-500">Grade: <span className="text-slate-800">{res.grade}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default StudentResults;
