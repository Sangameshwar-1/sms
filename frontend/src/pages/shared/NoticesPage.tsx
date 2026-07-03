import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Add, Edit, Delete, PushPin, PushPinOutlined, Close, Campaign } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const initialNotices = [
  { id: 'NOT001', title: 'Summer Vacation Dates', type: 'Holiday', priority: 'High', date: '2026-05-15', content: 'Summer vacation will begin from June 1st to July 15th.', isPinned: true },
  { id: 'NOT002', title: 'Annual Sports Meet', type: 'Event', priority: 'Medium', date: '2026-08-20', content: 'The annual sports meet will be held on September 10th.', isPinned: true },
  { id: 'NOT003', title: 'Fee Payment Deadline', type: 'Administrative', priority: 'High', date: '2026-07-01', content: 'Last date for term 1 fee payment is July 10th without late fee.', isPinned: false },
  { id: 'NOT004', title: 'New Science Lab Inauguration', type: 'Event', priority: 'Medium', date: '2026-07-05', content: 'Inauguration of the new block on July 12th by the Principal.', isPinned: false },
  { id: 'NOT005', title: 'Dress Code Guidelines', type: 'Circular', priority: 'Low', date: '2026-06-25', content: 'Please ensure students adhere strictly to the uniform guidelines.', isPinned: false },
];

const NoticesPage = () => {
  const { role } = useAuth();
  const isAdmin = role === 'Admin';
  const [notices, setNotices] = useState(initialNotices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({ title: '', type: 'Circular', priority: 'Medium', content: '', isPinned: false });

  const openModal = (notice?: typeof initialNotices[0]) => {
    if (notice) {
      setEditingId(notice.id);
      setFormData({ title: notice.title, type: notice.type, priority: notice.priority, content: notice.content, isPinned: notice.isPinned });
    } else {
      setEditingId(null);
      setFormData({ title: '', type: 'Circular', priority: 'Medium', content: '', isPinned: false });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date().toISOString().split('T')[0];
    if (editingId) {
      setNotices(notices.map(n => n.id === editingId ? { ...n, ...formData, date } : n));
    } else {
      setNotices([{ id: `NOT00${notices.length + 1}`, date, ...formData }, ...notices]);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this notice?')) {
      setNotices(notices.filter(n => n.id !== id));
    }
  };

  const togglePin = (id: string) => {
    setNotices(notices.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n));
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'Holiday': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Event': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'Administrative': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-sky-50 text-sky-600 border-sky-100';
    }
  };

  const sortedNotices = [...notices].sort((a, b) => {
    if (a.isPinned === b.isPinned) return new Date(b.date).getTime() - new Date(a.date).getTime();
    return a.isPinned ? -1 : 1;
  });

  return (
    <div className="pb-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black gradient-text tracking-tight uppercase">Notice Board</h2>
          {isAdmin && (
            <button 
              onClick={() => openModal()}
              className="glass-button flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-glow-amber border-0"
            >
              <Add fontSize="small" /> Publish Notice
            </button>
          )}
        </div>

        <div className="divide-y divide-slate-100 bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
          {sortedNotices.map((notice, idx) => (
            <motion.div 
              key={notice.id}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}
              className={`p-6 relative overflow-hidden flex gap-6 hover:bg-slate-50 transition-colors ${notice.isPinned ? 'bg-amber-50/30' : ''}`}
            >
              {notice.isPinned && <div className="absolute top-0 right-0 w-12 h-12 bg-amber-100 flex items-start justify-end p-2 rounded-bl-full"><PushPin className="text-amber-500 text-xs rotate-45" /></div>}
              
              <div className="hidden sm:flex flex-col items-center justify-center min-w-[80px] border-r border-slate-100 pr-6">
                <span className="text-3xl font-black text-slate-800">{notice.date.split('-')[2]}</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{new Date(notice.date).toLocaleString('default', { month: 'short' })}</span>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border ${getTypeColor(notice.type)}`}>{notice.type}</span>
                  {notice.priority === 'High' && <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-rose-50 text-rose-600 border border-rose-100">High Priority</span>}
                </div>
                <h3 className="font-black text-xl text-slate-800 leading-tight mb-2 pr-12">{notice.title}</h3>
                <p className="text-slate-600 font-medium text-sm leading-relaxed mb-4">{notice.content}</p>
                
                {isAdmin && (
                  <div className="flex gap-2">
                    <button onClick={() => togglePin(notice.id)} className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors">
                      {notice.isPinned ? <PushPin fontSize="small" /> : <PushPinOutlined fontSize="small" />}
                    </button>
                    <button onClick={() => openModal(notice)} className="p-2 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                      <Edit fontSize="small" />
                    </button>
                    <button onClick={() => handleDelete(notice.id)} className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                      <Delete fontSize="small" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Inline Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]" onClick={closeModal} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed z-[1000] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-md rounded-3xl overflow-hidden glass-card shadow-2xl bg-white/95"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-amber-50/50">
                <h3 className="font-black text-xl text-slate-800 tracking-tight flex items-center gap-2"><Campaign className="text-amber-500" /> {editingId ? 'Edit Notice' : 'Publish Notice'}</h3>
                <button onClick={closeModal} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"><Close fontSize="small" /></button>
              </div>
              <div className="p-6">
                <form onSubmit={handleSave} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Title</label>
                    <input required type="text" className="glass-input w-full p-3 font-semibold text-slate-700" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Type</label>
                      <select required className="glass-input w-full p-3 font-semibold text-slate-700" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                        <option value="Administrative">Administrative</option>
                        <option value="Circular">Circular</option>
                        <option value="Event">Event</option>
                        <option value="Holiday">Holiday</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Priority</label>
                      <select required className="glass-input w-full p-3 font-semibold text-slate-700" value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Message Content</label>
                    <textarea required className="glass-input w-full p-3 font-semibold text-slate-700 h-24 resize-none" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded accent-amber-500" checked={formData.isPinned} onChange={e => setFormData({...formData, isPinned: e.target.checked})} />
                    <span className="text-sm font-bold text-slate-600">Pin to top of Notice Board</span>
                  </label>
                  <div className="pt-4 flex gap-3">
                    <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
                    <button type="submit" className="flex-1 py-3 rounded-xl font-bold text-white bg-amber-500 hover:bg-amber-600 transition-colors shadow-glow-amber">Publish</button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NoticesPage;
