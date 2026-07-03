import { useState } from 'react';
import { motion } from 'framer-motion';
import { Face, Timeline, WarningAmber, Lock, Assessment, Edit, Save, ArrowBack, Group } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';

const StudentHub = () => {
  const { id: _id } = useParams();
  const navigate = useNavigate();
  const { role } = useAuth();
  
  // For demonstration, we allow Teachers to toggle between Class Teacher and Subject Teacher view
  const [isClassTeacher, setIsClassTeacher] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'attendance' | 'subjects' | 'progress'>('profile');
  const [isEditingAttendance, setIsEditingAttendance] = useState(false);
  const [attendanceData, setAttendanceData] = useState<string[]>(
    Array.from({length: 31}).map((_, i) => (i !== 12 && i !== 22 && i <= 15 ? 'P' : i > 15 ? '' : 'A'))
  );
  const [originalAttendanceData, setOriginalAttendanceData] = useState<string[]>([]);
  const hasAttendanceChanges = JSON.stringify(attendanceData) !== JSON.stringify(originalAttendanceData);
  const [selectedSubject, setSelectedSubject] = useState<any>(null);
  const [subjectActiveTab, setSubjectActiveTab] = useState<'assignments' | 'marks'>('assignments');
  const [progressFilter, setProgressFilter] = useState<string>('All Subjects');
  const [isGlobalEditMode, setIsGlobalEditMode] = useState(false);

  const [marksData, setMarksData] = useState([
    { id: 1, term: 'Midterm Examination', date: '15-May-2026', score: '92', total: '100', grade: 'A' },
    { id: 2, term: 'Formative Assessment 1', date: '10-Apr-2026', score: '24', total: '25', grade: 'A' },
  ]);
  const [originalMarksData, setOriginalMarksData] = useState(marksData);
  const [isEditingMarks, setIsEditingMarks] = useState(false);
  const hasMarksChanges = JSON.stringify(marksData) !== JSON.stringify(originalMarksData);

  const isAdmin = role === 'Admin';
  const isTeacher = role === 'Teacher';
  
  // Derived Permissions
  // Admin: full access (Personal Info, Attendance, Leaves, All Marks)
  // Class Teacher: monitor access (Attendance, Leaves, All Marks, Basic Info) - No Edit
  // Subject Teacher: restricted (Only Marks for their subject, No Attendance, No Leaves, No Personal Info)
  
  const canViewPersonalInfo = isAdmin;
  const canViewAttendance = isAdmin || (isTeacher && isClassTeacher);
  // const _canViewLeaves = isAdmin || (isTeacher && isClassTeacher);
  const canViewAllMarks = isAdmin || (isTeacher && isClassTeacher);
  const canEdit = isAdmin;

  const colorMap: Record<string, string> = {
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
  };

  return (
    <div className="pb-8 max-w-7xl mx-auto space-y-8">
      {/* Teacher Role Toggle (For Testing) */}
      {isTeacher && (
        <div className="glass-card p-4 flex items-center justify-between bg-indigo-50 border-indigo-100">
          <div>
            <h4 className="font-black text-indigo-800">Teacher View Mode</h4>
            <p className="text-xs font-bold text-indigo-500">Toggle to see how the UI adapts to your specific role.</p>
          </div>
          <div className="flex bg-white rounded-lg p-1 shadow-sm border border-indigo-100">
            <button 
              onClick={() => setIsClassTeacher(false)}
              className={`px-4 py-2 rounded-md text-xs font-black uppercase tracking-widest transition-all ${!isClassTeacher ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-indigo-500'}`}
            >
              Subject Teacher
            </button>
            <button 
              onClick={() => setIsClassTeacher(true)}
              className={`px-4 py-2 rounded-md text-xs font-black uppercase tracking-widest transition-all ${isClassTeacher ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-indigo-500'}`}
            >
              Class Teacher
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold text-sm transition-colors"
      >
        <ArrowBack fontSize="small" /> Back
      </button>

      {/* Header Profile Section */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden bg-white gap-6 md:gap-0">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 relative z-10 text-center md:text-left">
          <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-md flex items-center justify-center shrink-0">
            <Face sx={{ fontSize: 48 }} className="text-slate-300" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">John Doe <span className="text-sm md:text-base text-slate-400 font-bold ml-1 md:ml-2">#STU-1029</span></h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3 md:mt-2">
              <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded font-bold text-xs uppercase tracking-widest">Class 10-A</span>
              <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded font-bold text-xs uppercase tracking-widest">Active</span>
            </div>
          </div>
        </div>
      </motion.div>

      {!selectedSubject ? (
        <>
          {/* Tabs */}
          <div className="flex bg-white/60 backdrop-blur-md rounded-2xl p-1.5 shadow-sm border border-slate-200">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-white hover:shadow-sm'
              }`}
            >
              <Face fontSize="small" /> Profile
            </button>
            <button 
              onClick={() => setActiveTab('attendance')}
              className={`px-6 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'attendance' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-white hover:shadow-sm'
              }`}
            >
              <Timeline fontSize="small" /> Attendance
            </button>
            <button 
              onClick={() => setActiveTab('subjects')}
              className={`px-6 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'subjects' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-white hover:shadow-sm'
              }`}
            >
              <Face fontSize="small" /> Subjects
            </button>
        <button 
          onClick={() => setActiveTab('progress')}
          className={`px-6 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'progress' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-white hover:shadow-sm'
          }`}
        >
          <Timeline fontSize="small" /> Progress
        </button>
      </div>

      {/* Content Area */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={activeTab}>
        
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          canViewPersonalInfo ? (
            <div className="space-y-6 max-w-2xl">
              <div className="glass-card overflow-hidden bg-white">
                <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <h3 className="font-black text-sm text-slate-700 uppercase tracking-widest flex items-center gap-2">
                    <Face fontSize="small" className="text-indigo-500" /> Personal Info
                  </h3>
                  {canEdit && (
                    <button 
                      onClick={() => setIsGlobalEditMode(!isGlobalEditMode)}
                      className={`p-2 rounded-lg transition-all shadow-sm ${
                        isGlobalEditMode ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'
                      }`}
                      title="Toggle Edit Mode"
                    >
                      {isGlobalEditMode ? <Save fontSize="small" /> : <Edit fontSize="small" />}
                    </button>
                  )}
                </div>
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Date of Birth</p>
                    {isGlobalEditMode ? (
                      <input type="text" defaultValue="14-May-2010" className="w-full text-sm font-bold p-2 border border-slate-200 rounded outline-none focus:border-indigo-500" />
                    ) : (
                      <p className="font-bold text-slate-700">14-May-2010 (16 years)</p>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Gender</p>
                    {isGlobalEditMode ? (
                      <input type="text" defaultValue="Male" className="w-full text-sm font-bold p-2 border border-slate-200 rounded outline-none focus:border-indigo-500" />
                    ) : (
                      <p className="font-bold text-slate-700">Male</p>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Blood Group</p>
                    {isGlobalEditMode ? (
                      <input type="text" defaultValue="O+" className="w-full text-sm font-bold p-2 border border-slate-200 rounded outline-none focus:border-indigo-500" />
                    ) : (
                      <p className="font-bold text-slate-700">O+</p>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Address</p>
                    {isGlobalEditMode ? (
                      <input type="text" defaultValue="123 School Lane, Education City" className="w-full text-sm font-bold p-2 border border-slate-200 rounded outline-none focus:border-indigo-500" />
                    ) : (
                      <p className="font-bold text-slate-700">123 School Lane, Education City</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="glass-card overflow-hidden bg-white">
                <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <h3 className="font-black text-sm text-slate-700 uppercase tracking-widest flex items-center gap-2">
                    <Group fontSize="small" className="text-indigo-500" /> Parent / Guardian Info
                  </h3>
                  {canEdit && (
                    <button className="text-xs font-bold text-indigo-500 uppercase tracking-widest hover:text-indigo-700">
                      View Profile
                    </button>
                  )}
                </div>
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Parent Name</p>
                    <p className="font-bold text-slate-700">Mr. Robert Doe</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Relationship</p>
                    <p className="font-bold text-slate-700">Father</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Contact Number</p>
                    <p className="font-bold text-slate-700">+1 234 567 8900</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email</p>
                    <p className="font-bold text-slate-700">robert.doe@example.com</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card p-8 flex flex-col items-center justify-center text-center max-w-2xl border-dashed">
              <Lock className="text-slate-300 text-4xl mb-3" />
              <h3 className="font-black text-slate-700 mb-2">Personal Info Restricted</h3>
              <p className="text-xs font-bold text-slate-400">This information is strictly available to Administrators.</p>
            </div>
          )
        )}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          canViewAttendance ? (
            <div className="space-y-6 max-w-4xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="glass-card p-5 flex items-center gap-4 bg-white">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${colorMap.emerald}`}>
                    <Timeline />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Overall Attendance</p>
                    <p className="text-3xl font-black text-slate-800 leading-none mt-1">94%</p>
                  </div>
                </div>
                <div className="glass-card p-5 flex items-center gap-4 bg-white">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${colorMap.amber}`}>
                    <WarningAmber />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Leaves</p>
                    <p className="text-3xl font-black text-slate-800 leading-none mt-1">4</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card overflow-hidden bg-white">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <h3 className="font-black text-sm text-slate-700 uppercase tracking-widest flex items-center gap-2">
                    <Timeline fontSize="small" className="text-indigo-500" /> Attendance Calendar (July)
                  </h3>
                  {canEdit && !isEditingAttendance && (
                    <button 
                      onClick={() => {
                        setOriginalAttendanceData([...attendanceData]);
                        setIsEditingAttendance(true);
                      }}
                      className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                      title="Edit Attendance"
                    >
                      <Edit fontSize="small" />
                    </button>
                  )}
                  {isEditingAttendance && !hasAttendanceChanges && (
                    <button 
                      onClick={() => setIsEditingAttendance(false)}
                      className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:underline bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 transition-all hover:bg-slate-100"
                    >
                      Close Edit Mode
                    </button>
                  )}
                  {isEditingAttendance && hasAttendanceChanges && (
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          setAttendanceData([...originalAttendanceData]);
                          setIsEditingAttendance(false);
                        }}
                        className="text-[10px] font-black text-rose-600 uppercase tracking-widest hover:underline bg-rose-50 px-4 py-2 rounded-xl border border-rose-200 transition-all hover:bg-rose-100"
                      >
                        Unsave
                      </button>
                      <button 
                        onClick={() => {
                          // Save logic here
                          setOriginalAttendanceData([...attendanceData]);
                          setIsEditingAttendance(false);
                        }}
                        className="text-[10px] font-black text-white uppercase tracking-widest bg-indigo-600 px-4 py-2 rounded-xl shadow-md transition-all hover:bg-indigo-700 flex items-center gap-1"
                      >
                        <Save fontSize="small" /> Save
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-4 md:p-5">
                  <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center mb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i} className="text-[10px] font-black text-slate-400 uppercase">{d}</div>)}
                  </div>
                  <div className="grid grid-cols-7 gap-1 sm:gap-2">
                    {/* Dummy offsets for Wednesday start */}
                    <div className="aspect-square"></div>
                    <div className="aspect-square"></div>
                    <div className="aspect-square"></div>
                    {attendanceData.map((status, i) => {
                      const isFuture = i > 15;
                      return (
                        <div 
                          key={i} 
                          onClick={() => {
                            if (!isEditingAttendance || isFuture) return;
                            const newData = [...attendanceData];
                            newData[i] = status === 'P' ? 'A' : status === 'A' ? 'L' : 'P';
                            setAttendanceData(newData);
                          }}
                          className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-xs font-bold transition-all ${
                          isFuture ? 'bg-slate-50 text-slate-300' :
                          status === 'P' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 hover:shadow-md' : 
                          status === 'A' ? 'bg-rose-50 text-rose-600 border border-rose-100 hover:shadow-md' :
                          'bg-amber-50 text-amber-600 border border-amber-100 hover:shadow-md'
                        } ${isEditingAttendance && !isFuture ? 'cursor-pointer hover:scale-105' : ''}`}>
                          <span>{i + 1}</span>
                          {status === 'L' && <span className="text-[8px] uppercase tracking-widest leading-none mt-0.5">Leave</span>}
                        </div>
                      )
                    })}
                  </div>
                  <div className="flex gap-4 mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-emerald-50 border border-emerald-100"></div><span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Present</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-rose-50 border border-rose-100"></div><span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Absent</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-amber-50 border border-amber-100"></div><span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Leave</span></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card p-8 flex flex-col items-center justify-center text-center max-w-2xl border-dashed">
              <Lock className="text-slate-300 text-4xl mb-3" />
              <h3 className="font-black text-slate-700 mb-2">Attendance Restricted</h3>
              <p className="text-xs font-bold text-slate-400">You do not have permission to view this student's attendance.</p>
            </div>
          )
        )}

        {/* Subjects Tab */}
        {activeTab === 'subjects' && (
          <div className="glass-card overflow-hidden bg-white max-w-4xl">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-black text-sm text-slate-700 uppercase tracking-widest flex items-center gap-2">
                <Face fontSize="small" className="text-indigo-500" /> Enrolled Subjects
              </h3>
            </div>
            <div className="divide-y divide-slate-50">
              {[
                { name: 'Mathematics', code: 'MAT-101', teacher: 'Mr. Rajesh Kumar', mySubject: true },
                { name: 'Science', code: 'SCI-101', teacher: 'Mrs. Anjali Gupta', mySubject: false },
                { name: 'English', code: 'ENG-101', teacher: 'Mr. David Smith', mySubject: false },
              ].filter(s => canViewAllMarks || s.mySubject).map((subj, i) => (
                <div key={i} className="flex justify-between items-center px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setSelectedSubject(subj)}>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-black text-slate-800 text-sm">{subj.name}</p>
                      {!canViewAllMarks && subj.mySubject && (
                        <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">Your Subject</span>
                      )}
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{subj.code} • {subj.teacher}</p>
                  </div>
                  <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl uppercase tracking-widest hover:bg-indigo-100 transition-colors">
                    View Academic Progress
                  </span>
                </div>
              ))}
              {[].filter(s => canViewAllMarks || (s as any).mySubject).length === 0 && !canViewAllMarks && (
                <div className="p-8 text-center text-slate-400 text-sm font-bold italic">
                  You are not assigned to any subjects for this student.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <div className="glass-card overflow-hidden bg-white max-w-4xl">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-black text-sm text-slate-700 uppercase tracking-widest flex items-center gap-2">
                <Timeline fontSize="small" className="text-indigo-500" /> Recent Assignments & Progress
              </h3>
              <select 
                value={progressFilter}
                onChange={(e) => setProgressFilter(e.target.value)}
                className="text-[10px] font-black text-slate-600 uppercase tracking-widest bg-white border border-slate-200 px-4 py-2 rounded-xl outline-none focus:border-indigo-500 shadow-sm transition-all"
              >
                <option value="All Subjects">All Subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
              </select>
            </div>
            <div className="divide-y divide-slate-50">
              {[
                { title: 'Algebra Worksheet', subject: 'Mathematics', status: 'Submitted', score: '10/10', date: '01-Jul-2026' },
                { title: 'Cell Biology Essay', subject: 'Science', status: 'Pending', score: '-', date: '05-Jul-2026' },
                { title: 'Poetry Analysis', subject: 'English', status: 'Graded', score: '8/10', date: '28-Jun-2026' },
              ].filter(a => progressFilter === 'All Subjects' || a.subject === progressFilter).map((assignment, i) => (
                <div key={i} className="flex justify-between items-center px-5 py-4 hover:bg-slate-50 transition-colors">
                  <div>
                    <h4 className="font-black text-slate-800 text-sm">{assignment.title}</h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{assignment.subject} • Due: {assignment.date}</p>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <p className="font-black text-slate-800 text-sm">{assignment.score}</p>
                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
                      assignment.status === 'Submitted' ? 'bg-blue-50 text-blue-600' :
                      assignment.status === 'Graded' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {assignment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
      </>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-4xl">
          <div className="flex items-center justify-between">
            <div>
              <button 
                onClick={() => setSelectedSubject(null)}
                className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-indigo-600 transition-colors flex items-center gap-1 mb-2"
              >
                ← Back to Profile
              </button>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">{selectedSubject.name}</h2>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">{selectedSubject.code} • Teacher: {selectedSubject.teacher}</p>
            </div>
            <div className="flex bg-white/60 backdrop-blur-md rounded-2xl p-1 shadow-sm border border-slate-200">
              <button 
                onClick={() => setSubjectActiveTab('assignments')}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${subjectActiveTab === 'assignments' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-indigo-600 hover:bg-white'}`}
              >
                Assignments
              </button>
              <button 
                onClick={() => setSubjectActiveTab('marks')}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${subjectActiveTab === 'marks' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-indigo-600 hover:bg-white'}`}
              >
                Marks
              </button>
            </div>
          </div>

          <div className="glass-card overflow-hidden bg-white">
            <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-black text-sm text-slate-700 uppercase tracking-widest flex items-center gap-2">
                <Assessment fontSize="small" className="text-indigo-500" /> {subjectActiveTab === 'assignments' ? 'Assignments' : 'Examinations'}
              </h3>
              {subjectActiveTab === 'marks' && canEdit && !isEditingMarks && (
                <button 
                  onClick={() => {
                    setOriginalMarksData(JSON.parse(JSON.stringify(marksData)));
                    setIsEditingMarks(true);
                  }}
                  className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                  title="Edit Marks"
                >
                  <Edit fontSize="small" />
                </button>
              )}
              {subjectActiveTab === 'marks' && isEditingMarks && !hasMarksChanges && (
                <button 
                  onClick={() => setIsEditingMarks(false)}
                  className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:underline bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 transition-all hover:bg-slate-100"
                >
                  Close Edit Mode
                </button>
              )}
              {subjectActiveTab === 'marks' && isEditingMarks && hasMarksChanges && (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      setMarksData(JSON.parse(JSON.stringify(originalMarksData)));
                      setIsEditingMarks(false);
                    }}
                    className="text-[10px] font-black text-rose-600 uppercase tracking-widest hover:underline bg-rose-50 px-4 py-2 rounded-xl border border-rose-200 transition-all hover:bg-rose-100"
                  >
                    Unsave
                  </button>
                  <button 
                    onClick={() => {
                      setOriginalMarksData(JSON.parse(JSON.stringify(marksData)));
                      setIsEditingMarks(false);
                    }}
                    className="text-[10px] font-black text-white uppercase tracking-widest bg-indigo-600 px-4 py-2 rounded-xl shadow-md transition-all hover:bg-indigo-700 flex items-center gap-1"
                  >
                    <Save fontSize="small" /> Save
                  </button>
                </div>
              )}
              {subjectActiveTab === 'assignments' && canEdit && (
                <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 transition-all hover:bg-indigo-100">
                  Add Assignment
                </button>
              )}
            </div>
            <div className="divide-y divide-slate-50">
              {subjectActiveTab === 'assignments' && (
                <>
                  {[
                    { title: 'Chapter 1 Worksheet', date: '02-Jul-2026', status: 'Graded', score: '9/10' },
                    { title: 'Mid-term Project', date: '10-Jul-2026', status: 'Pending', score: '-' },
                  ].map((assign, i) => (
                    <div key={i} className="flex justify-between items-center px-4 py-2.5 hover:bg-slate-50 transition-colors">
                      <div>
                        <h4 className="font-black text-slate-800 text-sm">{assign.title}</h4>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Due: {assign.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                           <p className="font-black text-slate-800 text-sm leading-none">{assign.score}</p>
                           <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-widest inline-block mt-1 ${
                             assign.status === 'Graded' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                           }`}>
                             {assign.status}
                           </span>
                        </div>
                        {canEdit && (
                          <button className="text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-lg transition-colors ml-2">
                            <Edit fontSize="small" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
              {subjectActiveTab === 'marks' && (
                <>
                  {marksData.map((exam, i) => (
                    <div key={exam.id} className="flex justify-between items-center px-4 py-2.5 hover:bg-slate-50 transition-colors">
                      <div>
                        <h4 className="font-black text-slate-800 text-sm">{exam.term}</h4>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{exam.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        {isEditingMarks ? (
                          <div className="flex gap-2 items-center">
                            <input 
                              type="number" 
                              value={exam.score}
                              onChange={(e) => {
                                const newMarks = [...marksData];
                                newMarks[i].score = e.target.value;
                                setMarksData(newMarks);
                              }}
                              className="w-12 text-sm font-black p-1 border border-slate-200 rounded text-center outline-none focus:border-indigo-500"
                            />
                            <span className="text-slate-400 font-bold">/</span>
                            <input 
                              type="number" 
                              value={exam.total}
                              onChange={(e) => {
                                const newMarks = [...marksData];
                                newMarks[i].total = e.target.value;
                                setMarksData(newMarks);
                              }}
                              className="w-12 text-sm font-black p-1 border border-slate-200 rounded text-center outline-none focus:border-indigo-500"
                            />
                            <input 
                              type="text" 
                              value={exam.grade}
                              onChange={(e) => {
                                const newMarks = [...marksData];
                                newMarks[i].grade = e.target.value;
                                setMarksData(newMarks);
                              }}
                              className="w-10 text-xs font-black p-1 uppercase border border-slate-200 rounded text-center outline-none focus:border-indigo-500 text-purple-600"
                            />
                          </div>
                        ) : (
                          <div className="text-right">
                             <p className="font-black text-slate-800 text-sm leading-none">{exam.score}/{exam.total}</p>
                             <p className="text-[9px] font-black text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded uppercase tracking-wider inline-block mt-1">Grade {exam.grade}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default StudentHub;
