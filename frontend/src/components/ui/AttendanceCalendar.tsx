import { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Cancel } from '@mui/icons-material';

interface AttendanceCalendarProps {
  onDateSelect?: (date: Date) => void;
  markedDates?: { date: string, status: 'Present' | 'Absent' | 'Leave' }[];
}

const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({ onDateSelect, markedDates = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1)); // Default June 2026 for demo

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const padding = Array.from({ length: firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 }, (_, i) => i);

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const getStatusIcon = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const mark = markedDates.find(m => m.date === dateStr);
    if (!mark) return null;
    
    if (mark.status === 'Present') return <CheckCircle className="text-emerald-500 text-sm" />;
    if (mark.status === 'Absent') return <Cancel className="text-red-500 text-sm" />;
    return <div className="w-2 h-2 rounded-full bg-amber-500" />;
  };

  return (
    <div className="glass-card p-4 md:p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black gradient-text tracking-tight uppercase">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="glass-button p-2 text-slate-400 hover:text-indigo-600">
            <ChevronLeft fontSize="small" />
          </button>
          <button onClick={nextMonth} className="glass-button p-2 text-slate-400 hover:text-indigo-600">
            <ChevronRight fontSize="small" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4 text-center">
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
          <div key={day} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {padding.map(p => (
          <div key={`pad-${p}`} />
        ))}
        {days.map(day => (
          <div key={day} className="text-center flex justify-center">
            <button 
              onClick={() => onDateSelect && onDateSelect(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
              className="w-10 h-10 rounded-full flex flex-col items-center justify-center bg-white/50 hover:bg-indigo-50 hover:text-indigo-600 transition-colors relative group"
            >
              <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600">{day}</span>
              <div className="absolute -bottom-1 h-4 flex items-center justify-center">
                {getStatusIcon(day)}
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceCalendar;
