import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, ArrowBack, CalendarMonth } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

const dummyStudents = [
  { id: 1, name: 'John Doe', status: 'Present' },
  { id: 2, name: 'Jane Smith', status: 'Absent' },
  { id: 3, name: 'Bob Johnson', status: 'Present' },
  { id: 4, name: 'Alice Williams', status: 'Present' },
  { id: 5, name: 'Tom Brown', status: 'Late' },
];

const EditClassAttendance = () => {
  const { classId: id } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState(dummyStudents);

  const handleStatusChange = (studentId: number, status: string) => {
    setStudents(students.map(s => s.id === studentId ? { ...s, status } : s));
  };

  const handleSave = () => {
    alert(`Attendance for ${date} saved successfully!`);
    navigate('/attendance');
  };

  return (
    <div className="pb-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/attendance')}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-colors shadow-sm"
          >
            <ArrowBack fontSize="small" />
          </button>
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Edit Attendance</h2>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Class {id}</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all flex items-center gap-2"
        >
          <Save fontSize="small" /> Save Register
        </button>
      </motion.div>

      {/* Date Selector */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 flex flex-col sm:flex-row items-center gap-6 justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
            <CalendarMonth />
          </div>
          <div>
            <h3 className="font-black text-slate-700">Register Date</h3>
            <p className="text-xs font-bold text-slate-400">Select the date to edit attendance for.</p>
          </div>
        </div>
        <input 
          type="date" 
          className="glass-input px-4 py-2 font-bold text-slate-700 text-lg" 
          value={date} 
          onChange={e => setDate(e.target.value)} 
        />
      </motion.div>

      {/* Student List */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card overflow-hidden bg-white">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-black text-sm text-slate-700 uppercase tracking-widest">Student List</h3>
          <span className="text-xs font-bold text-slate-400">{students.length} Students</span>
        </div>
        
        <div className="divide-y divide-slate-50">
          {students.map((student) => (
            <div key={student.id} className="flex justify-between items-center px-6 py-4 hover:bg-slate-50 transition-colors">
              <div className="flex flex-col">
                <span className="font-black text-slate-800">{student.name}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">ID: STU-{student.id}</span>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => handleStatusChange(student.id, 'Present')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-colors border ${
                    student.status === 'Present' 
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm' 
                      : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-200 hover:text-emerald-500'
                  }`}
                >
                  Present
                </button>
                <button 
                  onClick={() => handleStatusChange(student.id, 'Absent')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-colors border ${
                    student.status === 'Absent' 
                      ? 'bg-rose-500 text-white border-rose-500 shadow-sm' 
                      : 'bg-white text-slate-500 border-slate-200 hover:border-rose-200 hover:text-rose-500'
                  }`}
                >
                  Absent
                </button>
                <button 
                  onClick={() => handleStatusChange(student.id, 'Late')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-colors border ${
                    student.status === 'Late' 
                      ? 'bg-amber-500 text-white border-amber-500 shadow-sm' 
                      : 'bg-white text-slate-500 border-slate-200 hover:border-amber-200 hover:text-amber-500'
                  }`}
                >
                  Late
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default EditClassAttendance;
