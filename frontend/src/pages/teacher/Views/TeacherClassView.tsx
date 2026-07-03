import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Class, ArrowBack, People, FactCheck, Assessment, Feed, CheckCircle, Close as CloseIcon } from '@mui/icons-material';

const classDataMap: Record<string, any> = {
  '10A': {
    name: 'Class 10-A',
    classTeacher: 'Mr. John Doe',
    room: '101',
    totalStudents: 45,
    avgAttendance: '92%',
    avgMarks: '85%',
    students: [
      { id: 1, name: 'Rahul Sharma', roll: '101', attendance: '95%', avgMarks: '88%' },
      { id: 2, name: 'Priya Gupta', roll: '102', attendance: '90%', avgMarks: '92%' },
      { id: 3, name: 'Amit Verma', roll: '103', attendance: '88%', avgMarks: '78%' },
      { id: 4, name: 'Neha Singh', roll: '104', attendance: '96%', avgMarks: '85%' },
      { id: 5, name: 'Vikram Patel', roll: '105', attendance: '82%', avgMarks: '72%' },
    ],
    recentAttendance: [
      { date: '30-Jun-2026', present: 42, absent: 3 },
      { date: '29-Jun-2026', present: 44, absent: 1 },
      { date: '28-Jun-2026', present: 40, absent: 5 },
    ],
    exams: [
      { name: 'FA1', date: '15-Jul-2026', avgScore: 82, status: 'Completed' },
      { name: 'SA1', date: '15-Dec-2026', avgScore: null, status: 'Upcoming' },
    ],
    pendingLeaves: [
      { id: 'L1', student: 'Vikram Patel', type: 'Sick', from: '02-Jul-2026', to: '03-Jul-2026', reason: 'Fever' },
      { id: 'L2', student: 'Neha Singh', type: 'Family', from: '05-Jul-2026', to: '05-Jul-2026', reason: 'Family function' },
    ],
  },
};

const TeacherClassView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const data = classDataMap[id || ''] || classDataMap['10A'];
  const [activeTab, setActiveTab] = useState('students');

  const tabs = [
    { id: 'students', label: 'Students', icon: <People fontSize="small" /> },
    { id: 'attendance', label: 'Attendance', icon: <FactCheck fontSize="small" /> },
    { id: 'marks', label: 'Marks', icon: <Assessment fontSize="small" /> },
    { id: 'leaves', label: 'Leaves', icon: <Feed fontSize="small" /> },
  ];

  return (
    <div className="pb-8 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold text-sm transition-colors"
        >
          <ArrowBack fontSize="small" /> Back
        </button>

        {/* Banner */}
        <div className="glass-card p-6 md:p-8 bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-xl mb-8 border-none relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner">
              <Class sx={{ fontSize: 40 }} />
            </div>
            <div className="flex-1">
              <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20 mb-2 inline-block">
                Assigned Class
              </span>
              <h2 className="text-3xl font-black tracking-tight">{data.name}</h2>
              <p className="text-indigo-200 font-bold mt-1">Class Teacher: {data.classTeacher} • Room {data.room}</p>
            </div>
            <div className="flex gap-4">
              <div className="text-center bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">Students</p>
                <p className="text-2xl font-black text-white">{data.totalStudents}</p>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">Attendance</p>
                <p className="text-2xl font-black text-emerald-300">{data.avgAttendance}</p>
              </div>
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
              {/* STUDENTS */}
              {activeTab === 'students' && (
                <div>
                  <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                    <People className="text-indigo-500" /> Student Roster ({data.totalStudents})
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-3 px-4 font-black text-slate-500 uppercase tracking-widest text-xs">Roll</th>
                          <th className="text-left py-3 px-4 font-black text-slate-500 uppercase tracking-widest text-xs">Name</th>
                          <th className="text-center py-3 px-4 font-black text-slate-500 uppercase tracking-widest text-xs">Attendance</th>
                          <th className="text-center py-3 px-4 font-black text-slate-500 uppercase tracking-widest text-xs">Avg Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.students?.map((s: any) => (
                          <tr 
                            key={s.id} 
                            onClick={() => navigate(`/classes/${id || '10A'}/students/${s.id}`)}
                            className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                          >
                            <td className="py-3 px-4 font-bold text-slate-600">{s.roll}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-xs text-indigo-600">{s.name.charAt(0)}</div>
                                <span className="font-bold text-slate-800">{s.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center font-bold text-emerald-600">{s.attendance}</td>
                            <td className="py-3 px-4 text-center font-bold text-sky-600">{s.avgMarks}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ATTENDANCE */}
              {activeTab === 'attendance' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                      <FactCheck className="text-emerald-500" /> Daily Attendance Log
                    </h3>
                    <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md shadow-emerald-200 hover:bg-emerald-700 transition-colors">
                      Take Attendance Today
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100 bg-white border border-slate-100 rounded-2xl overflow-hidden">
                    {data.recentAttendance?.map((r: any, i: number) => (
                      <div key={i} className="p-5 flex justify-between items-center hover:bg-slate-50 transition-colors">
                        <div>
                          <p className="font-black text-slate-800">{r.date}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total: {r.present + r.absent}</p>
                        </div>
                        <div className="flex gap-6">
                          <div className="text-center">
                            <p className="text-lg font-black text-emerald-600">{r.present}</p>
                            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Present</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-black text-rose-500">{r.absent}</p>
                            <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Absent</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-black text-slate-700">{Math.round((r.present / (r.present + r.absent)) * 100)}%</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rate</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MARKS */}
              {activeTab === 'marks' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <Assessment className="text-amber-500" /> Exam Performance
                  </h3>
                  <div className="divide-y divide-slate-100 bg-white border border-slate-100 rounded-2xl overflow-hidden">
                    {data.exams?.map((exam: any, i: number) => (
                      <div key={i} className="p-5 hover:bg-slate-50 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-black text-slate-800">{exam.name}</h4>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{exam.date}</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
                            exam.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                          }`}>{exam.status}</span>
                        </div>
                        {exam.avgScore !== null ? (
                          <div className="flex justify-between items-end">
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Class Average</p>
                              <p className="text-2xl font-black text-indigo-600">{exam.avgScore}%</p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm font-bold text-slate-400">Results pending</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* LEAVES */}
              {activeTab === 'leaves' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <Feed className="text-rose-500" /> Pending Leave Requests
                  </h3>
                  <div className="divide-y divide-slate-100 bg-white border border-slate-100 rounded-2xl overflow-hidden">
                    {data.pendingLeaves?.length > 0 ? data.pendingLeaves.map((leave: any) => (
                      <div key={leave.id} className="p-5 hover:bg-slate-50 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-black text-slate-800">{leave.student}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{leave.type} Leave • {leave.from} to {leave.to}</p>
                          </div>
                          <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest">Pending</span>
                        </div>
                        <p className="text-sm font-semibold text-slate-600 italic mb-4">"{leave.reason}"</p>
                        <div className="flex gap-3">
                          <button className="flex-1 py-2 bg-emerald-600 text-white rounded-lg font-bold text-sm hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1 shadow-sm">
                            <CheckCircle fontSize="small" /> Approve
                          </button>
                          <button className="flex-1 py-2 bg-rose-50 text-rose-600 border border-rose-200 rounded-lg font-bold text-sm hover:bg-rose-100 transition-colors flex items-center justify-center gap-1">
                            <CloseIcon fontSize="small" /> Reject
                          </button>
                        </div>
                      </div>
                    )) : (
                      <div className="p-8 text-center bg-slate-50">
                        <CheckCircle className="text-emerald-400 mb-2" sx={{ fontSize: 48 }} />
                        <p className="font-bold text-slate-500">No pending leave requests. All clear!</p>
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

export default TeacherClassView;
