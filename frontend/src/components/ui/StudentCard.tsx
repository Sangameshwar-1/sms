import { EditOutlined, InfoOutlined, AssessmentOutlined, FactCheck } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface StudentCardProps {
  name: string;
  admissionNo: string;
  classSection: string;
  attendancePercent: number;
  onEdit?: () => void;
  onViewDetails?: () => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ 
  name, admissionNo, classSection, attendancePercent, 
  onEdit, onViewDetails 
}) => {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} 
      className="glass-card p-6 flex flex-col h-full group cursor-pointer"
    >
      <div className="flex items-start mb-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center text-xl font-black mr-4 shrink-0 shadow-glow-indigo group-hover:shadow-glow-purple transition-colors">
          {name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-grow">
          <h3 className="text-slate-800 font-black text-lg leading-tight tracking-tight group-hover:text-indigo-600 transition-colors">{name}</h3>
          <p className="text-slate-500 font-semibold text-sm mt-1">{classSection}</p>
          <span className="text-slate-400 text-xs block mt-0.5">Admin No: {admissionNo}</span>
        </div>
        <div className="text-right">
          <span className="text-slate-500 font-bold text-xs block uppercase tracking-wider">Att.</span>
          <span className={`font-extrabold text-xl ${attendancePercent < 75 ? 'text-red-500' : 'text-emerald-500'}`}>
            {attendancePercent}%
          </span>
        </div>
      </div>
      
      <div className="flex justify-between mt-auto pt-4 border-t border-slate-200/50">
        <button onClick={onViewDetails} className="p-2 rounded-xl text-indigo-600 hover:bg-indigo-50 transition-colors" title="View Details">
          <InfoOutlined fontSize="small" />
        </button>
        <button className="p-2 rounded-xl text-emerald-600 hover:bg-emerald-50 transition-colors" title="View Attendance">
          <FactCheck fontSize="small" />
        </button>
        <button className="p-2 rounded-xl text-purple-600 hover:bg-purple-50 transition-colors" title="View Results">
          <AssessmentOutlined fontSize="small" />
        </button>
        <button onClick={onEdit} className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors" title="Edit Profile">
          <EditOutlined fontSize="small" />
        </button>
      </div>
    </motion.div>
  );
};

export default StudentCard;
