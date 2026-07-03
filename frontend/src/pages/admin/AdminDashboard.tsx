import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  School, Groups, FamilyRestroom, EventAvailable,
  Feed, AssignmentInd, ArrowForward, FactCheck,
  MenuBook, HowToReg, NotificationsActive
} from '@mui/icons-material';

const colorMap: Record<string, string> = {
  indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  purple: 'bg-purple-50 text-purple-600 border-purple-100',
  pink: 'bg-pink-50 text-pink-600 border-pink-100',
  emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  amber: 'bg-amber-50 text-amber-600 border-amber-100',
  rose: 'bg-rose-50 text-rose-600 border-rose-100',
};

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-8 max-w-7xl mx-auto space-y-8">
      {/* ─── Compact Stat Strip ─── */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-0 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {[
            { label: 'Students', value: '400', icon: School, color: 'indigo', route: '/roles/students' },
            { label: 'Teachers', value: '25', icon: Groups, color: 'purple', route: '/roles/teachers' },
            { label: 'Parents', value: '400', icon: FamilyRestroom, color: 'pink', route: '/roles/parents' },
          ].map((s) => (
            <button key={s.label} onClick={() => navigate(s.route)} className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors text-left group">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorMap[s.color]}`}>
                <s.icon fontSize="small" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
                <p className="text-2xl font-black text-slate-800 leading-none mt-0.5">{s.value}</p>
              </div>
            </button>
          ))}
          <button onClick={() => navigate('/attendance')} className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors text-left">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorMap['emerald']}`}>
              <FactCheck fontSize="small" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Attendance</p>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-2xl font-black text-emerald-600 leading-none">92%</p>
                <div className="flex-1 bg-emerald-100 rounded-full h-1.5 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
            </div>
          </button>
        </div>
      </motion.div>

      {/* ─── Quick Actions List ─── */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Quick Actions</h3>
        <div className="glass-card overflow-hidden">
          {[
            { label: 'Manage Classes & Sections', sub: 'Add, edit, assign class teachers', icon: School, route: '/academics/classes', color: 'indigo' },
            { label: 'Manage Subjects', sub: 'Add subjects, assign to classes', icon: MenuBook, route: '/academics/subjects', color: 'emerald' },
            { label: 'Teacher Assignments', sub: 'Map teachers to subjects and classes', icon: AssignmentInd, route: '/academics/assignments', color: 'purple' },
            { label: 'Leave Requests', sub: 'Review and approve pending leaves', icon: Feed, route: '/leave-requests', color: 'amber' },
            { label: 'Notices Board', sub: 'Post announcements to all roles', icon: NotificationsActive, route: '/notices', color: 'rose' },
            { label: 'Attendance Overview', sub: 'View school-wide attendance register', icon: FactCheck, route: '/attendance', color: 'emerald' },
          ].map((action, i) => (
            <button key={i} onClick={() => navigate(action.route)} className="w-full flex items-center justify-between px-6 py-4 border-b border-slate-50 hover:bg-slate-50 transition-colors group last:border-0">
              <div className="flex items-center gap-4">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${colorMap[action.color]}`}>
                  <action.icon fontSize="small" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-800 text-sm">{action.label}</p>
                  <p className="text-xs font-semibold text-slate-400">{action.sub}</p>
                </div>
              </div>
              <ArrowForward fontSize="small" className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
            </button>
          ))}
        </div>
      </motion.div>

      {/* ─── Bottom 3-col ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Exams */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100">
            <EventAvailable fontSize="small" className="text-indigo-500" />
            <h3 className="font-black text-sm text-slate-700 uppercase tracking-widest">Upcoming Exams</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {[
              { name: 'FA1 — Class 10', date: '15 Jul 2026', days: '15 days' },
              { name: 'SA1 — Class 9', date: '20 Jul 2026', days: '20 days' },
              { name: 'FA2 — Class 8', date: '05 Aug 2026', days: '36 days' },
            ].map((exam, i) => (
              <div key={i} className="flex justify-between items-center px-5 py-3.5 hover:bg-slate-50 transition-colors">
                <div>
                  <p className="font-bold text-slate-800 text-sm">{exam.name}</p>
                  <p className="text-xs font-semibold text-slate-400">{exam.date}</p>
                </div>
                <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-2 py-1 rounded uppercase tracking-wider">{exam.days}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Admissions */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100">
            <HowToReg fontSize="small" className="text-purple-500" />
            <h3 className="font-black text-sm text-slate-700 uppercase tracking-widest">Recent Admissions</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {[
              { name: 'Arjun Kumar', class: 'Class 10-B', initial: 'A' },
              { name: 'Neha Singh', class: 'Class 9-A', initial: 'N' },
              { name: 'Karan Mehta', class: 'Class 8-B', initial: 'K' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-black text-sm flex-shrink-0">{s.initial}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 text-sm truncate">{s.name}</p>
                  <p className="text-xs font-semibold text-slate-400">{s.class}</p>
                </div>
                <button onClick={() => navigate('/roles/students')} className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg hover:bg-indigo-100 transition-colors">View</button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Notices */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Feed fontSize="small" className="text-rose-500" />
              <h3 className="font-black text-sm text-slate-700 uppercase tracking-widest">Recent Notices</h3>
            </div>
            <button onClick={() => navigate('/notices')} className="text-xs font-bold text-indigo-600 hover:underline">+ New</button>
          </div>
          <div className="divide-y divide-slate-50">
            {[
              { title: 'Holiday on Friday', body: 'School closed due to local festival.', type: 'General' },
              { title: 'Fee Payment Reminder', body: 'Last date for Q2 fees is 30th June.', type: 'Finance' },
              { title: 'Annual Sports Day', body: 'Preparations begin from next week.', type: 'Event' },
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
      </div>
    </div>
  );
};

export default AdminDashboard;
