import { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, type: 'spring' }} className="w-full max-w-[400px]">
        <Card className="glass-panel" sx={{ p: 2, borderRadius: 4 }}>
          <CardContent>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h3" className="gradient-text" sx={{ fontWeight: 800, mb: 1 }}>
                SMS
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, letterSpacing: 1 }}>
                PASSWORD RECOVERY
              </Typography>
            </Box>
          
          {isSuccess ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <Alert severity="success" sx={{ mb: 4, borderRadius: 2 }}>
                A password reset link has been sent to <strong>{email}</strong>. Please check your inbox.
              </Alert>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => navigate('/login')}
                startIcon={<ArrowBack />}
                sx={{ py: 1.5, fontSize: '1rem', borderRadius: 2, borderWidth: 2 }}
              >
                Back to Login
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary', textAlign: 'center', fontWeight: 600 }}>
                Enter your registered email address and we'll send you a link to reset your password.
              </Typography>
              
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ mb: 3 }}
              />
              
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ py: 1.5, fontSize: '1.1rem', borderRadius: 2 }}
              >
                Send Reset Link
              </Button>
              
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/login')}
                  startIcon={<ArrowBack />}
                  sx={{ textTransform: 'none', fontWeight: 600, color: 'text.secondary' }}
                >
                  Back to Login
                </Button>
              </Box>
            </form>
          )}
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default ForgotPassword;
