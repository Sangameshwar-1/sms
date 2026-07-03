import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import configRoutes from './routes/config';
import usersRoutes from './routes/users';
import academicsRoutes from './routes/academics';
import examinationsRoutes from './routes/examinations';
import attendanceRoutes from './routes/attendance';
import leavesRoutes from './routes/leaves';
import dashboardRoutes from './routes/dashboard';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/config', configRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/academics', academicsRoutes);
app.use('/api/examinations', examinationsRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leaves', leavesRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SMS Backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
