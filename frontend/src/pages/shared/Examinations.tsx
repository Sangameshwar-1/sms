import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Add, Search, CalendarToday, AccessTime, Edit, Delete, Close, BarChart } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import GradeDistributionGraph from '../../components/shared/GradeDistributionGraph';

const dummyExams = [
  { id: 1, name: 'FA1', subject: 'Mathematics', class: '10', section: 'A', teacher: 'Mr. Ramesh', date: '2026-08-15', time: '10:00 AM', status: 'Upcoming' },
  { id: 2, name: 'SA1', subject: 'Science', class: '10', section: 'A', teacher: 'Ms. Priya', date: '2026-10-10', time: '09:00 AM', status: 'Upcoming' },
  { id: 3, name: 'Unit Test', subject: 'English', class: '9', section: 'B', teacher: 'Mr. Kiran', date: '2026-06-20', time: '11:00 AM', status: 'Completed' },
  { id: 4, name: 'FA1', subject: 'Social Studies', class: '10', section: 'B', teacher: 'Mr. Ramesh', date: '2026-06-24', time: '01:00 PM', status: 'Ongoing' },
];

const Examinations = () => {
  const { role } = useAuth();
  
  const [exams] = useState(dummyExams);
  const [expandedExamGraph, setExpandedExamGraph] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [quickFilter, setQuickFilter] = useState('All');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<any>(null);
  
  const isAdminOrTeacher = role === 'Admin' || role === 'Teacher';
  const isAdmin = role === 'Admin';

  const quickChips = isAdminOrTeacher 
    ? ['All', 'Upcoming', 'Ongoing', 'Completed', 'Today', 'This Week']
    : ['All', 'Upcoming', 'Completed'];

  const openModal = (exam?: any) => {
    setEditingExam(exam || null);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    closeModal();
    // Would save to backend here
  };

  return (
    <div className="pb-12 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        
        <div className="flex justify-between items-center mb-6">
          <div className="relative flex-1 max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-slate-400" />
            </div>
            <input
              type="text"
              className="w-full pl-12 pr-4 py-4 glass-card text-slate-700 font-bold placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-lg border-none"
              placeholder="Search Exams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {isAdmin && (
            <button 
              onClick={() => openModal()}
              className="glass-button flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-glow-indigo border-0"
            >
              <Add fontSize="small" /> Schedule Exam
            </button>
          )}
        </div>

        {/* Quick Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {quickChips.map((chip) => (
            <button
              key={chip}
              onClick={() => setQuickFilter(chip)}
              className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${
                quickFilter === chip 
                  ? 'bg-indigo-600 text-white shadow-glow-indigo scale-105' 
                  : 'bg-white/50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 border border-white/60'
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Results Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/80 border-b border-slate-100">
                <tr>
                  <th className="p-4 font-extrabold text-slate-500 text-xs uppercase tracking-wider">Exam Details</th>
                  {isAdminOrTeacher && <th className="p-4 font-extrabold text-slate-500 text-xs uppercase tracking-wider">Class</th>}
                  <th className="p-4 font-extrabold text-slate-500 text-xs uppercase tracking-wider">Schedule</th>
                  {isAdminOrTeacher && <th className="p-4 font-extrabold text-slate-500 text-xs uppercase tracking-wider">Teacher</th>}
                  <th className="p-4 font-extrabold text-slate-500 text-xs uppercase tracking-wider">Status</th>
                  <th className="p-4 font-extrabold text-slate-500 text-xs uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam, _idx) => (
                  <React.Fragment key={exam.id}>
                    <tr className="border-b border-slate-50 hover:bg-indigo-50/30 transition-colors group">
                      <td className="p-4">
                        <p className="font-bold text-slate-800">{exam.name}</p>
                        <p className="text-xs text-slate-500 font-semibold">{exam.subject}</p>
                      </td>
                      {isAdminOrTeacher && (
                        <td className="p-4">
                          <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold">
                            {exam.class}-{exam.section}
                          </span>
                        </td>
                      )}
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <span className="flex items-center gap-1 text-sm font-semibold text-slate-700">
                            <CalendarToday fontSize="inherit" className="text-slate-400" /> {exam.date}
                          </span>
                          <span className="flex items-center gap-1 text-xs font-bold text-slate-500">
                            <AccessTime fontSize="inherit" className="text-slate-400" /> {exam.time}
                          </span>
                        </div>
                      </td>
                      {isAdminOrTeacher && (
                        <td className="p-4 font-semibold text-slate-600 text-sm">
                          {exam.teacher}
                        </td>
                      )}
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                          exam.status === 'Upcoming' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                          exam.status === 'Ongoing' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                          'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        }`}>
                          {exam.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2 items-center">
                          <button 
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              setExpandedExamGraph(expandedExamGraph === exam.id ? null : exam.id); 
                            }}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                              expandedExamGraph === exam.id ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 text-indigo-400 hover:bg-indigo-50 hover:text-indigo-600'
                            }`}
                            title="View Grade Distribution"
                          >
                            <BarChart sx={{ fontSize: 16 }} />
                          </button>
                          {isAdmin ? (
                            <>
                              <button onClick={() => openModal(exam)} className="w-8 h-8 rounded-lg bg-slate-50 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 flex items-center justify-center transition-colors">
                                <Edit sx={{ fontSize: 16 }} />
                              </button>
                              <button className="w-8 h-8 rounded-lg bg-slate-50 text-slate-500 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center transition-colors">
                                <Delete sx={{ fontSize: 16 }} />
                              </button>
                            </>
                          ) : (
                            <button className="text-indigo-600 hover:text-indigo-800 font-bold text-sm bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors">
                              View Details
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                    <AnimatePresence>
                      {expandedExamGraph === exam.id && (
                        <tr>
                          <td colSpan={isAdminOrTeacher ? 6 : 4} className="p-0 border-b border-slate-100 bg-slate-50/30">
                            <GradeDistributionGraph isVisible={true} />
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </motion.div>

      {/* Admin Exam Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]" onClick={closeModal} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed z-[1000] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-md rounded-3xl overflow-hidden glass-card shadow-2xl bg-white/95"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h3 className="font-black text-xl text-slate-800 tracking-tight">{editingExam ? 'Edit Exam' : 'Schedule Exam'}</h3>
                <button onClick={closeModal} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"><Close fontSize="small" /></button>
              </div>
              <div className="p-6">
                <form onSubmit={handleSave} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Exam Name</label>
                    <input required type="text" className="glass-input w-full p-3 font-semibold text-slate-700" defaultValue={editingExam?.name} placeholder="e.g. FA1" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Subject</label>
                      <select required className="glass-input w-full p-3 font-semibold text-slate-700" defaultValue={editingExam?.subject}>
                        <option>Mathematics</option>
                        <option>Science</option>
                        <option>English</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Class</label>
                      <select required className="glass-input w-full p-3 font-semibold text-slate-700" defaultValue={editingExam?.class}>
                        <option>Class 9</option>
                        <option>Class 10</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Date</label>
                      <input required type="date" className="glass-input w-full p-3 font-semibold text-slate-700" defaultValue={editingExam?.date} />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Time</label>
                      <input required type="time" className="glass-input w-full p-3 font-semibold text-slate-700" defaultValue={editingExam?.time?.split(' ')[0]} />
                    </div>
                  </div>
                  <div className="pt-4 flex gap-3">
                    <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
                    <button type="submit" className="flex-1 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-glow-indigo">Save Exam</button>
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

export default Examinations;
