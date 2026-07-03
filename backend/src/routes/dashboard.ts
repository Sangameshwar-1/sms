import { Router } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import prisma from '../prismaClient';

const router = Router();

router.get('/stats', authenticateToken, async (req: AuthRequest, res) => {
  const role = req.user?.role;
  const linkedId = req.user?.linked_entity_id;

  try {
    let stats: any = {};

    if (role === 'Admin') {
      stats.totalStudents = await prisma.student.count();
      stats.totalTeachers = await prisma.teacher.count();
      stats.totalParents = await prisma.parent.count();
      
      const att = await prisma.attendance.findMany();
      const presentCount = att.filter(a => a.Status === 'Present').length;
      stats.overallAttendance = att.length > 0 ? Math.round((presentCount / att.length) * 100) : 0;
      
      stats.upcomingExams = await prisma.exam.findMany({ take: 5, orderBy: { Date: 'desc' }, include: { Subject: true } });
      stats.recentAdmissions = await prisma.student.findMany({ take: 5, orderBy: { CreatedAt: 'desc' } });
      
      // Class performance mock chart data
      stats.classPerformance = [
        { name: 'Class 1', avg: 85 },
        { name: 'Class 2', avg: 78 },
        { name: 'Class 3', avg: 92 },
        { name: 'Class 4', avg: 65 },
        { name: 'Class 5', avg: 88 }
      ];
    } else if (role === 'Teacher') {
      const assignments = await prisma.teacherAssignment.findMany({ where: { TeacherId: linkedId } });
      stats.assignedClassesCount = new Set(assignments.map(a => a.ClassId)).size;
      stats.assignedSubjectsCount = new Set(assignments.map(a => a.SubjectId)).size;
      
      stats.todayAttendance = 92; // Mock
      stats.upcomingExams = await prisma.exam.findMany({ take: 5, orderBy: { Date: 'desc' }, include: { Subject: true } });
      stats.pendingMarks = [];
    } else if (role === 'Parent' || role === 'Student') {
      let studentId = linkedId;
      if (role === 'Parent') {
        const student = await prisma.student.findFirst({ where: { ParentId: linkedId } });
        studentId = student?.StudentId;
      }
      
      if (studentId) {
        const student = await prisma.student.findUnique({ where: { StudentId: studentId }, include: { Class: true } });
        stats.childName = student?.Name;
        stats.currentClass = student?.Class?.ClassName;
        
        const att = await prisma.attendance.findMany({ where: { StudentId: studentId } });
        const presentCount = att.filter(a => a.Status === 'Present').length;
        stats.attendancePercent = att.length > 0 ? Math.round((presentCount / att.length) * 100) : 0;
        
        stats.latestResults = await prisma.mark.findMany({ where: { StudentId: studentId }, take: 5, include: { Exam: { include: { Subject: true } } } });
        stats.upcomingExams = await prisma.exam.findMany({ take: 3, include: { Subject: true } });
        stats.leaveStatus = 'No Pending Requests';
      }
    }

    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

export default router;
