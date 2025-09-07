import React, { useState } from "react";
import { NavLink, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  Avatar,
  Divider,
  Paper
} from '@mui/material';
import {
  Menu as MenuIcon,
  Category as CategoryIcon,
  Image as ImageIcon,
  YouTube as YouTubeIcon,
  Article as BlogIcon,
  Close as CloseIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import Categories from '../pages/admin/Categories.jsx';
import Images from '../pages/admin/Images.jsx';
import BlogList from '../pages/admin/BlogList.jsx';
import YouTube from '../pages/admin/YouTube.jsx';
import ContactMessage from '../pages/admin/ContactMessage.jsx';

const drawerWidth = 280;

const navigationItems = [
  { text: 'Categories', icon: <CategoryIcon />, path: '/admin/categories' },
  { text: 'Images', icon: <ImageIcon />, path: '/admin/images' },
  { text: 'Blog List', icon: <BlogIcon />, path: '/admin/blog-list' },
  { text: 'YouTube Videos', icon: <YouTubeIcon />, path: '/admin/youtube' },
  { text: 'Contact Messages', icon: <EmailIcon />, path: '/admin/contact-messages' },
];

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();

  // Mock user data - replace with your actual user data
  const userName = "Balvinder Kumar";
  const userDesignation = "Administrator";

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleItemClick = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleLogout = async () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Navigate to /admin on success
    navigate('/admin');
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* User Profile Section */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          textAlign: 'center',
          borderRadius: 0
        }}
      >
        {isMobile && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        <Avatar
          sx={{
            width: 64,
            height: 64,
            mx: 'auto',
            mb: 2,
            bgcolor: 'primary.light'
          }}
        >
          {userName.charAt(0)}
        </Avatar>
        <Typography variant="h6" component="div" sx={{ fontWeight: 500 }}>
          {userName}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          {userDesignation}
        </Typography>
      </Paper>

      {/* Menu Title */}
      <Box sx={{ px: 2, py: 1 }}>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontWeight: 600,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
        >
          Menu
        </Typography>
      </Box>

      {/* Navigation Items */}
      <List sx={{ flexGrow: 1, px: 1 }}>
        {navigationItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={NavLink}
              to={item.path}
              onClick={handleItemClick}
              sx={{
                borderRadius: 2,
                minHeight: 48,
                mx: 1,
                backgroundColor: location.pathname === item.path ? 'primary.main' : 'transparent',
                color: location.pathname === item.path ? 'primary.contrastText' : 'text.primary',
                '&:hover': {
                  backgroundColor: location.pathname === item.path ? 'primary.dark' : 'action.hover',
                  transform: 'translateX(8px)',
                  transition: 'all 0.3s ease-in-out',
                  '& .MuiListItemIcon-root': {
                    color: location.pathname === item.path ? 'primary.contrastText' : 'primary.main',
                  }
                },
                '&.active': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  }
                },
                transition: 'all 0.3s ease-in-out'
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: location.pathname === item.path ? 'inherit' : 'text.secondary',
                  transition: 'color 0.3s ease-in-out'
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    fontSize: '0.875rem'
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        {/* Logout Button */}
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              minHeight: 48,
              mx: 1,
              color: 'error.main',
              '&:hover': {
                backgroundColor: 'error.light',
                color: 'error.contrastText',
                transform: 'translateX(8px)',
                transition: 'all 0.3s ease-in-out',
              },
              transition: 'all 0.3s ease-in-out'
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'error.main' }}>
              <CloseIcon />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              sx={{
                '& .MuiListItemText-primary': {
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>

      {/* Footer */}
      <Divider />
      <Box
        sx={{
          p: 2,
          textAlign: 'center',
          backgroundColor: 'grey.50'
        }}
      >
        <Typography variant="caption" color="text.secondary">
          © 2025 Balvinder Kumar
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Mobile App Bar */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            width: '100%',
            zIndex: theme.zIndex.drawer + 1,
            display: { md: 'none' }
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Desktop Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'background.paper',
            borderRight: '1px solid',
            borderColor: 'divider',
            boxShadow: '2px 0 8px rgba(0,0,0,0.1)'
          }
        }}
        open
      >
        {drawer}
      </Drawer>

      {/* Mobile Sidebar */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
      >
        {drawer}
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 8, md: 0 },
          backgroundColor: 'grey.50',
          minHeight: '100vh'
        }}
      >
        <Routes>
          <Route path="/categories" element={<Categories />} />
          <Route path="/images" element={<Images />} />
          <Route path="/blog-list" element={<BlogList />} />
          <Route path="/youtube" element={<YouTube />} />
          <Route path="/contact-messages" element={<ContactMessage />} />
          <Route path="/" element={
            <Paper
              elevation={1}
              sx={{
                p: 3,
                borderRadius: 2
              }}
            >
              <Typography variant="h4" gutterBottom color="primary">
                Welcome to Admin Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Select an option from the sidebar to manage your content.
              </Typography>
            </Paper>
          } />
        </Routes>
      </Box>
    </Box>
  );
};

export default Sidebar;