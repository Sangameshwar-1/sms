import StudentCard from '../../../components/ui/StudentCard';
import LeaveRequestCard from '../../../components/ui/LeaveRequestCard';

const Profile = () => {
  return (
    <div className="pb-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-800">My Child</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <StudentCard 
            name="Rahul Sharma"
            admissionNo="ADM-2026-001"
            classSection="10-A"
            attendancePercent={92}
          />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-extrabold text-slate-800 mb-4">Leave Requests</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <LeaveRequestCard 
            startDate="12-Jun-2026"
            endDate="13-Jun-2026"
            reason="Attending a family wedding out of town."
            status="Approved"
          />
          <LeaveRequestCard 
            startDate="05-Aug-2026"
            endDate="05-Aug-2026"
            reason="Medical appointment."
            status="Pending"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
