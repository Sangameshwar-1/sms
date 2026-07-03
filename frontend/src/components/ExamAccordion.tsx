import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExpandMore, ExpandLess, Description } from '@mui/icons-material';

export interface ExamSubject {
  name: string;
  marks?: string;
  maxMarks?: string;
  grade?: string;
  date?: string;
  status?: string;
}

export interface ExamType {
  name: string;
  subjects: ExamSubject[];
}

export interface ExamClass {
  name: string;
  exams: ExamType[];
}

interface ExamAccordionProps {
  data: ExamClass[];
  isTeacher?: boolean;
}

const ExamAccordion: React.FC<ExamAccordionProps> = ({ data, isTeacher = false }) => {
  const [openClasses, setOpenClasses] = useState<{ [key: string]: boolean }>({});
  const [openExams, setOpenExams] = useState<{ [key: string]: boolean }>({});

  const toggleClass = (className: string) => {
    setOpenClasses(prev => ({ ...prev, [className]: !prev[className] }));
  };

  const toggleExam = (examKey: string) => {
    setOpenExams(prev => ({ ...prev, [examKey]: !prev[examKey] }));
  };

  return (
    <div className="w-full space-y-4">
      {data.map((cls, cIdx) => (
        <div key={cIdx} className="glass-card overflow-hidden">
          {/* Class Header */}
          <button 
            onClick={() => toggleClass(cls.name)}
            className="w-full flex items-center justify-between p-4 bg-slate-50/50 hover:bg-indigo-50/50 transition-colors border-b border-slate-100"
          >
            <h3 className="font-black text-lg text-slate-800">{cls.name}</h3>
            {openClasses[cls.name] ? <ExpandLess className="text-indigo-500" /> : <ExpandMore className="text-slate-400" />}
          </button>

          <AnimatePresence>
            {openClasses[cls.name] && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 space-y-3 bg-white/30">
                  {cls.exams.map((exam, eIdx) => {
                    const examKey = `${cls.name}-${exam.name}`;
                    return (
                      <div key={eIdx} className="border border-slate-200 rounded-xl overflow-hidden bg-white/50">
                        {/* Exam Header */}
                        <button 
                          onClick={() => toggleExam(examKey)}
                          className="w-full flex items-center justify-between p-3 hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <Description className="text-purple-500" fontSize="small" />
                            <h4 className="font-bold text-slate-700">{exam.name}</h4>
                          </div>
                          {openExams[examKey] ? <ExpandLess className="text-slate-400" /> : <ExpandMore className="text-slate-400" />}
                        </button>

                        <AnimatePresence>
                          {openExams[examKey] && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-3 bg-slate-50 border-t border-slate-100">
                                <div className="space-y-2">
                                  {exam.subjects.map((sub, sIdx) => (
                                    <div key={sIdx} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-slate-100 hover:border-indigo-200 transition-colors">
                                      <div>
                                        <p className="font-bold text-slate-800">{sub.name}</p>
                                        {sub.date && <p className="text-xs font-semibold text-slate-400">{sub.date}</p>}
                                      </div>
                                      
                                      <div className="text-right flex items-center gap-4">
                                        {sub.marks && (
                                          <div>
                                            <p className="text-xs text-slate-400 font-bold uppercase">Marks</p>
                                            <p className="font-black text-indigo-600">{sub.marks} <span className="text-slate-400 font-semibold text-xs">/ {sub.maxMarks}</span></p>
                                          </div>
                                        )}
                                        {sub.grade && (
                                          <div className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded font-black text-sm border border-emerald-100">
                                            {sub.grade}
                                          </div>
                                        )}
                                        {isTeacher && (
                                          <button className="text-xs font-bold text-indigo-600 hover:text-white bg-indigo-50 hover:bg-indigo-600 px-3 py-1.5 rounded transition-colors">
                                            Edit
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                  {isTeacher && (
                                    <button className="w-full mt-2 py-2 border-2 border-dashed border-indigo-200 rounded-lg text-indigo-500 font-bold text-sm hover:bg-indigo-50 hover:border-indigo-400 transition-all">
                                      + Add Subject Marks
                                    </button>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default ExamAccordion;
