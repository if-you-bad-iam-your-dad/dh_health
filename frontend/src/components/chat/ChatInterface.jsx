import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  styled,
} from '@mui/material';
import { Send, User, Paperclip, X } from 'lucide-react';

const ChatContainer = styled(Paper)({
  height: '600px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
  overflow: 'hidden',
});

const MessageList = styled(Box)({
  flex: 1,
  overflow: 'auto',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const MessageBubble = styled(Box)(({ isDoctor }) => ({
  display: 'flex',
  gap: '12px',
  alignItems: 'flex-start',
  flexDirection: isDoctor ? 'row-reverse' : 'row',
  '.message-content': {
    backgroundColor: isDoctor ? '#eff6ff' : '#f8fafc',
    padding: '12px 16px',
    borderRadius: '12px',
    maxWidth: '70%',
    color: '#1e293b',
  },
  '.timestamp': {
    fontSize: '0.75rem',
    color: '#64748b',
    marginTop: '4px',
  },
}));

const ChatInput = styled(Box)({
  padding: '16px',
  borderTop: '1px solid #e2e8f0',
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
});

const ChatHeader = styled(Box)({
  padding: '16px',
  borderBottom: '1px solid #e2e8f0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const ChatInterface = ({ selectedQuery, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Connect to WebSocket for real-time messages
    const ws = new WebSocket('ws://localhost:5000');
    
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
    };

    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    return () => ws.close();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      isDoctor: true,
      timestamp: new Date().toISOString(),
    };

    // Send message through WebSocket
    // ws.send(JSON.stringify(message));

    // For development, directly add to messages
    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const canReply = selectedQuery?.status === 'unread' || selectedQuery?.status === 'read';

  return (
    <ChatContainer elevation={0}>
      <ChatHeader>
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            {selectedQuery?.patientName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {selectedQuery?.title}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <X size={20} />
        </IconButton>
      </ChatHeader>

      <MessageList>
        <MessageBubble isDoctor={false}>
          <Avatar sx={{ bgcolor: '#e2e8f0' }}>
            <User size={20} />
          </Avatar>
          <Box>
            <div className="message-content">
              <Typography>{selectedQuery?.message}</Typography>
            </div>
            <Typography className="timestamp">
              {selectedQuery?.date}
            </Typography>
          </Box>
        </MessageBubble>
        {messages.map((message) => (
          <MessageBubble key={message.id} isDoctor={message.isDoctor}>
            <Avatar sx={{ bgcolor: message.isDoctor ? '#bfdbfe' : '#e2e8f0' }}>
              <User size={20} />
            </Avatar>
            <Box>
              <div className="message-content">
                <Typography>{message.text}</Typography>
              </div>
              <Typography className="timestamp">
                {new Date(message.timestamp).toLocaleTimeString()}
              </Typography>
            </Box>
          </MessageBubble>
        ))}
        <div ref={messagesEndRef} />
      </MessageList>

      {canReply ? (
        <ChatInput>
          <IconButton size="small">
            <Paperclip size={20} />
          </IconButton>
          <TextField
            fullWidth
            placeholder="Type your message..."
            variant="outlined"
            size="small"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <IconButton 
            color="primary" 
            onClick={handleSend}
            disabled={!newMessage.trim()}
          >
            <Send size={20} />
          </IconButton>
        </ChatInput>
      ) : (
        <Box sx={{ 
          p: 2, 
          bgcolor: '#f8fafc', 
          borderTop: '1px solid #e2e8f0',
          color: '#64748b',
          textAlign: 'center'
        }}>
          This query has been {selectedQuery?.status}
        </Box>
      )}
    </ChatContainer>
  );
};

export default ChatInterface;
