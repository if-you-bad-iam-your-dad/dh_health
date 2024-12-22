import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Badge, styled } from "@mui/material";
import { Users, Calendar, CheckCircle, MessageSquare } from "lucide-react";
import axios from "axios";
import { io } from "socket.io-client";
import Sidebar from "../../components/doctor/Sidebar";
import Topbar from "../../components/doctor/Topbar";

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: "24px",
  marginLeft: "240px",
  marginTop: "64px",
  width: "100%", // Add this
  maxWidth: "1440px", // Add this
  margin: "64px auto 0", // Center the content
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
    marginTop: "72px", // Increased to give more space
    padding: "16px",
    width: "100%",
    overflowX: "hidden",
  },
}));

const StatsCard = styled(Box)(({ theme, colorScheme }) => ({
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "24px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  transition: "all 0.2s ease",
  "&:hover": {
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
    transform: "translateY(-2px)",
  },
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "100%", // Add this
  ".icon-wrapper": {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorScheme.light,
    color: colorScheme.main,
  },
  ".stats-value": {
    fontSize: "2rem",
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  ".stats-label": {
    color: theme.palette.text.secondary,
    fontSize: "0.875rem",
    fontWeight: 500,
  },
}));

const colorSchemes = {
  patients: { light: "#e0f2fe", main: "#0284c7" },
  pending: { light: "#fef3c7", main: "#d97706" },
  completed: { light: "#dcfce7", main: "#16a34a" },
  messages: { light: "#f3e8ff", main: "#9333ea" },
};

const DoctorDashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    newMessages: 0,
  });

  useEffect(() => {
    // TODO: Uncomment for API integration
    // const socket = io("http://localhost:5000");
    // socket.on("newMessage", (message) => {
    //   setStats((prev) => ({ ...prev, newMessages: prev.newMessages + 1 }));
    // });

    const fetchDashboardData = async () => {
      try {
        // const response = await axios.get("/api/doctor/dashboard-stats");
        // setStats(response.data);

        // Mock data for development
        setStats({
          totalPatients: 156,
          pendingAppointments: 8,
          completedAppointments: 1240,
          newMessages: 4,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
    // return () => socket?.disconnect();
  }, []);

  const statsConfig = [
    {
      icon: <Users size={24} />,
      label: "Total Patients",
      value: stats.totalPatients,
      colorScheme: colorSchemes.patients,
    },
    {
      icon: <Calendar size={24} />,
      label: "Pending Appointments",
      value: stats.pendingAppointments,
      colorScheme: colorSchemes.pending,
    },
    {
      icon: <CheckCircle size={24} />,
      label: "Completed Appointments",
      value: stats.completedAppointments,
      colorScheme: colorSchemes.completed,
    },
    {
      icon: <MessageSquare size={24} />,
      label: "New Messages",
      value: stats.newMessages,
      colorScheme: colorSchemes.messages,
      hasBadge: true,
    },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {" "}
      {/* Update this line */}
      <Topbar />
      <Sidebar />
      <MainContent>
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontSize: { xs: "1.5rem", md: "2rem" },
            fontWeight: 600,
            width: "100%", // Add this
          }}
        >
          Dashboard
        </Typography>

        <Grid
          container
          spacing={3}
          sx={{
            width: "100%",
            margin: 0,
            justifyContent: "center", // Add this
          }}
        >
          {statsConfig.map((stat, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <StatsCard colorScheme={stat.colorScheme}>
                <Box className="icon-wrapper">{stat.icon}</Box>
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
                          },
                        }}
                      >
                        {stat.value}
                      </Badge>
                    ) : (
                      stat.value
                    )}
                  </Typography>
                  <Typography className="stats-label">{stat.label}</Typography>
                </Box>
              </StatsCard>
            </Grid>
          ))}
        </Grid>

        {/* Additional dashboard content can be added here */}
      </MainContent>
    </Box>
  );
};

export default DoctorDashboard;
