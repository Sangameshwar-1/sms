import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, ArrowBack, Save, Cancel } from '@mui/icons-material';
import { dataService } from '../services/dataService';

// Maps frontend route path to backend API path
const API_MAP: Record<string, string> = {
  '/roles': '/api/users',
  '/roles/students': '/api/users/students',
  '/roles/parents': '/api/users/parents',
  '/roles/teachers': '/api/users/teachers',
  '/roles/admins': '/api/users/admins',
  '/academics': '/api/academics/classes',
  '/academics/classes': '/api/academics/classes',
  '/academics/sections': '/api/academics/classes',
  '/academics/subjects': '/api/academics/subjects',
  '/subjects': '/api/academics/subjects',
  '/academics/teacher-assignments': '/api/academics/assignments',
  '/my-subjects/details': '/api/academics/subjects',
  '/my-academics/current/subjects': '/api/academics/subjects',
  '/exams': '/api/examinations/exams',
  '/examinations/class': '/api/examinations/exams',
  '/results': '/api/examinations/marks',
  '/my-child/current/results': '/api/examinations/marks',
  '/my-child/previous': '/api/examinations/marks',
  '/my-academics/current/results': '/api/examinations/marks',
  '/my-academics/previous': '/api/examinations/marks',
  '/my-classes/exams': '/api/examinations/exams',
  '/my-classes/results': '/api/examinations/marks',
  '/attendance': '/api/attendance',
  '/my-classes/attendance': '/api/attendance',
  '/my-child/current/attendance': '/api/attendance',
  '/my-academics/current/attendance': '/api/attendance',
  '/my-classes/students': '/api/users/students',
  '/leave-requests': '/api/leaves',
  '/reports': '/api/dashboard/stats',
  '/notices': '/api/dashboard/stats',
  '/settings': '/api/users',
  '/profile': '/api/users',
};

// Fields to hide from the UI
const EXCLUDED_KEYS = ['_id', '__v', 'password_hash', 'id', 'createdAt', 'updatedAt', 'userId', 'roleId', 'teacherId', 'classId', 'studentId'];

const formatKey = (key: string) => {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
};

interface GenericDataPageProps {
  overrideEndpoint?: string;
}

const GenericDataPage: React.FC<GenericDataPageProps> = ({ overrideEndpoint }) => {
  const { pathname } = useLocation();
  const { token } = useAuth();
  
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // CRUD State
  const [viewMode, setViewMode] = useState<'list' | 'details' | 'edit'>('list');
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);

  const apiEndpoint = overrideEndpoint || API_MAP[pathname] || null;

  const fetchData = async () => {
    setLoading(true);
    setError('');
    
    if (!apiEndpoint) {
      setLoading(false);
      setError(`No backend mapping exists for ${pathname}`);
      return;
    }

    try {
      const jsonData = await dataService.fetchGenericData(apiEndpoint);
      if (Array.isArray(jsonData)) {
        setData(jsonData);
      } else if (typeof jsonData === 'object') {
        setData([jsonData]);
      } else {
        setData([]);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setViewMode('list');
    setSelectedRecord(null);
    fetchData();
  }, [pathname, token, apiEndpoint]);

  const getIdField = (record: any) => {
    if (!record) return null;
    const keys = Object.keys(record);
    const idKey = keys.find(k => k.toLowerCase().endsWith('id') || k === '_id');
    return idKey || keys[0];
  };

  const handleRowClick = (row: any) => {
    setSelectedRecord(row);
    setViewMode('details');
  };

  const handleEditClick = () => {
    setFormData({ ...selectedRecord });
    setViewMode('edit');
  };

  const handleSave = async () => {
    const idField = getIdField(selectedRecord);
    const idVal = idField ? selectedRecord[idField as string] : undefined;

    if (!idVal) {
      setError('Cannot edit: No ID field found for this record.');
      return;
    }

    setSaving(true);
    setError('');
    
    try {
      const updatedRecord = await dataService.updateGenericData(apiEndpoint as string, idVal, formData);

      setSelectedRecord(updatedRecord);
      setViewMode('details');
      fetchData();
    } catch (err: any) {
      setError(err.message || 'Failed to update record');
    } finally {
      setSaving(false);
    }
  };

  if (loading && data.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Filter columns to hide unnecessary data
  const columns = data.length > 0 ? Object.keys(data[0]).filter(key => {
    if (typeof data[0][key] === 'object') return false;
    if (EXCLUDED_KEYS.includes(key)) return false;
    if (key.toLowerCase().endsWith('id')) return false; // Hide raw database IDs
    return true;
  }) : [];

  return (
    <div className="pb-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex justify-between items-end mb-6 border-b border-slate-200 pb-4">
          <div className="w-full">
            {viewMode !== 'list' && (
              <div className="flex items-center gap-2 mt-2 text-sm font-bold text-slate-500">
                <button onClick={() => setViewMode('list')} className="text-indigo-600 hover:text-indigo-800 transition-colors">List</button>
                <span>/</span>
                {viewMode === 'details' && <span className="text-slate-700">Details</span>}
                {viewMode === 'edit' && (
                  <>
                    <button onClick={() => setViewMode('details')} className="text-indigo-600 hover:text-indigo-800 transition-colors">Details</button>
                    <span>/</span>
                    <span className="text-slate-700">Edit</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 font-semibold shadow-sm">
          {error}
        </div>
      )}

      <AnimatePresence mode="wait">
        {viewMode === 'list' && (
          <motion.div key="list" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.2 }}>
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/80 border-b border-slate-100">
                    <tr>
                      {columns.map((col, idx) => (
                        <th key={idx} className="p-4 font-extrabold text-slate-500 text-xs uppercase tracking-wider">
                          {formatKey(col)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? (
                      data.map((row, rowIdx) => (
                        <tr 
                          key={rowIdx} 
                          onClick={() => handleRowClick(row)}
                          className="border-b border-slate-50 hover:bg-indigo-50/50 cursor-pointer transition-colors"
                        >
                          {columns.map((col, colIdx) => (
                            <td key={colIdx} className="p-4 font-semibold text-slate-700 whitespace-nowrap">
                              {String(row[col])}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={Math.max(columns.length, 1)} className="p-8 text-center text-slate-400 font-bold">
                          No data available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {viewMode === 'details' && selectedRecord && (
          <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <div className="glass-card p-6 md:p-8">
              <h3 className="text-xl font-black gradient-text uppercase tracking-tight mb-6 border-b border-slate-100 pb-4">Record Details</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {Object.entries(selectedRecord).map(([key, val]) => {
                  if (typeof val === 'object' && val !== null) return null;
                  if (EXCLUDED_KEYS.includes(key)) return null;
                  if (key.toLowerCase().endsWith('id')) return null;
                  return (
                    <div key={key} className="glass-panel p-4 rounded-2xl">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-1">{formatKey(key)}</span>
                      <span className="font-extrabold text-slate-700 text-lg">{String(val)}</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8 flex gap-3 border-t border-slate-100 pt-6">
                <button onClick={() => setViewMode('list')} className="glass-button flex items-center gap-2 px-6 py-3 text-slate-600">
                  <ArrowBack fontSize="small" /> Back
                </button>
                <button onClick={handleEditClick} className="glass-button flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0 shadow-glow-indigo hover:shadow-glow-indigo">
                  <Edit fontSize="small" /> Edit Record
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {viewMode === 'edit' && selectedRecord && (
          <motion.div key="edit" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <div className="glass-card p-6 md:p-8">
              <h3 className="text-xl font-black gradient-text uppercase tracking-tight mb-6 border-b border-slate-100 pb-4">Edit Record</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {Object.entries(formData).map(([key, val]) => {
                  if (typeof val === 'object' && val !== null) return null;
                  if (EXCLUDED_KEYS.includes(key)) return null;
                  if (key.toLowerCase().endsWith('id')) return null;
                  
                  return (
                    <div key={key}>
                      <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-2">{formatKey(key)}</label>
                      <input
                        type="text"
                        value={(val as string) || ''}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                        className="glass-input w-full px-4 py-3 text-slate-700 font-semibold"
                      />
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8 flex gap-3 border-t border-slate-100 pt-6">
                <button onClick={() => setViewMode('details')} disabled={saving} className="glass-button flex items-center gap-2 px-6 py-3 text-slate-600 disabled:opacity-50">
                  <Cancel fontSize="small" /> Cancel
                </button>
                <button onClick={handleSave} disabled={saving} className="glass-button flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-400 to-teal-500 text-white border-0 shadow-glow-emerald hover:shadow-glow-emerald disabled:opacity-50">
                  {saving ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <><Save fontSize="small" /> Save Changes</>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GenericDataPage;
