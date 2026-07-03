import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Class, MenuBook, CheckCircleOutlined, EventAvailable, ArrowForward } from '@mui/icons-material';

const colorMap: Record<string, string> = {
  indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  purple: 'bg-purple-50 text-purple-600 border-purple-100',
  emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  amber: 'bg-amber-50 text-amber-600 border-amber-100',
  sky: 'bg-sky-50 text-sky-600 border-sky-100',
};

const TeacherDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-8 max-w-7xl mx-auto space-y-8">
      {/* ─── Compact Stat Strip ─── */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-0 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <button onClick={() => navigate('/teacher/academics')} className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors text-left group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorMap.indigo}`}>
              <Class fontSize="small" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Classes</p>
              <p className="text-2xl font-black text-slate-800 leading-none mt-0.5">2</p>
            </div>
          </button>
          
          <button onClick={() => navigate('/teacher/academics')} className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors text-left group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorMap.purple}`}>
              <MenuBook fontSize="small" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subjects</p>
              <p className="text-2xl font-black text-slate-800 leading-none mt-0.5">2</p>
            </div>
          </button>

          <button onClick={() => navigate('/teacher/attendance')} className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors text-left group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorMap.amber}`}>
              <CheckCircleOutlined fontSize="small" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pending Att.</p>
              <p className="text-2xl font-black text-amber-600 leading-none mt-0.5">1</p>
            </div>
          </button>

          <button onClick={() => navigate('/teacher/exams')} className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors text-left group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorMap.sky}`}>
              <EventAvailable fontSize="small" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upcoming Exams</p>
              <p className="text-2xl font-black text-sky-600 leading-none mt-0.5">1</p>
            </div>
          </button>
        </div>
      </motion.div>

      {/* ─── Bottom Split ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: Classes & Subjects */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Class fontSize="small" className="text-indigo-500" />
                <h3 className="font-black text-sm text-slate-700 uppercase tracking-widest">My Assigned Classes</h3>
              </div>
              <button onClick={() => navigate('/teacher/academics')} className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
            </div>
            <div className="divide-y divide-slate-50">
              {[
                { name: 'Class 10-A', role: 'Class Teacher', students: 45 },
                { name: 'Class 10-B', role: 'Subject Teacher', students: 42 },
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate(`/classes/${c.name.split(' ')[1]}`)}>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{c.name}</p>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{c.students} Students</span>
                  </div>
                  {c.role === 'Class Teacher' && (
                    <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded uppercase tracking-wider border border-indigo-100">Class Teacher</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MenuBook fontSize="small" className="text-purple-500" />
                <h3 className="font-black text-sm text-slate-700 uppercase tracking-widest">My Subjects</h3>
              </div>
              <button onClick={() => navigate('/teacher/academics')} className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
            </div>
            <div className="divide-y divide-slate-50">
              {[
                { name: 'Mathematics', class: 'Class 10-A', progress: '65%' },
                { name: 'Science', class: 'Class 10-B', progress: '40%' },
              ].map((s, i) => (
                <div key={i} className="flex flex-col gap-2 px-5 py-3.5 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate(`/classes/${s.class.split(' ')[1]}/subjects/${s.name.toLowerCase()}`)}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{s.name}</p>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.class}</span>
                    </div>
                    <span className="text-[10px] font-black text-emerald-600 px-2 py-0.5 rounded bg-emerald-50 uppercase tracking-wider">{s.progress} Syllabus</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Side: Tasks & Exams */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-amber-50/30">
              <div className="flex items-center gap-2">
                <CheckCircleOutlined fontSize="small" className="text-amber-500" />
                <h3 className="font-black text-sm text-slate-700 uppercase tracking-widest">Pending Actions</h3>
              </div>
            </div>
            <div className="divide-y divide-slate-50">
              <div className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate('/teacher/attendance')}>
                <div>
                  <p className="font-bold text-slate-800 text-sm">Mark Attendance</p>
                  <p className="text-xs font-semibold text-slate-400">Class 10-B Science</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black bg-amber-100 text-amber-700 px-2 py-1 rounded uppercase tracking-wider border border-amber-200">Pending</span>
                  <ArrowForward fontSize="small" className="text-slate-300" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <EventAvailable fontSize="small" className="text-sky-500" />
                <h3 className="font-black text-sm text-slate-700 uppercase tracking-widest">Upcoming Exams</h3>
              </div>
              <button onClick={() => navigate('/teacher/exams')} className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
            </div>
            <div className="divide-y divide-slate-50">
              {[
                { name: 'FA1 Mathematics', class: 'Class 10-A', date: '15-Jul-2026', days: '15 days' },
              ].map((exam, i) => (
                <div key={i} className="flex justify-between items-center px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate('/teacher/exams')}>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{exam.name}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{exam.class} • {exam.date}</p>
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

export default TeacherDashboard;
