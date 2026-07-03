import { useState } from 'react';
import { motion } from 'framer-motion';
import { KeyboardArrowDown, CheckCircle, Cancel } from '@mui/icons-material';

const AttendanceHierarchy = () => {
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');

  const classes = ['10-A', '10-B', '9-A'];
  const subjects = ['Mathematics', 'Science', 'English'];
  
  // Dummy calendar data
  const dates = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="pb-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h2 className="text-3xl font-black gradient-text tracking-tight uppercase mb-6">Mark Attendance</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="glass-card p-6">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Select Class</label>
            <div className="relative">
              <select 
                className="glass-input w-full px-4 py-3 text-slate-700 font-semibold appearance-none cursor-pointer"
                value={selectedClass}
                onChange={(e) => { setSelectedClass(e.target.value); setSelectedSubject(''); setSelectedDate(''); }}
              >
                <option value="">-- Choose Class --</option>
                {classes.map(c => <option key={c} value={c}>Class {c}</option>)}
              </select>
              <KeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className={`glass-card p-6 transition-all duration-300 ${!selectedClass ? 'opacity-50 pointer-events-none' : ''}`}>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Select Subject</label>
            <div className="relative">
              <select 
                className="glass-input w-full px-4 py-3 text-slate-700 font-semibold appearance-none cursor-pointer"
                value={selectedSubject}
                onChange={(e) => { setSelectedSubject(e.target.value); setSelectedDate(''); }}
              >
                <option value="">-- Choose Subject --</option>
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <KeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {selectedClass && selectedSubject && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">June 2026</h3>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center mb-2">
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                <div key={day} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {dates.map(date => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date.toString())}
                  className={`aspect-square rounded-xl flex items-center justify-center font-bold transition-all ${
                    selectedDate === date.toString() 
                      ? 'bg-indigo-500 text-white shadow-glow-indigo scale-110 z-10' 
                      : 'bg-white/50 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600'
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {selectedDate && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">
              Attendance for {selectedDate}-Jun-2026 <span className="text-sm font-semibold text-slate-500 ml-2">({selectedClass} • {selectedSubject})</span>
            </h3>
            
            <div className="space-y-3">
              {[
                { name: 'Rahul Sharma', status: 'present' },
                { name: 'Sai Kumar', status: 'absent' },
                { name: 'Arjun Kumar', status: 'present' }
              ].map((student, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-white/40 rounded-2xl border border-white/60">
                  <span className="font-bold text-slate-800">{student.name}</span>
                  <div className="flex gap-2">
                    <button className={`px-4 py-2 rounded-xl flex items-center gap-1 font-bold text-xs transition-colors ${student.status === 'present' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400 hover:bg-emerald-50'}`}>
                      <CheckCircle fontSize="small" /> Present
                    </button>
                    <button className={`px-4 py-2 rounded-xl flex items-center gap-1 font-bold text-xs transition-colors ${student.status === 'absent' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-400 hover:bg-rose-50'}`}>
                      <Cancel fontSize="small" /> Absent
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button className="glass-button px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-glow-indigo border-0 font-bold">
                Save Attendance
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AttendanceHierarchy;
