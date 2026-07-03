import { useState } from 'react';
import StudentCard from '../../../components/ui/StudentCard';
import { Search } from '@mui/icons-material';

const DUMMY_STUDENTS = [
  { name: 'Rahul Sharma', admissionNo: 'ADM-2026-001', classSection: '10-A', attendancePercent: 92 },
  { name: 'Sai Kumar', admissionNo: 'ADM-2026-002', classSection: '10-A', attendancePercent: 88 },
  { name: 'Anjali Verma', admissionNo: 'ADM-2026-003', classSection: '10-A', attendancePercent: 74 },
];

const StudentList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = DUMMY_STUDENTS.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="pb-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-extrabold text-slate-800">Class 10-A Students</h2>
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Search Student..." 
            className="w-full pl-10 pr-4 py-3 rounded-2xl border-none bg-white/70 backdrop-blur-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all font-semibold text-slate-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3.5 text-slate-400" fontSize="small" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((student, idx) => (
          <div key={idx}>
            <StudentCard {...student} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
