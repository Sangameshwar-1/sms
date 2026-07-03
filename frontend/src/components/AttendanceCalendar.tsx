import { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Cancel } from '@mui/icons-material';

interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'leave' | 'holiday';
}

interface AttendanceCalendarProps {
  month: string;
  year: number;
  records: AttendanceRecord[];
  isTeacher?: boolean;
}

const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({ month, year, records, isTeacher = false }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Generate a dummy calendar grid (e.g. 30 days)
  const daysInMonth = 30;
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const dayNum = i + 1;
    const dateStr = `${year}-${month === 'June' ? '06' : '01'}-${dayNum.toString().padStart(2, '0')}`;
    const record = records.find(r => r.date === dateStr);
    return {
      dayNum,
      dateStr,
      status: record?.status || null
    };
  });

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'present': return 'bg-emerald-500 text-white shadow-glow-emerald';
      case 'absent': return 'bg-rose-500 text-white shadow-glow-rose';
      case 'leave': return 'bg-amber-400 text-white';
      case 'holiday': return 'bg-indigo-400 text-white';
      default: return 'bg-slate-100 text-slate-400 hover:bg-slate-200';
    }
  };

  return (
    <div className="glass-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
          <ChevronLeft />
        </button>
        <h3 className="text-xl font-black text-slate-800 uppercase tracking-wide">
          {month} {year}
        </h3>
        <button className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
          <ChevronRight />
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 mb-4 text-center">
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
          <div key={day} className="text-xs font-black text-slate-400 uppercase tracking-widest">{day}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2 lg:gap-3">
        {days.map((day, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedDate(day.dateStr)}
            className={`
              aspect-square flex flex-col items-center justify-center rounded-2xl transition-all duration-300
              ${getStatusColor(day.status)}
              ${selectedDate === day.dateStr ? 'ring-4 ring-indigo-200 scale-105' : ''}
            `}
          >
            <span className="font-bold text-sm lg:text-base">{day.dayNum}</span>
            {day.status === 'present' && <CheckCircle sx={{ fontSize: 14 }} className="mt-1 opacity-80" />}
            {day.status === 'absent' && <Cancel sx={{ fontSize: 14 }} className="mt-1 opacity-80" />}
          </button>
        ))}
      </div>

      {/* Summary Legend */}
      <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap gap-4 justify-center">
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div><span className="text-xs font-bold text-slate-500">Present</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-rose-500"></div><span className="text-xs font-bold text-slate-500">Absent</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-400"></div><span className="text-xs font-bold text-slate-500">Leave</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-400"></div><span className="text-xs font-bold text-slate-500">Holiday</span></div>
      </div>

      {/* Teacher Actions (if selected) */}
      {isTeacher && selectedDate && (
        <div className="mt-6 p-4 bg-indigo-50 rounded-2xl border border-indigo-100 animate-fade-in">
          <h4 className="font-black text-indigo-900 mb-3">Update: {selectedDate}</h4>
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-colors">Mark Present</button>
            <button className="flex-1 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold transition-colors">Mark Absent</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceCalendar;
