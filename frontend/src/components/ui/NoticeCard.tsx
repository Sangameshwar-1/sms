import { motion } from 'framer-motion';
import { Feed } from '@mui/icons-material';

interface NoticeCardProps {
  title: string;
  content: string;
  date: string;
  author: string;
  isImportant?: boolean;
}

const NoticeCard: React.FC<NoticeCardProps> = ({ title, content, date, author, isImportant }) => {
  return (
    <motion.div whileHover={{ y: -5 }} className={`glass-card p-6 border-l-4 ${isImportant ? 'border-l-rose-500 shadow-glow-rose' : 'border-l-indigo-500'}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-black text-slate-800 text-lg flex items-center gap-2 tracking-tight">
          {isImportant && <Feed className="text-rose-500" fontSize="small" />}
          {title}
        </h3>
        <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">{date}</span>
      </div>
      <p className="text-slate-600 text-sm mb-4">{content}</p>
      <div className="text-xs font-semibold text-slate-400">
        Posted by <span className="text-slate-600">{author}</span>
      </div>
    </motion.div>
  );
};

export default NoticeCard;
