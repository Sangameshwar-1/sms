import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, TrendingUp, People, AssignmentTurnedIn, AttachMoney } from '@mui/icons-material';

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Attendance' | 'Academics' | 'Financial'>('Overview');
  const [dateRange, setDateRange] = useState('This Month');

  const handleExport = () => {
    alert('Report exported successfully as PDF!');
  };

  const revenueData = [
    { month: 'Jan', val: 40 }, { month: 'Feb', val: 65 }, { month: 'Mar', val: 45 },
    { month: 'Apr', val: 80 }, { month: 'May', val: 55 }, { month: 'Jun', val: 95 }
  ];

  return (
    <div className="pb-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-3xl font-black gradient-text tracking-tight uppercase">Analytics & Reports</h2>
          <div className="flex gap-2">
            <select className="glass-input px-4 py-2 font-bold text-slate-700" value={dateRange} onChange={e => setDateRange(e.target.value)}>
              <option>This Week</option>
              <option>This Month</option>
              <option>This Quarter</option>
              <option>This Year</option>
            </select>
            <button onClick={handleExport} className="glass-button flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-bold border-0 shadow-glow-indigo">
              <Download fontSize="small" /> Export PDF
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-white/50 rounded-xl border border-white mb-6 overflow-x-auto w-fit">
          {(['Overview', 'Attendance', 'Academics', 'Financial'] as const).map(tab => (
            <button 
              key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-lg font-black text-sm uppercase tracking-wider transition-all ${
                activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-white/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Revenue', val: '$45.2k', trend: '+12%', icon: <AttachMoney />, color: 'emerald' },
            { title: 'New Admissions', val: '128', trend: '+5%', icon: <People />, color: 'indigo' },
            { title: 'Avg Attendance', val: '92.4%', trend: '+1%', icon: <AssignmentTurnedIn />, color: 'sky' },
            { title: 'Pass Rate', val: '88.5%', trend: '+2%', icon: <TrendingUp />, color: 'purple' }
          ].map((stat, idx) => (
            <motion.div 
              key={stat.title}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }}
              className="glass-card p-6 relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-500/10 rounded-bl-full -mr-4 -mt-4`} />
              <div className={`w-10 h-10 rounded-xl bg-${stat.color}-50 text-${stat.color}-500 flex items-center justify-center mb-4`}>
                {stat.icon}
              </div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.title}</h3>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-black text-slate-800">{stat.val}</span>
                <span className={`text-sm font-bold mb-1 text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded`}>{stat.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart Section */}
          <div className="lg:col-span-2 glass-card p-6">
            <h3 className="text-sm font-black text-slate-600 uppercase tracking-widest mb-6">Revenue Trend ({dateRange})</h3>
            <div className="h-64 flex items-end gap-2 sm:gap-6 justify-between px-2 sm:px-6 relative">
              {/* Y-axis lines */}
              <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none pb-6">
                <div className="w-full h-[1px] bg-slate-400"></div>
                <div className="w-full h-[1px] bg-slate-400"></div>
                <div className="w-full h-[1px] bg-slate-400"></div>
                <div className="w-full h-[1px] bg-slate-400"></div>
              </div>
              
              {revenueData.map((d, i) => (
                <div key={i} className="flex flex-col items-center flex-1 z-10 group cursor-pointer">
                  <div className="relative w-full flex justify-center h-52 items-end">
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
                      ${d.val}k
                    </div>
                    <motion.div 
                      initial={{ height: 0 }} animate={{ height: `${d.val}%` }} transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                      className="w-full max-w-[48px] bg-gradient-to-t from-emerald-400 to-teal-400 rounded-t-xl"
                    />
                  </div>
                  <span className="mt-4 text-xs font-bold text-slate-500 uppercase">{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar Section */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-black text-slate-600 uppercase tracking-widest mb-6">Attendance Metrics</h3>
            <div className="space-y-6">
              {[
                { label: 'Students', val: 95, color: 'indigo' },
                { label: 'Teachers', val: 98, color: 'emerald' },
                { label: 'Support Staff', val: 90, color: 'amber' },
                { label: 'Overall', val: 93, color: 'sky' }
              ].map((item, i) => (
                <div key={item.label}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-700">{item.label}</span>
                    <span className="font-black text-slate-800">{item.val}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} animate={{ width: `${item.val}%` }} transition={{ duration: 1, delay: i * 0.2 }}
                      className={`h-full rounded-full bg-${item.color}-500`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default ReportsPage;
