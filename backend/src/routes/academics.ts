import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import prisma from '../prismaClient';

const router = Router();

router.get('/classes', authenticateToken, async (req, res) => {
  try {
    const classes = await prisma.class.findMany({ include: { Sections: true } });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
});

router.put('/classes/:id', authenticateToken, async (req, res) => {
  try {
    const cls = await prisma.class.update({
      where: { ClassId: Number(req.params.id) },
      data: req.body
    });
    res.json(cls);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update class' });
  }
});

router.get('/subjects', authenticateToken, async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subjects' });
  }
});

router.put('/subjects/:id', authenticateToken, async (req, res) => {
  try {
    const subject = await prisma.subject.update({
      where: { SubjectId: Number(req.params.id) },
      data: req.body
    });
    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update subject' });
  }
});

router.get('/assignments', authenticateToken, async (req, res) => {
  try {
    const assignments = await prisma.teacherAssignment.findMany({
      include: { Teacher: true, Class: true, Section: true, Subject: true }
    });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
});

export default router;
