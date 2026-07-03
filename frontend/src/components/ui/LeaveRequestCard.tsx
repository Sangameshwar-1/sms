import { motion } from 'framer-motion';
import { PendingActions, CheckCircle, Cancel } from '@mui/icons-material';

interface LeaveRequestCardProps {
  studentName?: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  onApprove?: () => void;
  onReject?: () => void;
}

const LeaveRequestCard: React.FC<LeaveRequestCardProps> = ({ studentName, startDate, endDate, reason, status, onApprove, onReject }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Approved': return 'text-emerald-500 bg-emerald-50 border-emerald-100';
      case 'Rejected': return 'text-red-500 bg-red-50 border-red-100';
      default: return 'text-amber-500 bg-amber-50 border-amber-100';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'Approved': return <CheckCircle fontSize="small" />;
      case 'Rejected': return <Cancel fontSize="small" />;
      default: return <PendingActions fontSize="small" />;
    }
  };

  return (
    <motion.div whileHover={{ y: -5 }} className="glass-card p-6 flex flex-col h-full group">
      <div className="flex justify-between items-start mb-3 border-b border-slate-200/50 pb-4">
        <div>
          {studentName && <h4 className="font-black text-slate-800 text-lg leading-tight tracking-tight group-hover:text-indigo-600 transition-colors">{studentName}</h4>}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-bold text-slate-600">{startDate}</span>
            <span className="text-slate-300 text-xs">to</span>
            <span className="text-sm font-bold text-slate-600">{endDate}</span>
          </div>
        </div>
        <div className={`px-3 py-1.5 rounded-lg border flex items-center gap-1 font-bold text-xs ${getStatusColor()}`}>
          {getStatusIcon()} {status}
        </div>
      </div>
      <p className="text-slate-600 text-sm mb-4 flex-grow">{reason}</p>
      
      {status === 'Pending' && onApprove && onReject && (
        <div className="flex gap-2 mt-auto pt-4 border-t border-slate-200/50">
          <button onClick={onApprove} className="glass-button flex-1 bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-bold py-2 hover:shadow-glow-emerald border-0">
            Approve
          </button>
          <button onClick={onReject} className="glass-button flex-1 bg-gradient-to-r from-red-400 to-rose-500 text-white font-bold py-2 hover:shadow-glow-rose border-0">
            Reject
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default LeaveRequestCard;
