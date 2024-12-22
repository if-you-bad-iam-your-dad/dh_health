import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Chip,
  styled,
  Tab,
  Tabs,
  List,
  ListItem,
  Avatar,
  IconButton,
  Paper,
  Tooltip,
  Badge,
} from "@mui/material";
import {
  Calendar,
  Clock,
  Check,
  X,
  Video,
  User,
  CalendarClock,
} from "lucide-react";
import Sidebar from "../../components/doctor/Sidebar";
import Topbar from "../../components/doctor/Topbar";
import axios from "axios";

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: "24px",
  marginLeft: "240px",
  marginTop: "64px",
  width: "100%",
  maxWidth: "1440px",
  margin: "64px auto 0",
  display: "flex",
  flexDirection: "column",
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

const AppointmentCard = styled(ListItem)(({ theme, status }) => ({
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  marginBottom: "12px",
  padding: "16px",
  transition: "all 0.2s ease-in-out",
  border: "1px solid #f1f5f9",
  "&:hover": {
    backgroundColor: "#f8fafc",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "12px",
    padding: "12px",
  },
}));

const TimeChip = styled(Chip)(({ theme }) => ({
  backgroundColor: "#e0f2fe",
  color: "#0284c7",
  fontWeight: 600,
  ".MuiChip-icon": {
    color: "#0284c7",
  },
}));

const AppointmentInfo = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginTop: "8px",
  color: "#64748b",
  fontSize: "0.875rem",
});

const StatusBadge = styled(Badge)(({ status }) => ({
  "& .MuiBadge-dot": {
    backgroundColor:
      status === "upcoming"
        ? "#22c55e"
        : status === "completed"
        ? "#64748b"
        : "#ef4444",
    transform: "scale(1.2)",
  },
}));

const StyledList = styled(List)({
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
});

const StyledTabs = styled(Tabs)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    "& .MuiTabs-flexContainer": {
      gap: "8px",
      padding: "8px",
    },
    "& .MuiTab-root": {
      backgroundColor: "#f8fafc",
      borderRadius: "8px",
      minHeight: "40px",
      fontSize: "0.875rem",
      textTransform: "none",
      flexGrow: 1,
      "&.Mui-selected": {
        backgroundColor: "#eff6ff",
        color: "#2563eb",
      },
    },
  },
}));

const TabLabel = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "2px",
    "& .MuiBadge-root": {
      "& .MuiBadge-badge": {
        position: "static",
        transform: "none",
        marginLeft: "4px",
      },
    },
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

const MobileActions = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    borderTop: "1px solid #f1f5f9",
    paddingTop: "12px",
    marginTop: "8px",
  },
}));

const StatusChip = styled(Chip)(({ status }) => ({
  backgroundColor: 
    status === 'upcoming' ? '#eff6ff' :
    status === 'completed' ? '#dcfce7' : 
    '#fee2e2',
  color: 
    status === 'upcoming' ? '#2563eb' :
    status === 'completed' ? '#16a34a' : 
    '#dc2626',
  fontWeight: 500,
  '& .MuiChip-label': {
    fontSize: '0.75rem',
  }
}));

const Appointments = () => {
  const [tabValue, setTabValue] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        // TODO: Uncomment for API integration
        // const response = await axios.get(`/api/doctor/appointments`, {
        //   params: {
        //     status: tabValue === 0 ? "upcoming" : tabValue === 1 ? "completed" : "cancelled",
        //   },
        // });
        // setAppointments(response.data);

        // Mock data for development
        setAppointments([
          {
            id: 1,
            patientName: "John Doe",
            patientAge: 45,
            time: "09:00 AM",
            date: "2024-01-25",
            type: "Check-up",
            status: "upcoming",
            isOnline: true,
            duration: "30 min",
            reason: "Regular check-up for blood pressure",
          },
          {
            id: 2,
            patientName: "Jane Smith",
            patientAge: 32,
            time: "10:30 AM",
            date: "2024-01-25",
            type: "Follow-up",
            status: "upcoming",
            isOnline: false,
            duration: "45 min",
            reason: "Post-surgery follow-up",
          },
        ]);
        
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [tabValue]);

  const handleAppointmentAction = async (appointmentId, action) => {
    try {
      // TODO: Uncomment for API integration
      // await axios.post(`/api/doctor/appointments/${appointmentId}/${action}`);
      // const response = await axios.get("/api/doctor/appointments");
      // setAppointments(response.data);
      
      console.log(`${action} appointment: ${appointmentId}`);
    } catch (err) {
      console.error(`Error ${action} appointment:`, err);
    }
  };

  // Update the appointment card actions
  const renderAppointmentActions = (appointment) => (
    <Grid
      item
      xs={12}
      sm="auto"
      sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}
    >
      <Tooltip title="Accept">
        <IconButton
          color="success"
          size="small"
          onClick={() => handleAppointmentAction(appointment.id, "accept")}
        >
          <Check size={18} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Cancel">
        <IconButton
          color="error"
          size="small"
          onClick={() => handleAppointmentAction(appointment.id, "cancel")}
        >
          <X size={18} />
        </IconButton>
      </Tooltip>
    </Grid>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Topbar />
      <Sidebar />
      <MainContent>
        <ContentWrapper>
          <HeaderBox>
            <Typography variant="h4">Appointments</Typography>
            <TimeChip
              icon={<CalendarClock size={16} />}
              label="Today's Schedule"
            />
          </HeaderBox>

          <Paper sx={{ mb: 3, width: "100%" }}>
            <StyledTabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
              variant="fullWidth"
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tab
                label={
                  <TabLabel>
                    Upcoming
                    <Badge
                      badgeContent={4}
                      color="primary"
                      sx={{
                        "& .MuiBadge-badge": {
                          fontSize: "0.75rem",
                          height: "16px",
                          minWidth: "16px",
                        },
                      }}
                    />
                  </TabLabel>
                }
              />
              <Tab label={<TabLabel>Completed</TabLabel>} />
              <Tab label={<TabLabel>Cancelled</TabLabel>} />
            </StyledTabs>
          </Paper>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
              Loading appointments...
            </Box>
          ) : error ? (
            <Box sx={{ color: "error.main", p: 3 }}>{error}</Box>
          ) : (
            <StyledList sx={{ py: 0, width: "100%" }}>
              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  status={appointment.status}
                >
                  <Grid container spacing={2}>
                    {/* Patient Info Section */}
                    <Grid item xs={12} sm={8}>
                      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                        <StatusBadge status={appointment.status} variant="dot">
                          <Avatar
                            sx={{ bgcolor: "#e2e8f0", width: { xs: 40, sm: 48 }, height: { xs: 40, sm: 48 } }}
                          >
                            <User size={20} />
                          </Avatar>
                        </StatusBadge>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {appointment.patientName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Age: {appointment.patientAge} • {appointment.reason}
                          </Typography>
                          <AppointmentInfo>
                            <Clock size={16} />
                            {appointment.time} ({appointment.duration})
                            <Calendar size={16} />
                            {appointment.date}
                          </AppointmentInfo>
                        </Box>
                      </Box>
                    </Grid>

                    {/* Desktop Actions */}
                    <Grid item xs={12} sm={4} sx={{ display: { xs: "none", sm: "block" } }}>
                      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, alignItems: "center" }}>
                        {appointment.isOnline ? (
                          <Tooltip title="Online Consultation">
                            <IconButton size="small" sx={{ color: "#2563eb" }}>
                              <Video size={18} />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip title="In-person Visit">
                            <IconButton size="small" sx={{ color: "#64748b" }}>
                              <User size={18} />
                            </IconButton>
                          </Tooltip>
                        )}
                        {renderAppointmentActions(appointment)}
                      </Box>
                    </Grid>

                    {/* Mobile Actions */}
                    <MobileActions>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <StatusChip
                          label={appointment.status}
                          status={appointment.status}
                          size="small"
                        />
                        {appointment.isOnline && (
                          <Chip
                            icon={<Video size={14} />}
                            label="Online"
                            size="small"
                            sx={{ backgroundColor: "#eff6ff", color: "#2563eb" }}
                          />
                        )}
                      </Box>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        {renderAppointmentActions(appointment)}
                      </Box>
                    </MobileActions>
                  </Grid>
                </AppointmentCard>
              ))}
            </StyledList>
          )}
        </ContentWrapper>
      </MainContent>
    </Box>
  );
};

export default Appointments;
