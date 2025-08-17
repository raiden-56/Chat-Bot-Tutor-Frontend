import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  IconButton,
  CircularProgress,
  Typography,
  Paper,
  Avatar,
  Grid,
} from '@mui/material';
import { Send as SendIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import Layout from '../../components/Layout/Layout';
import Mascot from '../../components/Mascot/Mascot';
import { kidsAPI } from '../../services/api';
import { GetQuestionsHistoryResponse, QuestionRequest } from '../../types/api';


const ChatContainer = styled(Paper)(() => ({
  height: '70vh',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '25px',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

const MessagesContainer = styled(Box)(() => ({
  flexGrow: 1,
  overflowY: 'auto',
  padding: theme.spacing(3),
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: '10px',
  },
}));

const MessageBubble = styled(Box)<{ isUser: boolean }>(({ isUser }) => ({
  display: 'flex',
  justifyContent: isUser ? 'flex-end' : 'flex-start',
  marginBottom: theme.spacing(2),
}));

const Message = styled(Paper)<{ isUser: boolean }>(({ isUser }) => ({
  padding: theme.spacing(1.5, 2.5),
  borderRadius: isUser ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
  background: isUser
    ? 'linear-gradient(135deg, #48dbfb 0%, #00c2f7 100%)'
    : 'linear-gradient(135deg, #f1f1f1 0%, #e0e0e0 100%)',
  color: isUser ? 'white' : 'black',
  maxWidth: '70%',
  wordWrap: 'break-word',
}));

const InputContainer = styled(Box)(() => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  background: 'rgba(255,255,255,0.8)',
  borderRadius: '0 0 25px 25px',
}));

const Chat: React.FC = () => {
  const { kidId } = useParams<{ kidId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<GetQuestionsHistoryResponse[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (kidId) {
      fetchHistory(parseInt(kidId));
    }
  }, [kidId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchHistory = async (id: number) => {
    try {
      const response = await kidsAPI.getQuestionsHistory(id);
      setMessages(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch chat history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === '' || !kidId) return;

    const questionData: QuestionRequest = {
      question: newMessage,
    };

    setSending(true);
    setNewMessage('');

    try {
      // Optimistically update UI
      const optimisticMessage: GetQuestionsHistoryResponse = {
        id: Date.now(),
        question: newMessage,
        answer: '...',
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, optimisticMessage]);

      const response = await kidsAPI.createQuestion(parseInt(kidId), questionData);
      
      // Replace optimistic message with actual response
      setMessages((prev) => 
        prev.map(msg => 
          msg.id === optimisticMessage.id ? response.data.data : msg
        )
      );

    } catch (error) {
      console.error('Failed to send message:', error);
      // Revert optimistic update on error
      setMessages((prev) => prev.filter(msg => msg.id !== optimisticMessage.id));
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Layout>
      <Box>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box display="flex" alignItems="center" mb={2}>
            <IconButton onClick={() => navigate(`/child-mode/${kidId}`)} sx={{ color: 'white', mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" component="h1" color="white" fontWeight="bold">
              Chat with Your Tutor
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Mascot 
                message="Ask me anything! I'm here to help you learn and grow."
                emotion="happy"
                size="medium"
              />
            </motion.div>
          </Grid>
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ChatContainer>
                <MessagesContainer>
                  {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                      <CircularProgress />
                    </Box>
                  ) : (
                    messages.map((msg) => (
                      <React.Fragment key={msg.id}>
                        {/* User's Question */}
                        <MessageBubble isUser={true}>
                          <Message isUser={true}>
                            <Typography variant="body1">{msg.question}</Typography>
                          </Message>
                        </MessageBubble>
                        {/* Tutor's Answer */}
                        <MessageBubble isUser={false}>
                           <Avatar sx={{ bgcolor: 'primary.main', mr: 1.5 }}>T</Avatar>
                          <Message isUser={false}>
                            <Typography variant="body1">{msg.answer}</Typography>
                          </Message>
                        </MessageBubble>
                      </React.Fragment>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </MessagesContainer>
                <InputContainer>
                  <Box display="flex" alignItems="center">
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Type your question here..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={sending}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '20px',
                          backgroundColor: 'white',
                        },
                      }}
                    />
                    <IconButton
                      color="primary"
                      onClick={handleSendMessage}
                      disabled={sending || newMessage.trim() === ''}
                      sx={{ ml: 1, background: 'linear-gradient(135deg, #48dbfb 0%, #00c2f7 100%)', color: 'white' }}
                    >
                      {sending ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                    </IconButton>
                  </Box>
                </InputContainer>
              </ChatContainer>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Chat;
