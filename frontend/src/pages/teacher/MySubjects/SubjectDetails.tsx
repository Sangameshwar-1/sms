import { MenuBook } from '@mui/icons-material';

const SubjectDetails = () => {
  return (
    <div className="pb-8 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-200">
          <MenuBook fontSize="large" />
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Mathematics</h2>
          <p className="text-indigo-600 font-bold text-lg">Class 10-A</p>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-sm">
        <h3 className="font-extrabold text-slate-800 text-xl mb-4 border-b border-slate-100 pb-3">Syllabus Coverage</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700">1. Real Numbers</span>
            <span className="bg-emerald-50 text-emerald-600 font-bold text-xs px-2 py-1 rounded-md">Completed</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700">2. Polynomials</span>
            <span className="bg-emerald-50 text-emerald-600 font-bold text-xs px-2 py-1 rounded-md">Completed</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700">3. Pair of Linear Equations</span>
            <span className="bg-amber-50 text-amber-600 font-bold text-xs px-2 py-1 rounded-md">In Progress</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700">4. Quadratic Equations</span>
            <span className="bg-slate-100 text-slate-500 font-bold text-xs px-2 py-1 rounded-md">Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetails;
