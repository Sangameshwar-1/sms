import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowBack, Assessment, TrendingUp, Group, Edit, Save } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ExamDetails = () => {
  const { classId, examId } = useParams();
  const navigate = useNavigate();
  const { role } = useAuth();
  
  const canEdit = role === 'Admin' || role === 'Teacher';
  const [isEditMode, setIsEditMode] = useState(false);

  const [examInfo] = useState({
    title: 'Midterm Examination',
    subject: '',
    date: '15-Sep-2026',
    totalMarks: 100,
    classAverage: 82.5,
    highestScore: 98,
    attendanceRate: '95%',
    status: 'Completed'
  });

  const subjects = ['Mathematics', 'Science', 'English', 'Social'];

  const [studentsData] = useState([
    { 
      id: 'STU001', roll: '1', name: 'Rahul Sharma', 
      marks: { mathematics: { score: 92, grade: 'A' }, science: { score: 88, grade: 'A' }, english: { score: 75, grade: 'B' }, social: { score: 85, grade: 'A' }, total: { score: 340, grade: 'A' } }
    },
    { 
      id: 'STU002', roll: '2', name: 'Priya Singh', 
      marks: { mathematics: { score: 88, grade: 'A' }, science: { score: 95, grade: 'A+' }, english: { score: 82, grade: 'B+' }, social: { score: 90, grade: 'A' }, total: { score: 355, grade: 'A+' } }
    },
    { 
      id: 'STU003', roll: '3', name: 'Amit Verma', 
      marks: { mathematics: { score: 75, grade: 'B' }, science: { score: 65, grade: 'C' }, english: { score: 70, grade: 'B' }, social: { score: 72, grade: 'B' }, total: { score: 282, grade: 'B' } }
    },
  ]);

  return (
    <div className="pb-12 max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <button 
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold text-sm transition-colors"
        >
          <ArrowBack fontSize="small" /> Back
        </button>

        <div className="glass-card p-6 md:p-8 bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-none relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
            <div>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20 mb-2 inline-block">
                {examInfo.status}
              </span>
              <h1 className="text-3xl font-black tracking-tight">{examInfo.title}</h1>
              <p className="text-indigo-100 font-bold mt-1 uppercase tracking-widest text-xs">
                Class {classId} • Date: {examInfo.date} • ID: {examId}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 relative z-10">
            <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1 opacity-70 text-[10px] font-bold uppercase tracking-wider">
                <Assessment fontSize="small" /> Total Marks
              </div>
              <p className="text-2xl font-black">{examInfo.totalMarks}</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1 opacity-70 text-[10px] font-bold uppercase tracking-wider">
                <TrendingUp fontSize="small" /> Class Average
              </div>
              <p className="text-2xl font-black">{examInfo.classAverage}</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1 opacity-70 text-[10px] font-bold uppercase tracking-wider">
                <TrendingUp fontSize="small" /> Highest Score
              </div>
              <p className="text-2xl font-black">{examInfo.highestScore}</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1 opacity-70 text-[10px] font-bold uppercase tracking-wider">
                <Group fontSize="small" /> Attendance
              </div>
              <p className="text-2xl font-black">{examInfo.attendanceRate}</p>
            </div>
          </div>
        </div>

        <div className="glass-card overflow-hidden bg-white">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="font-black text-slate-700 text-sm uppercase tracking-widest flex items-center gap-2">
              <Assessment className="text-indigo-500" fontSize="small" /> Student Results
            </h3>
            {canEdit && (
              <button 
                onClick={() => setIsEditMode(!isEditMode)}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-widest flex items-center gap-1 transition-colors ${
                  isEditMode ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {isEditMode ? <><Save fontSize="small" /> Save</> : <><Edit fontSize="small" /> Edit Mode</>}
              </button>
            )}
          </div>
          <div className="overflow-x-auto pb-4">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b-2 border-slate-200">
                <tr>
                  <th rowSpan={2} className="p-2 px-3 font-black text-slate-400 text-[9px] uppercase tracking-widest border-r border-slate-200 whitespace-nowrap">Roll No</th>
                  <th rowSpan={2} className="p-2 px-3 font-black text-slate-400 text-[9px] uppercase tracking-widest border-r border-slate-200 whitespace-nowrap">Student Name</th>
                  {subjects.map(subj => (
                    <th key={subj} colSpan={2} className="p-2 font-black text-slate-500 text-[10px] uppercase tracking-widest text-center border-r border-slate-200 bg-indigo-50/30">
                      {subj}
                    </th>
                  ))}
                  <th colSpan={2} className="p-2 font-black text-slate-600 text-[10px] uppercase tracking-widest text-center bg-emerald-50/50">Total</th>
                </tr>
                <tr className="bg-slate-50/50">
                  {subjects.map(subj => (
                    <React.Fragment key={`${subj}-sub`}>
                      <th className="p-1.5 font-bold text-slate-400 text-[8px] uppercase tracking-widest text-center border-r border-t border-slate-200">Marks</th>
                      <th className="p-1.5 font-bold text-slate-400 text-[8px] uppercase tracking-widest text-center border-r border-t border-slate-200">Grade</th>
                    </React.Fragment>
                  ))}
                  <th className="p-1.5 font-bold text-slate-400 text-[8px] uppercase tracking-widest text-center border-r border-t border-slate-200 bg-emerald-50/50">Marks</th>
                  <th className="p-1.5 font-bold text-slate-400 text-[8px] uppercase tracking-widest text-center border-t border-slate-200 bg-emerald-50/50">Grade</th>
                </tr>
              </thead>
              <tbody>
                {studentsData.map((student) => (
                  <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-2 px-3 text-[10px] font-bold text-slate-600 border-r border-slate-100">{student.roll}</td>
                    <td className="p-2 px-3 text-[11px] font-bold text-slate-800 border-r border-slate-100 whitespace-nowrap">{student.name}</td>
                    
                    {subjects.map(subj => {
                      const m = (student.marks as any)[subj.toLowerCase()];
                      return (
                        <React.Fragment key={`${student.id}-${subj}`}>
                          <td className="p-1.5 border-r border-slate-100 text-center">
                            {isEditMode ? (
                              <input type="number" defaultValue={m?.score} className="w-10 text-[10px] p-0.5 rounded border border-indigo-200 text-center outline-none focus:ring-1 focus:ring-indigo-500 bg-white" />
                            ) : (
                              <span className="text-[10px] font-bold text-slate-700">{m?.score || '-'}</span>
                            )}
                          </td>
                          <td className="p-1.5 border-r border-slate-100 text-center">
                            {isEditMode ? (
                              <input type="text" defaultValue={m?.grade} className="w-8 text-[10px] p-0.5 rounded border border-indigo-200 text-center outline-none uppercase font-bold text-indigo-600 bg-white" />
                            ) : (
                              <span className={`text-[9px] font-black uppercase ${
                                m?.grade?.includes('A') ? 'text-emerald-600' :
                                m?.grade?.includes('B') ? 'text-indigo-600' : 'text-amber-600'
                              }`}>{m?.grade || '-'}</span>
                            )}
                          </td>
                        </React.Fragment>
                      );
                    })}
                    
                    <td className="p-1.5 border-r border-slate-100 text-center bg-emerald-50/20">
                      <span className="text-[10px] font-black text-slate-800">{(student.marks as any).total.score}</span>
                    </td>
                    <td className="p-1.5 text-center bg-emerald-50/20">
                      <span className="text-[10px] font-black text-emerald-600">{(student.marks as any).total.grade}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ExamDetails;
