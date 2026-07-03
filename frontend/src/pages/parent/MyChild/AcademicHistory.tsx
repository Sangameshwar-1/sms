
const AcademicHistory = () => {
  return (
    <div className="pb-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-800">Academic History</h2>
        <p className="text-slate-500 font-bold">Previous academic years for Rahul Sharma</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[24px] p-6 shadow-sm">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
            <div>
              <h3 className="text-lg font-extrabold text-slate-800">Class 9-A</h3>
              <p className="text-slate-500 text-sm font-semibold">Academic Year 2024-2025</p>
            </div>
            <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg font-bold text-sm border border-emerald-100">
              Passed (89%)
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Maths</span>
              <span className="font-extrabold text-slate-700 text-lg">91/100</span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Science</span>
              <span className="font-extrabold text-slate-700 text-lg">88/100</span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">English</span>
              <span className="font-extrabold text-slate-700 text-lg">85/100</span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Social</span>
              <span className="font-extrabold text-slate-700 text-lg">92/100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicHistory;
