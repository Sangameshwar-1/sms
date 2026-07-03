import { motion } from 'framer-motion';
import { Settings, Save, ColorLens, AccountBalance, NotificationsActive } from '@mui/icons-material';

const SettingsPage = () => {
  return (
    <div className="pb-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black gradient-text tracking-tight uppercase flex items-center gap-3">
            <Settings fontSize="large" className="text-slate-500" /> System Settings
          </h2>
          <button className="glass-button flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-glow-emerald border-0 font-bold">
            <Save fontSize="small" /> Save Changes
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6 md:p-8">
              <h3 className="font-black text-xl text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                <AccountBalance className="text-indigo-500" /> Institution Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">School Name</label>
                  <input type="text" defaultValue="Global International Academy" className="glass-input w-full px-4 py-3 text-slate-700 font-bold" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Registration No</label>
                  <input type="text" defaultValue="EDU-2023-9988" className="glass-input w-full px-4 py-3 text-slate-700 font-bold" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Address</label>
                  <textarea defaultValue="123 Education Boulevard, Tech City, 560001" rows={3} className="glass-input w-full px-4 py-3 text-slate-700 font-bold resize-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Contact Email</label>
                  <input type="email" defaultValue="admin@globalacademy.edu" className="glass-input w-full px-4 py-3 text-slate-700 font-bold" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Contact Phone</label>
                  <input type="text" defaultValue="+1 (555) 123-4567" className="glass-input w-full px-4 py-3 text-slate-700 font-bold" />
                </div>
              </div>
            </div>

            <div className="glass-card p-6 md:p-8">
              <h3 className="font-black text-xl text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                <NotificationsActive className="text-rose-500" /> Notification Preferences
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Email alerts for new admissions', active: true },
                  { label: 'SMS alerts for staff attendance', active: false },
                  { label: 'Daily summary reports', active: true },
                  { label: 'Critical system errors', active: true }
                ].map((pref, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-700">{pref.label}</span>
                    <button className={`w-12 h-6 rounded-full transition-colors relative ${pref.active ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                      <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${pref.active ? 'left-7' : 'left-1'}`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-6 border-t-4 border-t-amber-400">
              <h3 className="font-black text-xl text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                <ColorLens className="text-amber-500" /> Theme Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Primary Color</label>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-indigo-500 ring-2 ring-offset-2 ring-indigo-500"></button>
                    <button className="w-8 h-8 rounded-full bg-emerald-500 opacity-50 hover:opacity-100 transition-opacity"></button>
                    <button className="w-8 h-8 rounded-full bg-rose-500 opacity-50 hover:opacity-100 transition-opacity"></button>
                    <button className="w-8 h-8 rounded-full bg-sky-500 opacity-50 hover:opacity-100 transition-opacity"></button>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Interface Style</label>
                  <select className="glass-input w-full px-4 py-3 text-slate-700 font-bold">
                    <option>Premium Glassmorphism (Active)</option>
                    <option>Flat Modern</option>
                    <option>Material Design</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
