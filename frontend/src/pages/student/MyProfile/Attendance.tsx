import { useState } from 'react';
import { motion } from 'framer-motion';
import { KeyboardArrowDown, CheckCircle, Cancel } from '@mui/icons-material';

const StudentAttendance = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');

  const subjects = ['Mathematics', 'Science', 'English', 'Social Studies'];
  
  // Dummy calendar data with presence mapping
  const dates = Array.from({ length: 30 }, (_, i) => i + 1);
  const getStatus = (day: number) => {
    if (day % 7 === 0) return 'absent'; // Random absence
    if (day > 25) return 'none'; // Future dates
    return 'present';
  };

  return (
    <div className="pb-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h2 className="text-3xl font-black gradient-text tracking-tight uppercase mb-6">My Attendance</h2>

        <div className="glass-card p-6 mb-6">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Filter By Subject (Optional)</label>
          <div className="relative max-w-sm">
            <select 
              className="glass-input w-full px-4 py-3 text-slate-700 font-semibold appearance-none cursor-pointer"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">All Subjects (Overall Attendance)</option>
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <KeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800">June 2026</h3>
            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg font-bold text-sm">92% Attendance</span>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center mb-2">
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
              <div key={day} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {dates.map(date => {
              const status = getStatus(date);
              let btnClass = 'bg-white/50 text-slate-700 hover:bg-slate-100';
              if (status === 'present') btnClass = 'bg-emerald-50 text-emerald-600 border border-emerald-200';
              if (status === 'absent') btnClass = 'bg-rose-50 text-rose-600 border border-rose-200';

              return (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date.toString())}
                  className={`aspect-square rounded-xl flex items-center justify-center font-bold transition-all ${btnClass} ${selectedDate === date.toString() ? 'ring-2 ring-indigo-500 scale-110 z-10' : ''}`}
                >
                  {date}
                  {status === 'present' && <CheckCircle className="absolute bottom-1 right-1 opacity-20" sx={{ fontSize: 10 }} />}
                  {status === 'absent' && <Cancel className="absolute bottom-1 right-1 opacity-20 text-rose-600" sx={{ fontSize: 10 }} />}
                </button>
              );
            })}
          </div>
        </motion.div>

        {selectedDate && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${getStatus(parseInt(selectedDate)) === 'absent' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
              {getStatus(parseInt(selectedDate)) === 'absent' ? <Cancel fontSize="large" /> : <CheckCircle fontSize="large" />}
            </div>
            <div>
              <h3 className="font-black text-slate-800 text-lg">{selectedDate}-Jun-2026</h3>
              <p className="font-bold text-slate-500 uppercase tracking-wider text-xs mt-1">
                Status: {getStatus(parseInt(selectedDate)) === 'absent' ? <span className="text-rose-500">Absent</span> : <span className="text-emerald-500">Present</span>}
              </p>
            </div>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
};

export default StudentAttendance;
