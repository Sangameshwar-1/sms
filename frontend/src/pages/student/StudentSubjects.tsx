import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Book, MenuBook, ArrowForward } from '@mui/icons-material';

const dummySubjects = [
  { id: 'mathematics', name: 'Mathematics', teacher: 'Mr. John Doe', code: 'MAT-101', lastScore: '45/50' },
  { id: 'science', name: 'Science', teacher: 'Mrs. Jane Smith', code: 'SCI-102', lastScore: '42/50' },
  { id: 'english', name: 'English', teacher: 'Ms. Emily White', code: 'ENG-103', lastScore: '—' },
  { id: 'social-studies', name: 'Social Studies', teacher: 'Mr. Robert Brown', code: 'SOC-104', lastScore: '—' },
];

const StudentSubjects = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black gradient-text tracking-tight uppercase flex items-center gap-3">
            <Book fontSize="large" className="text-purple-500" /> My Subjects
          </h2>
        </div>
        
        <div className="glass-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Subject</th>
                <th className="text-left py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Code</th>
                <th className="text-left py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Teacher</th>
                <th className="text-center py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Last Score</th>
                <th className="text-right py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Action</th>
              </tr>
            </thead>
            <tbody>
              {dummySubjects.map((sub, idx) => (
                <motion.tr
                  key={sub.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/classes/10-a/subjects/${sub.id}`)}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                        <MenuBook sx={{ fontSize: 16 }} />
                      </div>
                      <span className="font-bold text-slate-800">{sub.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-500 tracking-wider">
                    {sub.code}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                        {sub.teacher.charAt(4)}
                      </div>
                      <span className="font-bold text-slate-700">{sub.teacher}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center font-black text-purple-700">
                    {sub.lastScore}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-purple-600 hover:bg-purple-50 p-2 rounded-lg transition-colors flex items-center justify-end w-full">
                      <ArrowForward fontSize="small" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentSubjects;
