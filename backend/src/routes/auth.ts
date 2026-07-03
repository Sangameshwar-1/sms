import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_sms_key';

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user || user.status !== 'Active') {
      res.status(401).json({ error: 'Invalid username or password, or account is inactive.' });
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      res.status(401).json({ error: 'Invalid username or password.' });
      return;
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        username: user.username,
        role: user.role,
        linked_entity_id: user.linked_entity_id,
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, role: user.role, linked_entity_id: user.linked_entity_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error during login.' });
  }
});

// For testing purposes during setup, add a simple route to create the initial admin
router.post('/setup', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const existingAdmin = await prisma.user.findFirst({ where: { role: 'Admin' } });
    if (existingAdmin) {
      res.status(400).json({ error: 'Admin already exists.' });
      return;
    }

    const password_hash = await bcrypt.hash(password, 10);
    
    // Create linked Admin entity
    const adminEntity = await prisma.admin.create({
      data: {
        Name: 'System Admin',
        Email: 'admin@school.com',
        Phone: '1234567890'
      }
    });

    const user = await prisma.user.create({
      data: {
        username,
        password_hash,
        role: 'Admin',
        linked_entity_id: adminEntity.AdminId,
        status: 'Active'
      }
    });

    res.json({ message: 'Admin created successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to setup admin.' });
  }
});

export default router;
