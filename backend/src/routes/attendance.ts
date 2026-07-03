import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import prisma from '../prismaClient';

const router = Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const attendance = await prisma.attendance.findMany();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
});

export default router;
