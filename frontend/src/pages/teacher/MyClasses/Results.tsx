import ResultCard from '../../../components/ui/ResultCard';

const Results = () => {
  const results = [
    { subject: 'Mathematics', marks: 85, grade: 'A', date: 'FA1 - 15 Jul' },
    { subject: 'Science', marks: 92, grade: 'A+', date: 'FA1 - 16 Jul' },
    { subject: 'English', marks: 78, grade: 'B+', date: 'FA1 - 17 Jul' },
    { subject: 'Social Studies', marks: 35, grade: 'F', date: 'FA1 - 18 Jul' },
  ];

  return (
    <div className="pb-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-800">Class 10-A Results</h2>
        <p className="text-slate-500 font-bold">Class Average: 72.5%</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((res, idx) => (
          <ResultCard key={idx} {...res} />
        ))}
      </div>
    </div>
  );
};

export default Results;
