import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Add, Edit, Delete, Close, MenuBook } from '@mui/icons-material';

const initialSubjects = [
  { id: 'SUB001', slug: 'mathematics', name: 'Mathematics', code: 'MAT101', type: 'Core', credits: 4 },
  { id: 'SUB002', slug: 'physics', name: 'Physics', code: 'PHY101', type: 'Core', credits: 4 },
  { id: 'SUB003', slug: 'chemistry', name: 'Chemistry', code: 'CHE101', type: 'Core', credits: 4 },
  { id: 'SUB004', slug: 'english', name: 'English Literature', code: 'ENG101', type: 'Language', credits: 3 },
  { id: 'SUB005', slug: 'computer-science', name: 'Computer Science', code: 'CSC101', type: 'Elective', credits: 3 },
  { id: 'SUB006', slug: 'physical-education', name: 'Physical Education', code: 'PED101', type: 'Activity', credits: 1 },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Core': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
    case 'Language': return 'bg-purple-50 text-purple-600 border-purple-100';
    case 'Elective': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    case 'Activity': return 'bg-amber-50 text-amber-600 border-amber-100';
    default: return 'bg-slate-50 text-slate-600 border-slate-100';
  }
};

const SubjectsPage = () => {
  // const _navigate = useNavigate();
  const [subjects, setSubjects] = useState(initialSubjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', code: '', type: 'Core', credits: 3 });

  const openModal = (subj?: typeof initialSubjects[0]) => {
    if (subj) {
      setEditingId(subj.id);
      setFormData({ name: subj.name, code: subj.code, type: subj.type, credits: subj.credits });
    } else {
      setEditingId(null);
      setFormData({ name: '', code: '', type: 'Core', credits: 3 });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setSubjects(subjects.map(s => s.id === editingId ? { ...s, ...formData } : s));
    } else {
      const slug = formData.name.toLowerCase().replace(/\s+/g, '-');
      setSubjects([...subjects, { id: `SUB00${subjects.length + 1}`, slug, ...formData }]);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this subject?')) {
      setSubjects(subjects.filter(s => s.id !== id));
    }
  };

  return (
    <div className="pb-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black gradient-text tracking-tight uppercase flex items-center gap-3">
            <MenuBook fontSize="large" className="text-purple-500" /> Manage Subjects
          </h2>
          <button 
            onClick={() => openModal()}
            className="glass-button flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-glow-purple border-0"
          >
            <Add fontSize="small" /> New Subject
          </button>
        </div>

        <div className="glass-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Subject Name</th>
                <th className="text-left py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Code</th>
                <th className="text-left py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Type</th>
                <th className="text-center py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Credits</th>
                <th className="text-right py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subj, idx) => (
                <motion.tr 
                  key={subj.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => openModal(subj)}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center font-bold">
                        <MenuBook sx={{ fontSize: 16 }} />
                      </div>
                      <span className="font-bold text-slate-800">{subj.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-500 tracking-wider">{subj.code}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded text-xs font-bold border ${getTypeColor(subj.type)}`}>
                      {subj.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center font-black text-slate-600">{subj.credits}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); openModal(subj); }} 
                        className="w-8 h-8 rounded-lg bg-slate-50 text-slate-500 hover:bg-purple-50 hover:text-purple-600 flex items-center justify-center transition-colors"
                      >
                        <Edit sx={{ fontSize: 16 }} />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDelete(subj.id); }} 
                        className="w-8 h-8 rounded-lg bg-slate-50 text-slate-500 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center transition-colors"
                      >
                        <Delete sx={{ fontSize: 16 }} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Glass Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]" onClick={closeModal} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed z-[1000] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-md rounded-3xl overflow-hidden glass-card shadow-2xl bg-white/95"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h3 className="font-black text-xl text-slate-800 tracking-tight">{editingId ? 'Edit Subject' : 'New Subject'}</h3>
                <button onClick={closeModal} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"><Close fontSize="small" /></button>
              </div>
              <div className="p-6">
                <form onSubmit={handleSave} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Subject Name</label>
                    <input required type="text" className="glass-input w-full p-3 font-semibold text-slate-700" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Mathematics" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Subject Code</label>
                    <input required type="text" className="glass-input w-full p-3 font-semibold text-slate-700" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} placeholder="e.g. MAT101" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Type</label>
                      <select required className="glass-input w-full p-3 font-semibold text-slate-700" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                        <option value="Core">Core</option>
                        <option value="Language">Language</option>
                        <option value="Elective">Elective</option>
                        <option value="Activity">Activity</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Credits</label>
                      <input required type="number" min="1" max="10" className="glass-input w-full p-3 font-semibold text-slate-700" value={formData.credits} onChange={e => setFormData({...formData, credits: Number(e.target.value)})} />
                    </div>
                  </div>
                  <div className="pt-4 flex gap-3">
                    <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
                    <button type="submit" className="flex-1 py-3 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-glow-purple">Save Subject</button>
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

export default SubjectsPage;
