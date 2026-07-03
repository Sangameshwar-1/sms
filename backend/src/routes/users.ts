import { Router } from 'express';
import { authenticateToken, authorizeRole, AuthRequest } from '../middleware/auth';
import prisma from '../prismaClient';

const router = Router();

// All Users/Roles Summary
router.get('/', authenticateToken, authorizeRole(['Admin']), async (req: AuthRequest, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { username: true, role: true, status: true }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch roles' });
  }
});

// Students Module
router.get('/students', authenticateToken, authorizeRole(['Admin', 'Teacher', 'Student']), async (req: AuthRequest, res) => {
  const role = req.user?.role;
  const linkedId = req.user?.linked_entity_id;

  try {
    let students;
    if (role === 'Admin') {
      students = await prisma.student.findMany();
    } else if (role === 'Student') {
      students = await prisma.student.findMany({ where: { StudentId: linkedId } });
    } else if (role === 'Teacher') {
      students = await prisma.student.findMany(); 
    }
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

router.put('/students/:id', authenticateToken, authorizeRole(['Admin']), async (req: AuthRequest, res) => {
  try {
    const student = await prisma.student.update({
      where: { StudentId: Number(req.params.id) },
      data: req.body
    });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update student' });
  }
});

// Parents Module
router.get('/parents', authenticateToken, authorizeRole(['Admin', 'Parent']), async (req: AuthRequest, res) => {
  const role = req.user?.role;
  const linkedId = req.user?.linked_entity_id;

  try {
    if (role === 'Admin') {
      const parents = await prisma.parent.findMany();
      res.json(parents);
    } else {
      const parent = await prisma.parent.findUnique({ where: { ParentId: linkedId } });
      res.json(parent ? [parent] : []);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch parents' });
  }
});

router.put('/parents/:id', authenticateToken, authorizeRole(['Admin']), async (req: AuthRequest, res) => {
  try {
    const parent = await prisma.parent.update({
      where: { ParentId: Number(req.params.id) },
      data: req.body
    });
    res.json(parent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update parent' });
  }
});

// Teachers Module
router.get('/teachers', authenticateToken, authorizeRole(['Admin', 'Teacher']), async (req: AuthRequest, res) => {
  const role = req.user?.role;
  const linkedId = req.user?.linked_entity_id;

  try {
    if (role === 'Admin') {
      const teachers = await prisma.teacher.findMany();
      res.json(teachers);
    } else {
      const teacher = await prisma.teacher.findUnique({ where: { TeacherId: linkedId } });
      res.json(teacher ? [teacher] : []);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teachers' });
  }
});

router.put('/teachers/:id', authenticateToken, authorizeRole(['Admin']), async (req: AuthRequest, res) => {
  try {
    const teacher = await prisma.teacher.update({
      where: { TeacherId: Number(req.params.id) },
      data: req.body
    });
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update teacher' });
  }
});

// Admins Module
router.get('/admins', authenticateToken, authorizeRole(['Admin']), async (req, res) => {
  try {
    const admins = await prisma.admin.findMany();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admins' });
  }
});

export default router;
