import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Card,
  CardContent,
  Chip,
  Avatar,
  Badge,
  styled
} from '@mui/material';
import { Calendar, Clock, Video, User, CalendarClock } from 'lucide-react';
import PatientSidebar from '../../components/patient/PatientSidebar';
import PatientTopbar from '../../components/patient/PatientTopbar';

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: "24px",
  marginLeft: "240px",
  marginTop: "64px",
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

const AppointmentCard = styled(Card)(({ theme, status }) => ({
  marginBottom: "16px",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
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
  color: "#64748b",
  fontSize: "0.875rem",
});

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

const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: '1px solid #e2e8f0',
  '& .MuiTab-root': {
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '0.875rem',
  },
}));

const TabLabel = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const PatientAppointments = () => {
  const [tabValue, setTabValue] = useState(0);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Mock data for development
    setAppointments([
      {
        id: 1,
        doctorName: "Dr. John Smith",
        specialty: "Cardiologist",
        date: "2024-01-25",
        time: "10:00 AM",
        status: "upcoming",
        isOnline: true,
        duration: "30 min",
        notes: "Regular heart checkup"
      },
      {
        id: 2,
        doctorName: "Dr. Sarah Wilson",
        specialty: "Dermatologist",
        date: "2024-01-26",
        time: "2:30 PM",
        status: "upcoming",
        isOnline: false,
        duration: "45 min",
        notes: "Skin consultation"
      }
    ]);
  }, [tabValue]);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <PatientTopbar />
      <PatientSidebar />
      <MainContent>
        <ContentWrapper>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4">My Appointments</Typography>
            <TimeChip
              icon={<CalendarClock size={16} />}
              label="Upcoming Schedule"
            />
          </Box>

          <Paper sx={{ mb: 3 }}>
            <StyledTabs
              value={tabValue}
              onChange={(e, v) => setTabValue(v)}
              variant="fullWidth"
            >
              <Tab label={
                <TabLabel>
                  Upcoming
                  <Badge badgeContent={appointments.length} color="primary" />
                </TabLabel>
              } />
              <Tab label="Past" />
              <Tab label="Cancelled" />
            </StyledTabs>
          </Paper>

          <Grid container spacing={2}>
            {appointments.map((appointment) => (
              <Grid item xs={12} key={appointment.id}>
                <AppointmentCard>
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Avatar sx={{ bgcolor: '#e2e8f0', width: 56, height: 56 }}>
                          <User size={24} />
                        </Avatar>
                      </Grid>
                      <Grid item xs>
                        <Box>
                          <Typography variant="h6" sx={{ mb: 0.5 }}>
                            {appointment.doctorName}
                          </Typography>
                          <Typography color="text.secondary" sx={{ mb: 1 }}>
                            {appointment.specialty}
                          </Typography>
                          <AppointmentInfo>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Calendar size={16} />
                              {appointment.date}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Clock size={16} />
                              {appointment.time} ({appointment.duration})
                            </Box>
                          </AppointmentInfo>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-end' }}>
                          <StatusChip
                            status={appointment.status}
                            label={appointment.status}
                          />
                          <Chip
                            icon={appointment.isOnline ? <Video size={16} /> : <User size={16} />}
                            label={appointment.isOnline ? "Online Consultation" : "In-person Visit"}
                            variant="outlined"
                            size="small"
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </AppointmentCard>
              </Grid>
            ))}
          </Grid>
        </ContentWrapper>
      </MainContent>
    </Box>
  );
};

export default PatientAppointments;
