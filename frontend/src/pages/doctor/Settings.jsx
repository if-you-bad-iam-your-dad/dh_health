import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  styled,
  Select,
  MenuItem,
  Paper,
  IconButton,
  Divider,
} from "@mui/material";
import { 
  Save,
  User,
  Mail,
  Bell,
  Globe,
  Stethoscope 
} from "lucide-react";
import Sidebar from "../../components/doctor/Sidebar";
import Topbar from "../../components/doctor/Topbar";
import { useLanguage } from "../../contexts/LanguageContext";

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: "24px",
  marginLeft: "240px",
  marginTop: "64px",
  backgroundColor: "#f5f5f5",
  minHeight: "calc(100vh - 64px)",
  width: "100%",
  maxWidth: "1440px",
  margin: "64px auto 0",
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
    marginTop: "72px",
    padding: "16px",
    width: "100%",
    overflowX: "hidden",
  },
}));

const ContentWrapper = styled(Box)({
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
});

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  border: "1px solid #f1f5f9",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "16px",
  },
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(4),
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px",
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
  "& svg": {
    marginRight: theme.spacing(1),
  },
}));

const Settings = () => {
  const { currentLanguage, setCurrentLanguage, languages, translate } = useLanguage();
  const [profileData, setProfileData] = useState({
    fullName: "Dr. Smith",
    email: "dr.smith@hospital.com",
    specialization: "Cardiology",
  });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
  });

  const handleProfileUpdate = (event) => {
    event.preventDefault();
    // Handle profile update logic here
    console.log("Profile updated:", profileData);
  };

  const handleLanguageChange = (event) => {
    setCurrentLanguage(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Topbar />
      <Sidebar />
      <MainContent>
        <ContentWrapper>
          <HeaderBox>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                backgroundColor: "transparent",
                width: "100%",
              }}
            >
              <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold" }}>
                {translate('settings')}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {translate('manage')}
              </Typography>
            </Paper>
          </HeaderBox>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <StyledCard>
                <CardContent>
                  <IconWrapper>
                    <User />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {translate('profileSettings')}
                    </Typography>
                  </IconWrapper>
                  <Divider sx={{ mb: 3 }} />
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label={translate('fullName')}
                        value={profileData.fullName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            fullName: e.target.value,
                          })
                        }
                        InputProps={{
                          startAdornment: (
                            <User size={20} style={{ marginRight: 8, color: '#666' }} />
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label={translate('email')}
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
                          })
                        }
                        InputProps={{
                          startAdornment: (
                            <Mail size={20} style={{ marginRight: 8, color: '#666' }} />
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label={translate('specialization')}
                        value={profileData.specialization}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            specialization: e.target.value,
                          })
                        }
                        InputProps={{
                          startAdornment: (
                            <Stethoscope size={20} style={{ marginRight: 8, color: '#666' }} />
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Select
                        fullWidth
                        value={currentLanguage}
                        onChange={handleLanguageChange}
                        label={translate('language')}
                        startAdornment={
                          <Globe size={20} style={{ marginRight: 8, color: '#666' }} />
                        }
                      >
                        {Object.entries(languages).map(([code, name]) => (
                          <MenuItem key={code} value={code}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                </CardContent>
              </StyledCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledCard>
                <CardContent>
                  <IconWrapper>
                    <Bell />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {translate('notifications')}
                    </Typography>
                  </IconWrapper>
                  <Divider sx={{ mb: 3 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications.email}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              email: e.target.checked,
                            })
                          }
                          color="primary"
                        />
                      }
                      label={translate('emailNotifications')}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications.sms}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              sms: e.target.checked,
                            })
                          }
                          color="primary"
                        />
                      }
                      label={translate('smsNotifications')}
                    />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                startIcon={<Save size={20} />}
                sx={{
                  mt: 2,
                  py: 1.5,
                  px: 4,
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#2563eb",
                  '&:hover': {
                    backgroundColor: "#1d4ed8",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                  },
                }}
                onClick={handleProfileUpdate}
              >
                {translate('save')}
              </Button>
            </Grid>
          </Grid>
        </ContentWrapper>
      </MainContent>
    </Box>
  );
};

export default Settings;
