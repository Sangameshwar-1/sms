import { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await authService.login(username, password);

      login(data.token, data.role);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, type: 'spring' }}>
        <Card className="glass-panel" sx={{ maxWidth: 400, width: '100%', p: 2, borderRadius: 4 }}>
          <CardContent>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h3" className="gradient-text" sx={{ fontWeight: 800, mb: 1 }}>
                SMS
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, letterSpacing: 1 }}>
                SCHOOL MANAGEMENT SYSTEM
              </Typography>
            </Box>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, mb: 1 }}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-indigo-600" />
                <span className="text-sm font-semibold text-slate-500">Remember me</span>
              </label>
              <Typography 
                variant="body2" 
                sx={{ color: '#6366f1', fontWeight: 600, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </Typography>
            </Box>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2, py: 1.5, fontSize: '1.1rem' }}
              >
                Sign In
              </Button>
            </form>

            <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
              <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mb: 2, fontWeight: 'bold', color: 'text.secondary' }}>
                DEMO LOGIN (NO PASSWORD REQUIRED)
              </Typography>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outlined" 
                  size="small" 
                  onClick={() => { setUsername('admin'); setPassword('123'); setTimeout(() => document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })), 100); }}
                >Admin</Button>
                <Button 
                  variant="outlined" 
                  size="small" 
                  color="secondary"
                  onClick={() => { setUsername('teacher'); setPassword('123'); setTimeout(() => document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })), 100); }}
                >Teacher</Button>
                <Button 
                  variant="outlined" 
                  size="small" 
                  color="success"
                  onClick={() => { setUsername('parent'); setPassword('123'); setTimeout(() => document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })), 100); }}
                >Parent</Button>
                <Button 
                  variant="outlined" 
                  size="small" 
                  color="warning"
                  onClick={() => { setUsername('student'); setPassword('123'); setTimeout(() => document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })), 100); }}
                >Student</Button>
              </div>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Login;
