import { useState } from 'react';
import { Search } from '@mui/icons-material';

const DUMMY_TEACHERS = [
  { name: 'Amit Verma', teacherId: 'TCH-001', subjects: ['Mathematics', 'Physics'], classes: ['10-A', '9-B'] },
  { name: 'Priya Iyer', teacherId: 'TCH-002', subjects: ['English', 'History'], classes: ['10-A', '10-B', '8-A'] },
  { name: 'Ravi Kumar', teacherId: 'TCH-003', subjects: ['Science', 'Chemistry'], classes: ['9-A', '9-B', '10-B'] },
];

const TeacherList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = DUMMY_TEACHERS.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="pb-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Search Teacher..." 
            className="w-full pl-10 pr-4 py-3 rounded-2xl border-none bg-white/70 backdrop-blur-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all font-semibold text-slate-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3.5 text-slate-400" fontSize="small" />
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="text-left py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Teacher Name</th>
              <th className="text-left py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Teacher ID</th>
              <th className="text-center py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Subjects</th>
              <th className="text-center py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Classes</th>
              <th className="text-right py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {filtered.map((teacher, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-6 font-black text-slate-800">{teacher.name}</td>
                <td className="py-4 px-6 font-bold text-slate-500">{teacher.teacherId}</td>
                <td className="py-4 px-6 text-center">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {teacher.subjects.map(s => <span key={s} className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-600">{s}</span>)}
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {teacher.classes.map(c => <span key={c} className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600">{c}</span>)}
                  </div>
                </td>
                <td className="py-4 px-6 text-right space-x-2">
                  <button className="text-xs font-bold px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                    View
                  </button>
                  <button className="text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center font-bold text-slate-400 bg-slate-50">
                  No teachers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherList;
