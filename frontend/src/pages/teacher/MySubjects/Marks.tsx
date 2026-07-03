
const Marks = () => {
  const students = [
    { name: 'Rahul Sharma', marks: 85 },
    { name: 'Sai Kumar', marks: 90 },
    { name: 'Anjali Verma', marks: '' }
  ];

  return (
    <div className="pb-8 max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800">Enter Marks</h2>
          <p className="text-slate-500 font-bold">FA1 • Mathematics • Class 10-A</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-xl shadow-lg shadow-indigo-200 transition-all">
          Save All
        </button>
      </div>

      <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-4 font-bold text-slate-500 text-sm">Student Name</th>
              <th className="p-4 font-bold text-slate-500 text-sm w-32 text-right">Marks / 100</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-700">{student.name}</td>
                <td className="p-4">
                  <input 
                    type="number" 
                    defaultValue={student.marks}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-right font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="--"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Marks;
