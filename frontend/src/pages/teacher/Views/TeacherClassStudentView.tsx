import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowBack, Assessment, FactCheck, Feed, Person, Call, Mail, LocationOn } from '@mui/icons-material';

const studentDataMap: Record<string, any> = {
  '1': {
    name: 'Rahul Sharma', rollNo: '101', class: '10-A', admissionNo: 'SMS-2023-001',
    parent: 'Mr. Ramesh Sharma', phone: '+91 98765 43210', email: 'ramesh@example.com', address: '123, Park Street, New Delhi',
    attendance: '95%',
    marks: [
      { subject: 'Mathematics', fa1: 45, sa1: 88, max: 100 },
      { subject: 'Science', fa1: 42, sa1: null, max: 50 },
    ],
    leaves: [
      { type: 'Sick', from: '12-Jun-2026', to: '14-Jun-2026', status: 'Approved' }
    ]
  },
  '2': {
    name: 'Priya Gupta', rollNo: '102', class: '10-A', admissionNo: 'SMS-2023-045',
    parent: 'Mr. Sanjay Gupta', phone: '+91 98765 11111', email: 'sanjay@example.com', address: '45, MG Road, Mumbai',
    attendance: '90%',
    marks: [
      { subject: 'Mathematics', fa1: 35, sa1: null, max: 50 },
    ],
    leaves: []
  }
};

const TeacherClassStudentView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const data = studentDataMap[id || ''] || studentDataMap['1'];
  
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <Person fontSize="small" /> },
    { id: 'academic', label: 'Academic', icon: <Assessment fontSize="small" /> },
    { id: 'attendance', label: 'Attendance', icon: <FactCheck fontSize="small" /> },
    { id: 'leaves', label: 'Leaves', icon: <Feed fontSize="small" /> },
  ];

  return (
    <div className="pb-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold text-sm transition-colors"
        >
          <ArrowBack fontSize="small" /> Back
        </button>

        {/* Banner */}
        <div className="glass-card p-6 md:p-8 bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl mb-8 border-none relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-inner text-4xl font-black">
              {data.name.charAt(0)}
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20 mb-2 inline-block">
                Student Profile
              </span>
              <h2 className="text-3xl font-black tracking-tight">{data.name}</h2>
              <p className="text-indigo-100 font-bold mt-1">Class {data.class} • Roll No: {data.rollNo} • {data.admissionNo}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-6 hide-scrollbar pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                  : 'bg-white/50 text-slate-600 hover:bg-white/80'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="glass-card min-h-[400px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-6"
            >
              {/* PROFILE TAB */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-black text-lg text-slate-800">Contact Information</h3>
                  </div>
                  
                  <div className="divide-y divide-slate-100 bg-white border border-slate-100 rounded-2xl overflow-hidden">
                    <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                          <Person className="text-slate-400" fontSize="small" />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Parent Name</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-800">{data.parent}</p>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                          <Call className="text-slate-400" fontSize="small" />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phone</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-800">{data.phone}</p>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                          <Mail className="text-slate-400" fontSize="small" />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-800">{data.email}</p>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                          <LocationOn className="text-slate-400" fontSize="small" />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Address</span>
                      </div>
                      <div className="text-right flex-1 ml-4 flex justify-end">
                        <p className="font-bold text-slate-800 truncate max-w-sm" title={data.address}>{data.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ACADEMIC TAB */}
              {activeTab === 'academic' && (
                <div className="space-y-4">
                  <h3 className="font-black text-lg text-slate-800 mb-4">Academic Performance</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="text-left py-3 px-4 font-black text-slate-500 uppercase tracking-widest text-xs">Subject</th>
                          <th className="text-center py-3 px-4 font-black text-slate-500 uppercase tracking-widest text-xs">FA1</th>
                          <th className="text-center py-3 px-4 font-black text-slate-500 uppercase tracking-widest text-xs">SA1</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.marks.map((m: any, idx: number) => (
                          <tr key={idx} className="border-b border-slate-100">
                            <td className="py-3 px-4 font-bold text-slate-800">{m.subject}</td>
                            <td className="py-3 px-4 text-center font-bold text-slate-600">{m.fa1 || '-'}</td>
                            <td className="py-3 px-4 text-center font-bold text-slate-600">{m.sa1 || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ATTENDANCE TAB */}
              {activeTab === 'attendance' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-black text-lg text-slate-800">Attendance Overview</h3>
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-black text-sm">{data.attendance}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl text-center">
                    <FactCheck className="text-slate-300 mb-2" sx={{ fontSize: 48 }} />
                    <p className="font-bold text-slate-500">Detailed calendar view will be available here.</p>
                  </div>
                </div>
              )}

              {/* LEAVES TAB */}
              {activeTab === 'leaves' && (
                <div className="space-y-4">
                  <h3 className="font-black text-lg text-slate-800 mb-4">Leave History</h3>
                  <div className="divide-y divide-slate-100 bg-white border border-slate-100 rounded-2xl overflow-hidden">
                    {data.leaves.length > 0 ? data.leaves.map((l: any, idx: number) => (
                      <div key={idx} className="p-5 flex justify-between items-center hover:bg-slate-50 transition-colors">
                        <div>
                          <p className="font-bold text-slate-800">{l.type} Leave</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{l.from} to {l.to}</p>
                        </div>
                        <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest">{l.status}</span>
                      </div>
                    )) : (
                      <div className="p-8 text-center bg-slate-50">
                        <p className="font-bold text-slate-500">No leave requests found.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default TeacherClassStudentView;
