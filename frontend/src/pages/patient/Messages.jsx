import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  IconButton,
  Badge,
  InputAdornment,
  Drawer,
  styled,
  Tooltip,
  Input,
} from '@mui/material';
import { 
  Send, 
  User,
  Search,
  ArrowLeft,
  MessageSquare,
  Paperclip,
  Image,
  FileText,
  X as CloseIcon
} from 'lucide-react';
import PatientSidebar from '../../components/patient/PatientSidebar';
import PatientTopbar from '../../components/patient/PatientTopbar';

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  height: '100vh',
  display: 'flex',
  overflow: 'hidden',
  [theme.breakpoints.up('sm')]: {
    marginLeft: '240px',
    marginTop: '64px',
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: '56px',
    flexDirection: 'column',
  },
}));

const ChatsList = styled(Box)(({ theme, open }) => ({
  width: '320px',
  borderRight: '1px solid #f1f5f9',
  height: '100%',
  overflow: 'auto',
  backgroundColor: '#ffffff',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    display: open ? 'none' : 'block',
  },
}));

const ChatWindow = styled(Box)(({ theme, open }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#f8fafc',
  [theme.breakpoints.down('sm')]: {
    display: open ? 'flex' : 'none',
  },
}));

const MessageBubble = styled(Box)(({ isUser }) => ({
  maxWidth: '70%',
  padding: '12px 16px',
  borderRadius: '12px',
  marginBottom: '8px',
  backgroundColor: isUser ? '#2563eb' : '#ffffff',
  color: isUser ? '#ffffff' : '#1e293b',
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  padding: '16px',
  borderBottom: '1px solid #f1f5f9',
  backgroundColor: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  [theme.breakpoints.down('sm')]: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
}));

const MessagesContainer = styled(Box)({
  flex: 1,
  padding: '16px',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
});

const InputContainer = styled(Box)(({ theme }) => ({
  padding: '16px',
  backgroundColor: '#ffffff',
  borderTop: '1px solid #f1f5f9',
  [theme.breakpoints.down('sm')]: {
    position: 'sticky',
    bottom: 0,
    zIndex: 1,
  },
}));

const AttachmentButton = styled(IconButton)(({ theme }) => ({
  padding: '8px',
  color: '#64748b',
  '&:hover': {
    backgroundColor: '#f1f5f9',
  },
}));

const FilePreview = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  marginBottom: '8px',
  gap: '8px',
  '& .file-name': {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    position: 'fixed',
    bottom: 16,
    left: 16,
    zIndex: 1200,
    backgroundColor: '#2563eb',
    color: '#ffffff',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      backgroundColor: '#1d4ed8',
    },
  },
}));

const PatientMessages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 600);
  const [attachment, setAttachment] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Mock data
    setChats([
      {
        id: 1,
        doctorName: 'Dr. John Smith',
        specialty: 'Cardiologist',
        lastMessage: 'Your next appointment is scheduled.',
        unread: 2,
        time: '10:30 AM'
      },
      {
        id: 2,
        doctorName: 'Dr. Sarah Wilson',
        specialty: 'Dermatologist',
        lastMessage: 'How are you feeling today?',
        unread: 0,
        time: 'Yesterday'
      }
    ]);

    setMessages([
      { id: 1, text: 'Hello, how can I help you today?', isUser: false, time: '10:00 AM' },
      { id: 2, text: 'I have a question about my prescription', isUser: true, time: '10:02 AM' },
      { id: 3, text: 'Sure, please go ahead', isUser: false, time: '10:03 AM' }
    ]);

    const handleResize = () => setIsMobileView(window.innerWidth < 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAttachment = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAttachment({
        file,
        name: file.name,
        type: file.type,
      });
    }
  };

  const removeAttachment = () => {
    setAttachment(null);
    fileInputRef.current.value = '';
  };

  const handleSend = () => {
    if (newMessage.trim() || attachment) {
      const messageData = {
        id: messages.length + 1,
        text: newMessage,
        isUser: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        attachment: attachment ? {
          name: attachment.name,
          type: attachment.type,
          // In a real app, you'd upload the file and get a URL
          url: URL.createObjectURL(attachment.file)
        } : null
      };
      
      setMessages([...messages, messageData]);
      setNewMessage('');
      setAttachment(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleBackToList = () => {
    setSelectedChat(null);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <PatientTopbar />
      <PatientSidebar />
      <MainContent>
        <ChatsList open={selectedChat !== null}>
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search messages..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <List sx={{ p: 0 }}>
            {chats.map((chat) => (
              <ListItem
                key={chat.id}
                button
                onClick={() => setSelectedChat(chat)}
                sx={{
                  borderBottom: '1px solid #f1f5f9',
                  '&:hover': { backgroundColor: '#f8fafc' }
                }}
              >
                <ListItemAvatar>
                  <Badge
                    badgeContent={chat.unread}
                    color="primary"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                  >
                    <Avatar sx={{ bgcolor: '#e2e8f0' }}>
                      <User size={20} />
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={chat.doctorName}
                  secondary={chat.lastMessage}
                  primaryTypographyProps={{ fontWeight: chat.unread ? 600 : 400 }}
                  sx={{ mr: 1 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {chat.time}
                </Typography>
              </ListItem>
            ))}
          </List>
        </ChatsList>

        <ChatWindow open={selectedChat !== null}>
          {selectedChat ? (
            <>
              <ChatHeader>
                {isMobileView && (
                  <IconButton edge="start" onClick={handleBackToList}>
                    <ArrowLeft size={20} />
                  </IconButton>
                )}
                <Avatar sx={{ bgcolor: '#e2e8f0' }}>
                  <User size={20} />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {selectedChat.doctorName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedChat.specialty}
                  </Typography>
                </Box>
              </ChatHeader>

              <MessagesContainer>
                {messages.map((message) => (
                  <MessageBubble key={message.id} isUser={message.isUser}>
                    <Typography variant="body2">{message.text}</Typography>
                    {message.attachment && (
                      <Box 
                        sx={{ 
                          mt: 1,
                          p: 1,
                          bgcolor: 'rgba(0,0,0,0.04)',
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}
                      >
                        {message.attachment.type.startsWith('image/') ? (
                          <Image size={16} />
                        ) : (
                          <FileText size={16} />
                        )}
                        <Typography variant="caption">
                          {message.attachment.name}
                        </Typography>
                      </Box>
                    )}
                    <Typography variant="caption" color={message.isUser ? 'rgba(255,255,255,0.7)' : 'text.secondary'}>
                      {message.time}
                    </Typography>
                  </MessageBubble>
                ))}
              </MessagesContainer>

              <InputContainer>
                {attachment && (
                  <FilePreview>
                    {attachment.type.startsWith('image/') ? (
                      <Image size={16} />
                    ) : (
                      <FileText size={16} />
                    )}
                    <Typography variant="caption" className="file-name">
                      {attachment.name}
                    </Typography>
                    <IconButton size="small" onClick={removeAttachment}>
                      <CloseIcon size={16} />
                    </IconButton>
                  </FilePreview>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Input
                    type="file"
                    sx={{ display: 'none' }}
                    inputRef={fileInputRef}
                    onChange={handleAttachment}
                  />
                  <AttachmentButton
                    onClick={() => fileInputRef.current.click()}
                  >
                    <Paperclip size={20} />
                  </AttachmentButton>
                  <TextField
                    fullWidth
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleSend} color="primary">
                            <Send size={20} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </InputContainer>
            </>
          ) : (
            <Box sx={{ 
              display: { xs: 'none', sm: 'flex' }, 
              height: '100%', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 2,
              color: 'text.secondary' 
            }}>
              <MessageSquare size={48} />
              <Typography>Select a conversation to start messaging</Typography>
            </Box>
          )}
        </ChatWindow>
      </MainContent>

      {isMobileView && !selectedChat && (
        <MobileMenuButton onClick={() => setSelectedChat(chats[0])}>
          <MessageSquare size={24} />
        </MobileMenuButton>
      )}
    </Box>
  );
};

export default PatientMessages;
