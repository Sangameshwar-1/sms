import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Notifications, CheckCircle, Warning, Info, Error, DoneAll } from '@mui/icons-material';

type NotifType = 'info' | 'warning' | 'success' | 'alert';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: NotifType;
}

const initialNotifications: Notification[] = [
  { id: 'N1', title: 'System Maintenance', message: 'The system will be down for maintenance on Sunday from 2 AM to 4 AM.', time: '2 hours ago', read: false, type: 'warning' },
  { id: 'N2', title: 'New Event Published', message: 'Annual Sports Meet details have been published to the Notice Board.', time: '5 hours ago', read: false, type: 'info' },
  { id: 'N3', title: 'Leave Approved', message: 'Your leave request for July 15th has been approved.', time: 'Yesterday', read: true, type: 'success' },
  { id: 'N4', title: 'Missing Attendance', message: 'Attendance for Class 10-A is pending for today.', time: 'Yesterday', read: false, type: 'alert' },
  { id: 'N5', title: 'Fee Payment Received', message: 'Term 1 fee payment of $500 received.', time: '2 days ago', read: true, type: 'success' },
  { id: 'N6', title: 'Library Book Due', message: 'The book "Advanced Physics" is due tomorrow.', time: '3 days ago', read: true, type: 'warning' },
  { id: 'N7', title: 'Welcome to SMS', message: 'Your account has been successfully created.', time: '1 week ago', read: true, type: 'info' },
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState<'All' | 'Unread' | 'Read'>('All');

  const filteredNotifs = notifications.filter(n => {
    if (activeTab === 'Unread') return !n.read;
    if (activeTab === 'Read') return n.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getTypeStyles = (type: NotifType) => {
    switch (type) {
      case 'info': return { border: 'border-l-sky-500', icon: <Info className="text-sky-500" />, bg: 'bg-sky-50' };
      case 'warning': return { border: 'border-l-amber-500', icon: <Warning className="text-amber-500" />, bg: 'bg-amber-50' };
      case 'success': return { border: 'border-l-emerald-500', icon: <CheckCircle className="text-emerald-500" />, bg: 'bg-emerald-50' };
      case 'alert': return { border: 'border-l-rose-500', icon: <Error className="text-rose-500" />, bg: 'bg-rose-50' };
    }
  };

  return (
    <div className="pb-8 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-3xl font-black gradient-text tracking-tight uppercase flex items-center gap-3">
            <Notifications fontSize="large" className="text-indigo-500" /> 
            Notifications 
            {unreadCount > 0 && <span className="bg-rose-500 text-white text-sm px-3 py-1 rounded-full shadow-glow-rose">{unreadCount}</span>}
          </h2>
          <button 
            onClick={markAllRead}
            disabled={unreadCount === 0}
            className="glass-button flex items-center gap-2 px-4 py-2 bg-white text-slate-600 font-bold disabled:opacity-50"
          >
            <DoneAll fontSize="small" /> Mark All Read
          </button>
        </div>

        <div className="flex gap-2 p-1 bg-white/50 rounded-xl border border-white mb-6 w-fit">
          {(['All', 'Unread', 'Read'] as const).map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                activeTab === tab ? 'bg-indigo-600 text-white shadow-glow-indigo' : 'text-slate-500 hover:bg-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {filteredNotifs.map((notif, idx) => {
              const styles = getTypeStyles(notif.type);
              return (
                <motion.div 
                  key={notif.id}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: idx * 0.05 }}
                  className={`glass-card p-4 sm:p-5 flex gap-4 border-l-4 ${styles.border} ${!notif.read ? 'bg-white shadow-md' : 'bg-slate-50/50 opacity-80'}`}
                >
                  <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${styles.bg}`}>
                    {styles.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                      <h3 className={`font-black text-base ${!notif.read ? 'text-slate-800' : 'text-slate-600'}`}>{notif.title}</h3>
                      <span className="text-xs font-bold text-slate-400 whitespace-nowrap">{notif.time}</span>
                    </div>
                    <p className={`text-sm ${!notif.read ? 'text-slate-600 font-medium' : 'text-slate-500'}`}>{notif.message}</p>
                  </div>
                  
                  {!notif.read && (
                    <div className="flex-shrink-0 flex items-center justify-center pl-2">
                      <button 
                        onClick={() => markAsRead(notif.id)}
                        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-indigo-100 text-slate-400 hover:text-indigo-600 transition-colors flex items-center justify-center"
                        title="Mark as read"
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {filteredNotifs.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-12 flex flex-col items-center justify-center text-center">
              <Notifications className="text-slate-200 mb-4" sx={{ fontSize: 64 }} />
              <h3 className="font-black text-xl text-slate-700 mb-2">All Caught Up!</h3>
              <p className="text-slate-500 font-semibold">You have no {activeTab.toLowerCase()} notifications at the moment.</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default NotificationsPage;
