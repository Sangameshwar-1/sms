import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Add, Close, AttachFile, EventAvailable } from '@mui/icons-material';

const initialLeaves = [
  { id: 'TL001', type: 'Medical', startDate: '2026-06-10', endDate: '2026-06-12', reason: 'Fever', status: 'Approved' },
  { id: 'TL002', type: 'Casual', startDate: '2026-07-20', endDate: '2026-07-21', reason: 'Family function', status: 'Pending' },
  { id: 'TL003', type: 'Emergency', startDate: '2026-05-05', endDate: '2026-05-05', reason: 'Personal', status: 'Rejected' },
];

const TeacherLeaves = () => {
  const [leaves, setLeaves] = useState(initialLeaves);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ type: 'Casual', startDate: '', endDate: '', reason: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeaves([{ id: `TL00${leaves.length + 1}`, ...formData, status: 'Pending' }, ...leaves]);
    setIsFormOpen(false);
    setFormData({ type: 'Casual', startDate: '', endDate: '', reason: '' });
  };

  const handleCancel = (id: string) => {
    if (window.confirm('Are you sure you want to cancel this leave application?')) {
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
          <h2 className="text-3xl font-black gradient-text tracking-tight uppercase">My Leaves</h2>
          {!isFormOpen && (
            <button 
              onClick={() => setIsFormOpen(true)}
              className="glass-button flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-glow-purple border-0"
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
              <div className="glass-card p-6 border-l-4 border-l-purple-500">
                <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                  <h3 className="font-black text-xl text-slate-800">New Leave Application</h3>
                  <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600"><Close /></button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Leave Type</label>
                      <select required className="glass-input w-full p-3 font-semibold text-slate-700" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                        <option value="Casual">Casual Leave</option>
                        <option value="Medical">Medical Leave</option>
                        <option value="Emergency">Emergency</option>
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

                  <div className="flex items-center gap-2">
                    <button type="button" className="glass-button px-4 py-2 text-slate-600 text-sm font-bold flex items-center gap-2 border border-slate-200">
                      <AttachFile fontSize="small" /> Attach Document
                    </button>
                    <span className="text-xs font-semibold text-slate-400 italic">Optional for medical leave</span>
                  </div>

                  <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                    <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-2.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
                    <button type="submit" className="px-6 py-2.5 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-glow-purple flex items-center gap-2">
                      Submit Application
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <h3 className="text-lg font-black text-slate-700 uppercase tracking-widest mb-4">Leave History</h3>
        
        <div className="divide-y divide-slate-100 bg-white border border-slate-100 rounded-2xl overflow-hidden">
          {leaves.map((leave, idx) => (
            <motion.div 
              key={leave.id}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
              className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center">
                  <EventAvailable fontSize="small" />
                </div>
                <div>
                  <h4 className="font-black text-slate-800 flex items-center gap-2">
                    {leave.type} Leave
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-widest border ${getStatusColor(leave.status)}`}>
                      {leave.status}
                    </span>
                  </h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{leave.startDate} to {leave.endDate}</p>
                </div>
              </div>
              
              <div className="flex-1 px-0 sm:px-6">
                <p className="text-sm font-semibold text-slate-600 italic">"{leave.reason}"</p>
              </div>
              
              {leave.status === 'Pending' && (
                <button 
                  onClick={() => handleCancel(leave.id)}
                  className="px-4 py-2 bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 font-bold text-xs rounded-lg transition-colors whitespace-nowrap"
                >
                  Cancel App
                </button>
              )}
            </motion.div>
          ))}
          {leaves.length === 0 && <div className="text-center py-8 text-slate-400 font-bold bg-slate-50">No leave history found.</div>}
        </div>
      </motion.div>
    </div>
  );
};

export default TeacherLeaves;
