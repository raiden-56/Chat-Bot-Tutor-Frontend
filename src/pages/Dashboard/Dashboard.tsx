import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Avatar,
  LinearProgress,
  Chip
} from '@mui/material';
import {
  TrendingUp,
  School,
  Quiz,
  Timer,
  Star,
  EmojiEvents
} from '@mui/icons-material';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import VirtualCharacter from '../../components/VirtualCharacter';
import { kidsAPI } from '../../services/api';
import { GetKidResponse, GetQuestionsHistoryResponse } from '../../types/api';

const Dashboard = () => {
  const [kids, setKids] = useState<GetKidResponse[]>([]);
  const [questionHistory, setQuestionHistory] = useState<{ [key: number]: GetQuestionsHistoryResponse[] }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const kidsResponse = await kidsAPI.getAllKids();
        setKids(kidsResponse.data.data);

        const historyPromises = kidsResponse.data.data.map(kid => kidsAPI.getQuestionsHistory(kid.id));
        const historyResponses = await Promise.all(historyPromises);

        const historyByKidId = historyResponses.reduce((acc, response, index) => {
          const kidId = kidsResponse.data.data[index].id;
          acc[kidId] = response.data.data;
          return acc;
        }, {} as { [key: number]: GetQuestionsHistoryResponse[] });

        setQuestionHistory(historyByKidId);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Charts: subjects
  const subjectData = Object.values(questionHistory).flat().reduce((acc, question) => {
    const existingSubject = acc.find(s => s.name === question.subject);
    if (existingSubject) {
      existingSubject.value += 1;
    } else {
      acc.push({ name: question.subject, value: 1, color: '#1976d2' }); // Default color
    }
    return acc;
  }, [] as { name: string; value: number; color: string }[]);

  // Progress: aggregate scores
  const progressData = kids.map(kid => {
    const history = questionHistory[kid.id] || [];
    const totalScore = history.reduce((acc, q) => acc + (parseInt(q.answer) || 0), 0);
    const averageScore = history.length > 0 ? totalScore / history.length : 0;
    return {
      month: new Date(kid.created_at).toLocaleString('default', { month: 'short' }),
      score: averageScore,
    };
  });

  // Weekly study hours chart placeholder
  const weeklyData = kids.map(kid => ({
    day: new Date(kid.created_at).toLocaleString('default', { weekday: 'short' }),
    hours: 0, // No API yet
  }));

  // Stats for dashboard cards
  const totalKids = kids.length;
  const avgQuizScore = progressData.length > 0 ? Math.round(progressData.reduce((acc, p) => acc + p.score, 0) / progressData.length) : 0;
  const totalStudyHours = weeklyData.reduce((acc, w) => acc + w.hours, 0);
  const totalAchievements = 0; // No data yet

  const statsCards = [
    {
      title: 'Total Kids',
      value: totalKids,
      icon: <School />,
      color: '#1976d2',
      change: ''
    },
    {
      title: 'Avg Quiz Score',
      value: `${avgQuizScore}%`,
      icon: <Quiz />,
      color: '#42a5f5',
      change: ''
    },
    {
      title: 'Study Hours',
      value: `${totalStudyHours}h`,
      icon: <Timer />,
      color: '#90caf9',
      change: 'This month'
    },
    {
      title: 'Achievements',
      value: totalAchievements,
      icon: <EmojiEvents />,
      color: '#ffd54f',
      change: ''
    }
  ];

  // Recent kid activities
  const kidActivities = kids.map(kid => {
    const history = questionHistory[kid.id] || [];
    const lastActivity = history[0];
    const kidProgress = progressData.find(p => p.month === new Date(kid.created_at).toLocaleString('default', { month: 'short' }));
    return {
      name: kid.name,
      avatar: kid.name.charAt(0).toUpperCase(),
      subject: lastActivity?.subject || 'N/A',
      score: kidProgress?.score || 0,
      time: lastActivity ? new Date(lastActivity.created_at).toLocaleTimeString() : 'N/A',
      achievement: 'N/A'
    };
  });

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box className="flex items-center justify-between mb-8">
          <Box>
            <Typography variant="h3" className="font-bold text-foreground mb-2">
              Welcome back, Parent! 👋
            </Typography>
            <Typography variant="h6" className="text-muted-foreground">
              Here's what's happening with your kids' learning journey
            </Typography>
          </Box>
          <VirtualCharacter
            size="lg"
            animation="celebrating"
            message="Your kids are doing amazing!"
          />
        </Box>
      </motion.div>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={3} key={stat.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="card-elevated h-full">
                <CardContent>
                  <Box className="flex items-center justify-between mb-3">
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        backgroundColor: stat.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <TrendingUp sx={{ color: 'success.main' }} />
                  </Box>
                  <Typography variant="h4" className="font-bold mb-1">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" className="text-muted-foreground mb-2">
                    {stat.title}
                  </Typography>
                  {stat.change && (
                    <Chip
                      label={stat.change}
                      size="small"
                      color="success"
                      variant="outlined"
                    />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Subject Distribution */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="card-elevated h-full">
              <CardContent>
                <Typography variant="h6" className="font-bold mb-4">
                  Subject Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={subjectData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {subjectData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <Box className="flex flex-wrap gap-2 mt-4">
                  {subjectData.map((item) => (
                    <Box key={item.name} className="flex items-center gap-1">
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: item.color
                        }}
                      />
                      <Typography variant="caption">{item.name}</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Progress Over Time */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="card-elevated h-full">
              <CardContent>
                <Typography variant="h6" className="font-bold mb-4">
                  Learning Progress
                </Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={progressData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#1976d2"
                      strokeWidth={3}
                      dot={{ fill: '#1976d2', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Weekly Study Hours & Recent Activities */}
      <Grid container spacing={3}>
        {/* Weekly Study Hours */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Card className="card-elevated h-full">
              <CardContent>
                <Typography variant="h6" className="font-bold mb-4">
                  This Week's Study Hours
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={weeklyData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Bar dataKey="hours" fill="#42a5f5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Card className="card-elevated h-full">
              <CardContent>
                <Typography variant="h6" className="font-bold mb-4">
                  Recent Kid Activities
                </Typography>
                <Box className="space-y-4">
                  {kidActivities.map((activity, index) => (
                    <motion.div
                      key={activity.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                    >
                      <Box className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                        <Box className="flex items-center gap-3">
                          <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                            {activity.avatar}
                          </Avatar>
                          <Box>
                            <Typography variant="body1" className="font-medium">
                              {activity.name}
                            </Typography>
                            <Typography variant="caption" className="text-muted-foreground">
                              {activity.subject} • {activity.time}
                            </Typography>
                          </Box>
                        </Box>
                        <Box className="text-right">
                          <Box className="flex items-center gap-1 mb-1">
                            <Star sx={{ color: 'warning.main', fontSize: 16 }} />
                            <Typography variant="body2" className="font-bold">
                              {activity.score}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={activity.score}
                            sx={{ width: 60, borderRadius: 2 }}
                          />
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
