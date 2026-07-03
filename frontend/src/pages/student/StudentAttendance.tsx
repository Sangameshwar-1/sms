import { motion } from 'framer-motion';
import { FactCheck } from '@mui/icons-material';
import AttendanceCalendar from '../../components/AttendanceCalendar';

const dummyRecords = [
  { date: '2026-06-01', status: 'present' as const },
  { date: '2026-06-02', status: 'present' as const },
  { date: '2026-06-03', status: 'absent' as const },
  { date: '2026-06-04', status: 'leave' as const },
  { date: '2026-06-05', status: 'holiday' as const },
];

const StudentAttendance = () => {
  return (
    <div className="pb-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black gradient-text tracking-tight uppercase flex items-center gap-3">
            <FactCheck fontSize="large" className="text-emerald-500" /> My Daily Attendance
          </h2>
        </div>
        
        <div className="glass-card p-6 border-t-4 border-t-emerald-500 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-black text-xl text-slate-800">Class 10-A</h3>
              <p className="text-sm font-bold text-slate-500">Class Teacher: Mr. Ramesh</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-emerald-600">92%</span>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Overall Attendance</p>
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mb-2 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 w-[92%]" />
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="p-4 bg-slate-50/50 border-b border-slate-100">
            <h3 className="font-black text-lg text-slate-800">Attendance Calendar</h3>
          </div>
          <div className="p-6 bg-white/50">
            <AttendanceCalendar month="June" year={2026} records={dummyRecords} isTeacher={false} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentAttendance;
