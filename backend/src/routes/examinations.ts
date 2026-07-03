import { Router } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import prisma from '../prismaClient';

const router = Router();

router.get('/exams', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const exams = await prisma.exam.findMany();
    res.json(exams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch exams' });
  }
});

router.get('/marks', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const marks = await prisma.mark.findMany();
    res.json(marks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch marks' });
  }
});

export default router;
