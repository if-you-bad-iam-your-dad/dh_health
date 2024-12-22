import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  styled,
  Avatar,
  IconButton,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Badge,
  Divider,
} from "@mui/material";
import { Hospital, Bell, LogOut } from "lucide-react";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: 1200,
  backgroundColor: "#ffffff",
  color: "#1e293b",
  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
  [theme.breakpoints.down("sm")]: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
  },
}));

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const PatientTopbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <StyledAppBar position="fixed" elevation={0}>
      <Toolbar sx={{ minHeight: { xs: '56px', sm: '64px' } }}>
        <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
          <Hospital size={24} color="#2563eb" />
          <Typography 
            variant="h6" 
            sx={{ 
              ml: 2, 
              fontWeight: 600,
              fontSize: { xs: '1rem', sm: '1.25rem' } 
            }}
          >
            HMS Patient
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton size="small">
            <Badge badgeContent={3} color="error">
              <Bell size={20} />
            </Badge>
          </IconButton>
          <Avatar
            onClick={handleClick}
            sx={{ 
              width: { xs: 28, sm: 32 }, 
              height: { xs: 28, sm: 32 }, 
              cursor: "pointer" 
            }}
          />
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              mt: 1.5,
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogOut size={18} />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default PatientTopbar;
