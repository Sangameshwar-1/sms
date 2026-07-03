import { MenuBook } from '@mui/icons-material';

const Subjects = () => {
  const subjects = ['Mathematics', 'Science', 'English', 'Social Studies', 'Computer Science'];

  return (
    <div className="pb-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-800">My Subjects</h2>
        <p className="text-slate-500 font-bold">Class 10-A</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {subjects.map((sub, idx) => (
          <div key={idx} className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-5 shadow-sm flex items-center gap-4 border-l-4 border-l-indigo-500 hover:-translate-y-1 transition-transform">
            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center">
              <MenuBook fontSize="small" />
            </div>
            <h4 className="font-bold text-slate-800">{sub}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subjects;
