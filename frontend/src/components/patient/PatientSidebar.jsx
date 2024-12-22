import React, { useState } from "react";
import { Drawer, Box, Typography, List, ListItem, styled, IconButton } from "@mui/material";
import { LayoutDashboard, Calendar, MessageCircle, User, Menu, X } from "lucide-react";
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
    backgroundColor: "#ffffff",
    borderRight: "1px solid #f0f0f0",
    [theme.breakpoints.up("sm")]: {
      marginTop: "64px",
      height: "calc(100% - 64px)",
    },
  },
}));

const MobileHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 16px",
  borderBottom: "1px solid #f0f0f0",
  backgroundColor: "#ffffff",
  position: "sticky",
  top: 0,
  zIndex: 1,
}));

const StyledListItem = styled(ListItem)(({ active }) => ({
  margin: "8px",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  backgroundColor: active ? "#eff6ff" : "transparent",
  color: active ? "#2563eb" : "#64748b",
  "&:hover": {
    backgroundColor: "#f8fafc",
  },
  "& .icon": {
    marginRight: "12px",
  },
}));

const navigation = [
  { title: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/patient/dashboard" },
  { title: "Appointments", icon: <Calendar size={20} />, path: "/patient/appointments" },
  { title: "Messages", icon: <MessageCircle size={20} />, path: "/patient/messages" },
  { title: "Profile", icon: <User size={20} />, path: "/patient/profile" },
];

const PatientSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      {isMobile && (
        <MobileHeader>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Menu
          </Typography>
          <IconButton onClick={handleDrawerToggle} edge="end">
            <X size={24} />
          </IconButton>
        </MobileHeader>
      )}
      <List>
        {navigation.map((item) => (
          <StyledListItem
            key={item.title}
            active={location.pathname === item.path ? 1 : 0}
            onClick={() => {
              navigate(item.path);
              if (isMobile) handleDrawerToggle();
            }}
          >
            <span className="icon">{item.icon}</span>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {item.title}
            </Typography>
          </StyledListItem>
        ))}
      </List>
    </>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1200,
            backgroundColor: '#2563eb',
            color: '#ffffff',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#1d4ed8',
            },
          }}
        >
          <Menu />
        </IconButton>
      )}
      <StyledDrawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </StyledDrawer>
    </>
  );
};

export default PatientSidebar;
