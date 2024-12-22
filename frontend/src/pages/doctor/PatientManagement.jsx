import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  styled,
  TextField,
  InputAdornment,
  Chip,
  Menu,
  MenuItem,
  Badge, // Add this import
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Search, Filter, Plus, Calendar, Activity } from "lucide-react";
import Sidebar from "../../components/doctor/Sidebar";
import Topbar from "../../components/doctor/Topbar";
import { patientApi } from "../../services/patientApi";

// Types
/**
 * @typedef {Object} Patient
 * @property {number} id
 * @property {string} name
 * @property {number} age
 * @property {string} gender
 * @property {string} lastVisit
 * @property {string} condition
 * @property {'active' | 'inactive' | 'pending'} status
 * @property {string} bloodType
 * @property {string} phone
 * @property {string} email
 */

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

const SearchBar = styled(TextField)(({ theme }) => ({
  width: "100%",
  maxWidth: "300px", // Reduced from 400px
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#fff",
    borderRadius: "8px",
    height: "40px", // Add fixed height
    "& input": {
      padding: "8px 14px", // Reduce input padding
    },
  },
}));

const FilterButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#f8fafc",
  color: "#64748b",
  height: "40px",
  minWidth: "auto",
  padding: "0 16px",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  fontWeight: 500,
  textTransform: "none",
  gap: "8px",
  "&:hover": {
    backgroundColor: "#f1f5f9",
    borderColor: "#cbd5e1",
  },
  "& .MuiButton-startIcon": {
    margin: 0,
  },
  "&.active": {
    backgroundColor: "#eff6ff",
    color: "#2563eb",
    borderColor: "#bfdbfe",
    "& svg": {
      color: "#2563eb",
    },
  },
}));

const StatusChip = styled(Chip)(({ status }) => ({
  backgroundColor:
    status === "active"
      ? "#dcfce7"
      : status === "inactive"
      ? "#fee2e2"
      : "#f3e8ff",
  color:
    status === "active"
      ? "#16a34a"
      : status === "inactive"
      ? "#dc2626"
      : "#9333ea",
}));

const ViewDetailsButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#f8fafc",
  color: "#64748b",
  padding: "6px 12px",
  fontSize: "0.875rem",
  textTransform: "none",
  borderRadius: "6px",
  border: "1px solid #e2e8f0",
  "&:hover": {
    backgroundColor: "#f1f5f9",
    borderColor: "#cbd5e1",
  },
}));

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: '',
    bloodType: '',
    phone: '',
    email: '',
    condition: '',
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        setError(null);
        // TODO: Uncomment for API integration
        // const data = await patientApi.getPatients({
        //   search: searchTerm,
        //   status: filterAnchorEl ? 'active' : undefined,
        // });
        // setPatients(data);

        // Mock data for development
        setPatients([
          {
            id: 1,
            name: "John Doe",
            age: 45,
            gender: "Male",
            lastVisit: "2024-01-20",
            condition: "Hypertension",
            status: "active",
            bloodType: "A+",
            phone: "+1234567890",
            email: "john@example.com",
          },
          {
            id: 2,
            name: "Jane Smith",
            age: 32,
            gender: "Female",
            lastVisit: "2024-01-18",
            condition: "Diabetes",
            status: "active",
            bloodType: "O+",
            phone: "+1234567891",
            email: "jane@example.com",
          },
        ]);
      } catch (error) {
        console.error("Error fetching patients:", error);
        setError("Failed to load patients");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [searchTerm, filterAnchorEl]);

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleAddNewPatient = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewPatient({
      name: '',
      age: '',
      gender: '',
      bloodType: '',
      phone: '',
      email: '',
      condition: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement API call to save patient
      console.log('Saving patient:', newPatient);
      handleCloseDialog();
      // Refresh patient list
    } catch (error) {
      console.error('Error saving patient:', error);
    }
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Topbar />
      <Sidebar />
      <MainContent>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Patient Management
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <SearchBar
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={18} /> {/* Reduced icon size */}
                    </InputAdornment>
                  ),
                }}
              />
              <FilterButton
                variant="outlined"
                startIcon={<Filter size={18} />}
                onClick={handleFilterClick}
                className={Boolean(filterAnchorEl) ? "active" : ""}
                endIcon={
                  <Badge
                    badgeContent={0}
                    color="primary"
                    sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: "#2563eb",
                        fontSize: "0.75rem",
                        minWidth: "18px",
                        height: "18px",
                      },
                    }}
                  >
                    <Box sx={{ width: 4 }} />
                  </Badge>
                }
              >
                Filter
              </FilterButton>
            </Box>
            <Button 
              variant="contained" 
              startIcon={<Plus size={20} />}
              onClick={handleAddNewPatient}
            >
              Add New Patient
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper} sx={{ borderRadius: "12px" }}>
          {loading ? (
            <Box sx={{ p: 3, textAlign: "center" }}>Loading patients...</Box>
          ) : error ? (
            <Box sx={{ p: 3, textAlign: "center", color: "error.main" }}>
              {error}
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Age/Gender</TableCell>
                  <TableCell>Last Visit</TableCell>
                  <TableCell>Condition</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        {patient.name}
                      </Box>
                    </TableCell>
                    <TableCell>{`${patient.age} / ${patient.gender}`}</TableCell>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Calendar size={16} />
                        {patient.lastVisit}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Activity size={16} />
                        {patient.condition}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <StatusChip
                        label={patient.status}
                        status={patient.status}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <ViewDetailsButton>View Details</ViewDetailsButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Menu
          anchorEl={filterAnchorEl}
          open={Boolean(filterAnchorEl)}
          onClose={handleFilterClose}
        >
          <MenuItem onClick={handleFilterClose}>Status: Active</MenuItem>
          <MenuItem onClick={handleFilterClose}>Status: Inactive</MenuItem>
          <MenuItem onClick={handleFilterClose}>Last Visit</MenuItem>
          <MenuItem onClick={handleFilterClose}>Condition</MenuItem>
        </Menu>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>Register New Patient</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Age"
                    type="number"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={newPatient.gender}
                      label="Gender"
                      onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
                      required
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Blood Type"
                    value={newPatient.bloodType}
                    onChange={(e) => setNewPatient({...newPatient, bloodType: e.target.value})}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Medical Condition"
                    value={newPatient.condition}
                    onChange={(e) => setNewPatient({...newPatient, condition: e.target.value})}
                    multiline
                    rows={2}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button type="submit" variant="contained">Register Patient</Button>
            </DialogActions>
          </form>
        </Dialog>
      </MainContent>
    </Box>
  );
};

export default PatientManagement;
