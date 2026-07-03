import { Box, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

import AdminDashboard from './admin/AdminDashboard';
import TeacherDashboard from './teacher/TeacherDashboard';
import ParentDashboard from './parent/ParentDashboard';
import StudentDashboard from './student/StudentDashboard';

const DashboardSwitch: React.FC = () => {
  const { role } = useAuth();

  let DashboardComponent = null;

  switch (role) {
    case 'Admin':
      DashboardComponent = <AdminDashboard />;
      break;
    case 'Teacher':
      DashboardComponent = <TeacherDashboard />;
      break;
    case 'Parent':
      DashboardComponent = <ParentDashboard />;
      break;
    case 'Student':
      DashboardComponent = <StudentDashboard />;
      break;
    default:
      DashboardComponent = <Typography>Loading dashboard...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 800, color: '#0f172a' }}>
        Welcome back, <span className="gradient-text">{role}</span>
      </Typography>
      {DashboardComponent}
    </Box>
  );
};

export default DashboardSwitch;
