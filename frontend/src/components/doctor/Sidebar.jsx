import React, { useState } from "react";
import { Drawer, IconButton, Box, Avatar, Typography, Divider, styled } from "@mui/material";
import { Menu, LayoutDashboard, Users, MessageSquare, Settings, ChevronRight, Calendar } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const DrawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: DrawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: DrawerWidth,
    boxSizing: "border-box",
    zIndex: 1300,
    backgroundColor: "#ffffff",
    borderRight: "1px solid #f0f0f0",
    marginTop: "64px",
    height: 'calc(100% - 64px)',
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
      height: '100%',
      position: 'fixed',
    },
  },
}));

const SidebarSection = styled(Box)(({ theme }) => ({
  padding: "16px 0",
  "& .section-title": {
    padding: "0 16px",
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase",
    color: "#64748b",
    marginBottom: "8px",
  },
  [theme.breakpoints.down('sm')]: {
    '&:first-of-type': {
      marginTop: '56px', // Add margin to first section in mobile view
    }
  }
}));

const SidebarLink = styled(Box)(({ active }) => ({
  padding: "8px 16px",
  margin: "4px 8px",
  borderRadius: "8px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  color: active ? "#2563eb" : "#64748b",
  backgroundColor: active ? "#eff6ff" : "transparent",
  "&:hover": {
    backgroundColor: "#f8fafc",
    color: "#2563eb",
  },
  "& .link-text": {
    marginLeft: "12px",
    fontSize: "0.875rem",
    fontWeight: active ? 600 : 500,
  },
}));

const ProfileSection = styled(Box)({
  position: "absolute",
  bottom: 0,
  width: "100%",
  padding: "16px",
  borderTop: "1px solid #f0f0f0",
  backgroundColor: "#ffffff",
});

const MobileHeader = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem 1rem',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #f0f0f0',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '56px', // Adjusted height
    zIndex: 1400,
  },
}));

const MobileToggle = styled(IconButton)(({ theme }) => ({
  color: '#64748b',
  '&:hover': {
    backgroundColor: '#f8fafc',
  },
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const navigation = {
  main: [
    { title: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/doctor/dashboard" },
    { title: "Appointments", icon: <Calendar size={20} />, path: "/doctor/appointments" },
    { title: "Patients", icon: <Users size={20} />, path: "/doctor/patients" },
  ],
  management: [
    { title: "Queries", icon: <MessageSquare size={20} />, path: "/doctor/queries" },
  ],
  system: [
    { title: "Settings", icon: <Settings size={20} />, path: "/doctor/settings" },
  ],
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Change default to false for mobile
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = () => setIsOpen(!isOpen);

  const handleClose = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <MobileHeader>
        <MobileToggle onClick={toggleDrawer}>
          <Menu size={24} />
        </MobileToggle>
      </MobileHeader>

      <StyledDrawer 
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? isOpen : true}
        onClose={handleClose}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
      >
        <SidebarSection>
          <Typography className="section-title">Main</Typography>
          {navigation.main.map((item) => (
            <SidebarLink
              key={item.title}
              active={location.pathname === item.path ? 1 : 0}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span className="link-text">{item.title}</span>
            </SidebarLink>
          ))}
        </SidebarSection>

        <Divider />

        <SidebarSection>
          <Typography className="section-title">Management</Typography>
          {navigation.management.map((item) => (
            <SidebarLink
              key={item.title}
              active={location.pathname === item.path ? 1 : 0}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span className="link-text">{item.title}</span>
            </SidebarLink>
          ))}
        </SidebarSection>

        <Divider />

        <SidebarSection>
          <Typography className="section-title">System</Typography>
          {navigation.system.map((item) => (
            <SidebarLink
              key={item.title}
              active={location.pathname === item.path ? 1 : 0}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span className="link-text">{item.title}</span>
            </SidebarLink>
          ))}
        </SidebarSection>

        <ProfileSection>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                backgroundColor: '#e2e8f0',
                color: '#64748b',
              }}
            >
              D
            </Avatar>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Dr. Smith
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Cardiologist
              </Typography>
            </Box>
            <ChevronRight size={20} style={{ marginLeft: 'auto', color: '#64748b' }} />
          </Box>
        </ProfileSection>
      </StyledDrawer>
    </>
  );
};

export default Sidebar;
