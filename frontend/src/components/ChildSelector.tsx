import { useAuth } from '../context/AuthContext';
import { Person, ExpandMore } from '@mui/icons-material';

const ChildSelector: React.FC = () => {
  const { activeChild, childrenList, setActiveChild } = useAuth();

  if (!activeChild || childrenList.length <= 1) return null;

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 glass-input px-4 py-2 bg-white/60 hover:bg-white/80 transition-all font-bold text-sm text-slate-700">
        <Person fontSize="small" className="text-indigo-500" />
        <div className="flex flex-col items-start">
          <span className="text-[10px] uppercase tracking-widest text-slate-400 leading-none">Viewing</span>
          <span className="leading-none mt-1">{activeChild.name}</span>
        </div>
        <ExpandMore fontSize="small" className="text-slate-400" />
      </button>

      <div className="absolute right-0 top-full mt-2 w-48 glass-card bg-white/90 shadow-xl border border-white/60 rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right scale-95 group-hover:scale-100 z-50">
        {childrenList.map(child => (
          <button
            key={child.id}
            onClick={() => setActiveChild(child)}
            className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors ${
              activeChild.id === child.id 
                ? 'bg-indigo-50 text-indigo-700' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <p>{child.name}</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">{child.class}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChildSelector;
