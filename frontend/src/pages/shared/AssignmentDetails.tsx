import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowBack, Assignment, Group, CheckCircle, PendingActions, Edit, Save } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { ResponsiveTable } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';

const AssignmentDetails = () => {
  const { classId, assignmentId } = useParams();
  const navigate = useNavigate();
  const { role } = useAuth();
  
  const canEdit = role === 'Admin' || role === 'Teacher';
  const [isEditMode, setIsEditMode] = useState(false);

  const [assignmentInfo] = useState({
    title: 'Chapter 1 Worksheet',
    subject: 'Mathematics',
    dueDate: '02-Jul-2026',
    totalMarks: 10,
    submissionRate: '85%',
    gradedCount: 22,
    pendingCount: 3,
    status: 'Active'
  });

  const columns = [
    { key: 'roll', label: 'Roll No' },
    { key: 'name', label: 'Student Name' },
    { 
      key: 'status', 
      label: 'Status',
      render: (val: any) => (
        <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
          val === 'Graded' ? 'bg-emerald-50 text-emerald-600' :
          val === 'Submitted' ? 'bg-indigo-50 text-indigo-600' :
          'bg-amber-50 text-amber-600'
        }`}>
          {val}
        </span>
      )
    },
    { 
      key: 'score', 
      label: 'Score',
      render: (val: any) => isEditMode ? (
        <div className="flex items-center gap-1">
          <input type="number" defaultValue={val !== '-' ? val : ''} className="w-16 text-xs p-1 rounded border border-slate-300 focus:border-indigo-500 outline-none" />
          <span className="text-xs text-slate-400 font-bold">/ {assignmentInfo.totalMarks}</span>
        </div>
      ) : (
        <span className="font-black text-slate-800">{val !== '-' ? `${val} / ${assignmentInfo.totalMarks}` : '-'}</span>
      )
    }
  ];

  const [studentsData] = useState([
    { id: 'STU001', roll: '1', name: 'Rahul Sharma', status: 'Graded', score: 9 },
    { id: 'STU002', roll: '2', name: 'Priya Singh', status: 'Graded', score: 10 },
    { id: 'STU003', roll: '3', name: 'Amit Verma', status: 'Submitted', score: '-' },
    { id: 'STU004', roll: '4', name: 'Sneha Reddy', status: 'Graded', score: 8 },
    { id: 'STU005', roll: '5', name: 'Kiran Kumar', status: 'Pending', score: '-' },
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

        <div className="glass-card p-6 md:p-8 bg-gradient-to-br from-indigo-500 to-sky-600 text-white border-none relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
            <div>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20 mb-2 inline-block">
                {assignmentInfo.status}
              </span>
              <h1 className="text-3xl font-black tracking-tight">{assignmentInfo.title}</h1>
              <p className="text-indigo-100 font-bold mt-1 uppercase tracking-widest text-xs">
                Class {classId} {assignmentInfo.subject ? `• ${assignmentInfo.subject}` : ''} • Due: {assignmentInfo.dueDate} • ID: {assignmentId}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 relative z-10">
            <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1 opacity-70 text-[10px] font-bold uppercase tracking-wider">
                <Assignment fontSize="small" /> Total Marks
              </div>
              <p className="text-2xl font-black">{assignmentInfo.totalMarks}</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1 opacity-70 text-[10px] font-bold uppercase tracking-wider">
                <Group fontSize="small" /> Submissions
              </div>
              <p className="text-2xl font-black">{assignmentInfo.submissionRate}</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1 opacity-70 text-[10px] font-bold uppercase tracking-wider">
                <CheckCircle fontSize="small" /> Graded
              </div>
              <p className="text-2xl font-black">{assignmentInfo.gradedCount}</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1 opacity-70 text-[10px] font-bold uppercase tracking-wider">
                <PendingActions fontSize="small" /> Pending
              </div>
              <p className="text-2xl font-black">{assignmentInfo.pendingCount}</p>
            </div>
          </div>
        </div>

        <div className="glass-card overflow-hidden bg-white">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="font-black text-slate-700 text-sm uppercase tracking-widest flex items-center gap-2">
              <Assignment className="text-indigo-500" fontSize="small" /> Submissions & Grades
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
          <ResponsiveTable 
            columns={columns}
            data={studentsData}
            hoverable
          />
        </div>
      </motion.div>
    </div>
  );
};

export default AssignmentDetails;
