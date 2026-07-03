import { AdminPanelSettings } from '@mui/icons-material';

const AdminList = () => {
  const admins = [
    { name: 'Super Admin', email: 'admin@school.com', role: 'System Administrator' },
    { name: 'IT Support', email: 'it@school.com', role: 'Network Administrator' }
  ];

  return (
    <div className="pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {admins.map((admin, idx) => (
          <div key={idx} className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[24px] p-6 shadow-sm flex items-center">
            <div className="w-14 h-14 rounded-full bg-slate-800 text-white flex items-center justify-center mr-5 shadow-inner">
              <AdminPanelSettings />
            </div>
            <div>
              <h3 className="text-slate-800 font-extrabold text-lg leading-tight">{admin.name}</h3>
              <p className="text-slate-500 font-bold text-sm mt-0.5">{admin.role}</p>
              <span className="text-slate-400 text-xs block mt-1">{admin.email}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminList;
