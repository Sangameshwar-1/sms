import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Add, Close, AttachFile, Feed } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const initialLeaves = [
  { id: 'SL001', type: 'Sick', startDate: '2026-06-20', endDate: '2026-06-21', reason: 'Viral fever', status: 'Approved' },
  { id: 'SL002', type: 'Family', startDate: '2026-07-25', endDate: '2026-07-26', reason: 'Attending cousin wedding', status: 'Pending' },
  { id: 'SL003', type: 'Personal', startDate: '2026-05-10', endDate: '2026-05-10', reason: 'Personal work', status: 'Rejected' },
];

const StudentLeaves = () => {
  const { role, activeChild } = useAuth();
  const [leaves, setLeaves] = useState(initialLeaves);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ type: 'Sick', startDate: '', endDate: '', reason: '' });

  const isParent = role === 'Parent';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeaves([{ id: `SL00${leaves.length + 1}`, ...formData, status: 'Pending' }, ...leaves]);
    setIsFormOpen(false);
    setFormData({ type: 'Sick', startDate: '', endDate: '', reason: '' });
  };

  const handleCancel = (id: string) => {
    if (window.confirm('Cancel this leave application?')) {
      setLeaves(leaves.filter(l => l.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Approved': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Rejected': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-amber-50 text-amber-600 border-amber-100';
    }
  };

  return (
    <div className="pb-8 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black gradient-text tracking-tight uppercase">Leave Requests</h2>
          {!isFormOpen && (
            <button 
              onClick={() => setIsFormOpen(true)}
              className="glass-button flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-glow-amber border-0"
            >
              <Add fontSize="small" /> Apply Leave
            </button>
          )}
        </div>

        <AnimatePresence>
          {isFormOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="glass-card p-6 border-t-4 border-t-amber-400">
                <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                  <h3 className="font-black text-xl text-slate-800">New Leave Application {isParent && activeChild ? `for ${activeChild.name}` : ''}</h3>
                  <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600"><Close /></button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Leave Type</label>
                      <select required className="glass-input w-full p-3 font-semibold text-slate-700" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                        <option value="Sick">Sick Leave</option>
                        <option value="Family">Family Reason</option>
                        <option value="Personal">Personal</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Start Date</label>
                      <input required type="date" className="glass-input w-full p-3 font-semibold text-slate-700" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">End Date</label>
                      <input required type="date" className="glass-input w-full p-3 font-semibold text-slate-700" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Reason</label>
                    <textarea required className="glass-input w-full p-3 font-semibold text-slate-700 h-24 resize-none" placeholder="Provide a detailed reason..." value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})} />
                  </div>

                  {formData.type === 'Sick' && (
                    <div className="flex items-center gap-2">
                      <button type="button" className="glass-button px-4 py-2 text-slate-600 text-sm font-bold flex items-center gap-2 border border-slate-200">
                        <AttachFile fontSize="small" /> Attach Medical Certificate
                      </button>
                      <span className="text-xs font-semibold text-slate-400 italic">Recommended for &gt;2 days</span>
                    </div>
                  )}

                  <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                    <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-2.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
                    <button type="submit" className="px-6 py-2.5 rounded-xl font-bold text-white bg-amber-500 hover:bg-amber-600 transition-colors shadow-glow-amber">
                      Submit Application
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="space-y-4">
          {leaves.map((leave, idx) => (
            <motion.div 
              key={leave.id}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
              className="glass-card p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
                  <Feed />
                </div>
                <div>
                  <h4 className="font-black text-slate-800 text-lg flex items-center gap-2">
                    {leave.type} Leave
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-widest border ${getStatusColor(leave.status)}`}>
                      {leave.status}
                    </span>
                  </h4>
                  <p className="text-sm font-bold text-slate-500">{leave.startDate} to {leave.endDate}</p>
                </div>
              </div>
              
              <div className="flex-1 px-0 sm:px-6">
                <p className="text-sm font-semibold text-slate-600 italic">"{leave.reason}"</p>
              </div>
              
              {leave.status === 'Pending' && (
                <button 
                  onClick={() => handleCancel(leave.id)}
                  className="px-4 py-2 bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 font-bold text-sm rounded-lg transition-colors whitespace-nowrap"
                >
                  Cancel App
                </button>
              )}
            </motion.div>
          ))}
          {leaves.length === 0 && <div className="text-center py-8 text-slate-400 font-bold">No leave history found.</div>}
        </div>
      </motion.div>
    </div>
  );
};

export default StudentLeaves;
