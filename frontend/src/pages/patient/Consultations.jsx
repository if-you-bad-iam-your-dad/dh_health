import React from 'react';
import { Box, Typography } from '@mui/material';
import PatientSidebar from '../../components/patient/PatientSidebar';
import PatientTopbar from '../../components/patient/PatientTopbar';

const PatientConsultations = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <PatientTopbar />
      <PatientSidebar />
      <Box sx={{ flexGrow: 1, p: 3, marginLeft: "240px", marginTop: "64px" }}>
        <Typography variant="h4">My Consultations</Typography>
      </Box>
    </Box>
  );
};

export default PatientConsultations;
