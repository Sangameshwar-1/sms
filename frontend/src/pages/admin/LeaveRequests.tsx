import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Close as CloseIcon, FilterList } from '@mui/icons-material';

type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

interface LeaveRequest {
  id: string;
  applicant: string;
  role: 'Teacher' | 'Student';
  class?: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
}

const initialLeaves: LeaveRequest[] = [
  { id: 'LR001', applicant: 'John Doe', role: 'Teacher', startDate: '2026-07-10', endDate: '2026-07-12', reason: 'Medical emergency', status: 'Pending' },
  { id: 'LR002', applicant: 'Alice (Class 10-A)', role: 'Student', class: '10-A', startDate: '2026-07-15', endDate: '2026-07-16', reason: 'Family function', status: 'Pending' },
  { id: 'LR003', applicant: 'Jane Smith', role: 'Teacher', startDate: '2026-06-20', endDate: '2026-06-25', reason: 'Vacation', status: 'Approved' },
  { id: 'LR004', applicant: 'Bob (Class 9-B)', role: 'Student', class: '9-B', startDate: '2026-06-01', endDate: '2026-06-02', reason: 'Sick', status: 'Rejected' },
];

const LeaveRequests = () => {
  const [leaves, setLeaves] = useState<LeaveRequest[]>(initialLeaves);
  const [activeTab, setActiveTab] = useState<'Pending' | 'Approved' | 'Rejected' | 'All'>('Pending');
  const [roleFilter, setRoleFilter] = useState<'All' | 'Teacher' | 'Student'>('All');
  
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const filteredLeaves = leaves.filter(l => 
    (activeTab === 'All' || l.status === activeTab) &&
    (roleFilter === 'All' || l.role === roleFilter)
  );

  const counts = {
    Pending: leaves.filter(l => l.status === 'Pending').length,
    Approved: leaves.filter(l => l.status === 'Approved').length,
    Rejected: leaves.filter(l => l.status === 'Rejected').length,
    All: leaves.length
  };

  const handleApprove = (id: string) => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, status: 'Approved' } : l));
  };

  const openRejectModal = (id: string) => {
    setRejectId(id);
    setRejectReason('');
    setIsRejectModalOpen(true);
  };

  const handleReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (rejectId) {
      setLeaves(leaves.map(l => l.id === rejectId ? { ...l, status: 'Rejected' } : l));
    }
    setIsRejectModalOpen(false);
    setRejectId(null);
  };

  const getStatusColor = (status: LeaveStatus) => {
    switch (status) {
      case 'Pending': return 'bg-amber-100 text-amber-600 border-amber-200';
      case 'Approved': return 'bg-emerald-100 text-emerald-600 border-emerald-200';
      case 'Rejected': return 'bg-rose-100 text-rose-600 border-rose-200';
    }
  };

  return (
    <div className="pb-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black gradient-text tracking-tight uppercase">Leave Requests</h2>
        </div>

        {/* Filters and Tabs */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-2 p-1 bg-white/50 rounded-xl border border-white">
            {(['Pending', 'Approved', 'Rejected', 'All'] as const).map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                  activeTab === tab ? 'bg-indigo-600 text-white shadow-glow-indigo' : 'text-slate-500 hover:bg-white'
                }`}
              >
                {tab} <span className="opacity-70 ml-1">({counts[tab]})</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <FilterList className="text-slate-400" fontSize="small" />
            <select className="glass-input px-3 py-2 text-sm font-bold text-slate-600" value={roleFilter} onChange={e => setRoleFilter(e.target.value as any)}>
              <option value="All">All Roles</option>
              <option value="Teacher">Teachers</option>
              <option value="Student">Students</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredLeaves.map((leave, idx) => (
            <motion.div 
              key={leave.id}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }}
              className="glass-card p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-black ${
                    leave.role === 'Teacher' ? 'bg-purple-100 text-purple-600' : 'bg-sky-100 text-sky-600'
                  }`}>
                    {leave.applicant.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800 leading-tight">{leave.applicant}</h3>
                    <span className="text-xs font-bold text-slate-400">{leave.role}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-black uppercase tracking-widest border ${getStatusColor(leave.status)}`}>
                  {leave.status}
                </span>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Duration</span>
                  <span className="text-sm font-black text-slate-700">{leave.startDate} to {leave.endDate}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Reason</span>
                  <p className="text-sm font-semibold text-slate-600 italic">"{leave.reason}"</p>
                </div>
              </div>

              {leave.status === 'Pending' && (
                <div className="flex gap-2">
                  <button onClick={() => handleApprove(leave.id)} className="flex-1 py-2 bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100 font-bold rounded-xl flex justify-center items-center gap-1 transition-colors">
                    <Check fontSize="small" /> Approve
                  </button>
                  <button onClick={() => openRejectModal(leave.id)} className="flex-1 py-2 bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 font-bold rounded-xl flex justify-center items-center gap-1 transition-colors">
                    <CloseIcon fontSize="small" /> Reject
                  </button>
                </div>
              )}
            </motion.div>
          ))}
          {filteredLeaves.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-400 font-bold">
              No leave requests found for this filter.
            </div>
          )}
        </div>
      </motion.div>

      {/* Reject Modal */}
      <AnimatePresence>
        {isRejectModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]" onClick={() => setIsRejectModalOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed z-[1000] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-md rounded-3xl overflow-hidden glass-card shadow-2xl bg-white/95"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h3 className="font-black text-xl text-slate-800 tracking-tight">Reject Leave</h3>
                <button onClick={() => setIsRejectModalOpen(false)} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"><CloseIcon fontSize="small" /></button>
              </div>
              <div className="p-6">
                <form onSubmit={handleReject} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Reason for Rejection (Optional)</label>
                    <textarea className="glass-input w-full p-3 font-semibold text-slate-700 h-24 resize-none" value={rejectReason} onChange={e => setRejectReason(e.target.value)} placeholder="Type a reason..." />
                  </div>
                  <div className="pt-4 flex gap-3">
                    <button type="button" onClick={() => setIsRejectModalOpen(false)} className="flex-1 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
                    <button type="submit" className="flex-1 py-3 rounded-xl font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-glow-rose">Confirm Reject</button>
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

export default LeaveRequests;
