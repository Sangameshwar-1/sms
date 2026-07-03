import { Router } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import prisma from '../prismaClient';

const router = Router();

// Get Navigation (Bottom & Drawer) based on role
router.get('/navigation', authenticateToken, async (req: AuthRequest, res) => {
  const role = req.user?.role;

  try {
    const config = await prisma.uIConfig.findFirst({
      where: { Role: role, ConfigType: 'navigation' }
    });

    if (config) {
      res.json(config.ConfigData);
    } else {
      res.json(getDefaultNavigation(role || 'Student'));
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch navigation config' });
  }
});

// Get Dashboard Widgets based on role
router.get('/dashboard', authenticateToken, async (req: AuthRequest, res) => {
  const role = req.user?.role;

  try {
    const config = await prisma.uIConfig.findFirst({
      where: { Role: role, ConfigType: 'dashboard' }
    });

    if (config) {
      res.json(config.ConfigData);
    } else {
      res.json(getDefaultDashboard(role || 'Student'));
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch dashboard config' });
  }
});

// Get Screens hierarchy based on role
router.get('/screens', authenticateToken, async (req: AuthRequest, res) => {
  const role = req.user?.role;

  try {
    const config = await prisma.uIConfig.findFirst({
      where: { Role: role, ConfigType: 'screens' }
    });

    if (config) {
      res.json(config.ConfigData);
    } else {
      res.json(getDefaultScreens(role || 'Student'));
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch screens config' });
  }
});

// Seed default configs (Utility endpoint to populate UIConfig table)
router.post('/seed', authenticateToken, async (req: AuthRequest, res) => {
  if (req.user?.role !== 'Admin') {
    res.status(403).json({ error: 'Unauthorized' });
    return;
  }

  const roles = ['Admin', 'Teacher', 'Parent', 'Student'];
  
  try {
    await prisma.uIConfig.deleteMany();

    for (const role of roles) {
      await prisma.uIConfig.createMany({
        data: [
          { Role: role, ConfigType: 'navigation', ConfigData: getDefaultNavigation(role) },
          { Role: role, ConfigType: 'dashboard', ConfigData: getDefaultDashboard(role) },
          { Role: role, ConfigType: 'screens', ConfigData: getDefaultScreens(role) },
        ]
      });
    }

    res.json({ message: 'Default configurations seeded successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to seed configurations.' });
  }
});

// --- Default Configuration Generators (Based exactly on architecture) ---

function getDefaultNavigation(role: string) {
  switch (role) {
    case 'Admin':
      return {
        bottom: [
          { label: 'Dashboard', icon: 'Dashboard', route: '/dashboard' },
          { label: 'Roles', icon: 'People', route: '/roles' },
          { label: 'Exams', icon: 'Assessment', route: '/exams' },
          { label: 'Reports', icon: 'BarChart', route: '/reports' },
          { label: 'Menu', icon: 'Menu', route: '/menu' }
        ],
        drawer: [
          { label: 'Dashboard', route: '/dashboard' },
          {
            label: 'Roles',
            children: [
              { label: 'Students', route: '/roles/students' },
              { label: 'Parents', route: '/roles/parents' },
              { label: 'Teachers', route: '/roles/teachers' },
              { label: 'Admins', route: '/roles/admins' }
            ]
          },
          {
            label: 'Academics',
            children: [
              { label: 'Classes', route: '/academics/classes' },
              { label: 'Sections', route: '/academics/sections' },
              { label: 'Subjects', route: '/academics/subjects' },
              { label: 'Teacher Assignments', route: '/academics/teacher-assignments' }
            ]
          },
          {
            label: 'Examinations',
            children: [
              { label: 'Class', route: '/examinations/class' }
            ]
          },
          { label: 'Attendance', route: '/attendance' },
          { label: 'Reports', route: '/reports' },
          { label: 'Notices', route: '/notices' },
          { label: 'Settings', route: '/settings' },
          { label: 'Logout', route: '/logout' }
        ]
      };
    case 'Teacher':
      return {
        bottom: [
          { label: 'Dashboard', icon: 'Dashboard', route: '/dashboard' },
          { label: 'Subjects', icon: 'Book', route: '/subjects' },
          { label: 'Exams', icon: 'Assessment', route: '/exams' },
          { label: 'Attendance', icon: 'FactCheck', route: '/attendance' },
          { label: 'Menu', icon: 'Menu', route: '/menu' }
        ],
        drawer: [
          { label: 'Dashboard', route: '/dashboard' },
          {
            label: 'My Classes',
            children: [
              { label: 'Students', route: '/my-classes/students' },
              { label: 'Attendance', route: '/my-classes/attendance' },
              { label: 'Exams', route: '/my-classes/exams' },
              { label: 'Results', route: '/my-classes/results' }
            ]
          },
          {
            label: 'My Subjects',
            children: [
              { label: 'Subject Details', route: '/my-subjects/details' }
            ]
          },
          { label: 'Leave Requests', route: '/leave-requests' },
          { label: 'Profile', route: '/profile' },
          { label: 'Logout', route: '/logout' }
        ]
      };
    case 'Parent':
      return {
        bottom: [
          { label: 'Dashboard', icon: 'Dashboard', route: '/dashboard' },
          { label: 'Academics', icon: 'School', route: '/academics' },
          { label: 'Results', icon: 'Grade', route: '/results' },
          { label: 'Attendance', icon: 'FactCheck', route: '/attendance' },
          { label: 'Menu', icon: 'Menu', route: '/menu' }
        ],
        drawer: [
          { label: 'Dashboard', route: '/dashboard' },
          {
            label: 'My Child',
            children: [
              { label: 'Current Class Results', route: '/my-child/current/results' },
              { label: 'Current Class Attendance', route: '/my-child/current/attendance' },
              { label: 'Previous Classes', route: '/my-child/previous' }
            ]
          },
          { label: 'Leave Requests', route: '/leave-requests' },
          { label: 'Profile', route: '/profile' },
          { label: 'Logout', route: '/logout' }
        ]
      };
    case 'Student':
      return {
        bottom: [
          { label: 'Dashboard', icon: 'Dashboard', route: '/dashboard' },
          { label: 'Subjects', icon: 'Book', route: '/subjects' },
          { label: 'Results', icon: 'Grade', route: '/results' },
          { label: 'Attendance', icon: 'FactCheck', route: '/attendance' },
          { label: 'Menu', icon: 'Menu', route: '/menu' }
        ],
        drawer: [
          { label: 'Dashboard', route: '/dashboard' },
          {
            label: 'My Academics',
            children: [
              { label: 'Current Subjects', route: '/my-academics/current/subjects' },
              { label: 'Current Results', route: '/my-academics/current/results' },
              { label: 'Current Attendance', route: '/my-academics/current/attendance' },
              { label: 'Previous Classes', route: '/my-academics/previous' }
            ]
          },
          { label: 'Leave Requests', route: '/leave-requests' },
          { label: 'Profile', route: '/profile' },
          { label: 'Logout', route: '/logout' }
        ]
      };
    default:
      return {};
  }
}

function getDefaultDashboard(role: string) {
  switch (role) {
    case 'Admin':
      return {
        widgets: [
          { type: 'statCard', title: 'Total Students', dataKey: 'totalStudents' },
          { type: 'statCard', title: 'Total Teachers', dataKey: 'totalTeachers' },
          { type: 'statCard', title: 'Total Parents', dataKey: 'totalParents' },
          { type: 'progressRing', title: 'Attendance %', dataKey: 'overallAttendance' },
          { type: 'listWidget', title: 'Upcoming Exams', dataKey: 'upcomingExams' },
          { type: 'listWidget', title: 'Recent Admissions', dataKey: 'recentAdmissions' },
          { type: 'chartWidget', title: 'Class Performance', dataKey: 'classPerformance' }
        ]
      };
    case 'Teacher':
      return {
        widgets: [
          { type: 'statCard', title: 'Assigned Classes', dataKey: 'assignedClassesCount' },
          { type: 'statCard', title: 'Assigned Subjects', dataKey: 'assignedSubjectsCount' },
          { type: 'progressRing', title: "Today's Attendance", dataKey: 'todayAttendance' },
          { type: 'listWidget', title: 'Upcoming Exams', dataKey: 'upcomingExams' },
          { type: 'listWidget', title: 'Pending Marks Entry', dataKey: 'pendingMarks' }
        ]
      };
    case 'Parent':
      return {
        widgets: [
          { type: 'infoCard', title: 'Child Name', dataKey: 'childName' },
          { type: 'infoCard', title: 'Current Class', dataKey: 'currentClass' },
          { type: 'progressRing', title: 'Attendance %', dataKey: 'attendancePercent' },
          { type: 'listWidget', title: 'Latest Results', dataKey: 'latestResults' },
          { type: 'listWidget', title: 'Upcoming Exams', dataKey: 'upcomingExams' },
          { type: 'statusCard', title: 'Leave Status', dataKey: 'leaveStatus' }
        ]
      };
    case 'Student':
      return {
        widgets: [
          { type: 'infoCard', title: 'Current Class', dataKey: 'currentClass' },
          { type: 'progressRing', title: 'Attendance %', dataKey: 'attendancePercent' },
          { type: 'listWidget', title: 'Latest Results', dataKey: 'latestResults' },
          { type: 'listWidget', title: 'Upcoming Exams', dataKey: 'upcomingExams' },
          { type: 'statusCard', title: 'Leave Status', dataKey: 'leaveStatus' }
        ]
      };
    default:
      return {};
  }
}

function getDefaultScreens(role: string) {
  return { role, enabled: true };
}

export default router;
