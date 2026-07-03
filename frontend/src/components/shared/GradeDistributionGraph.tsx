import React from 'react';
import { motion } from 'framer-motion';

interface GradeDistributionGraphProps {
  isVisible: boolean;
}

const GradeDistributionGraph: React.FC<GradeDistributionGraphProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ height: 0, opacity: 0 }} 
      animate={{ height: 'auto', opacity: 1 }} 
      exit={{ height: 0, opacity: 0 }}
      className="border-t border-slate-100 bg-slate-50/50 overflow-hidden w-full"
      onClick={(e) => e.stopPropagation()} // Prevent triggering parent clicks
    >
      <div className="p-5">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Grade Distribution</h4>
        <div className="flex items-end gap-2 h-32 w-full max-w-sm mx-auto">
          {[
            { grade: 'A+', count: 12, height: 'h-[80%]', color: 'bg-emerald-400' },
            { grade: 'A', count: 18, height: 'h-[100%]', color: 'bg-emerald-300' },
            { grade: 'B+', count: 8, height: 'h-[60%]', color: 'bg-indigo-400' },
            { grade: 'B', count: 5, height: 'h-[40%]', color: 'bg-indigo-300' },
            { grade: 'C', count: 2, height: 'h-[20%]', color: 'bg-amber-400' },
          ].map((bar, i) => (
            <div key={i} className="flex flex-col items-center flex-1 gap-2 group">
              <span className="text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">{bar.count}</span>
              <div className={`w-full rounded-t-md ${bar.height} ${bar.color} hover:opacity-80 transition-opacity`}></div>
              <span className="text-[9px] font-black text-slate-500 uppercase">{bar.grade}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GradeDistributionGraph;
