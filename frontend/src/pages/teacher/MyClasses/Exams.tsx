import { useState } from 'react';
import { motion } from 'framer-motion';
import { KeyboardArrowDown, Edit, Publish } from '@mui/icons-material';

const ExamHierarchy = () => {
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedExam, setSelectedExam] = useState<string>('');

  const classes = ['10-A', '10-B', '9-A'];
  const exams = ['FA1', 'FA2', 'SA1', 'SA2'];
  const subjects = ['Mathematics', 'Science', 'English', 'Social Studies'];

  return (
    <div className="pb-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h2 className="text-3xl font-black gradient-text tracking-tight uppercase mb-6">Manage Exams</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="glass-card p-6">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Select Class</label>
            <div className="relative">
              <select 
                className="glass-input w-full px-4 py-3 text-slate-700 font-semibold appearance-none cursor-pointer"
                value={selectedClass}
                onChange={(e) => { setSelectedClass(e.target.value); setSelectedExam(''); }}
              >
                <option value="">-- Choose Class --</option>
                {classes.map(c => <option key={c} value={c}>Class {c}</option>)}
              </select>
              <KeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className={`glass-card p-6 transition-all duration-300 ${!selectedClass ? 'opacity-50 pointer-events-none' : ''}`}>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Select Exam</label>
            <div className="relative">
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
        </div>

        {selectedClass && selectedExam && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">
              {selectedExam} Subjects <span className="text-sm font-semibold text-slate-500 ml-2">({selectedClass})</span>
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              {subjects.map((subject, idx) => (
                <div key={idx} className="flex flex-col md:flex-row justify-between items-start md:items-center p-5 bg-white/40 rounded-2xl border border-white/60 hover:bg-white/60 transition-colors group">
                  <div className="mb-4 md:mb-0">
                    <h4 className="font-bold text-slate-800 text-lg">{subject}</h4>
                    <p className="text-xs font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded inline-block mt-1">Pending Entry</p>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-4 py-2 rounded-xl flex items-center justify-center gap-2 font-bold text-sm bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                      <Edit fontSize="small" /> Enter Marks
                    </button>
                    <button className="flex-1 md:flex-none px-4 py-2 rounded-xl flex items-center justify-center gap-2 font-bold text-sm bg-slate-100 text-slate-400 hover:bg-slate-200 transition-colors">
                      <Publish fontSize="small" /> Publish
                    </button>
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

export default ExamHierarchy;
