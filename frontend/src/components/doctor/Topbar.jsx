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
  Divider,
} from "@mui/material";
import { Hospital, Bell, Settings, LogOut } from "lucide-react";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: 1400,
  width: "100%",
  backgroundColor: "#ffffff",
  color: "#1e293b",
  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const IconWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  color: "#2563eb",
});

const ActionIcons = styled(Box)({
  marginLeft: "auto",
  display: "flex",
  gap: "8px",
  alignItems: "center",
});

const StyledIconButton = styled(IconButton)({
  color: "#64748b",
  "&:hover": {
    backgroundColor: "#f8fafc",
  },
});

const Topbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Clear stored authentication tokens or user data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login page
    window.location.href = "/login";

    handleClose();
  };

  const handleSetting = () => {
    // Redirect to settings page
    window.location.href = "/doctor/settings";

    handleClose();
  };

  return (
    <StyledAppBar position="fixed" elevation={0}>
      <Toolbar>
        {/* Logo Section */}
        <IconWrapper>
          <Hospital size={24} />
        </IconWrapper>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            ml: 2,
            fontWeight: 600,
            fontSize: "1.125rem",
          }}
        >
          Hospital Management System
        </Typography>

        {/* Action Icons */}
        <ActionIcons>
          {/* Notification Bell */}
          <StyledIconButton>
            <Bell size={20} />
          </StyledIconButton>

          {/* User Avatar */}
          <Avatar
            onClick={handleClick}
            sx={{
              width: 32,
              height: 32,
              ml: 1,
              cursor: "pointer",
              backgroundColor: "#e2e8f0",
              color: "#64748b",
            }}
          />
        </ActionIcons>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
              mt: 1.5,
              width: 200,
              "& .MuiMenuItem-root": {
                px: 2,
                py: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
            <ListItemIcon>
              <LogOut size={18} color="#dc2626" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Topbar;
