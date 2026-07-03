import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LockReset, CheckCircle } from '@mui/icons-material';

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [isSuccess, setIsSuccess] = useState(false);

  const calculateStrength = (password: string) => {
    if (password.length === 0) return 0;
    if (password.length < 6) return 33;
    if (password.length < 10) return 66;
    return 100;
  };

  const strength = calculateStrength(passwords.new);
  
  const getStrengthColor = () => {
    if (strength <= 33) return 'bg-rose-500';
    if (strength <= 66) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("New passwords don't match!");
      return;
    }
    setIsSuccess(true);
    setPasswords({ current: '', new: '', confirm: '' });
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="pb-8 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h2 className="text-3xl font-black gradient-text tracking-tight uppercase mb-6 flex items-center gap-3">
          <LockReset fontSize="large" className="text-indigo-500" /> Change Password
        </h2>

        <div className="glass-card p-8">
          <AnimatePresence>
            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="mb-6 overflow-hidden"
              >
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl flex items-center gap-3 font-bold">
                  <CheckCircle /> Password changed successfully!
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Current Password</label>
              <input 
                required type="password" 
                className="glass-input w-full p-4 font-semibold text-slate-700 text-lg" 
                value={passwords.current} 
                onChange={e => setPasswords({...passwords, current: e.target.value})} 
              />
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">New Password</label>
                <input 
                  required minLength={6} type="password" 
                  className="glass-input w-full p-4 font-semibold text-slate-700 text-lg" 
                  value={passwords.new} 
                  onChange={e => setPasswords({...passwords, new: e.target.value})} 
                />
                
                {passwords.new.length > 0 && (
                  <div className="mt-2">
                    <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 mb-1">
                      <span>Password Strength</span>
                      <span>{strength <= 33 ? 'Weak' : strength <= 66 ? 'Medium' : 'Strong'}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden flex gap-1">
                      <div className={`h-full flex-1 transition-all ${strength >= 33 ? getStrengthColor() : 'bg-transparent'}`} />
                      <div className={`h-full flex-1 transition-all ${strength >= 66 ? getStrengthColor() : 'bg-transparent'}`} />
                      <div className={`h-full flex-1 transition-all ${strength >= 100 ? getStrengthColor() : 'bg-transparent'}`} />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Confirm New Password</label>
                <input 
                  required minLength={6} type="password" 
                  className={`glass-input w-full p-4 font-semibold text-slate-700 text-lg ${passwords.confirm && passwords.new !== passwords.confirm ? 'border-rose-300 bg-rose-50' : ''}`} 
                  value={passwords.confirm} 
                  onChange={e => setPasswords({...passwords, confirm: e.target.value})} 
                />
                {passwords.confirm && passwords.new !== passwords.confirm && (
                  <p className="text-xs font-bold text-rose-500 mt-2">Passwords do not match</p>
                )}
              </div>
            </div>

            <div className="pt-6">
              <button 
                type="submit" 
                className="w-full py-4 rounded-xl font-black text-lg text-white bg-slate-800 hover:bg-slate-900 transition-colors shadow-xl"
                disabled={passwords.new !== passwords.confirm}
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ChangePassword;
