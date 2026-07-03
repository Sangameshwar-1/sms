import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { School, People, ArrowBack, EventNote, PersonSearch, AutoStories, BarChart, Edit, Save } from '@mui/icons-material';
import { ResponsiveTable } from '../../components/ui';
import GradeDistributionGraph from '../../components/shared/GradeDistributionGraph';
import type { TableColumn } from '../../components/ui';

// ── Mock Data ──
const classDetails: Record<string, any> = {
  '10-A': {
    name: 'Class 10', section: 'A',
    classTeacher: 'Mr. Sharma', totalStudents: 45,
    students: [
      { id: 'STU001', roll: '1', name: 'Rahul Sharma', status: 'Active' },
      { id: 'STU002', roll: '2', name: 'Priya Singh', status: 'Active' },
      { id: 'STU003', roll: '3', name: 'Amit Verma', status: 'Active' },
    ],
    schedule: [
      { day: 'Monday', time: '08:00 AM', subject: 'Mathematics', teacher: 'Mr. Rajesh Kumar' },
      { day: 'Monday', time: '09:00 AM', subject: 'Science', teacher: 'Mrs. Anjali Gupta' },
      { day: 'Tuesday', time: '08:00 AM', subject: 'English', teacher: 'Mr. David Smith' },
    ]
  }
};

const ClassHub = () => {
  const { classId: id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'students' | 'schedule' | 'subjects' | 'attendance' | 'marks'>('students');
  const [isAttendanceEditMode, setIsAttendanceEditMode] = useState(false);
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [expandedExamGraph, setExpandedExamGraph] = useState<number | null>(null);

  const classKey = id?.toUpperCase() || '10-A';
  const data = classDetails[classKey] || classDetails['10-A'];

  const studentColumns: TableColumn[] = [
    { key: 'roll', label: 'Roll No.' },
    { 
      key: 'name', 
      label: 'Student Name',
      render: (val) => <span className="font-bold text-slate-800">{val}</span>
    }
  ];

  return (
    <div className="pb-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-colors shadow-sm"
        >
          <ArrowBack fontSize="small" />
        </button>
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Class Details</h2>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Class {id}</p>
        </div>
      </motion.div>

      {/* Banner */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 md:p-8 bg-gradient-to-br from-indigo-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner shrink-0">
            <School sx={{ fontSize: 40 }} />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">{data.name} - Section {data.section}</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3 md:mt-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest backdrop-blur-md border border-white/20 inline-flex items-center gap-2">
                <PersonSearch fontSize="small" /> Teacher: {data.classTeacher}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest backdrop-blur-md border border-white/20 inline-flex items-center gap-2">
                <People fontSize="small" /> {data.totalStudents} Students
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        <button 
          onClick={() => setActiveTab('students')}
          className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'students' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-50'
          }`}
        >
          <People fontSize="small" /> Enrolled Students
        </button>
        <button 
          onClick={() => setActiveTab('schedule')}
          className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'schedule' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-50'
          }`}
        >
          <EventNote fontSize="small" /> Class Timetable
        </button>
        <button 
          onClick={() => setActiveTab('subjects')}
          className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeTab === 'subjects' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-50'
          }`}
        >
          <AutoStories fontSize="small" /> Subjects
        </button>
        <button 
          onClick={() => setActiveTab('attendance')}
          className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeTab === 'attendance' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-50'
          }`}
        >
          <EventNote fontSize="small" /> Attendance
        </button>
        <button 
          onClick={() => setActiveTab('marks')}
          className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeTab === 'marks' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-50'
          }`}
        >
          <EventNote fontSize="small" /> Exams & Marks
        </button>
      </div>

      {/* Content Area */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={activeTab}>
        {activeTab === 'students' && (
          <div className="glass-card overflow-hidden bg-white">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-black text-slate-700 text-sm uppercase tracking-widest flex items-center gap-2">
                <People className="text-indigo-500" fontSize="small" /> Student Roster
              </h3>
            </div>
            <ResponsiveTable 
              columns={studentColumns}
              data={data.students}
              hoverable
              onRowClick={(row: any) => navigate(`/classes/${id}/students/${row.id}`)}
            />
          </div>
        )}
        
        {activeTab === 'schedule' && (
          <div className="glass-card overflow-hidden bg-white">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-black text-slate-700 text-sm uppercase tracking-widest flex items-center gap-2">
                <EventNote className="text-indigo-500" fontSize="small" /> Weekly Schedule
              </h3>
            </div>
            <div className="p-5 overflow-x-auto">
              <div className="min-w-[700px] border border-slate-100 rounded-xl overflow-hidden">
                <div className="grid grid-cols-6 bg-slate-50 border-b border-slate-100">
                  <div className="p-3 text-center font-black text-[10px] uppercase tracking-widest text-slate-400 border-r border-slate-100">Time</div>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                    <div key={day} className="p-3 text-center font-black text-[10px] uppercase tracking-widest text-slate-400 border-r border-slate-100 last:border-0">{day}</div>
                  ))}
                </div>
                {['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM'].map((time) => (
                  <div key={time} className="grid grid-cols-6 border-b border-slate-100 last:border-0">
                    <div className="p-3 flex items-center justify-center font-bold text-xs text-slate-500 border-r border-slate-100 bg-slate-50/30">
                      {time}
                    </div>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => {
                      const slot = data.schedule.find((s: any) => s.day === day && s.time === time);
                      return (
                        <div key={day} className="p-2 border-r border-slate-100 last:border-0 h-24 relative hover:bg-slate-50 transition-colors cursor-pointer group" onClick={() => slot && navigate(`/classes/${id}/subjects/${slot.subject.toLowerCase()}`)}>
                          {slot ? (
                            <div className="absolute inset-2 bg-indigo-50/50 rounded-lg p-2 border border-indigo-100/50 flex flex-col justify-center">
                              <p className="font-black text-slate-800 text-[11px] leading-tight group-hover:text-indigo-600 transition-colors">{slot.subject}</p>
                              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1 truncate">{slot.teacher}</p>
                            </div>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-300 font-bold italic">-</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subjects' && (
          <div className="glass-card overflow-hidden bg-white">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-black text-slate-700 text-sm uppercase tracking-widest flex items-center gap-2">
                <AutoStories className="text-indigo-500" fontSize="small" /> Assigned Subjects
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { name: 'Mathematics', code: 'MAT-101', teacher: 'Mr. Rajesh Kumar', credits: 4 },
                { name: 'Science', code: 'SCI-101', teacher: 'Mrs. Anjali Gupta', credits: 4 },
                { name: 'English', code: 'ENG-101', teacher: 'Mr. David Smith', credits: 3 },
                { name: 'History', code: 'HIS-101', teacher: 'Ms. Sarah Lee', credits: 3 },
                { name: 'Computer Science', code: 'CS-101', teacher: 'Mr. John Doe', credits: 2 }
              ].map((subj, idx) => (
                <div key={idx} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate(`/classes/${id}/subjects/${subj.code}`)}>
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                    <AutoStories fontSize="small" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-slate-800 text-sm">{subj.name}</h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{subj.code} • {subj.teacher}</p>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">{subj.credits} Credits</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="glass-card overflow-hidden bg-white">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="font-black text-slate-700 text-sm uppercase tracking-widest flex items-center gap-2">
                <EventNote className="text-indigo-500" fontSize="small" /> Attendance Record
              </h3>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <input 
                  type="date" 
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="bg-white border border-slate-200 text-slate-700 text-sm font-bold px-3 py-1.5 rounded-lg outline-none focus:border-indigo-500 transition-colors flex-1 sm:flex-none"
                />
                <button 
                  onClick={() => setIsAttendanceEditMode(!isAttendanceEditMode)}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-widest flex items-center gap-1 transition-colors ${
                    isAttendanceEditMode ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {isAttendanceEditMode ? <><Save fontSize="small" /> Save</> : <><Edit fontSize="small" /> Edit</>}
                </button>
              </div>
            </div>
            <div className="p-5 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-100">
                    <th className="py-3 px-4 font-black text-[10px] uppercase tracking-widest text-slate-400">Roll No</th>
                    <th className="py-3 px-4 font-black text-[10px] uppercase tracking-widest text-slate-400">Student Name</th>
                    <th className="py-3 px-4 font-black text-[10px] uppercase tracking-widest text-slate-400 text-center">Status</th>
                    <th className="py-3 px-4 font-black text-[10px] uppercase tracking-widest text-slate-400">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {data.students.map((student: any) => (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-600">{student.roll}</td>
                      <td className="py-3 px-4 font-bold text-slate-800">{student.name}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2 bg-slate-100 p-1 rounded-lg w-max mx-auto">
                          <button disabled={!isAttendanceEditMode} className={`px-3 py-1 rounded text-xs font-black uppercase tracking-widest transition-all ${!isAttendanceEditMode ? 'opacity-50 cursor-not-allowed text-white bg-emerald-500' : 'bg-emerald-500 text-white shadow-sm hover:opacity-90'}`}>P</button>
                          <button disabled={!isAttendanceEditMode} className={`px-3 py-1 rounded text-xs font-black uppercase tracking-widest transition-all ${!isAttendanceEditMode ? 'opacity-50 cursor-not-allowed text-slate-500' : 'text-slate-500 hover:bg-white hover:shadow-sm'}`}>A</button>
                          <button disabled={!isAttendanceEditMode} className={`px-3 py-1 rounded text-xs font-black uppercase tracking-widest transition-all ${!isAttendanceEditMode ? 'opacity-50 cursor-not-allowed text-slate-500' : 'text-slate-500 hover:bg-white hover:shadow-sm'}`}>L</button>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <input type="text" placeholder={isAttendanceEditMode ? "Optional remark" : ""} disabled={!isAttendanceEditMode} className="w-full text-xs p-2 rounded-md border border-slate-200 focus:border-indigo-500 outline-none disabled:bg-slate-50 disabled:text-slate-400" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {isAttendanceEditMode && (
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={() => setIsAttendanceEditMode(false)}
                    className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md"
                  >
                    Save Attendance
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'marks' && (
          <div className="glass-card overflow-hidden bg-white">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-black text-slate-700 text-sm uppercase tracking-widest flex items-center gap-2">
                <AutoStories className="text-indigo-500" fontSize="small" /> Examinations & Marks
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { name: 'Midterm Examination', date: '15-Sep-2026', status: 'Completed', avgScore: '82%' },
                { name: 'Formative Assessment 1', date: '10-Jul-2026', status: 'Grading', avgScore: 'Pending' },
                { name: 'Final Examination', date: '20-Mar-2027', status: 'Upcoming', avgScore: '-' }
              ].map((exam, idx) => (
                <div key={idx} className="flex flex-col border-b border-slate-50 last:border-0">
                  <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate(`/classes/${id}/exams/${exam.name.replace(/\s+/g, '-').toLowerCase()}`)}>
                    <div>
                      <h4 className="font-black text-slate-800 text-lg">{exam.name}</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Date: {exam.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Class Average</p>
                        <p className="font-bold text-slate-700">{exam.avgScore}</p>
                      </div>
                      <span className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
                        exam.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                        exam.status === 'Grading' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {exam.status}
                      </span>
                      {['Completed', 'Grading'].includes(exam.status) && (
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setExpandedExamGraph(expandedExamGraph === idx ? null : idx); 
                          }}
                          className={`p-1.5 rounded-lg transition-colors ml-2 ${
                            expandedExamGraph === idx ? 'bg-indigo-600 text-white shadow-md' : 'text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 border border-indigo-100'
                          }`}
                          title="View Class Performance"
                        >
                          <BarChart fontSize="small" />
                        </button>
                      )}
                    </div>
                  </div>
                  <AnimatePresence>
                    <GradeDistributionGraph isVisible={expandedExamGraph === idx} />
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ClassHub;
