import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowBack, Assessment, Person, Call, Mail, Save, Edit } from '@mui/icons-material';

// ── Mock Data ──
const subjectMap: Record<string, any> = {
  'MAT-101': { name: 'Mathematics', code: 'MAT-101' }
};

const studentDataMap: Record<string, any> = {
  'STU001': {
    id: 'STU001', name: 'Rahul Sharma', rollNo: '101', class: '10-A', admissionNo: 'SMS-2023-001',
    parent: 'Mr. Ramesh Sharma', phone: '+91 98765 43210', email: 'ramesh@example.com',
    subjectMarks: {
      fa1: { marks: 45, max: 50 },
      sa1: { marks: 88, max: 100 },
      fa2: { marks: null, max: 50 },
      sa2: { marks: null, max: 100 }
    }
  }
};

const TeacherSubjectStudentView = () => {
  const { subjectId, studentId } = useParams();
  const navigate = useNavigate();
  
  const studentData = studentDataMap[studentId || 'STU001'] || studentDataMap['STU001'];
  const subject = subjectMap[subjectId || 'MAT-101'] || subjectMap['MAT-101'];
  
  const [isEditingMarks, setIsEditingMarks] = useState(false);
  const [marks, setMarks] = useState({ ...studentData.subjectMarks });

  const handleSave = () => {
    // API call to save marks
    setIsEditingMarks(false);
  };

  return (
    <div className="pb-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold text-sm transition-colors"
        >
          <ArrowBack fontSize="small" /> Back to Subject
        </button>

        {/* Banner */}
        <div className="glass-card p-6 md:p-8 bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl mb-8 border-none relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-inner text-4xl font-black uppercase">
              {studentData.name.charAt(0)}
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20 mb-2 inline-block">
                Student Profile
              </span>
              <h2 className="text-3xl font-black tracking-tight">{studentData.name}</h2>
              <p className="text-indigo-100 font-bold mt-1">
                Class {studentData.class} • Roll No: {studentData.rollNo} • {studentData.admissionNo}
              </p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">Subject</p>
              <p className="text-xl font-black text-white">{subject.name}</p>
              <p className="text-xs font-bold text-indigo-100">{subject.code}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Read-Only Info */}
          <div className="md:col-span-1 space-y-6">
            <div className="glass-card p-6">
              <h3 className="font-black text-sm text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Person className="text-indigo-500" fontSize="small" /> Contact Info
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Parent Name</p>
                  <p className="font-bold text-slate-700 text-sm mt-0.5">{studentData.parent}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Call fontSize="inherit" /> Phone
                  </p>
                  <p className="font-bold text-slate-700 text-sm mt-0.5">{studentData.phone}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Mail fontSize="inherit" /> Email
                  </p>
                  <p className="font-bold text-slate-700 text-sm mt-0.5 truncate" title={studentData.email}>
                    {studentData.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Marks Editor */}
          <div className="md:col-span-2">
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-lg text-slate-800 flex items-center gap-2">
                  <Assessment className="text-emerald-500" /> Academic Performance
                </h3>
                {!isEditingMarks ? (
                  <button 
                    onClick={() => setIsEditingMarks(true)}
                    className="glass-button flex items-center gap-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-sm"
                  >
                    <Edit fontSize="small" /> Edit Marks
                  </button>
                ) : (
                  <button 
                    onClick={handleSave}
                    className="glass-button flex items-center gap-1 bg-emerald-600 text-white hover:bg-emerald-700 shadow-glow-emerald font-bold text-sm"
                  >
                    <Save fontSize="small" /> Save Changes
                  </button>
                )}
              </div>

              <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="text-left py-3 px-4 font-black text-slate-500 uppercase tracking-widest text-xs">Assessment</th>
                      <th className="text-center py-3 px-4 font-black text-slate-500 uppercase tracking-widest text-xs">Max Marks</th>
                      <th className="text-center py-3 px-4 font-black text-slate-500 uppercase tracking-widest text-xs">Marks Obtained</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {Object.entries(marks).map(([key, data]: [string, any]) => (
                      <tr key={key} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-700 uppercase">{key}</td>
                        <td className="py-3 px-4 text-center font-bold text-slate-500">{data.max}</td>
                        <td className="py-3 px-4 text-center">
                          {isEditingMarks ? (
                            <input
                              type="number"
                              value={data.marks !== null ? data.marks : ''}
                              onChange={(e) => {
                                const val = e.target.value ? Number(e.target.value) : null;
                                setMarks((prev: any) => ({
                                  ...prev,
                                  [key]: { ...prev[key], marks: val }
                                }));
                              }}
                              className="w-20 text-center glass-input px-2 py-1 font-bold text-slate-800"
                              max={data.max}
                              min={0}
                            />
                          ) : (
                            <span className={`font-black ${data.marks !== null ? 'text-indigo-600' : 'text-slate-400'}`}>
                              {data.marks !== null ? data.marks : '-'}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default TeacherSubjectStudentView;
