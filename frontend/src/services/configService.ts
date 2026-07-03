import { apiClient } from '../api/apiClient';

export interface NavConfig {
  bottom: any[];
  drawer: any[];
}

export const configService = {
  getNavigation: async (role: string = 'Admin'): Promise<NavConfig> => {
    try {
      return await apiClient.get<NavConfig>(`/config/navigation?role=${role}`);
    } catch (err) {
      console.warn('Backend API unreachable. Falling back to dynamic role-based dummy config.');
      
      const adminConfig = {
        bottom: [
          { label: 'Dashboard', route: '/dashboard', icon: 'Dashboard' },
          { label: 'Classes', route: '/classes', icon: 'School' },
          { label: 'Roles', route: '/roles/students', icon: 'People' },
          { label: 'Attendance', route: '/attendance', icon: 'FactCheck' },
          { label: 'Menu', route: 'menu', icon: 'Menu' },
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
          { label: 'Classes', route: '/classes' },
          { label: 'Subjects', route: '/subjects' },
          { label: 'Teacher Assignments', route: '/academics/assignments' },
          { label: 'Attendance', route: '/attendance' },
          { label: 'Examinations', route: '/exams' },
          {
            label: 'Leave Management',
            children: [
              { label: 'Leave Requests', route: '/leave-requests' },
            ]
          },
          { label: 'Reports', route: '/reports' },
          { label: 'Notices', route: '/notices' },
          { label: 'Notifications', route: '/notifications' },
          { label: 'Settings', route: '/settings' },
          { label: 'Profile', route: '/profile' },
          { label: 'Logout', route: '/logout' }
        ]
      };

      const teacherConfig = {
        bottom: [
          { label: 'Dashboard', route: '/dashboard', icon: 'Dashboard' },
          { label: 'My Academics', route: '/teacher/academics', icon: 'School' },
          { label: 'Exams', route: '/teacher/exams', icon: 'Assessment' },
          { label: 'Attendance', route: '/teacher/attendance', icon: 'FactCheck' },
          { label: 'Menu', route: 'menu', icon: 'Menu' },
        ],
        drawer: [
          { label: 'Dashboard', route: '/dashboard' },
          { label: 'My Academics', route: '/teacher/academics' },
          { label: 'Attendance', route: '/teacher/attendance' },
          { label: 'Examinations', route: '/teacher/exams' },
          { label: 'Leave Requests', route: '/teacher/leave' },
          { label: 'Notices', route: '/notices' },
          { label: 'Notifications', route: '/notifications' },
          { label: 'Profile', route: '/profile' },
          { label: 'Logout', route: '/logout' }
        ]
      };

      const parentConfig = {
        bottom: [
          { label: 'Dashboard', route: '/dashboard', icon: 'Dashboard' },
          { label: 'Classes', route: '/parent/current-class', icon: 'School' },
          { label: 'Results', route: '/parent/results', icon: 'Grade' },
          { label: 'Leave', route: '/parent/leave', icon: 'Feed' },
          { label: 'Menu', route: 'menu', icon: 'Menu' },
        ],
        drawer: [
          { label: 'Dashboard', route: '/dashboard' },
          { label: 'Current Class', route: '/parent/current-class' },
          { label: 'Attendance', route: '/parent/attendance' },
          { label: 'Results', route: '/parent/results' },
          { label: 'Leave Requests', route: '/parent/leave' },
          { label: 'Notices', route: '/notices' },
          { label: 'Notifications', route: '/notifications' },
          { label: 'Profile', route: '/profile' },
          { label: 'Logout', route: '/logout' }
        ]
      };

      const studentConfig = {
        bottom: [
          { label: 'Dashboard', route: '/dashboard', icon: 'Dashboard' },
          { label: 'Subjects', route: '/student/subjects', icon: 'Book' },
          { label: 'Results', route: '/student/results', icon: 'Grade' },
          { label: 'Leave', route: '/student/leave', icon: 'Feed' },
          { label: 'Menu', route: 'menu', icon: 'Menu' },
        ],
        drawer: [
          { label: 'Dashboard', route: '/dashboard' },
          { label: 'Current Class', route: '/student/current-class' },
          { label: 'Subjects', route: '/student/subjects' },
          { label: 'Attendance', route: '/student/attendance' },
          { label: 'Results', route: '/student/results' },
          { label: 'Leave Requests', route: '/student/leave' },
          { label: 'Notices', route: '/notices' },
          { label: 'Notifications', route: '/notifications' },
          { label: 'Profile', route: '/profile' },
          { label: 'Logout', route: '/logout' }
        ]
      };

      if (role === 'Teacher') return teacherConfig;
      if (role === 'Parent') return parentConfig;
      if (role === 'Student') return studentConfig;
      return adminConfig;
    }
  },
  getDashboard: async (): Promise<any> => {
    return await apiClient.get<any>('/config/dashboard');
  },
};
