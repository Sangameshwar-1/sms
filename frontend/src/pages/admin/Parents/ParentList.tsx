import { useState } from 'react';
import { Search } from '@mui/icons-material';

const DUMMY_PARENTS = [
  { name: 'Rajesh Sharma', phone: '+91 98765 43210', email: 'rajesh.s@example.com', linkedChildren: [{ name: 'Rahul Sharma', classSection: '10-A' }] },
  { name: 'Sneha Gupta', phone: '+91 87654 32109', email: 'sneha.g@example.com', linkedChildren: [{ name: 'Aarav Gupta', classSection: '9-B' }, { name: 'Ananya Gupta', classSection: '7-C' }] },
  { name: 'Vikram Singh', phone: '+91 76543 21098', email: 'vikram.s@example.com', linkedChildren: [{ name: 'Neha Singh', classSection: '10-A' }] },
];

const ParentList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = DUMMY_PARENTS.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="pb-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Search Parent..." 
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
              <th className="text-left py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Parent Name</th>
              <th className="text-left py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Contact Info</th>
              <th className="text-center py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Linked Children</th>
              <th className="text-right py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {filtered.map((parent, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-6 font-black text-slate-800">{parent.name}</td>
                <td className="py-4 px-6">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-slate-600">{parent.phone}</span>
                    <span className="text-xs font-semibold text-slate-400">{parent.email}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex flex-col gap-1 items-center">
                    {parent.linkedChildren.map((c, i) => (
                      <span key={i} className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {c.name} <span className="text-slate-400">({c.classSection})</span>
                      </span>
                    ))}
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
                <td colSpan={4} className="py-8 text-center font-bold text-slate-400 bg-slate-50">
                  No parents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParentList;
