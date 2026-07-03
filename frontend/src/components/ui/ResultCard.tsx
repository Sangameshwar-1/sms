import { motion } from 'framer-motion';

interface ResultCardProps {
  subject: string;
  marks: number;
  maxMarks?: number;
  grade?: string;
  date?: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ subject, marks, maxMarks = 100, grade, date }) => {
  const percentage = (marks / maxMarks) * 100;
  
  let colorClass = 'emerald';
  if (percentage < 40) colorClass = 'red';
  else if (percentage < 60) colorClass = 'amber';
  else if (percentage < 80) colorClass = 'indigo';

  return (
    <motion.div whileHover={{ scale: 1.02 }} className="glass-card p-5 flex items-center justify-between">
      <div>
        <h4 className="font-black text-slate-800 text-lg tracking-tight">{subject}</h4>
        {date && <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1">{date}</p>}
      </div>
      <div className="flex items-center gap-4">
        {grade && (
          <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg bg-${colorClass}-100 text-${colorClass}-600 shadow-sm border border-${colorClass}-200`}>
            {grade}
          </span>
        )}
        <div className="text-right">
          <span className={`font-black text-3xl text-${colorClass}-500 tracking-tighter`}>{marks}</span>
          <span className="text-sm font-bold text-slate-400">/{maxMarks}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
