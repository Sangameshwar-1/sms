import { motion } from 'framer-motion';
import { EditOutlined, InfoOutlined, BookOutlined } from '@mui/icons-material';

interface TeacherCardProps {
  name: string;
  teacherId: string;
  subjects: string[];
  classes: string[];
  onViewDetails?: () => void;
  onEdit?: () => void;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ name, teacherId, subjects, classes, onViewDetails, onEdit }) => {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} 
      className="glass-card p-6 flex flex-col h-full group cursor-pointer"
    >
      <div className="flex items-start mb-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-xl font-black mr-4 shrink-0 shadow-glow-rose group-hover:shadow-glow-purple transition-colors">
          {name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-grow">
          <h3 className="text-slate-800 font-black text-lg leading-tight tracking-tight group-hover:text-purple-600 transition-colors">{name}</h3>
          <span className="text-[10px] text-purple-500 font-bold tracking-widest uppercase mt-1 block">ID: {teacherId}</span>
        </div>
      </div>
      
      <div className="mb-4 space-y-2 flex-grow">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Subjects</span>
          <div className="flex flex-wrap gap-1">
            {subjects.map((sub, i) => (
              <span key={i} className="text-xs font-bold bg-purple-50 text-purple-600 px-2 py-0.5 rounded-md">{sub}</span>
            ))}
          </div>
        </div>
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Classes</span>
          <div className="flex flex-wrap gap-1">
            {classes.map((cls, i) => (
              <span key={i} className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">{cls}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-auto pt-4 border-t border-slate-900/5">
        <button onClick={onViewDetails} className="p-2 rounded-full text-indigo-500 bg-indigo-50 hover:bg-indigo-100 transition-colors" title="View Details">
          <InfoOutlined fontSize="small" />
        </button>
        <button className="p-2 rounded-full text-slate-400 bg-slate-50 hover:bg-slate-100 transition-colors" title="Assign Subjects">
          <BookOutlined fontSize="small" />
        </button>
        <button onClick={onEdit} className="p-2 rounded-full text-purple-500 bg-purple-50 hover:bg-purple-100 transition-colors" title="Edit Profile">
          <EditOutlined fontSize="small" />
        </button>
      </div>
    </motion.div>
  );
};

export default TeacherCard;
