import { useState } from 'react';
import { ExpandMore, Subject, Assessment } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface ExamAccordionProps {
  className: string;
  examType: string;
  subjects: { name: string, marks?: number, maxMarks?: number }[];
}

const ExamAccordion: React.FC<ExamAccordionProps> = ({ className, examType, subjects }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="glass-card overflow-hidden mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/40 transition-colors"
      >
        <div className="flex flex-col">
          <h3 className="text-slate-800 font-extrabold text-lg">{examType}</h3>
          <span className="text-indigo-500 font-bold text-sm mt-0.5">{className}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ExpandMore className="text-slate-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white/40 border-t border-slate-900/5"
          >
            {subjects.map((sub, idx) => (
              <div key={idx} className={`flex items-center justify-between p-4 px-6 ${idx < subjects.length - 1 ? 'border-b border-slate-900/5' : ''}`}>
                <div className="flex items-center gap-3">
                  <Subject className="text-slate-400" fontSize="small" />
                  <span className="font-bold text-slate-700">{sub.name}</span>
                </div>
                {sub.marks !== undefined ? (
                  <div className="flex items-center gap-2">
                    <Assessment className="text-emerald-500" fontSize="small" />
                    <span className="font-extrabold text-lg text-emerald-500">
                      {sub.marks}
                      <span className="text-xs font-semibold text-slate-400 ml-1">/ {sub.maxMarks || 100}</span>
                    </span>
                  </div>
                ) : (
                  <span className="italic text-sm font-semibold text-slate-400">Pending</span>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExamAccordion;
