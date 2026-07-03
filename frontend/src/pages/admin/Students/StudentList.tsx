import { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Search, FilterList, Add } from '@mui/icons-material';
import { useAuth } from '../../../context/AuthContext';

const StudentList = () => {
  const { token } = useAuth();
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users/students', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) setStudents(await res.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [token]);

  const filtered = students.filter(s => s.Name?.toLowerCase().includes(search.toLowerCase()) || s.AdmissionNo?.includes(search));

  return (
    <div className="pb-4">
      <div className="flex gap-4 mb-8 flex-wrap">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-slate-400" fontSize="small" />
          </div>
          <input
            type="text"
            className="glass-input w-full pl-10 pr-4 py-2 font-semibold text-slate-700"
            placeholder="Search Student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="glass-button flex items-center gap-2 px-4 py-2 text-slate-600 font-bold">
          <FilterList fontSize="small" /> Filter
        </button>
        <button className="glass-button flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold border-0 shadow-glow-indigo">
          <Add fontSize="small" /> Add Student
        </button>
      </div>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>
      ) : (
        <div className="glass-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Student Name</th>
                <th className="text-left py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Admission No</th>
                <th className="text-center py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Class & Section</th>
                <th className="text-center py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Attendance</th>
                <th className="text-right py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filtered.map((student, idx) => {
                const attPercent = Math.floor(Math.random() * 30) + 70; // Mocked
                return (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-black text-slate-800">{student.Name}</td>
                    <td className="py-4 px-6 font-bold text-slate-500">{student.AdmissionNo}</td>
                    <td className="py-4 px-6 text-center font-bold text-indigo-600 bg-indigo-50/30">
                      Class {student.CurrentClassId || '10'}-{student.CurrentSectionId || 'A'}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${attPercent > 80 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                        {attPercent}%
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button className="text-xs font-bold px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors" onClick={() => console.log('Details', student.StudentId)}>
                        View
                      </button>
                      <button className="text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors" onClick={() => console.log('Edit', student.StudentId)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center font-bold text-slate-400 bg-slate-50">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentList;
