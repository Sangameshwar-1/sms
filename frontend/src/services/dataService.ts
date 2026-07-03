import { BaseRepository } from '../repositories/baseRepository';

// Create a generic repository for random dynamic endpoints
class GenericRepository extends BaseRepository {
  constructor() {
    super('/api');
  }
}

const genericRepo = new GenericRepository();

// We intercept the network failure at the BaseRepository level and fallback to offlineCache.
// But we still want to inject dummy data if BOTH network and offline cache fail (for development).
// We'll keep our fallback logic for now while the real backend is down.
const getMockDataForEndpoint = (endpoint: string) => {
  if (endpoint.includes('/api/users/students')) {
    return [
      { id: 'STU001', name: 'Rahul Sharma', class: '10-A', parentName: 'Ramesh Sharma', contact: '+91 9876543210', status: 'Active' },
      { id: 'STU002', name: 'Priya Singh', class: '9-B', parentName: 'Sanjay Singh', contact: '+91 9876543211', status: 'Active' },
      { id: 'STU003', name: 'Amit Kumar', class: '10-A', parentName: 'Anil Kumar', contact: '+91 9876543212', status: 'Inactive' }
    ];
  }
  if (endpoint.includes('/api/users/teachers')) {
    return [
      { id: 'TCH001', name: 'John Doe', department: 'Mathematics', experience: '5 Years', status: 'Active' },
      { id: 'TCH002', name: 'Jane Smith', department: 'Science', experience: '8 Years', status: 'Active' }
    ];
  }
  if (endpoint.includes('/api/users/parents')) {
    return [
      { id: 'PAR001', name: 'Ramesh Sharma', children: 'Rahul Sharma (10-A)', occupation: 'Engineer', contact: '+91 9876543210' },
      { id: 'PAR002', name: 'Sanjay Singh', children: 'Priya Singh (9-B)', occupation: 'Business', contact: '+91 9876543211' }
    ];
  }
  if (endpoint.includes('/api/users/admins')) {
    return [
      { id: 'ADM001', name: 'Super Admin', role: 'System Administrator', email: 'admin@school.com', lastLogin: 'Today, 10:00 AM' }
    ];
  }
  if (endpoint.includes('/api/academics/classes')) {
    return [
      { id: 'CLS001', name: 'Class 10-A', classTeacher: 'John Doe', studentCount: 45, room: 'Room 101' },
      { id: 'CLS002', name: 'Class 10-B', classTeacher: 'Jane Smith', studentCount: 42, room: 'Room 102' }
    ];
  }
  if (endpoint.includes('/api/academics/subjects')) {
    return [
      { id: 'SUB001', name: 'Mathematics', code: 'MAT-101', type: 'Core', credits: 4 },
      { id: 'SUB002', name: 'Science', code: 'SCI-102', type: 'Core', credits: 4 },
      { id: 'SUB003', name: 'Computer Science', code: 'CS-103', type: 'Elective', credits: 3 }
    ];
  }
  if (endpoint.includes('/api/examinations/exams')) {
    return [
      { id: 'EXM001', name: 'Formative Assessment 1', term: 'Term 1', startDate: '2026-07-15', endDate: '2026-07-20', status: 'Upcoming' },
      { id: 'EXM002', name: 'Summative Assessment 1', term: 'Term 1', startDate: '2026-10-10', endDate: '2026-10-25', status: 'Scheduled' }
    ];
  }
  if (endpoint.includes('/api/examinations/marks')) {
    return [
      { id: 'MRK001', student: 'Rahul Sharma', subject: 'Mathematics', exam: 'FA1', marksObtained: 85, maxMarks: 100, grade: 'A2' },
      { id: 'MRK002', student: 'Priya Singh', subject: 'Science', exam: 'FA1', marksObtained: 92, maxMarks: 100, grade: 'A1' }
    ];
  }
  if (endpoint.includes('/api/attendance')) {
    return [
      { id: 'ATT001', date: '2026-06-25', class: '10-A', present: 43, absent: 2, leave: 0 },
      { id: 'ATT002', date: '2026-06-25', class: '10-B', present: 40, absent: 1, leave: 1 }
    ];
  }
  if (endpoint.includes('/api/leaves')) {
    return [
      { id: 'LEV001', applicant: 'Rahul Sharma', role: 'Student', startDate: '2026-06-20', endDate: '2026-06-21', reason: 'Fever', status: 'Approved' },
      { id: 'LEV002', applicant: 'John Doe', role: 'Teacher', startDate: '2026-07-01', endDate: '2026-07-02', reason: 'Personal', status: 'Pending' }
    ];
  }
  if (endpoint.includes('/api/dashboard/stats')) {
    return [
      { id: 'NOT001', title: 'Holiday on Friday', date: '2026-06-26', priority: 'High', type: 'Notice' },
      { id: 'NOT002', title: 'Fee Payment Reminder', date: '2026-06-25', priority: 'Medium', type: 'Reminder' }
    ];
  }
  if (endpoint.includes('/api/academics/assignments')) {
    return [
      { id: 'ASN001', teacher: 'John Doe', subject: 'Mathematics', class: '10-A', status: 'Active' },
      { id: 'ASN002', teacher: 'Jane Smith', subject: 'Science', class: '9-B', status: 'Active' }
    ];
  }
  if (endpoint.includes('/api/users')) {
    return [
      { id: 'USR001', username: 'admin', role: 'Admin', email: 'admin@school.com', lastActive: '2026-06-26' },
      { id: 'USR002', username: 'teacher1', role: 'Teacher', email: 'teacher@school.com', lastActive: '2026-06-25' }
    ];
  }
  
  // Default fallback for any other endpoint
  return [
    { id: 'DUMMY1', name: 'Mock Record 1', description: 'Backend is offline. This is dummy data.', status: 'Active' },
    { id: 'DUMMY2', name: 'Mock Record 2', description: 'Backend is offline. This is dummy data.', status: 'Pending' }
  ];
};

export const dataService = {
  fetchGenericData: async (endpoint: string): Promise<any> => {
    try {
      // This now hits the repository which tries Network -> LocalForage Offline Cache
      return await genericRepo.get(endpoint);
    } catch (err) {
      console.warn(`[dataService] Network and Offline Cache missed for ${endpoint}. Falling back to hardcoded dummy data.`);
      return getMockDataForEndpoint(endpoint);
    }
  },
  
  updateGenericData: async (endpoint: string, id: string | number, data: any): Promise<any> => {
    try {
      return await genericRepo.put(id, data, endpoint);
    } catch (err) {
      console.warn(`[dataService] Backend unreachable. Simulating update for ${id}`);
      return { id, ...data };
    }
  },

  deleteGenericData: async (endpoint: string, id: string | number): Promise<any> => {
    try {
      return await genericRepo.delete(id, endpoint);
    } catch (err) {
      console.warn(`[dataService] Backend unreachable. Simulating delete for ${id}`);
      return { success: true };
    }
  },

  createGenericData: async (endpoint: string, data: any): Promise<any> => {
    try {
      return await genericRepo.post(data, endpoint);
    } catch (err) {
      console.warn(`[dataService] Backend unreachable. Simulating create.`);
      return { id: `MOCK_${Math.floor(Math.random() * 1000)}`, ...data };
    }
  }
};
