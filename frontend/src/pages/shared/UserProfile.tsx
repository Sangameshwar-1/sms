import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Person, Security, Notifications, Warning, Save } from '@mui/icons-material';

const UserProfile = () => {
  const { role } = useAuth();
  
  const [personalInfo, setPersonalInfo] = useState({
    fullName: role === 'Student' ? 'Rahul Sharma' : 'John Doe',
    email: role === 'Student' ? 'rahul@example.com' : 'john.doe@example.com',
    phone: '+91 9876543210',
    dob: '2010-05-15',
    address: '123, Model Town, Delhi'
  });

  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [preferences, setPreferences] = useState({ email: true, sms: false, push: true, dailySummary: false });
  
  const [isSuccessAlert, setIsSuccessAlert] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess();
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("New passwords don't match!");
      return;
    }
    showSuccess();
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const showSuccess = () => {
    setIsSuccessAlert(true);
    setTimeout(() => setIsSuccessAlert(false), 3000);
  };

  return (
    <div className="pb-8 max-w-5xl mx-auto">
      <AnimatePresence>
        {isSuccessAlert && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2"
          >
            Successfully updated!
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        
        {/* Profile Header */}
        <div className="glass-card p-8 mb-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden bg-gradient-to-r from-slate-50 to-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />
          <div className="w-32 h-32 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-4xl font-black shadow-inner border-4 border-white">
            {personalInfo.fullName.charAt(0)}
          </div>
          <div className="text-center md:text-left z-10">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2">{personalInfo.fullName}</h2>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded font-bold text-sm uppercase tracking-widest">{role}</span>
              <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded font-bold text-sm uppercase tracking-widest">Active</span>
              <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded font-bold text-sm">Member since 2024</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <div className="glass-card p-6 sm:p-8">
              <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                <Person className="text-indigo-500" /> Personal Information
              </h3>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Full Name</label>
                    <input required type="text" className="glass-input w-full p-3 font-semibold text-slate-700" value={personalInfo.fullName} onChange={e => setPersonalInfo({...personalInfo, fullName: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Email Address</label>
                    <input required type="email" className="glass-input w-full p-3 font-semibold text-slate-700" value={personalInfo.email} onChange={e => setPersonalInfo({...personalInfo, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Phone Number</label>
                    <input required type="tel" className="glass-input w-full p-3 font-semibold text-slate-700" value={personalInfo.phone} onChange={e => setPersonalInfo({...personalInfo, phone: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Date of Birth</label>
                    <input required type="date" className="glass-input w-full p-3 font-semibold text-slate-700" value={personalInfo.dob} onChange={e => setPersonalInfo({...personalInfo, dob: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Address</label>
                  <textarea className="glass-input w-full p-3 font-semibold text-slate-700 h-24 resize-none" value={personalInfo.address} onChange={e => setPersonalInfo({...personalInfo, address: e.target.value})} />
                </div>
                <div className="pt-4 flex justify-end">
                  <button type="submit" className="glass-button flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-bold shadow-glow-indigo border-0">
                    <Save fontSize="small" /> Update Profile
                  </button>
                </div>
              </form>
            </div>

            {/* Security */}
            <div className="glass-card p-6 sm:p-8">
              <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                <Security className="text-emerald-500" /> Security
              </h3>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Current Password</label>
                  <input required type="password" className="glass-input w-full p-3 font-semibold text-slate-700" value={passwords.current} onChange={e => setPasswords({...passwords, current: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">New Password</label>
                    <input required minLength={6} type="password" className="glass-input w-full p-3 font-semibold text-slate-700" value={passwords.new} onChange={e => setPasswords({...passwords, new: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Confirm New Password</label>
                    <input required minLength={6} type="password" className="glass-input w-full p-3 font-semibold text-slate-700" value={passwords.confirm} onChange={e => setPasswords({...passwords, confirm: e.target.value})} />
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <button type="submit" className="glass-button flex items-center gap-2 px-6 py-2.5 bg-slate-800 text-white font-bold border-0 hover:bg-slate-900 transition-colors">
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="space-y-8">
            {/* Preferences */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                <Notifications className="text-amber-500" /> Preferences
              </h3>
              <div className="space-y-4">
                {[
                  { id: 'email', label: 'Email Notifications' },
                  { id: 'sms', label: 'SMS Alerts' },
                  { id: 'push', label: 'Push Notifications' },
                  { id: 'dailySummary', label: 'Daily Summary Report' }
                ].map(pref => (
                  <label key={pref.id} className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm font-bold text-slate-600 group-hover:text-slate-800 transition-colors">{pref.label}</span>
                    <div className={`w-11 h-6 rounded-full transition-colors relative ${preferences[pref.id as keyof typeof preferences] ? 'bg-indigo-500' : 'bg-slate-300'}`}>
                      <input 
                        type="checkbox" className="sr-only" 
                        checked={preferences[pref.id as keyof typeof preferences]}
                        onChange={e => {
                          setPreferences({...preferences, [pref.id]: e.target.checked});
                          showSuccess();
                        }}
                      />
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${preferences[pref.id as keyof typeof preferences] ? 'left-6' : 'left-1'}`} />
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="glass-card p-6 border border-rose-200 bg-rose-50/30">
              <h3 className="text-lg font-black text-rose-600 tracking-tight flex items-center gap-2 mb-4">
                <Warning className="text-rose-500" /> Danger Zone
              </h3>
              <p className="text-xs font-semibold text-slate-500 mb-6">Irreversible and destructive actions.</p>
              
              <div className="space-y-3">
                <button className="w-full py-2 bg-white text-slate-700 font-bold text-sm border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  Logout of all devices
                </button>
                <button onClick={() => setIsDeleteModalOpen(true)} className="w-full py-2 bg-rose-100 text-rose-600 font-bold text-sm border border-rose-200 rounded-lg hover:bg-rose-200 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Delete Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]" onClick={() => setIsDeleteModalOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed z-[1000] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-sm rounded-3xl overflow-hidden glass-card shadow-2xl bg-white/95 p-6 text-center"
            >
              <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Warning fontSize="large" />
              </div>
              <h3 className="font-black text-xl text-slate-800 mb-2">Delete Account?</h3>
              <p className="text-sm font-semibold text-slate-500 mb-6">This action cannot be undone. All your data will be permanently deleted.</p>
              
              <div className="flex gap-3">
                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
                <button onClick={() => { setIsDeleteModalOpen(false); alert('Account deletion requested.'); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-glow-rose">Delete</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;
