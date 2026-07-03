import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import prisma from '../prismaClient';

const router = Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const leaves = await prisma.leaveRequest.findMany();
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leave requests' });
  }
});

export default router;
