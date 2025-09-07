import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Carousel from 'react-material-ui-carousel';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Home1 from '../assets/images/home_new.JPEG';
import Footer from '../components/footer';
import MindTherapy from '../assets/images/mindtherapy.png';
import BreathworkCentre from '../assets/images/breathwork.png';
import TrendingAI from '../assets/images/trendingaitool.png';
import breathworkImg from '../assets/images/breathwork.png';
import aboutOneImg from '../assets/images/about-one.png';
import mindTherapyImg from '../assets/images/mindtherapy.png';
import trendingAiToolImg from '../assets/images/trendingaitool.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../Api';
import MyBook from '../assets/images/image.png';

// Constants
const COLORS = {
  background: '#f5f2ed',
  backgroundLight: '#faf8f5',
  textPrimary: '#2c2c2c',
  textSecondary: '#666',
  textLight: '#888',
  shadowHover: 'rgba(139, 69, 19, 0.15)'
};

const TYPOGRAPHY = {
  fontFamily: 'Georgia, serif',
  headingFontWeight: 300,
  bodyFontWeight: 400
};

const slides = [
  {
    title: "We Have Been Designed to Survive",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    description: "Explore the science and philosophy behind human resilience and longevity."
  },
  {
    title: "New Age Maladies",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    description: "A look at modern challenges to mental and physical health."
  },
  {
    title: "11 Great Lessons About Life",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    description: "Timeless wisdom for a meaningful and fulfilling life."
  }
];

const services = [
  {
    icon: "🧠",
    title: "Mind Therapy",
    description: "Nurturing mental health through holistic solutions and mindful practices.",
    link: "#"
  },
  {
    icon: "🧘‍♂️",
    title: "Breathwork Centre",
    description: "Healing begins with the right breath. Explore pranayam and natural healing techniques.",
    link: "#"
  },
  {
    icon: "🤖",
    title: "Trending AI Tools",
    description: "Discover the best AI tools & websites to empower your journey and stay ahead.",
    link: "#"
  }
];

// Scroll Animation Hook
const useScrollAnimation = () => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return [elementRef, isVisible];
};

// Animated Section Component
export const AnimatedSection = ({ children, delay = 0 }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <Box
      ref={ref}
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
      }}
    >
      {children}
    </Box>
  );
};

export default function Home() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [fade, setFade] = useState(false);
  const [paintings, setPaintings] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [videos, setVideos] = useState([]);

  // Fetch paintings
  const fetchPaintings = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/front/front_image`);
      // Assuming response.data.images is an array of image URLs or objects
      setPaintings(response.data.images || []);
    } catch (error) {
      console.error('Error fetching paintings:', error);
    }
  };

  // Fetch blogs
  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/front/recentblogdetail`);
      setBlogPosts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  // Fetch videos
  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/front/fornt_iframe`);
      setVideos(response.data.iframe || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    fetchPaintings();
    fetchBlogPosts();
    fetchVideos();
  }, []);

  const totalPages = Math.ceil(paintings.length / 3);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages && newPage !== currentPage) {
      setFade(true);
      setTimeout(() => {
        setCurrentPage(newPage);
        setFade(false);
      }, 200);
    }
  };

  const nextPage = () => {
    const newPage = currentPage + 1 < totalPages ? currentPage + 1 : 0;
    handlePageChange(newPage);
  };

  const prevPage = () => {
    const newPage = currentPage - 1 >= 0 ? currentPage - 1 : totalPages - 1;
    handlePageChange(newPage);
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextPage();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentPage, paintings.length]);
  
  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #faf8f5 0%, #f5f0e8 100%)',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 20%, rgba(139, 69, 19, 0.03) 0%, transparent 50%)',
          }
        }}
      >
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid
            container
            spacing={0}
            alignItems="center"
            justifyContent="center"
            sx={{
              minHeight: { xs: 500, md: 520 },
            }}
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                pr: { md: 6 },
                mt: { xs: 6, md: 0 },
              }}
            >
              <AnimatedSection delay={0.2}>
                <Box
                  sx={{
                    textAlign: { xs: 'center', md: 'left' },
                    maxWidth: 600,
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      fontWeight: 300,
                      color: '#2c2c2c',
                      mb: 4,
                      fontFamily: 'Georgia, serif',
                      lineHeight: 1.2,
                      letterSpacing: '-0.02em',
                    }}
                  >
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: '1.25rem',
                      color: '#666',
                      mb: 6,
                      fontFamily: 'Georgia, serif',
                      lineHeight: 1.6,
                      fontWeight: 300,
                    }}
                  >
                    Welcome to my personal world of ideas, insights, and creativity. You'll find thought-provoking blog articles, featured essays, published books, original paintings, and my YouTube channel - reflecting my journey through spirituality, mental well-being, philosophy and modern life. 
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: '1.25rem',
                      color: '#666',
                      mb: 6,
                      fontFamily: 'Georgia, serif',
                      lineHeight: 1.6,
                      fontWeight: 300,
                    }}
                  >
                    Whether you're here for reflection, learning, or inspiration, this is a window into the thoughts and creations I’ve nurtured over the years.
                  </Typography>
                </Box>
              </AnimatedSection>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-start' },
                alignItems: 'center',
                mt: { xs: 4, md: 0 },
              }}
            >
              <AnimatedSection>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: { xs: 320, sm: 400, md: 400 },
                    height: { xs: 320, sm: 400, md: 400 },
                    background: '#fff',
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 12px 48px rgba(139, 69, 19, 0.13)',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    '&:hover': {
                      transform: 'scale(1.04)',
                      boxShadow: '0 24px 64px rgba(139, 69, 19, 0.20)',
                    },
                  }}
                >
                  <img
                    src={Home1}
                    alt="Home"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </Box>
              </AnimatedSection>
            </Grid>
          </Grid>
        </Container>
      </Box>

     
      <Box sx={{ bgcolor: '#fafafa', py: 10 }}>
        <Container maxWidth="lg">
          <AnimatedSection>
            <Typography
              variant="h5"
              align="center"
              sx={{
                mb: 8,
                color: '#2c2c2c',
                fontFamily: 'Georgia, serif',
                fontWeight: 300,
                fontSize: '2rem',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -12,
                  left: '45%',
                  transform: 'translateX(0)',
                  width: '5%',
                  height: 3,
                  bgcolor: '#8b4513',
                  borderRadius: 2,
                }
              }}
            >
             Explore My Initiatives: Mind Therapy, Breathwork Centre & Trending AI Tools 
            </Typography>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <Carousel
              navButtonsAlwaysVisible={false}
              navButtonsProps={{
                style: { display: 'none' }
              }}
              indicators={false}
              sx={{ maxWidth: 900, mx: 'auto' }}
              autoPlay={true}
              interval={3500}
              animation="slide"
              swipe={true}
              cycleNavigation={true}
              stopAutoPlayOnHover={false}
            >
              {[
                {
                  title: "Mind Therapy",
                  description: "This image is from our Mind Therapy website. Here, you can experience transformative mental wellness sessions with expert therapists.",
                  image: MindTherapy,
                  link: "https://mindtherapy.com"
                },
                {
                  title: "Breathwork Centre",
                  description: "This image is from our Breathwork Centre website. Here, you can join breathwork programs to rejuvenate your mind and body.",
                  image: BreathworkCentre,
                  link: "https://breathworkcentre.com"
                },
                {
                  title: "Trending AI Tools",
                  description: "This image is from our Trending AI Tools website. Here, you can explore the latest AI tools that are revolutionizing productivity and creativity.",
                  image: TrendingAI,
                  link: "https://trendingaitools.com"
                }
              ].map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: { xs: 2, md: 4 },
                    gap: 4,
                  }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.title}
                    sx={{
                      width: { xs: '100%', md: 440 },
                      height: { xs: 200, md: 300 },
                      objectFit: 'cover',
                      borderRadius: 4,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                      mr: { md: 4 },
                      mb: { xs: 2, md: 0 }
                    }}
                  />
                  <Box sx={{ maxWidth: 400, display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 500,
                        color: '#2c2c2c',
                        mb: 2,
                        fontFamily: 'Georgia, serif',
                        textAlign: { xs: 'center', md: 'left' }
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#666',
                        mb: 3,
                        lineHeight: 1.7,
                        fontFamily: 'Georgia, serif',
                        textAlign: { xs: 'center', md: 'left' }
                      }}
                    >
                      {item.description}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        bgcolor: '#8b4513',
                        color: '#fff',
                        fontFamily: 'Georgia, serif',
                        fontWeight: 500,
                        borderRadius: 2,
                        px: 4,
                        py: 1.2,
                        textTransform: 'none',
                        boxShadow: '0 2px 8px rgba(139,69,19,0.08)',
                        '&:hover': {
                          bgcolor: '#6b3210'
                        },
                        alignSelf: { xs: 'center', md: 'flex-start' }
                      }}
                    >
                      Visit Website
                    </Button>
                  </Box>
                </Box>
              ))}
            </Carousel>
          </AnimatedSection>
        </Container>
      </Box>

      <Box sx={{ py: 10, bgcolor: '#fafafa' }}>
        <Container maxWidth="lg">
          <AnimatedSection>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="h5"
                sx={{
                  color: '#2c2c2c',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 300,
                  fontSize: '2rem',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: 3,
                    bgcolor: '#8b4513',
                    borderRadius: 2,
                  }
                }}
              >
                Latest Articles
              </Typography>
            </Box>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div
              className="blog-grid"
              style={{
                maxWidth: 1200,
                margin: '0 auto',
                padding: '0 16px 40px 16px',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 24,
              }}
            >
              {blogPosts.map((post, idx) => (
                <div
                  key={post.bl_id || idx}
                  className="blog-card-container"
                  style={{ marginBottom: 0, cursor: 'pointer' }}
                  onClick={() => navigate(`/blog/${post.bl_id}`)}
                >
                  <div
                    className="blog-card"
                    style={{
                      background: '#fff',
                      borderRadius: 16,
                      boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '326px',
                      width: '100%',
                      cursor: 'pointer',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      position: 'relative',
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.transform = 'scale(1.04)';
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.13)';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.07)';
                    }}
                  >
                    <div style={{ position: 'relative' }}>
                      <img
                        src={post.image}
                        alt={post.title}
                        style={{
                          width: '100%',
                          height: 180,
                          objectFit: 'cover',
                          transition: 'transform 0.3s',
                        }}
                      />
                      {/* Optional: Overlay on hover */}
                      <div
                        className="blog-img-overlay"
                        style={{
                          position: 'absolute',
                          top: 0, left: 0, right: 0, bottom: 0,
                          background: 'rgba(0,0,0,0.08)',
                          opacity: 0,
                          transition: 'opacity 0.3s',
                          pointerEvents: 'none',
                        }}
                      />
                    </div>
                    <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <span style={{ color: '#888', fontSize: 14 }}>{post.category}</span>
                      <h3 style={{ fontSize: '15px', fontWeight: 600, margin: '12px 0 0 0', color: '#222' }}>{post.title}</h3>
                    </div>
                    {/* By Balvinder Kumar in bottom right corner */}
                    <div
                      style={{
                        position: 'absolute',
                        right: 12,
                        bottom: 12,
                        background: 'rgba(255,255,255,0.85)',
                        padding: '2px 10px',
                        borderRadius: 8,
                        fontSize: 12,
                        color: '#8b4513',
                        fontFamily: 'Georgia, serif',
                        fontWeight: 500,
                        pointerEvents: 'none',
                        zIndex: 2,
                        boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                      }}
                    >
                      by Balvinder Kumar
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/blog')}
                sx={{
                  borderColor: '#8b4513',
                  color: '#8b4513',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 500,
                  borderRadius: 2,
                  px: 4,
                  py: 1.2,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#6b3210',
                    color: '#6b3210',
                    bgcolor: 'rgba(139,69,19,0.04)'
                  }
                }}
              >
                Read More Articles
              </Button>
            </Box>
          </AnimatedSection>
        </Container>
      </Box>
      <Box sx={{py: 10 }}>
        <Container maxWidth="lg">
          <AnimatedSection delay={0.3}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="h5"
                sx={{
                  color: '#2c2c2c',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 300,
                  fontSize: '2rem',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: 3,
                    bgcolor: '#8b4513',
                    borderRadius: 2,
                  }
                }}
              >
                My YouTube Channel 'Exploring Life'
              </Typography>
            </Box>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 3,
              mb: 6,
            }}>
              {videos.map((video, idx) => (
                <Box
                  key={video.id || idx}
                  sx={{
                    position: 'relative',
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    bgcolor: '#fff',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                    }
                  }}
                >
                  {/* YouTube Iframe */}
                  <Box sx={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                    <div
                      className="responsive-iframe-wrapper"
                      style={{ width: '100%', height: '100%' }}
                      dangerouslySetInnerHTML={{ __html: video.iframe }}
                    />
                  </Box>
                  {/* Video Info */}
                  <Box sx={{ p: 2 }}>
                    <Typography
                      sx={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#2c2c2c',
                        mb: 1,
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {video.title || `YouTube Video ${idx + 1}`}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        color: '#666',
                        fontFamily: 'Georgia, serif',
                      }}
                    >
                      {video.views || ''}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </AnimatedSection>

          <AnimatedSection delay={0.5}>
            <Box sx={{ textAlign: 'center'}}>
              <Button
                variant="outlined"
                component="a"
                href="https://www.youtube.com/@exploringlife4769"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderColor: '#8b4513',
                  color: '#8b4513',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 500,
                  borderRadius: 2,
                  px: 4,
                  py: 1.2,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#6b3210',
                    color: '#6b3210',
                    bgcolor: 'rgba(139,69,19,0.04)'
                  }
                }}
              >
                Visit Exploring Life
              </Button>
            </Box>
          </AnimatedSection>
        </Container>
      </Box>  

    
      {/* Paintings Section */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <AnimatedSection>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="h5"
                sx={{
                  color: '#2c2c2c',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 300,
                  fontSize: '2rem',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: 3,
                    bgcolor: '#8b4513',
                    borderRadius: 2,
                  }
                }}
              >
                Art & Creativity- Paintings
              </Typography>
            </Box>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <Box sx={{ position: 'relative', mb: 6 }}>
              {/* Paintings Grid */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                  gap: 4,
                  mb: 6,
                  opacity: fade ? 0 : 1,
                  transition: 'opacity 0.3s ease',
                }}
              >
                {paintings.slice(currentPage * 3, currentPage * 3 + 3).map((painting, index) => (
                  <Box
                    key={`${currentPage}-${index}`}
                    sx={{
                      position: 'relative',
                      overflow: 'hidden',
                      bgcolor: '#fff',
                      borderRadius: 3,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      transition: 'all 0.5s ease',
                      height: '420px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                        '& img': {
                          transform: 'scale(1.05)',
                        },
                        '& .overlay': {
                          opacity: 1,
                        }
                      }
                    }}
                  >
                    <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                      <img
                        src={typeof painting === 'string' ? painting : painting.images}
                        alt={painting.title || `Painting ${currentPage * 3 + index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          minHeight: 0,
                          objectFit: 'cover',
                          display: 'block',
                          flex: 1,
                          transition: 'transform 0.7s ease',
                        }}
                      />
                    </Box>
                    {/* Hover overlay */}
                    <Box
                      className="overlay"
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: 'rgba(0,0,0,0.2)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#fff',
                          fontFamily: 'Georgia, serif',
                          fontWeight: 500,
                          fontSize: '1.125rem',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                          '&:hover': {
                            opacity: 1,
                          }
                        }}
                      >
                        Painting {String(currentPage * 3 + index + 1).padStart(2, '0')}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Navigation Arrows */}
              <IconButton
                onClick={prevPage}
                sx={{
                  position: 'absolute',
                  left: -20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: '#fff',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                  },
                  zIndex: 2,
                }}
              >
                <ArrowBackIosNewIcon sx={{ color: '#8b4513' }} />
              </IconButton>

              <IconButton
                onClick={nextPage}
                sx={{
                  position: 'absolute',
                  right: -20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: '#fff',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                  },
                  zIndex: 2,
                }}
              >
                <ArrowForwardIosIcon sx={{ color: '#8b4513' }} />
              </IconButton>
            </Box>
          </AnimatedSection>
        </Container>
      </Box>

      <Box sx={{ py: 10, bgcolor: '#fafafa' }}>
        <Container maxWidth="lg">
          <AnimatedSection>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="h5"
                sx={{
                  color: '#2c2c2c',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 300,
                  fontSize: '2rem',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: 3,
                    bgcolor: '#8b4513',
                    borderRadius: 2,
                  }
                }}
              >
                My Latest Book (Buy Now)
              </Typography>
            </Box>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                bgcolor: '#fff',
                borderRadius: 4,
                p: 6,
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                maxWidth: 1000,
                mx: 'auto',
              }}
            >
              {/* Book Image */}
              <Box
                sx={{
                  flexShrink: 0,
                  width: { xs: 280, sm: 320, md: 280 },
                  height: { xs: 400, sm: 450, md: 400 },
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  }
                }}
              >
                <img
                    src={MyBook}
                    alt="My Book"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </Box>

              {/* Book Content */}
              <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: '#2c2c2c',
                    fontFamily: 'Georgia, serif',
                    fontWeight: 400,
                    mb: 3,
                    fontSize: { xs: '1.75rem', md: '2rem' },
                  }}
                >
                  EXPLORING LIFE
                </Typography>
                
                <Typography
                  variant="body1"
                  sx={{
                    color: '#666',
                    mb: 4,
                    lineHeight: 1.8,
                    fontFamily: 'Georgia, serif',
                    fontSize: '1.1rem',
                    maxWidth: 500,
                  }}
                >
                 Exploring Life by Balvinder Kumar blends science and spirituality to guide readers through life’s emotional and mental challenges. Covering topics like happiness, stress, aging, and spiritual growth, it offers simple, insightful tools for inner peace and personal transformation.
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: '#8b4513',
                    fontFamily: 'Georgia, serif',
                    fontWeight: 500,
                    mb: 4,
                    fontSize: '1rem',
                  }}
                >
                  by Balvinder Kumar
                </Typography>

                <Button
                  variant="contained"
                  href="https://www.amazon.in/EXPLORING-LIFE-balvinder-kumar/dp/9355781415"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    bgcolor: '#8b4513',
                    color: '#fff',
                    fontFamily: 'Georgia, serif',
                    fontWeight: 500,
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 16px rgba(139,69,19,0.2)',
                    '&:hover': {
                      bgcolor: '#6b3210',
                      boxShadow: '0 6px 20px rgba(139,69,19,0.3)',
                    },
                  }}
                >
                  Buy Now on Amazon
                </Button>
              </Box>
            </Box>
          </AnimatedSection>
        </Container>
      </Box>

      

    

     

      
      

      <Footer />
    </Box>
  );
}