import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  IconButton,
  Badge,
  styled,
  Divider,
} from "@mui/material";
import { MessageSquare, ChevronRight, User, Circle } from "lucide-react";
import Sidebar from "../../components/doctor/Sidebar";
import Topbar from "../../components/doctor/Topbar";
import axios from 'axios';
import ChatInterface from '../../components/chat/ChatInterface';

/**
 * @typedef {Object} Query
 * @property {number} id
 * @property {string} patientName
 * @property {string} title
 * @property {string} message
 * @property {string} date
 * @property {'unread' | 'read' | 'replied'} status
 */

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: '24px',
  marginLeft: '240px',
  marginTop: '64px',
  width: '100%',
  maxWidth: '1440px',
  margin: '64px auto 0',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
    marginTop: '72px',
    padding: '16px',
    width: '100%',
    overflowX: 'hidden',
  },
}));

const QueryCard = styled(ListItem)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  marginBottom: '8px',
  padding: '16px',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: '#f8fafc',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
}));

const StatusIndicator = styled(Circle)(({ status }) => ({
  width: 8,
  height: 8,
  color: status === 'unread' ? '#ef4444' : 
         status === 'replied' ? '#22c55e' : '#94a3b8',
}));

const PatientQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        setLoading(true);
        // TODO: Uncomment for API integration
        // const response = await axios.get('/api/doctor/queries');
        // setQueries(response.data);

        // Mock data for development
        setQueries([
          {
            id: 1,
            patientName: 'John Doe',
            title: 'Question about medication',
            message: 'I have been experiencing side effects from the new medication...',
            date: '2024-01-25',
            status: 'unread',
          },
          {
            id: 2,
            patientName: 'Jane Smith',
            title: 'Follow-up appointment',
            message: 'When should I schedule my next visit?',
            date: '2024-01-24',
            status: 'replied',
          },
          {
            id: 3,
            patientName: 'Mike Johnson',
            title: 'Test results inquiry',
            message: 'Would like to discuss my recent test results',
            date: '2024-01-23',
            status: 'read',
          },
          {
            id: 4,
            patientName: 'Sarah Wilson',
            title: 'Prescription refill',
            message: 'Need a refill for my blood pressure medication',
            date: '2024-01-22',
            status: 'unread',
          }
        ]);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching queries:', err);
        setError('Failed to load queries');
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  const handleQueryClick = (query) => {
    setSelectedQuery(query);
    setShowChat(true);
    
    // If query is unread, mark it as read
    if (query.status === 'unread') {
      // TODO: Update status via API
      setQueries(prev => prev.map(q => 
        q.id === query.id ? { ...q, status: 'read' } : q
      ));
    }
  };

  const handleCloseChat = () => {
    setShowChat(false);
    setSelectedQuery(null);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Topbar />
      <Sidebar />
      <MainContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={showChat ? 4 : 12}>
            <Box sx={{ mb: 4 }}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Typography variant="h4">Patient Queries</Typography>
                </Grid>
                <Grid item>
                  <Badge badgeContent={queries.filter(q => q.status === 'unread').length} 
                        color="error">
                    <MessageSquare size={24} />
                  </Badge>
                </Grid>
              </Grid>
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                Loading queries...
              </Box>
            ) : error ? (
              <Box sx={{ color: 'error.main', p: 3 }}>{error}</Box>
            ) : (
              <List sx={{ width: '100%', bgcolor: 'transparent' }}>
                {queries.map((query) => (
                  <QueryCard 
                    key={query.id}
                    onClick={() => handleQueryClick(query)}
                    sx={{ 
                      cursor: 'pointer',
                      backgroundColor: selectedQuery?.id === query.id ? '#f8fafc' : '#ffffff'
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: '#e2e8f0' }}>
                        <User size={24} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <StatusIndicator status={query.status} />
                          <Typography variant="subtitle1" fontWeight={500}>
                            {query.title}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            From: {query.patientName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {query.date}
                          </Typography>
                        </Box>
                      }
                    />
                    <Chip 
                      label={query.status} 
                      size="small"
                      sx={{ 
                        backgroundColor: query.status === 'unread' ? '#fee2e2' : 
                                      query.status === 'replied' ? '#dcfce7' : '#f1f5f9',
                        color: query.status === 'unread' ? '#dc2626' :
                              query.status === 'replied' ? '#16a34a' : '#64748b',
                      }}
                    />
                    <IconButton size="small" sx={{ ml: 1 }}>
                      <ChevronRight size={20} />
                    </IconButton>
                  </QueryCard>
                ))}
              </List>
            )}
          </Grid>
          
          {showChat && (
            <Grid item xs={12} md={8}>
              <ChatInterface 
                selectedQuery={selectedQuery} 
                onClose={handleCloseChat}
              />
            </Grid>
          )}
        </Grid>
      </MainContent>
    </Box>
  );
};

export default PatientQueries;
