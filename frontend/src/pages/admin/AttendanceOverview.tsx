import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, PresentToAll } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const initialClasses = [
  { id: 1, name: '10-A', present: 42, absent: 3, total: 45, students: [{name: 'John Doe', status: 'Present'}, {name: 'Jane Smith', status: 'Absent'}, {name: 'Bob', status: 'Present'}] },
  { id: 2, name: '10-B', present: 40, absent: 2, total: 42, students: [{name: 'Alice', status: 'Present'}, {name: 'Tom', status: 'Present'}] },
  { id: 3, name: '9-A', present: 30, absent: 8, total: 38, students: [{name: 'Charlie', status: 'Absent'}, {name: 'Dave', status: 'Absent'}] },
  { id: 4, name: '9-B', present: 39, absent: 1, total: 40, students: [] },
  { id: 5, name: '8-A', present: 33, absent: 2, total: 35, students: [] },
  { id: 6, name: '8-B', present: 34, absent: 2, total: 36, students: [] },
];

const AttendanceOverview = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState('2026-07-01');

  const handleExport = () => {
    alert('Report exported successfully!');
  };

  const getPercentage = (present: number, total: number) => Math.round((present / total) * 100);
  
  const getColorClass = (percentage: number) => {
    if (percentage >= 90) return 'text-emerald-500 bg-emerald-50 border-emerald-100';
    if (percentage >= 75) return 'text-amber-500 bg-amber-50 border-amber-100';
    return 'text-rose-500 bg-rose-50 border-rose-100';
  };

  const getBarColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-emerald-500';
    if (percentage >= 75) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const totalPresent = initialClasses.reduce((acc, c) => acc + c.present, 0);
  const totalStudents = initialClasses.reduce((acc, c) => acc + c.total, 0);
  const schoolPercentage = getPercentage(totalPresent, totalStudents);

  return (
    <div className="pb-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-3xl font-black gradient-text tracking-tight uppercase">Attendance Overview</h2>
          <div className="flex gap-2">
            <input type="date" className="glass-input px-4 py-2 font-bold text-slate-700" value={date} onChange={e => setDate(e.target.value)} />
            <button onClick={handleExport} className="glass-button flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 font-bold border border-indigo-100 hover:bg-indigo-50">
              <Download fontSize="small" /> Export
            </button>
          </div>
        </div>

        {/* School Wide Stat */}
        <div className="glass-card p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <PresentToAll sx={{ fontSize: 120 }} />
          </div>
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">School Wide Attendance</h3>
          <div className="flex items-end gap-4 mb-4">
            <span className={`text-6xl font-black ${schoolPercentage >= 90 ? 'text-emerald-500' : 'text-amber-500'}`}>{schoolPercentage}%</span>
            <span className="text-slate-500 font-bold mb-2">{totalPresent} / {totalStudents} Present</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} animate={{ width: `${schoolPercentage}%` }} transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full rounded-full ${getBarColor(schoolPercentage)}`}
            />
          </div>
        </div>

        <h3 className="text-lg font-black text-slate-700 uppercase tracking-widest mb-4">Class Breakdown</h3>
        <div className="glass-card overflow-hidden">
          <div className="divide-y divide-slate-100 bg-white">
            {initialClasses.map((cls, _idx) => {
              const pct = getPercentage(cls.present, cls.total);
              return (
                <div key={cls.id}>
                  <div 
                    className="p-6 cursor-pointer hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4" 
                    onClick={() => navigate(`/classes/${cls.name}/attendance`)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h4 className="font-black text-xl text-slate-800 hover:text-indigo-600 transition-colors">Class {cls.name}</h4>
                        <span className={`px-3 py-1 rounded-lg text-sm font-black border ${getColorClass(pct)}`}>{pct}%</span>
                      </div>
                      <div className="flex gap-4 text-sm font-bold text-slate-500">
                        <span>{cls.present} Present</span>
                        <span>{cls.absent} Absent</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className="w-full md:w-64 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div className={`h-full rounded-full ${getBarColor(pct)}`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="hidden md:inline-flex bg-white border border-slate-200 text-slate-400 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest shadow-sm">
                        Edit
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AttendanceOverview;
