import { motion } from 'framer-motion';
import { EditOutlined, InfoOutlined, Face } from '@mui/icons-material';

interface ParentCardProps {
  name: string;
  phone: string;
  email: string;
  linkedChildren: { name: string, classSection: string }[];
  onViewDetails?: () => void;
  onEdit?: () => void;
}

const ParentCard: React.FC<ParentCardProps> = ({ name, phone, email, linkedChildren, onViewDetails, onEdit }) => {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} 
      className="glass-card p-6 flex flex-col h-full group cursor-pointer"
    >
      <div className="flex items-start mb-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white flex items-center justify-center text-xl font-black mr-4 shrink-0 shadow-glow-rose group-hover:scale-105 transition-transform">
          {name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-grow">
          <h3 className="text-slate-800 font-black text-lg leading-tight tracking-tight group-hover:text-pink-600 transition-colors">{name}</h3>
          <span className="text-slate-500 text-sm font-semibold">{phone}</span>
          <span className="text-slate-400 text-[11px] block mt-0.5">{email}</span>
        </div>
      </div>
      
      <div className="mb-4 flex-grow bg-pink-50/50 rounded-xl p-3 border border-pink-100/50">
        <span className="text-xs font-bold text-pink-400 uppercase tracking-wider block mb-2 flex items-center gap-1">
          <Face fontSize="small" /> Linked Children
        </span>
        <div className="space-y-2">
          {linkedChildren.map((child, i) => (
            <div key={i} className="flex justify-between items-center">
              <span className="font-bold text-slate-700 text-sm">{child.name}</span>
              <span className="text-xs font-bold bg-white text-pink-600 px-2 py-0.5 rounded shadow-sm border border-pink-100">{child.classSection}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-auto pt-4 border-t border-slate-900/5">
        <button onClick={onViewDetails} className="p-2 rounded-full text-indigo-500 bg-indigo-50 hover:bg-indigo-100 transition-colors" title="View Details">
          <InfoOutlined fontSize="small" />
        </button>
        <button onClick={onEdit} className="p-2 rounded-full text-pink-500 bg-pink-50 hover:bg-pink-100 transition-colors" title="Edit Profile">
          <EditOutlined fontSize="small" />
        </button>
      </div>
    </motion.div>
  );
};

export default ParentCard;
