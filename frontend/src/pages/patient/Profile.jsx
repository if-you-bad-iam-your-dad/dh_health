import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  Grid,
  TextField,
  IconButton,
  Divider,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Edit2,
  Camera,
  Heart,
  Activity,
  AlertCircle,
  Clock,
  Pill, // Changed from Pills to Pill
} from "lucide-react";
import PatientSidebar from "../../components/patient/PatientSidebar";
import PatientTopbar from "../../components/patient/PatientTopbar";
import { useTheme } from "@mui/material/styles";

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

const ProfileCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "12px",
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  "& .icon": {
    color: theme.palette.primary.main,
  },
}));

const MedicalCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: "12px",
  marginBottom: theme.spacing(2),
  backgroundColor: "#f8fafc",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5),
  },
}));

const BottomActions = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(2),
  backgroundColor: "white",
  borderTop: "1px solid",
  borderColor: theme.palette.divider,
  zIndex: 1000,
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    left: "240px",
  },
}));

const ProfilePage = () => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    dob: "1990-01-01",
    address: "123 Main St, City, Country",
    bloodGroup: "A+",
    weight: "70 kg",
    height: "175 cm",
    allergies: ["Penicillin", "Peanuts"],
    conditions: ["Hypertension", "Diabetes"],
    medications: [
      { name: "Lisinopril", dosage: "10mg", frequency: "Daily" },
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
    ],
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <PatientTopbar />
      <PatientSidebar />
      <MainContent>
        <Box sx={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Profile Header */}
          <ProfileCard elevation={0}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 3,
                alignItems: "center",
              }}
            >
              <Box sx={{ position: "relative" }}>
                <Avatar
                  src="/path-to-profile-image.jpg"
                  sx={{
                    width: { xs: 100, sm: 120 },
                    height: { xs: 100, sm: 120 },
                    bgcolor: "#e2e8f0",
                  }}
                >
                  <User size={40} />
                </Avatar>
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    bgcolor: "white",
                    boxShadow: 1,
                    "&:hover": { bgcolor: "#f8fafc" },
                  }}
                >
                  <Camera size={16} />
                </IconButton>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}
                >
                  <Typography variant="h5" fontWeight={600}>
                    {profileData.name}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={handleEditToggle}
                    sx={{ bgcolor: "#eff6ff", color: "#2563eb" }}
                  >
                    <Edit2 size={16} />
                  </IconButton>
                </Box>
                <Typography color="text.secondary" variant="body2">
                  Patient ID: #123456
                </Typography>
              </Box>
            </Box>
          </ProfileCard>

          {/* Tabs Navigation */}
          <Paper sx={{ mb: 3 }} elevation={0}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                "& .MuiTab-root": {
                  textTransform: "none",
                  minWidth: "auto",
                  px: { xs: 2, sm: 3 },
                },
              }}
            >
              <Tab label="Personal Info" />
              <Tab label="Medical History" />
              <Tab label="Medications" />
            </Tabs>
          </Paper>

          {/* Tab Panels */}
          {activeTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <ProfileCard elevation={0}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Personal Information
                  </Typography>
                  <Box component="form">
                    {[
                      {
                        icon: <Mail size={20} />,
                        label: "Email",
                        value: profileData.email,
                      },
                      {
                        icon: <Phone size={20} />,
                        label: "Phone",
                        value: profileData.phone,
                      },
                      {
                        icon: <Calendar size={20} />,
                        label: "Date of Birth",
                        value: profileData.dob,
                      },
                      {
                        icon: <MapPin size={20} />,
                        label: "Address",
                        value: profileData.address,
                      },
                    ].map((item, index) => (
                      <InfoItem key={index}>
                        <Box className="icon">{item.icon}</Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            {item.label}
                          </Typography>
                          {isEditing ? (
                            <TextField
                              fullWidth
                              size="small"
                              defaultValue={item.value}
                              variant="outlined"
                              sx={{ mt: 0.5 }}
                            />
                          ) : (
                            <Typography variant="body2">
                              {item.value}
                            </Typography>
                          )}
                        </Box>
                      </InfoItem>
                    ))}
                  </Box>
                </ProfileCard>
              </Grid>

              <Grid item xs={12} md={6}>
                <ProfileCard elevation={0}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Health Information
                  </Typography>
                  <Grid container spacing={2}>
                    {[
                      {
                        icon: <Heart size={20} />,
                        label: "Blood Group",
                        value: profileData.bloodGroup,
                      },
                      {
                        icon: <Activity size={20} />,
                        label: "Weight",
                        value: profileData.weight,
                      },
                      {
                        icon: <Activity size={20} />,
                        label: "Height",
                        value: profileData.height,
                      },
                    ].map((item, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <MedicalCard>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            {item.icon}
                            <Box>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {item.label}
                              </Typography>
                              <Typography variant="body1" fontWeight={500}>
                                {item.value}
                              </Typography>
                            </Box>
                          </Box>
                        </MedicalCard>
                      </Grid>
                    ))}
                  </Grid>
                </ProfileCard>
              </Grid>
            </Grid>
          )}

          {activeTab === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <ProfileCard elevation={0}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <AlertCircle size={20} color="#2563eb" />
                    <Typography variant="h6">Allergies</Typography>
                  </Box>
                  <List>
                    {profileData.allergies.map((allergy, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              bgcolor: "error.main",
                              borderRadius: "50%",
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText primary={allergy} />
                      </ListItem>
                    ))}
                  </List>
                </ProfileCard>
              </Grid>

              <Grid item xs={12} md={6}>
                <ProfileCard elevation={0}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <Activity size={20} color="#2563eb" />
                    <Typography variant="h6">Medical Conditions</Typography>
                  </Box>
                  <List>
                    {profileData.conditions.map((condition, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              bgcolor: "warning.main",
                              borderRadius: "50%",
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText primary={condition} />
                      </ListItem>
                    ))}
                  </List>
                </ProfileCard>
              </Grid>
            </Grid>
          )}

          {activeTab === 2 && (
            <ProfileCard elevation={0}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
              >
                <Pill size={20} color="#2563eb" />
                <Typography variant="h6">Current Medications</Typography>
              </Box>
              <Grid container spacing={2}>
                {profileData.medications.map((med, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <MedicalCard>
                      <Typography variant="subtitle1" fontWeight={500}>
                        {med.name}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mt: 1,
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Pill size={16} />
                          <Typography variant="body2" color="text.secondary">
                            {med.dosage}
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Clock size={16} />
                          <Typography variant="body2" color="text.secondary">
                            {med.frequency}
                          </Typography>
                        </Box>
                      </Box>
                    </MedicalCard>
                  </Grid>
                ))}
              </Grid>
            </ProfileCard>
          )}

          {isEditing && (
            <BottomActions>
              <Button variant="outlined" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSave}>
                Save Changes
              </Button>
            </BottomActions>
          )}
        </Box>
      </MainContent>
    </Box>
  );
};

export default ProfilePage;
