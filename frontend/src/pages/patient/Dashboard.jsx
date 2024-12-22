import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Badge, styled, Paper } from "@mui/material";
import { Calendar, Pill, MessageCircle, Clock, CalendarClock } from "lucide-react";
import PatientSidebar from "../../components/patient/PatientSidebar";
import PatientTopbar from "../../components/patient/PatientTopbar";

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: "24px",
  width: "100%",
  maxWidth: "1440px",
  margin: "0 auto",
  [theme.breakpoints.up("sm")]: {
    marginLeft: "240px",
    marginTop: "64px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "16px",
    marginTop: "56px",
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  [theme.breakpoints.down("sm")]: {
    padding: "0",
  },
}));

const StatsCard = styled(Paper)(({ theme, colorScheme }) => ({
  padding: theme.spacing(3),
  borderRadius: "12px",
  backgroundColor: "#ffffff",
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
  ".icon-wrapper": {
    width: { xs: "40px", sm: "48px" },
    height: { xs: "40px", sm: "48px" },
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorScheme.light,
    color: colorScheme.main,
    marginBottom: theme.spacing(2),
  },
  ".stats-value": {
    fontSize: { xs: "1.5rem", sm: "2rem" },
    fontWeight: 600,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(0.5),
  },
  ".stats-label": {
    color: theme.palette.text.secondary,
    fontSize: "0.875rem",
    fontWeight: 500,
  },
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: theme.spacing(2),
  },
}));

const TimeChip = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(1, 2),
  borderRadius: "20px",
  backgroundColor: "#e0f2fe",
  color: "#0284c7",
  fontSize: "0.875rem",
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    justifyContent: "center",
  },
}));

const colorSchemes = {
  appointments: { light: "#e0f2fe", main: "#0284c7" },
  prescriptions: { light: "#fef3c7", main: "#d97706" },
  consultations: { light: "#dcfce7", main: "#16a34a" },
  messages: { light: "#f3e8ff", main: "#9333ea" },
};

const PatientDashboard = () => {
  const [stats, setStats] = useState({
    upcomingAppointments: 0,
    activePrescriptions: 0,
    pastConsultations: 0,
    unreadMessages: 0,
  });

  useEffect(() => {
    // Mock data for development
    setStats({
      upcomingAppointments: 2,
      activePrescriptions: 3,
      pastConsultations: 8,
      unreadMessages: 1,
    });
  }, []);

  const statsConfig = [
    {
      icon: <Calendar size={24} />,
      label: "Upcoming Appointments",
      value: stats.upcomingAppointments,
      colorScheme: colorSchemes.appointments,
    },
    {
      icon: <Pill size={24} />,
      label: "Active Prescriptions",
      value: stats.activePrescriptions,
      colorScheme: colorSchemes.prescriptions,
    },
    {
      icon: <Clock size={24} />,
      label: "Past Consultations",
      value: stats.pastConsultations,
      colorScheme: colorSchemes.consultations,
    },
    {
      icon: <MessageCircle size={24} />,
      label: "Unread Messages",
      value: stats.unreadMessages,
      colorScheme: colorSchemes.messages,
      hasBadge: true,
    },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <PatientTopbar />
      <PatientSidebar />
      <MainContent>
        <ContentWrapper>
          <HeaderBox>
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: "1.5rem", sm: "2rem" },
                fontWeight: 600,
              }}
            >
              Welcome Back, John
            </Typography>
            <TimeChip>
              <CalendarClock size={20} />
              Today's Overview
            </TimeChip>
          </HeaderBox>

          <Grid 
            container 
            spacing={{ xs: 2, sm: 3 }}
            sx={{ 
              width: "100%",
              margin: 0,
              '& .MuiGrid-item': {
                paddingTop: { xs: '8px', sm: '24px' },
                paddingLeft: { xs: '8px', sm: '24px' },
              }
            }}
          >
            {statsConfig.map((stat, index) => (
              <Grid item xs={6} sm={6} lg={3} key={index}>
                <StatsCard colorScheme={stat.colorScheme} elevation={0}>
                  <Box className="icon-wrapper">
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography className="stats-value">
                      {stat.hasBadge ? (
                        <Badge
                          badgeContent={stat.value}
                          color="error"
                          sx={{
                            "& .MuiBadge-badge": {
                              right: -16,
                              top: 4,
                              fontSize: "0.75rem",
                            },
                          }}
                        >
                          {stat.value}
                        </Badge>
                      ) : (
                        stat.value
                      )}
                    </Typography>
                    <Typography 
                      className="stats-label"
                      sx={{
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </StatsCard>
              </Grid>
            ))}
          </Grid>
        </ContentWrapper>
      </MainContent>
    </Box>
  );
};

export default PatientDashboard;
