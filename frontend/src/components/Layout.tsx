import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Drawer, 
  BottomNavigation, 
  BottomNavigationAction, 
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Dashboard, 
  People, 
  Assessment, 
  BarChart, 
  Book, 
  FactCheck, 
  School, 
  Grade, 
  ExpandLess, 
  ExpandMore,
  Circle,
  NotificationsNoneOutlined,
  SearchOutlined,
  AccountCircleOutlined,
  ChevronLeft,
  WifiOff
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { configService } from '../services/configService';
import { useResponsive } from '../hooks/useResponsive';
import { useOnlineStatus } from '../hooks/useApi';
import ChildSelector from './ChildSelector';

// Icon mapper
const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Dashboard': return <Dashboard />;
    case 'People': return <People />;
    case 'Assessment': return <Assessment />;
    case 'BarChart': return <BarChart />;
    case 'Book': return <Book />;
    case 'FactCheck': return <FactCheck />;
    case 'School': return <School />;
    case 'Grade': return <Grade />;
    case 'Menu': return <MenuIcon />;
    default: return <Circle sx={{ fontSize: 12 }} />;
  }
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, role, logout, activeChild } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDesktop } = useResponsive();
  const isOnline = useOnlineStatus();
  
  const [navConfig, setNavConfig] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [openCollapse, setOpenCollapse] = useState<{ [key: string]: boolean }>({});

  const formatTitle = (path: string) => {
    const parts = path.split('/').filter(Boolean);
    if (parts.length === 0 || parts[0] === 'dashboard') return 'SMS';
    return parts[parts.length - 1].replace(/-/g, ' ').toUpperCase();
  };

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const data = await configService.getNavigation(role || 'Admin');
        setNavConfig(data);
      } catch (err) {
        console.error('Failed to fetch nav config', err);
      }
    };
    
    if (token) {
      fetchConfig();
    }
  }, [token]);

  const toggleDrawer = (open: boolean) => () => {
    if (open && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setDrawerOpen(open);
  };

  const handleToggleCollapse = (label: string) => {
    setOpenCollapse(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const handleNavClick = (route: string) => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    
    if (route === '/logout') {
      logout();
      navigate('/login');
    } else if (route === '/menu' || route === 'menu') {
      setDrawerOpen(true);
    } else {
      navigate(route);
      setDrawerOpen(false);
    }
  };

  if (!navConfig) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ─── Render sidebar items (shared between permanent sidebar and drawer) ───
  const renderNavItems = () => (
    <List className="flex-grow">
      {navConfig.drawer.map((item: any, idx: number) => (
        <React.Fragment key={idx}>
          {item.children ? (
            <>
              <ListItemButton onClick={() => handleToggleCollapse(item.label)}>
                <ListItemText primary={<span className="font-bold text-slate-700">{item.label}</span>} />
                {openCollapse[item.label] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openCollapse[item.label]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((child: any, cIdx: number) => (
                    <ListItemButton 
                      key={cIdx} 
                      sx={{ pl: 4 }}
                      selected={location.pathname === child.route}
                      onClick={() => handleNavClick(child.route)}
                    >
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <Circle sx={{ fontSize: 8 }} className={location.pathname === child.route ? 'text-indigo-500' : 'text-slate-300'} />
                      </ListItemIcon>
                      <ListItemText primary={<span className={`font-semibold text-sm ${location.pathname === child.route ? 'text-indigo-600' : 'text-slate-600'}`}>{child.label}</span>} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </>
          ) : (
            <ListItem disablePadding>
              <ListItemButton 
                selected={location.pathname === item.route}
                onClick={() => handleNavClick(item.route)}
              >
                <ListItemText primary={<span className={`font-bold ${location.pathname === item.route ? 'text-indigo-600' : 'text-slate-700'}`}>{item.label}</span>} />
              </ListItemButton>
            </ListItem>
          )}
        </React.Fragment>
      ))}
    </List>
  );

  // ─── Persistent Sidebar Styles ───
  const sidebarWidth = sidebarCollapsed ? 0 : 280;

  return (
    <div className="min-h-screen text-slate-800 flex">
      {/* ════════════ DESKTOP: Persistent Sidebar ════════════ */}
      {isDesktop && (
        <aside 
          className="fixed top-0 left-0 h-full z-50 transition-all duration-300 flex flex-col"
          style={{ 
            width: sidebarWidth,
            background: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.6)',
            boxShadow: '4px 0 20px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden'}}
        >
          {/* Sidebar Header */}
          <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-slate-100/50">
            <h2 className="text-2xl font-black gradient-text tracking-tight uppercase">SMS</h2>
            <IconButton size="small" onClick={() => setSidebarCollapsed(true)} className="text-slate-400 hover:text-indigo-600">
              <ChevronLeft fontSize="small" />
            </IconButton>
          </div>

          {/* Sidebar Role Badge */}
          <div className="px-6 py-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              {role}
            </span>
          </div>

          {/* Sidebar Nav */}
          <div className="flex-1 overflow-y-auto">
            {renderNavItems()}
          </div>
        </aside>
      )}

      {/* ════════════ MOBILE/TABLET: Drawer (Overlay) ════════════ */}
      {!isDesktop && (
        <Drawer 
          anchor="left" 
          open={drawerOpen} 
          onClose={toggleDrawer(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: 300, 
              pt: 2, 
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderRight: '1px solid rgba(255, 255, 255, 0.6)',
              boxShadow: '10px 0 30px rgba(0, 0, 0, 0.05)'
            }
          }}
        >
          <div role="presentation" className="h-full flex flex-col">
            <h2 className="text-3xl font-black px-6 pb-4 gradient-text tracking-tight uppercase">
              Menu
            </h2>
            <div className="px-6 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                {role}
              </span>
            </div>
            {renderNavItems()}
          </div>
        </Drawer>
      )}

      {/* ════════════ Main Content Area ════════════ */}
      <div 
        className="flex-1 flex flex-col min-h-screen transition-all duration-300"
        style={{ marginLeft: isDesktop ? sidebarWidth : 0 }}
      >
        {/* ─── Top App Bar ─── */}
        <header className="sticky top-0 z-40 glass-panel px-4 h-16 flex items-center justify-between border-b-0 shadow-sm transition-all duration-300">
          <div className="flex items-center gap-2">
            {/* Hamburger for mobile OR sidebar re-open for desktop */}
            {isDesktop ? (
              sidebarCollapsed && (
                <IconButton edge="start" onClick={() => setSidebarCollapsed(false)} className="text-slate-700 hover:text-indigo-600 transition-colors">
                  <MenuIcon />
                </IconButton>
              )
            ) : (
              <IconButton edge="start" onClick={toggleDrawer(true)} className="text-slate-700 hover:text-indigo-600 transition-colors">
                <MenuIcon />
              </IconButton>
            )}
            <h1 className="text-xl font-black gradient-text tracking-tight uppercase">
              {formatTitle(location.pathname)}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {/* Parent Child Selector */}
            {role === 'Parent' && (
              <div className="mr-2 hidden sm:block">
                <ChildSelector />
              </div>
            )}
            
            {/* Offline indicator */}
            {!isOnline && (
              <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-xs font-bold border border-amber-100 mr-2">
                <WifiOff fontSize="small" /> Offline
              </div>
            )}
            <IconButton className="text-slate-500 hover:text-indigo-600 bg-white/50 backdrop-blur-md shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5" size="small"><SearchOutlined fontSize="small" /></IconButton>
            <IconButton className="text-slate-500 hover:text-indigo-600 bg-white/50 backdrop-blur-md shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5" size="small"><NotificationsNoneOutlined fontSize="small" /></IconButton>
            <IconButton className="text-slate-500 hover:text-indigo-600 bg-white/50 backdrop-blur-md shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5" size="small" onClick={() => navigate('/profile')}><AccountCircleOutlined fontSize="small" /></IconButton>
          </div>
        </header>

        {/* ─── Page Content ─── */}
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`flex-1 p-4 ${isDesktop ? 'p-8' : 'p-4'} ${!isDesktop ? 'pb-24' : 'pb-8'}`}
        >
          {role === 'Parent' && !activeChild ? (
            <div className="flex flex-col items-center justify-center h-full pt-20">
              <div className="glass-card p-10 max-w-md w-full text-center">
                <School className="text-indigo-500 mb-4" sx={{ fontSize: 64 }} />
                <h2 className="text-2xl font-black text-slate-800 mb-2">Select Your Child</h2>
                <p className="text-slate-500 font-bold mb-6">Please select a child to view their academic progress, attendance, and details.</p>
                <div className="flex justify-center">
                  <ChildSelector />
                </div>
              </div>
            </div>
          ) : (
            children
          )}
        </motion.main>

        {/* ════════════ MOBILE/TABLET: Bottom Navigation ════════════ */}
        {!isDesktop && (
          <div className="fixed bottom-0 left-0 right-0 z-50 px-2 md:px-6 pb-4">
            <BottomNavigation
              showLabels
              value={location.pathname}
              onChange={(_event, newValue) => {
                handleNavClick(newValue);
              }}
              className="glass-panel mx-auto max-w-lg rounded-2xl shadow-glass overflow-hidden h-16 border-t-0"
            >
              {navConfig.bottom.map((item: any, idx: number) => (
                <BottomNavigationAction 
                  key={idx} 
                  label={<span className="font-bold text-[10px] uppercase tracking-wider mt-1">{item.label}</span>}
                  value={item.route} 
                  icon={getIcon(item.icon)} 
                  sx={{ 
                    color: '#64748b',
                    transition: 'all 0.3s ease',
                    '&.Mui-selected': { 
                      color: '#6366f1',
                      transform: 'translateY(-2px)'
                    } 
                  }}
                />
              ))}
            </BottomNavigation>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
