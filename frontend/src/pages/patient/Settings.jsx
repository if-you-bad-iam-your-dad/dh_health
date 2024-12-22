import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Divider,
  Avatar,
  Button,
  styled,
  IconButton,
} from '@mui/material';
import {
  Bell,
  Moon,
  Smartphone,
  Lock,
  Shield,
  HelpCircle,
  ChevronRight,
  Camera,
  Globe,
} from 'lucide-react';
import PatientSidebar from '../../components/patient/PatientSidebar';
import PatientTopbar from '../../components/patient/PatientTopbar';

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: "24px",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: "240px",
    marginTop: "64px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "16px",
    marginTop: "56px",
  },
}));

const ProfileSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: "12px",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const SettingsSection = styled(Paper)(({ theme }) => ({
  borderRadius: "12px",
  overflow: "hidden",
  ".section-title": {
    padding: theme.spacing(2),
    backgroundColor: "#f8fafc",
    fontWeight: 600,
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1.5, 2),
    },
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2),
  "&:hover": {
    backgroundColor: "#f8fafc",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5, 2),
  },
}));

const AvatarInput = styled("input")({
  display: "none",
});

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    mobileNotifications: true,
    language: "English",
  });

  const handleSettingChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle avatar upload
      console.log("Avatar file:", file);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <PatientTopbar />
      <PatientSidebar />
      <MainContent>
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontSize: { xs: "1.5rem", sm: "2rem" },
            fontWeight: 600,
          }}
        >
          Settings
        </Typography>

        <ProfileSection elevation={0}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Box sx={{ position: "relative" }}>
              <Avatar
                sx={{
                  width: { xs: 80, sm: 100 },
                  height: { xs: 80, sm: 100 },
                  bgcolor: "#e2e8f0",
                }}
              />
              <label htmlFor="avatar-input">
                <AvatarInput
                  accept="image/*"
                  id="avatar-input"
                  type="file"
                  onChange={handleAvatarChange}
                />
                <IconButton
                  component="span"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    backgroundColor: "#ffffff",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    "&:hover": { backgroundColor: "#f8fafc" },
                  }}
                >
                  <Camera size={16} />
                </IconButton>
              </label>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ mb: 0.5 }}>John Doe</Typography>
              <Typography color="text.secondary" variant="body2">
                john.doe@example.com
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            size="small"
            sx={{
              textTransform: "none",
              borderRadius: "8px",
            }}
          >
            Edit Profile
          </Button>
        </ProfileSection>

        <SettingsSection elevation={0}>
          <Typography className="section-title">Preferences</Typography>
          <List disablePadding>
            <StyledListItem>
              <ListItemIcon>
                <Bell size={20} />
              </ListItemIcon>
              <ListItemText primary="Notifications" />
              <Switch
                checked={settings.notifications}
                onChange={() => handleSettingChange("notifications")}
              />
            </StyledListItem>
            <Divider />
            <StyledListItem>
              <ListItemIcon>
                <Moon size={20} />
              </ListItemIcon>
              <ListItemText primary="Dark Mode" />
              <Switch
                checked={settings.darkMode}
                onChange={() => handleSettingChange("darkMode")}
              />
            </StyledListItem>
            <Divider />
            <StyledListItem>
              <ListItemIcon>
                <Globe size={20} />
              </ListItemIcon>
              <ListItemText 
                primary="Language" 
                secondary={settings.language}
              />
              <ChevronRight size={20} color="#64748b" />
            </StyledListItem>
          </List>
        </SettingsSection>

        <SettingsSection elevation={0} sx={{ mt: 3 }}>
          <Typography className="section-title">Privacy & Security</Typography>
          <List disablePadding>
            <StyledListItem button>
              <ListItemIcon>
                <Lock size={20} />
              </ListItemIcon>
              <ListItemText 
                primary="Password & Security" 
                secondary="Manage your password and 2FA"
              />
              <ChevronRight size={20} color="#64748b" />
            </StyledListItem>
            <Divider />
            <StyledListItem button>
              <ListItemIcon>
                <Shield size={20} />
              </ListItemIcon>
              <ListItemText 
                primary="Privacy Settings" 
                secondary="Control your privacy preferences"
              />
              <ChevronRight size={20} color="#64748b" />
            </StyledListItem>
          </List>
        </SettingsSection>

        <SettingsSection elevation={0} sx={{ mt: 3 }}>
          <Typography className="section-title">Help & Support</Typography>
          <List disablePadding>
            <StyledListItem button>
              <ListItemIcon>
                <HelpCircle size={20} />
              </ListItemIcon>
              <ListItemText 
                primary="Help Center" 
                secondary="Get help and find answers"
              />
              <ChevronRight size={20} color="#64748b" />
            </StyledListItem>
          </List>
        </SettingsSection>
      </MainContent>
    </Box>
  );
};

export default Settings;
