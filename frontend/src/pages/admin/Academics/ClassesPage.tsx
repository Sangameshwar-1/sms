import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Add, Edit, Delete, Close, Class } from '@mui/icons-material';

const initialClasses = [
  { id: 'CLS001', slug: '10A', name: 'Class 10-A', teacher: 'John Doe', studentCount: 45, room: 'Room 101' },
  { id: 'CLS002', slug: '10B', name: 'Class 10-B', teacher: 'Jane Smith', studentCount: 42, room: 'Room 102' },
  { id: 'CLS003', slug: '9A', name: 'Class 9-A', teacher: 'Robert Brown', studentCount: 38, room: 'Room 201' },
  { id: 'CLS004', slug: '9B', name: 'Class 9-B', teacher: 'Emily Davis', studentCount: 40, room: 'Room 202' },
  { id: 'CLS005', slug: '8A', name: 'Class 8-A', teacher: 'Michael Wilson', studentCount: 35, room: 'Room 301' },
  { id: 'CLS006', slug: '8B', name: 'Class 8-B', teacher: 'Sarah Johnson', studentCount: 36, room: 'Room 302' },
];

const ClassesPage = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState(initialClasses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', teacher: '', room: '' });

  const openModal = (cls?: typeof initialClasses[0]) => {
    if (cls) {
      setEditingId(cls.id);
      setFormData({ name: cls.name, teacher: cls.teacher, room: cls.room });
    } else {
      setEditingId(null);
      setFormData({ name: '', teacher: '', room: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setClasses(classes.map(c => c.id === editingId ? { ...c, ...formData } : c));
    } else {
      const slug = formData.name.replace(/[^a-zA-Z0-9]/g, '').replace('Class', '');
      setClasses([...classes, { id: `CLS00${classes.length + 1}`, slug, studentCount: 0, ...formData }]);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      setClasses(classes.filter(c => c.id !== id));
    }
  };

  return (
    <div className="pb-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black gradient-text tracking-tight uppercase flex items-center gap-3">
            <Class fontSize="large" className="text-indigo-500" /> Manage Classes
          </h2>
          <button 
            onClick={() => openModal()}
            className="glass-button flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-glow-indigo border-0"
          >
            <Add fontSize="small" /> New Class
          </button>
        </div>

        <div className="glass-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Class Name</th>
                <th className="text-left py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Class Teacher</th>
                <th className="text-left py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Room</th>
                <th className="text-center py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Students</th>
                <th className="text-right py-4 px-6 font-black text-slate-500 uppercase tracking-widest text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls, idx) => (
                <motion.tr 
                  key={cls.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/classes/${cls.slug}`)}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center font-bold">
                        {cls.slug}
                      </div>
                      <span className="font-bold text-slate-800">{cls.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-600">{cls.teacher}</td>
                  <td className="py-4 px-6 font-bold text-slate-500">{cls.room}</td>
                  <td className="py-4 px-6 text-center">
                    <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-bold text-xs">
                      {cls.studentCount}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); openModal(cls); }} 
                        className="w-8 h-8 rounded-lg bg-slate-50 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 flex items-center justify-center transition-colors"
                      >
                        <Edit sx={{ fontSize: 16 }} />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDelete(cls.id); }} 
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
                <h3 className="font-black text-xl text-slate-800 tracking-tight">{editingId ? 'Edit Class' : 'New Class'}</h3>
                <button onClick={closeModal} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"><Close fontSize="small" /></button>
              </div>
              <div className="p-6">
                <form onSubmit={handleSave} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Class Name</label>
                    <input required type="text" className="glass-input w-full p-3 font-semibold text-slate-700" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Class 10-C" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Assign Class Teacher</label>
                    <select required className="glass-input w-full p-3 font-semibold text-slate-700" value={formData.teacher} onChange={e => setFormData({...formData, teacher: e.target.value})}>
                      <option value="">Select Teacher</option>
                      <option value="John Doe">John Doe</option>
                      <option value="Jane Smith">Jane Smith</option>
                      <option value="Robert Brown">Robert Brown</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Room Number</label>
                    <input required type="text" className="glass-input w-full p-3 font-semibold text-slate-700" value={formData.room} onChange={e => setFormData({...formData, room: e.target.value})} placeholder="e.g. Room 105" />
                  </div>
                  <div className="pt-4 flex gap-3">
                    <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
                    <button type="submit" className="flex-1 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-glow-indigo">Save Class</button>
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

export default ClassesPage;
