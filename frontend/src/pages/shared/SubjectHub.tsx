import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuBook, Assignment, ArrowBack, Topic, PictureAsPdf, Link as LinkIcon, ExpandMore, Edit, BarChart } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import GradeDistributionGraph from '../../components/shared/GradeDistributionGraph';

// ── Mock Data ──
const subjectDetails: Record<string, any> = {
  'mathematics': {
    name: 'Mathematics',
    code: 'MAT-101',
    teacher: 'Mr. Rajesh Kumar',
    description: 'Advanced mathematics covering algebra, geometry, and calculus.',
    chapters: [
      {
        id: 1, title: 'Chapter 1: Real Numbers', progress: 100,
        topics: ['Euclid’s Division Lemma', 'The Fundamental Theorem of Arithmetic', 'Revisiting Irrational Numbers'],
        assignments: [
          { id: 'A1', title: 'Real Numbers Practice Set', due: 'Submitted', status: 'Graded', score: '9/10' }
        ],
        resources: [
          { id: 'R1', title: 'Chapter 1 Notes', type: 'PDF', size: '2 MB' }
        ]
      },
      {
        id: 2, title: 'Chapter 2: Polynomials', progress: 75,
        topics: ['Geometrical Meaning of the Zeroes', 'Relationship between Zeroes and Coefficients'],
        assignments: [
          { id: 'A2', title: 'Polynomials Worksheet', due: '15-Aug-2026', status: 'Pending', score: '-' }
        ],
        resources: [
          { id: 'R2', title: 'Polynomial Identities', type: 'Link', size: '-' }
        ]
      },
      {
        id: 3, title: 'Chapter 3: Linear Equations', progress: 0,
        topics: ['Graphical Method of Solution', 'Algebraic Methods of Solving'],
        assignments: [],
        resources: []
      }
    ]
  }
};

const SubjectHub = () => {
  const { subjectId, classId } = useParams();
  const navigate = useNavigate();
  const { role } = useAuth();
  const canEdit = role === 'Admin' || role === 'Teacher';
  
  const [expandedChapter, setExpandedChapter] = useState<number | null>(1);
  const [activeTab, setActiveTab] = useState<'syllabus' | 'assignments' | 'students' | 'exams' | 'resources'>('exams');
  const [expandedExamGraph, setExpandedExamGraph] = useState<number | null>(null);

  const subjectKey = subjectId?.toLowerCase() || 'mathematics';
  const data = subjectDetails[subjectKey] || subjectDetails['mathematics'];

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
          <h2 className="text-3xl font-black text-slate-800 tracking-tight capitalize">{data.name}</h2>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Class {classId} • Subject {subjectId}</p>
        </div>
      </motion.div>

      {/* Banner */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 md:p-8 bg-gradient-to-br from-indigo-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner shrink-0">
            <MenuBook sx={{ fontSize: 40 }} />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">{data.name}</h2>
            <p className="text-indigo-100 font-bold mt-2 text-sm leading-relaxed max-w-2xl">{data.description}</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        <button 
          onClick={() => setActiveTab('syllabus')}
          className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'syllabus' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-50'
          }`}
        >
          <Topic fontSize="small" /> Syllabus & Chapters
        </button>
        <button 
          onClick={() => setActiveTab('assignments')}
          className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'assignments' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-50'
          }`}
        >
          <Assignment fontSize="small" /> Assignments
        </button>
        <button 
          onClick={() => setActiveTab('students')}
          className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'students' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-50'
          }`}
        >
          <MenuBook fontSize="small" /> Enrolled Students
        </button>
        <button 
          onClick={() => setActiveTab('exams')}
          className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'exams' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-50'
          }`}
        >
          <Topic fontSize="small" /> Exams & Marks
        </button>
        <button 
          onClick={() => setActiveTab('resources')}
          className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'resources' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-50'
          }`}
        >
          <PictureAsPdf fontSize="small" /> Resources
        </button>
      </div>

      {/* Content Area */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={activeTab}>
        {activeTab === 'syllabus' && (
          <div className="space-y-4">
            {data.chapters.map((chapter: any) => (
              <div key={chapter.id} className="glass-card overflow-hidden bg-white">
                <div 
                  className="p-5 flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)}
                >
                  <div className="flex-1">
                    <h3 className="font-black text-slate-800 text-lg">{chapter.title}</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="w-48 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${chapter.progress}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-slate-400">{chapter.progress}% Completed</span>
                    </div>
                  </div>
                  <div className={`transform transition-transform ${expandedChapter === chapter.id ? 'rotate-180' : ''}`}>
                    <ExpandMore className="text-slate-400" />
                  </div>
                </div>

                <AnimatePresence>
                  {expandedChapter === chapter.id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: 'auto', opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-slate-100 bg-slate-50/50"
                    >
                      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Topics */}
                        <div>
                          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Topics Covered</h4>
                          <ul className="space-y-2">
                            {chapter.topics.map((t: string, i: number) => (
                              <li key={i} className="flex items-start gap-2 text-sm font-bold text-slate-700">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></div>
                                {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Resources */}
                        <div>
                          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Study Materials</h4>
                          {chapter.resources.length > 0 ? (
                            <div className="space-y-2">
                              {chapter.resources.map((r: any, i: number) => (
                                <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200 hover:border-indigo-200 transition-colors cursor-pointer group">
                                  {r.type === 'PDF' ? <PictureAsPdf className="text-rose-500" fontSize="small" /> : <LinkIcon className="text-indigo-500" fontSize="small" />}
                                  <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{r.title}</p>
                                    <p className="text-[10px] font-black text-slate-400 uppercase">{r.type} • {r.size}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm font-bold text-slate-400 italic">No resources added yet.</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'assignments' && (
          <div className="glass-card overflow-hidden bg-white">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-black text-slate-700 text-sm uppercase tracking-widest flex items-center gap-2">
                <Assignment className="text-indigo-500" fontSize="small" /> Active & Past Assignments
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              {data.chapters.flatMap((c: any) => c.assignments).length > 0 ? (
                data.chapters.flatMap((c: any) => c.assignments).map((a: any, i: number) => (
                  <div 
                    key={i} 
                    className="p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/classes/${classId || '10A'}/subjects/${subjectId}/assignments/${a.id || i}`)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        a.status === 'Graded' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        <Assignment fontSize="small" />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-800 text-sm">{a.title}</h4>
                        <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-widest">Due: {a.due}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className={`text-[10px] font-black uppercase tracking-widest ${
                          a.status === 'Graded' ? 'text-emerald-600' : 'text-amber-600'
                        }`}>{a.status}</p>
                        {a.score !== '-' && (
                          <p className="text-xs font-bold text-slate-500 mt-0.5">{a.score}</p>
                        )}
                      </div>
                      {canEdit && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); console.log('Edit Assignment'); }}
                          className="text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-lg transition-colors ml-2"
                        >
                          <Edit fontSize="small" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-slate-400 font-bold italic">No assignments for this subject.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="glass-card overflow-hidden bg-white">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-black text-slate-700 text-sm uppercase tracking-widest flex items-center gap-2">
                <MenuBook className="text-indigo-500" fontSize="small" /> Enrolled Students
              </h3>
            </div>
            <div className="p-5 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-100">
                    <th className="py-3 px-4 font-black text-[10px] uppercase tracking-widest text-slate-400">Roll No</th>
                    <th className="py-3 px-4 font-black text-[10px] uppercase tracking-widest text-slate-400">Student Name</th>
                    <th className="py-3 px-4 font-black text-[10px] uppercase tracking-widest text-slate-400 text-right">Avg Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { id: 'STU001', roll: '1', name: 'Rahul Sharma', grade: 'A+' },
                    { id: 'STU002', roll: '2', name: 'Priya Singh', grade: 'A' },
                    { id: 'STU003', roll: '3', name: 'Amit Verma', grade: 'B+' }
                  ].map((student: any) => (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate(`/classes/${classId || '10A'}/students/${student.id}`)}>
                      <td className="py-2.5 px-4 text-xs font-bold text-slate-600">{student.roll}</td>
                      <td className="py-2.5 px-4 text-sm font-bold text-slate-800">{student.name}</td>
                      <td className="py-2.5 px-4 text-right">
                        {role === 'Admin' || role === 'Teacher' ? (
                           <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">{student.grade}</span>
                        ) : (
                           <span className="text-[10px] text-slate-400 font-bold italic">Hidden</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'exams' && (
          <div className="glass-card overflow-hidden bg-white">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-black text-slate-700 text-sm uppercase tracking-widest flex items-center gap-2">
                <Topic className="text-indigo-500" fontSize="small" /> Examinations & Marks
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { title: 'Midterm Examination', date: '15-Sep-2026', avgScore: '85%' },
                { title: 'Formative Assessment 1', date: '10-Jul-2026', avgScore: 'Pending' }
              ].map((exam, idx) => (
                <div key={idx} className="flex flex-col">
                  <div 
                    className="p-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/classes/${classId || '10A'}/subjects/${subjectId}/exams/${idx}`)}
                  >
                    <div>
                      <h4 className="font-black text-slate-800 text-sm">{exam.title}</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Date: {exam.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Class Average</p>
                        <p className="text-sm font-bold text-slate-700 leading-none">{exam.avgScore}</p>
                      </div>
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

        {activeTab === 'resources' && (
          <div className="glass-card overflow-hidden bg-white">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-black text-slate-700 text-sm uppercase tracking-widest flex items-center gap-2">
                <PictureAsPdf className="text-rose-500" fontSize="small" /> Global Subject Resources
              </h3>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Syllabus Copy', type: 'PDF', size: '1.2 MB' },
                { title: 'Formula Sheet', type: 'PDF', size: '3.4 MB' },
                { title: 'Reference Book List', type: 'Link', size: '-' }
              ].map((r, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-lg border border-slate-200 hover:border-indigo-200 transition-colors cursor-pointer group">
                  {r.type === 'PDF' ? <PictureAsPdf className="text-rose-500" /> : <LinkIcon className="text-indigo-500" />}
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{r.title}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase mt-1">{r.type} • {r.size}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SubjectHub;
