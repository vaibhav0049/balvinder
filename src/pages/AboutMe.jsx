import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Divider,
  Paper,
  Chip,
  Stack,
  Fade,
  Slide,
  Zoom,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { AutoStories, School, EmojiEvents, Palette } from '@mui/icons-material';     
import balvinderImg from '../assets/images/about-one.png';

// Keyframe animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled components
const AnimatedCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(145deg, #ffffff 0%, #fafafa 100%)',
  borderRadius: '20px',
  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  border: '1px solid rgba(139, 69, 19, 0.1)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #8b4513, #d2691e, #cd853f)',
    backgroundSize: '200% 100%',
    animation: `${gradientShift} 3s ease infinite`,
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
  },
}));

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f5e9da 0%, #e8d3b8 50%, #bfa074 100%)', // updated to a soft gold/cream gradient
  borderRadius: '24px',
  padding: theme.spacing(6),
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  backgroundSize: '400% 400%',
  animation: `${gradientShift} 8s ease infinite`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)
    `,
    animation: `${floatAnimation} 6s ease-in-out infinite`,
  },
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 180,
  height: 180,
  background: 'linear-gradient(145deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
  border: '6px solid rgba(255,255,255,0.3)',
  backdropFilter: 'blur(10px)',
  fontSize: '3rem',
  fontWeight: 'bold',
  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(145deg, #f8f4f0, #e8e3db)',
  color: '#8b4513',
  fontFamily: 'Georgia, serif',
  fontWeight: 600,
  margin: theme.spacing(0.5),
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(145deg, #8b4513, #a0522d)',
    color: 'white',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 16px rgba(139, 69, 19, 0.3)',
  },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 60,
  height: 60,
  borderRadius: '50%',
  background: 'linear-gradient(145deg, #8b4513, #a0522d)',
  color: 'white',
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1) rotate(5deg)',
    boxShadow: '0 10px 20px rgba(139, 69, 19, 0.4)',
  },
}));

const AnimatedSection = styled(Box)(({ theme }) => ({
  animation: `${fadeInUp} 0.8s ease-out`,
}));

const TimelineItem = styled(Box)(({ theme }) => ({
  position: 'relative',
  paddingLeft: theme.spacing(4),
  paddingBottom: theme.spacing(3),
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '3px',
    height: '100%',
    background: 'linear-gradient(180deg, #8b4513, #d2691e)',
    borderRadius: '2px',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    left: '-6px',
    top: '8px',
    width: '15px',
    height: '15px',
    background: 'linear-gradient(145deg, #8b4513, #a0522d)',
    borderRadius: '50%',
    boxShadow: '0 4px 8px rgba(139, 69, 19, 0.3)',
  },
}));

export default function AboutMe() {
  const [visible, setVisible] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setVisible(true);
  }, []);

  const education = [
    { 
      years: '2011 - 2015', 
      title: 'Secretary to Government of India',
      desc: 'Peak of administrative career serving at the highest level of Indian bureaucracy',
      icon: <EmojiEvents />
    },
    { 
      years: '2008 - 2011', 
      title: 'Vice-Chancellor, SGT University',
      desc: 'Academic leadership at SGT University, Gurgaon, Haryana',
      icon: <School />
    },
    { 
      years: '1990s - 2000s', 
      title: 'Master in Development Administration',
      desc: 'University of Birmingham, England - Advanced studies in public administration',
      icon: <School />
    },
    { 
      years: '1980s - 1990s', 
      title: 'Master in Philosophy in Science',
      desc: 'University of Delhi - Foundation in scientific thinking and philosophy',
      icon: <School />
    },
  ];

  const books = [
    "Man's Spiritual Journey",
    "Awakening the Thinking Mind", 
    "Redesign Your Life in Modern Age",
    "Explore Your Life Journey"
  ];

  const achievements = [
    { text: "36+ years in public administration and policy", icon: <EmojiEvents /> },
    { text: "Published works in English and Hindi", icon: <AutoStories /> },
    { text: "Regular yoga and meditation practitioner", icon: <School /> },
    { text: "Oil and acrylic painting exhibitions", icon: <Palette /> },
    { text: "Philanthropic work supporting 120+ orphaned girls", icon: <EmojiEvents /> }
  ];

  return (
    <Box sx={{ 
      bgcolor: 'linear-gradient(135deg, #faf8f5 0%, #f5f2ed 100%)', 
      minHeight: '100vh',
      py: 4
      
    }}>
      <Container maxWidth="lg">
        
        {/* Hero Section */}
        <Fade in={visible} timeout={1000}>
          <HeroSection sx={{ mb: 6 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 3, md: 0 } }}>
                  <Zoom in={visible} timeout={1500}>
                    <ProfileAvatar src={balvinderImg} alt="Balvinder Kumar" />
                  </Zoom>
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Slide direction="right" in={visible} timeout={1200}>
                  <Box>
                    <Typography 
                      variant="h2" 
                      sx={{ 
                        fontFamily: 'Georgia, serif', 
                        fontWeight: 300, 
                        mb: 1,
                        fontSize: { xs: '2.5rem', md: '3.5rem' },
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        background: 'linear-gradient(45deg, #ffffff, #f0f0f0)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Balvinder Kumar
                    </Typography>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontFamily: 'Georgia, serif', 
                        fontWeight: 400, 
                        mb: 2,
                        opacity: 0.95,
                        fontSize: { xs: '1.5rem', md: '2rem' }
                      }}
                    >
                      IAS (Indian Administrative Service)
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontFamily: 'Georgia, serif', 
                        fontWeight: 300, 
                        opacity: 0.9,
                        fontStyle: 'italic',
                        fontSize: { xs: '1.1rem', md: '1.3rem' }
                      }}
                    >
                      Writer, Thinker and the follower of New Age of Spirituality
                    </Typography>
                  </Box>
                </Slide>
              </Grid>
            </Grid>
          </HeroSection>
        </Fade>

        {/* About Section */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={8}>
            <Slide direction="up" in={visible} timeout={1400}>
              <AnimatedCard>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <IconContainer>
                      <AutoStories fontSize="large" />
                    </IconContainer>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: '#8b4513', 
                        fontFamily: 'Georgia, serif', 
                        fontWeight: 500,
                        ml: 2
                      }}
                    >
                      About Me
                    </Typography>
                  </Box>
                  <Stack spacing={3}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#555', 
                        fontFamily: 'Georgia, serif', 
                        lineHeight: 1.8,
                        fontSize: '1.1rem'
                      }}
                    >
                     Balvinder Kumar IAS is an author and a spiritual seeker, who has been sharing his thoughts on various aspects of life, science, and spirituality. Towards his passion, he has written 4 books namely Man’s Spiritual Journey, Awakening the Thinking Mind, Redesign Your Life in Modern Age and the fourth, Exploring Life. His writings explored a whole gamut of subjects concerning our life and its spiritual nature, also focusing on how to master our lives in the contemporary world.
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#555', 
                        fontFamily: 'Georgia, serif', 
                        lineHeight: 1.8,
                        fontSize: '1.1rem'
                      }}
                    >
                     Balvinder Kumar IAS Author’s writing is greatly influenced not only by recent findings of neuroscientists and medical researchers but also by the teachings of the Buddhist tradition, Vedic philosophy, and the inspirations of contemporary spiritual teachers. He himself is a regular practitioner of yoga and mindfulness-based meditation.

He obtained his Master in Philosophy in Science from the University of Delhi and Master in Development Administration from the University of Birmingham, England, and has about 42 years of experience in public policies, administration, and management and at the peak of his career; he served as Secretary to the Government of India. 
Later, he briefly served as Vice-Chancellor of SGT University in Gurgaon, Haryana. He finally retire from Real Estate Regulatory Authority, UP as Member. 
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#555', 
                        fontFamily: 'Georgia, serif', 
                        lineHeight: 1.8,
                        fontSize: '1.1rem'
                      }}
                    >
                     His passions include artwork by way of oil and acrylic paintings on canvas. He has displayed his works through art exhibitions. The proceeds of those paintings were donated for the welfare of nearly 120 orphaned girls.
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#555', 
                        fontFamily: 'Georgia, serif', 
                        lineHeight: 1.8,
                        fontSize: '1.1rem'
                      }}
                    >
                   He is currently engaged in promoting mental well-being through his initiatives — Mind Therapy for holistic mental health, Breathwork Centre for deep breathing and self-healing practices, and Trending AI Tools, a platform exploring the power of AI across industries.
                    </Typography>
                  </Stack>
                </CardContent>
              </AnimatedCard>
            </Slide>
          </Grid>
          {/* Remove Published Works card from here */}
        </Grid>

        {/* Professional Journey and Published Works in one row */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Slide direction="right" in={visible} timeout={1800}>
              <AnimatedCard sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <IconContainer>
                      <School fontSize="large" />
                    </IconContainer>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: '#8b4513', 
                        fontFamily: 'Georgia, serif', 
                        fontWeight: 500,
                        ml: 2
                      }}
                    >
                      Professional Journey
                    </Typography>
                  </Box>
                  <Stack spacing={0}>
                    {education.map((edu, idx) => (
                      <Fade in={visible} timeout={2000 + idx * 300} key={idx}>
                        <TimelineItem>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: '#8b4513', 
                              fontFamily: 'Georgia, serif',
                              fontWeight: 700,
                              bgcolor: 'rgba(139, 69, 19, 0.1)',
                              px: 2,
                              py: 0.5,
                              borderRadius: '12px',
                              fontSize: '0.75rem',
                              display: 'inline-block',
                              mb: 1
                            }}
                          >
                            {edu.years}
                          </Typography>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              color: '#2c2c2c', 
                              fontFamily: 'Georgia, serif', 
                              fontWeight: 600,
                              mb: 1
                            }}
                          >
                            {edu.title}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: '#666', 
                              fontFamily: 'Georgia, serif',
                              lineHeight: 1.6
                            }}
                          >
                            {edu.desc}
                          </Typography>
                        </TimelineItem>
                      </Fade>
                    ))}
                  </Stack>
                </CardContent>
              </AnimatedCard>
            </Slide>
          </Grid>
          <Grid item xs={12} md={6}>
            <Slide direction="left" in={visible} timeout={1600}>
              <AnimatedCard>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconContainer>
                      <AutoStories fontSize="large" />
                    </IconContainer>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        color: '#8b4513', 
                        fontFamily: 'Georgia, serif', 
                        fontWeight: 500,
                        ml: 2
                      }}
                    >
                      Published Works
                    </Typography>
                  </Box>
                  <Stack spacing={1}>
                    {books.map((book, idx) => (
                      <Fade in={visible} timeout={1800 + idx * 200} key={idx}>
                        <StyledChip 
                          label={book}
                          sx={{ 
                            width: '100%',
                            justifyContent: 'flex-start',
                            '& .MuiChip-label': {
                              fontSize: '0.9rem',
                              fontWeight: 500,
                              textAlign: 'left',
                              width: '100%'
                            }
                          }}
                        />
                      </Fade>
                    ))}
                  </Stack>
                </CardContent>
              </AnimatedCard>
            </Slide>
          </Grid>
        </Grid>

        {/* Key Achievements row remains below */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Slide direction="left" in={visible} timeout={2000}>
              <AnimatedCard sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <IconContainer>
                      <EmojiEvents fontSize="large" />
                    </IconContainer>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: '#8b4513', 
                        fontFamily: 'Georgia, serif', 
                        fontWeight: 500,
                        ml: 2
                      }}
                    >
                      Key Achievements
                    </Typography>
                  </Box>
                  <Stack spacing={3}>
                    {achievements.map((achievement, idx) => (
                      <Fade in={visible} timeout={2200 + idx * 200} key={idx}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                          <Box sx={{ 
                            color: '#8b4513', 
                            mr: 2, 
                            mt: 0.5,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.2)',
                              color: '#a0522d'
                            }
                          }}>
                            {achievement.icon}
                          </Box>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              color: '#555', 
                              fontFamily: 'Georgia, serif',
                              lineHeight: 1.6,
                              fontSize: '1rem'
                            }}
                          >
                            {achievement.text}
                          </Typography>
                        </Box>
                      </Fade>
                    ))}
                  </Stack>
                  <Fade in={visible} timeout={3000}>
                    <Box sx={{ 
                      mt: 4, 
                      p: 3, 
                      background: 'linear-gradient(145deg, #f8f4f0, #e8e3db)', 
                      borderRadius: '16px',
                      border: '1px solid rgba(139, 69, 19, 0.1)'
                    }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#8b4513', 
                          fontFamily: 'Georgia, serif',
                          fontStyle: 'italic',
                          textAlign: 'center',
                          lineHeight: 1.6,
                          fontSize: '1rem'
                        }}
                      >
                        "Currently serving in the regulatory body of real estate in Uttar Pradesh, 
                        continuing his lifelong dedication to public service and governance."
                      </Typography>
                    </Box>
                  </Fade>
                </CardContent>
              </AnimatedCard>
            </Slide>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}