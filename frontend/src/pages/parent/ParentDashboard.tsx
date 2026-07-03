import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Face, Timeline, School, EventAvailable, WarningAmber, Feed } from '@mui/icons-material';

const colorMap: Record<string, string> = {
  indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  sky: 'bg-sky-50 text-sky-600 border-sky-100',
  purple: 'bg-purple-50 text-purple-600 border-purple-100',
  rose: 'bg-rose-50 text-rose-600 border-rose-100',
  amber: 'bg-amber-50 text-amber-600 border-amber-100',
};

const ParentDashboard = () => {
  const navigate = useNavigate();
  const { activeChild, childrenList } = useAuth();

  if (!childrenList || childrenList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Face className="text-slate-200 text-6xl mb-4" />
        <h3 className="text-xl font-black text-slate-700">No Children Linked</h3>
        <p className="text-slate-500 mt-2">Please contact the administration to link your children to your account.</p>
      </div>
    );
  }

  if (!activeChild) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center">
          <Face className="text-indigo-500 text-3xl" />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-800">Select a Child to View Dashboard</h3>
          <p className="text-slate-500 mt-2 font-medium max-w-sm mx-auto">You need to select which child's profile you want to view from the top navigation bar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-8 max-w-7xl mx-auto space-y-8">
      {/* ─── Compact Stat Strip ─── */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-0 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <button onClick={() => navigate('/parent/attendance')} className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors text-left group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorMap.emerald}`}>
              <Timeline fontSize="small" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Attendance</p>
              <p className="text-2xl font-black text-slate-800 leading-none mt-0.5">94%</p>
            </div>
          </button>
          
          <button onClick={() => navigate('/parent/results')} className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors text-left group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorMap.purple}`}>
              <School fontSize="small" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg Grade</p>
              <p className="text-2xl font-black text-slate-800 leading-none mt-0.5">A-</p>
            </div>
          </button>

          <button className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors text-left group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorMap.amber}`}>
              <WarningAmber fontSize="small" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Absences</p>
              <p className="text-2xl font-black text-slate-800 leading-none mt-0.5">2</p>
            </div>
          </button>

          <button className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors text-left group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorMap.sky}`}>
              <EventAvailable fontSize="small" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Next Exam</p>
              <p className="text-2xl font-black text-sky-600 leading-none mt-0.5">3d</p>
            </div>
          </button>
        </div>
      </motion.div>

      {/* ─── Bottom Split ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: Schedule & Results */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Timeline fontSize="small" className="text-emerald-500" />
                <h3 className="font-black text-sm text-slate-700 uppercase tracking-widest">Today's Schedule ({activeChild.name})</h3>
              </div>
            </div>
            <div className="divide-y divide-slate-50 relative before:absolute before:inset-y-0 before:left-7 before:w-px before:bg-slate-100">
              {[
                { time: '09:00 AM', subject: 'Mathematics', teacher: 'Mr. Sharma' },
                { time: '10:00 AM', subject: 'Science', teacher: 'Mrs. Gupta' },
                { time: '11:30 AM', subject: 'English', teacher: 'Ms. Davis' },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-6 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                  <div className="w-4 h-4 rounded-full bg-white border-4 border-emerald-500 relative z-10 shadow-sm" />
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 text-sm">{c.subject}</p>
                    <p className="text-xs font-semibold text-slate-400">{c.teacher}</p>
                  </div>
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded uppercase tracking-wider">{c.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <School fontSize="small" className="text-purple-500" />
                <h3 className="font-black text-sm text-slate-700 uppercase tracking-widest">Recent Performance</h3>
              </div>
              <button onClick={() => navigate('/parent/results')} className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
            </div>
            <div className="divide-y divide-slate-50">
              {[
                { exam: 'Unit Test 1', subject: 'Mathematics', score: '45/50', grade: 'A' },
                { exam: 'Unit Test 1', subject: 'Science', score: '42/50', grade: 'A-' },
              ].map((result, i) => (
                <div key={i} className="flex justify-between items-center px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate('/parent/results')}>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{result.subject}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{result.exam}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-800">{result.score}</p>
                    <p className="text-[10px] font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded uppercase tracking-wider inline-block mt-0.5">Grade {result.grade}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Side: Notices & Exams */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Feed fontSize="small" className="text-rose-500" />
                <h3 className="font-black text-sm text-slate-700 uppercase tracking-widest">Recent Notices</h3>
              </div>
            </div>
            <div className="divide-y divide-slate-50">
              {[
                { title: 'Holiday on Friday', body: 'School closed due to local festival.', type: 'General' },
                { title: 'Fee Payment Reminder', body: 'Last date for Q2 fees is 30th June.', type: 'Finance' },
              ].map((n, i) => (
                <div key={i} className="px-5 py-3.5 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate('/notices')}>
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-slate-800 text-sm">{n.title}</p>
                    <span className="text-[10px] font-black bg-rose-50 text-rose-600 px-2 py-0.5 rounded uppercase tracking-wider flex-shrink-0">{n.type}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5 truncate">{n.body}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <EventAvailable fontSize="small" className="text-sky-500" />
                <h3 className="font-black text-sm text-slate-700 uppercase tracking-widest">Upcoming Exams</h3>
              </div>
            </div>
            <div className="divide-y divide-slate-50">
              {[
                { name: 'FA1 Mathematics', date: '15-Jul-2026', days: '3 days' },
                { name: 'FA1 Science', date: '17-Jul-2026', days: '5 days' },
              ].map((exam, i) => (
                <div key={i} className="flex justify-between items-center px-5 py-4 hover:bg-slate-50 transition-colors">
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{exam.name}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{exam.date}</p>
                  </div>
                  <span className="text-[10px] font-black bg-sky-50 text-sky-600 px-2 py-1 rounded uppercase tracking-wider border border-sky-100">{exam.days}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
