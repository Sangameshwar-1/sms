import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Add, Edit, Delete, Close, AssignmentInd } from '@mui/icons-material';

const initialAssignments = [
  { id: 'TA001', teacher: 'John Doe', subject: 'Mathematics', class: 'Class 10-A', status: 'Active' },
  { id: 'TA002', teacher: 'Jane Smith', subject: 'Science', class: 'Class 10-A', status: 'Active' },
  { id: 'TA003', teacher: 'Robert Brown', subject: 'English', class: 'Class 9-B', status: 'Active' },
  { id: 'TA004', teacher: 'Emily Davis', subject: 'History', class: 'Class 8-A', status: 'Inactive' },
];

const TeacherAssignmentsPage = () => {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({ teacher: '', subject: '', class: '', status: 'Active' });

  const openModal = (assign?: typeof initialAssignments[0]) => {
    if (assign) {
      setEditingId(assign.id);
      setFormData({ teacher: assign.teacher, subject: assign.subject, class: assign.class, status: assign.status });
    } else {
      setEditingId(null);
      setFormData({ teacher: '', subject: '', class: '', status: 'Active' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setAssignments(assignments.map(a => a.id === editingId ? { ...a, ...formData } : a));
    } else {
      setAssignments([...assignments, { id: `TA00${assignments.length + 1}`, ...formData }]);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Remove this assignment?')) {
      setAssignments(assignments.filter(a => a.id !== id));
    }
  };

  return (
    <div className="pb-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black gradient-text tracking-tight uppercase">Teacher Assignments</h2>
          <button 
            onClick={() => openModal()}
            className="glass-button flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-glow-indigo border-0"
          >
            <Add fontSize="small" /> Assign Teacher
          </button>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/80 border-b border-slate-100">
                <tr>
                  <th className="p-4 font-extrabold text-slate-500 text-xs uppercase tracking-wider">Teacher</th>
                  <th className="p-4 font-extrabold text-slate-500 text-xs uppercase tracking-wider">Subject</th>
                  <th className="p-4 font-extrabold text-slate-500 text-xs uppercase tracking-wider">Class</th>
                  <th className="p-4 font-extrabold text-slate-500 text-xs uppercase tracking-wider">Status</th>
                  <th className="p-4 font-extrabold text-slate-500 text-xs uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assign, _idx) => (
                  <tr key={assign.id} className="border-b border-slate-50 hover:bg-sky-50/30 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center">
                          <AssignmentInd fontSize="small" />
                        </div>
                        <p className="font-bold text-slate-800">{assign.teacher}</p>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-slate-600">
                      {assign.subject}
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg text-sm">{assign.class}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                        assign.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}>
                        {assign.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openModal(assign)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                          <Edit fontSize="small" />
                        </button>
                        <button onClick={() => handleDelete(assign.id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                          <Delete fontSize="small" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h3 className="font-black text-xl text-slate-800 tracking-tight">{editingId ? 'Edit Assignment' : 'Assign Teacher'}</h3>
                <button onClick={closeModal} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"><Close fontSize="small" /></button>
              </div>
              <div className="p-6">
                <form onSubmit={handleSave} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Teacher</label>
                    <select required className="glass-input w-full p-3 font-semibold text-slate-700" value={formData.teacher} onChange={e => setFormData({...formData, teacher: e.target.value})}>
                      <option value="">Select Teacher</option>
                      <option value="John Doe">John Doe</option>
                      <option value="Jane Smith">Jane Smith</option>
                      <option value="Robert Brown">Robert Brown</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Subject</label>
                    <select required className="glass-input w-full p-3 font-semibold text-slate-700" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}>
                      <option value="">Select Subject</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science</option>
                      <option value="English">English</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Class</label>
                    <select required className="glass-input w-full p-3 font-semibold text-slate-700" value={formData.class} onChange={e => setFormData({...formData, class: e.target.value})}>
                      <option value="">Select Class</option>
                      <option value="Class 10-A">Class 10-A</option>
                      <option value="Class 10-B">Class 10-B</option>
                      <option value="Class 9-B">Class 9-B</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Status</label>
                    <select required className="glass-input w-full p-3 font-semibold text-slate-700" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="pt-4 flex gap-3">
                    <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
                    <button type="submit" className="flex-1 py-3 rounded-xl font-bold text-white bg-sky-600 hover:bg-sky-700 transition-colors shadow-glow-indigo">Save Assignment</button>
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

export default TeacherAssignmentsPage;
