import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // We will start with a light premium theme that feels airy but vibrant
    primary: {
      main: '#6366f1', // Vibrant Indigo
      light: '#818cf8',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#a855f7', // Deep Purple
      light: '#c084fc',
      dark: '#9333ea',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: 'rgba(255, 255, 255, 0.75)', // Transparent paper for glassmorphism
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
    },
    error: { main: '#ef4444' },
    success: { main: '#10b981' },
    warning: { main: '#f59e0b' },
    info: { main: '#3b82f6' }
  },
  typography: {
    fontFamily: '"Outfit", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 800, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700, letterSpacing: '-0.01em' },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.3), 0 4px 6px -4px rgba(99, 102, 241, 0.3)',
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.2s ease-in-out',
        }
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 4px 24px -2px rgba(0, 0, 0, 0.05)',
          borderRadius: 24,
          overflow: 'visible',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          color: '#0f172a',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        }
      }
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(0, 0, 0, 0.05)',
          height: 72,
        }
      }
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: '#64748b',
          '&.Mui-selected': {
            color: '#6366f1',
          }
        }
      }
    }
  },
});

export default theme;
