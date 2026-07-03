import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Person, School, MenuBook, Campaign, History, ArrowForward } from '@mui/icons-material';

const dummyData = [
  { id: '1', type: 'Student', name: 'Rahul Sharma', desc: 'Class 10-A | Roll: 45' },
  { id: '2', type: 'Student', name: 'Rohan Gupta', desc: 'Class 9-B | Roll: 12' },
  { id: '3', type: 'Teacher', name: 'Ramesh Kumar', desc: 'Mathematics Department' },
  { id: '4', type: 'Subject', name: 'Mathematics', desc: 'Core Subject | Code: MAT101' },
  { id: '5', type: 'Class', name: 'Class 10-A', desc: 'Class Teacher: John Doe' },
  { id: '6', type: 'Notice', name: 'Annual Sports Meet', desc: 'Event scheduled for September 10th' },
];

const recentSearches = ['Rahul', 'Mathematics', 'Class 10', 'Fee Payment'];

const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof dummyData>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      const filtered = dummyData.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) || 
        item.type.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsSearching(false);
    }, 300); // Simulate network delay

    return () => clearTimeout(timer);
  }, [query]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'Student':
      case 'Teacher': return <Person className="text-indigo-500" />;
      case 'Class': return <School className="text-emerald-500" />;
      case 'Subject': return <MenuBook className="text-purple-500" />;
      case 'Notice': return <Campaign className="text-amber-500" />;
      default: return <Search className="text-slate-500" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'Student': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'Teacher': return 'bg-sky-50 text-sky-600 border-sky-100';
      case 'Class': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Subject': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'Notice': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="pb-12 max-w-4xl mx-auto pt-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        
        {/* Search Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black gradient-text tracking-tight uppercase mb-3">Global Search</h2>
          <p className="text-slate-500 font-bold">Search across students, teachers, classes, and notices instantly.</p>
        </div>

        {/* Search Input */}
        <div className="relative mb-12 shadow-2xl shadow-indigo-500/10 rounded-3xl group">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <Search className={`transition-colors ${query ? 'text-indigo-500' : 'text-slate-400'}`} fontSize="large" />
          </div>
          <input
            autoFocus
            type="text"
            className="w-full pl-16 pr-6 py-6 glass-card text-slate-800 font-black text-2xl placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all rounded-3xl"
            placeholder="What are you looking for?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-0 pr-6 flex items-center text-slate-400 hover:text-slate-600 font-bold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Results Area */}
        <div className="min-h-[300px]">
          {query === '' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-8">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <History fontSize="small" /> Recent Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setQuery(search)}
                    className="px-4 py-2 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border border-slate-100 hover:border-indigo-100 rounded-xl font-bold text-sm transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : isSearching ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs animate-pulse">Searching...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 pl-2">
                Found {results.length} results for "{query}"
              </h3>
              {results.map((result, idx) => (
                <motion.div 
                  key={result.id}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}
                  className="glass-card p-5 flex items-center justify-between group cursor-pointer hover:bg-slate-50/50 hover:scale-[1.01] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getIcon(result.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-black text-lg text-slate-800">{result.name}</h4>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border ${getColor(result.type)}`}>
                          {result.type}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-500">{result.desc}</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                    <ArrowForward />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-12 text-center">
              <Search className="text-slate-200 mb-4" sx={{ fontSize: 64 }} />
              <h3 className="font-black text-xl text-slate-700 mb-2">No results found</h3>
              <p className="text-slate-500 font-semibold">We couldn't find anything matching "{query}". Try adjusting your search terms.</p>
            </motion.div>
          )}
        </div>

      </motion.div>
    </div>
  );
};

export default GlobalSearch;
