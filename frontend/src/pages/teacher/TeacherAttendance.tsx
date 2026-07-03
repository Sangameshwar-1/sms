import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FactCheck, Check, Close, Warning } from '@mui/icons-material';

const dummyStudents = [
  { id: 1, name: 'Rahul Sharma', rollNo: '101' },
  { id: 2, name: 'Priya Patel', rollNo: '102' },
  { id: 3, name: 'Amit Singh', rollNo: '103' },
  { id: 4, name: 'Neha Gupta', rollNo: '104' },
];

const TeacherAttendance = () => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [attendance, setAttendance] = useState<{ [key: number]: 'Present' | 'Absent' | 'Leave' }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const markAll = (status: 'Present' | 'Absent' | 'Leave') => {
    const newAttendance: { [key: number]: 'Present' | 'Absent' | 'Leave' } = {};
    dummyStudents.forEach(s => newAttendance[s.id] = status);
    setAttendance(newAttendance);
  };

  const handleStatusChange = (id: number, status: 'Present' | 'Absent' | 'Leave') => {
    setAttendance({ ...attendance, [id]: status });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="pb-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black gradient-text tracking-tight uppercase flex items-center gap-3">
            <FactCheck fontSize="large" className="text-emerald-500" /> Daily Attendance
          </h2>
        </div>
        
        <div className="glass-card p-6 border-t-4 border-t-emerald-500 mb-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h3 className="font-black text-xl text-slate-800">Select Class</h3>
            <p className="text-sm font-bold text-slate-500">Select a class to mark attendance</p>
          </div>
          <div className="flex gap-4 items-center">
            <select 
              className="glass-input px-4 py-2 font-bold text-slate-700 bg-white"
              value={selectedClass || ''}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="" disabled>Select a Class...</option>
              <option value="10-A">Class 10-A</option>
              <option value="9-B">Class 9-B</option>
            </select>
            <div className="bg-slate-100 px-4 py-2 rounded-xl text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</p>
              <p className="font-bold text-slate-700">{today}</p>
            </div>
          </div>
        </div>

        {!selectedClass ? (
          <div className="glass-card p-12 text-center text-slate-500 font-bold">
            Please select a class from the dropdown above to mark attendance.
          </div>
        ) : (
          <div className="glass-card overflow-hidden">
            <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-black text-lg text-slate-800">Student List ({selectedClass})</h3>
              <div className="flex gap-2">
                <button onClick={() => markAll('Present')} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">Mark All Present</button>
              </div>
            </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/80 border-b border-slate-100">
                <tr>
                  <th className="p-4 font-extrabold text-slate-500 text-xs uppercase tracking-wider">Roll No</th>
                  <th className="p-4 font-extrabold text-slate-500 text-xs uppercase tracking-wider">Student Name</th>
                  <th className="p-4 font-extrabold text-slate-500 text-xs uppercase tracking-wider text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {dummyStudents.map((student) => (
                  <tr key={student.id} className="border-b border-slate-50 hover:bg-emerald-50/30 transition-colors">
                    <td className="p-4 font-bold text-slate-600">{student.rollNo}</td>
                    <td className="p-4 font-bold text-slate-800">{student.name}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleStatusChange(student.id, 'Present')}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${
                            attendance[student.id] === 'Present' 
                              ? 'bg-emerald-500 text-white border-emerald-600' 
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <Check fontSize="small" /> P
                        </button>
                        <button 
                          onClick={() => handleStatusChange(student.id, 'Absent')}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${
                            attendance[student.id] === 'Absent' 
                              ? 'bg-rose-500 text-white border-rose-600' 
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <Close fontSize="small" /> A
                        </button>
                        <button 
                          onClick={() => handleStatusChange(student.id, 'Leave')}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${
                            attendance[student.id] === 'Leave' 
                              ? 'bg-amber-500 text-white border-amber-600' 
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <Warning fontSize="small" /> L
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-end items-center gap-4">
            <AnimatePresence>
              {isSubmitted && (
                <motion.span 
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                  className="text-emerald-600 font-bold text-sm flex items-center gap-1"
                >
                  <Check fontSize="small" /> Attendance Submitted Successfully
                </motion.span>
              )}
            </AnimatePresence>
            <button 
              onClick={handleSubmit}
              className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-glow-emerald hover:bg-emerald-700 transition-colors"
            >
              Submit Attendance
            </button>
          </div>
        </div>
        )}

      </motion.div>
    </div>
  );
};

export default TeacherAttendance;
