import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import GenericDataPage from './pages/GenericDataPage';
import Examinations from './pages/shared/Examinations';

// Admin Role Lists
import StudentList from './pages/admin/Roles/StudentList';
import TeacherList from './pages/admin/Roles/TeacherList';
import ParentList from './pages/admin/Roles/ParentList';
import AdminList from './pages/admin/Roles/AdminList';

// Admin Pages
import ClassesPage from './pages/admin/Academics/ClassesPage';
import SubjectsPage from './pages/admin/Academics/SubjectsPage';
import TeacherAssignmentsPage from './pages/admin/Academics/TeacherAssignmentsPage';
import AttendanceOverview from './pages/admin/AttendanceOverview';
import LeaveRequests from './pages/admin/LeaveRequests';
import ReportsPage from './pages/admin/ReportsPage';
import SettingsPage from './pages/admin/SettingsPage';

// Teacher Pages
import TeacherExams from './pages/teacher/TeacherExams';
import TeacherAttendance from './pages/teacher/TeacherAttendance';
import MyAcademics from './pages/teacher/MyAcademics';
import TeacherLeaves from './pages/teacher/TeacherLeaves';

// Parent Pages
import ParentResults from './pages/parent/ParentResults';
import ParentAttendance from './pages/parent/ParentAttendance';

// Student Pages
import StudentSubjects from './pages/student/StudentSubjects';
import StudentResults from './pages/student/StudentResults';
import StudentAttendance from './pages/student/StudentAttendance';

// Shared Pages
import UserProfile from './pages/shared/UserProfile';
import AcademicsSummary from './pages/shared/AcademicsSummary';
import StudentLeaves from './pages/shared/StudentLeaves';
import NotificationsPage from './pages/shared/NotificationsPage';
import NoticesPage from './pages/shared/NoticesPage';
import GlobalSearch from './pages/shared/GlobalSearch';
import ForgotPassword from './pages/auth/ForgotPassword';
import ChangePassword from './pages/auth/ChangePassword';
import StudentHub from './pages/shared/StudentHub';
import ClassHub from './pages/shared/ClassHub';
import SubjectHub from './pages/shared/SubjectHub';
import EditClassAttendance from './pages/admin/Attendance/EditClassAttendance';
import ExamDetails from './pages/shared/ExamDetails';
import AssignmentDetails from './pages/shared/AssignmentDetails';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return <Layout>{children}</Layout>;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Core Hierarchy (Academics) */}
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/classes/:classId" element={<ClassHub />} />
          <Route path="/classes/:classId/subjects" element={<SubjectsPage />} />
          <Route path="/classes/:classId/subjects/:subjectId" element={<SubjectHub />} />
          <Route path="/classes/:classId/students" element={<StudentList />} />
          <Route path="/classes/:classId/students/:studentId" element={<StudentHub />} />
          <Route path="/classes/:classId/students/:studentId/marks" element={<StudentResults />} />
          <Route path="/classes/:classId/students/:studentId/attendance" element={<StudentAttendance />} />
          <Route path="/classes/:classId/students/:studentId/leaves" element={<StudentLeaves />} />
          
          <Route path="/classes/:classId/exams" element={<Examinations />} />
          <Route path="/classes/:classId/exams/:examId" element={<ExamDetails />} />
          <Route path="/classes/:classId/subjects/:subjectId/exams/:examId" element={<ExamDetails />} />
          <Route path="/classes/:classId/subjects/:subjectId/assignments/:assignmentId" element={<AssignmentDetails />} />
          
          <Route path="/classes/:classId/attendance" element={<EditClassAttendance />} />
          
          {/* Global Equivalents for Admin menus */}
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/exams" element={<Examinations />} />

          {/* Admin Role List Routes */}
          <Route path="/roles/students" element={<StudentList />} />
          <Route path="/roles/teachers" element={<TeacherList />} />
          <Route path="/roles/parents" element={<ParentList />} />
          <Route path="/roles/admins" element={<AdminList />} />
          
          {/* Global Administration Routes */}
          <Route path="/attendance" element={<AttendanceOverview />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/academics/assignments" element={<TeacherAssignmentsPage />} />
          
          {/* Teacher Routes */}
          <Route path="/teacher/exams" element={<TeacherExams />} />
          <Route path="/teacher/attendance" element={<TeacherAttendance />} />
          <Route path="/teacher/academics" element={<MyAcademics />} />
          <Route path="/teacher/leave" element={<TeacherLeaves />} />

          {/* Parent Routes */}
          <Route path="/parent/results" element={<ParentResults />} />
          <Route path="/parent/attendance" element={<ParentAttendance />} />
          <Route path="/parent/academics/*" element={<AcademicsSummary />} />
          <Route path="/parent/current-class" element={<AcademicsSummary />} />
          <Route path="/parent/previous-classes" element={<AcademicsSummary />} />
          <Route path="/parent/leave" element={<StudentLeaves />} />

          {/* Student Routes */}
          <Route path="/student/subjects" element={<StudentSubjects />} />
          <Route path="/student/results" element={<StudentResults />} />
          <Route path="/student/attendance" element={<StudentAttendance />} />
          <Route path="/student/current-class" element={<AcademicsSummary />} />
          <Route path="/student/previous-classes" element={<AcademicsSummary />} />
          <Route path="/student/leave" element={<StudentLeaves />} />
          
          {/* Shared Routes */}
          <Route path="/exams" element={<Examinations />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/notices" element={<NoticesPage />} />
          <Route path="/search" element={<GlobalSearch />} />
          <Route path="/settings/password" element={<ChangePassword />} />
          <Route path="/leave-requests" element={<LeaveRequests />} />
          
          {/* Fallback for Legacy Shared Hub Routes (Optional/Redirects can be handled here) */}
          <Route path="/student/:id" element={<Navigate to="/roles/students" replace />} />
          <Route path="/class/:id" element={<Navigate to="/classes" replace />} />
          <Route path="/subject/:id" element={<Navigate to="/classes" replace />} />
          
          {/* Generic Fallback for unmapped dynamic routes */}
          <Route path="/*" element={<GenericDataPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="animated-bg">
        <div className="animated-blob blob-1"></div>
        <div className="animated-blob blob-2"></div>
        <div className="animated-blob blob-3"></div>
      </div>
      <AuthProvider>
        <Router>
          <AnimatedRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
