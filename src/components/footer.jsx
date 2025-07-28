import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import logo from '../assets/images/logo.png';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#f5f2ed',
        borderTop: '1px solid #e8e0d6',
        py: 6,
        mt: 'auto',
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{
                  width: 337,
                  height: 86,
                  objectFit: 'contain',
                }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: '#7a6a53',
                fontFamily: 'Georgia, serif',
                lineHeight: 1.6,
              }}
            >
              Embark on a transformative journey of self-discovery, inner peace, and enlightenment. 
              Explore spirituality, mindfulness, and the wisdom of ancient teachings.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                color: '#8b4513',
                fontWeight: 600,
                mb: 2,
                fontFamily: 'Georgia, serif',
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['About Me', 'Blog', 'Gallery', 'YouTube Videos', 'Contact Us'].map((link) => (
                <Link
                  key={link}
                  href="#"
                  sx={{
                    color: '#7a6a53',
                    textDecoration: 'none',
                    fontFamily: 'Georgia, serif',
                    '&:hover': {
                      color: '#8b4513',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {link}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact & Social */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                color: '#8b4513',
                fontWeight: 600,
                mb: 2,
                fontFamily: 'Georgia, serif',
              }}
            >
              Connect With Us
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#7a6a53',
                mb: 2,
                fontFamily: 'Georgia, serif',
              }}
            >
              Follow us on social media for daily inspiration and spiritual insights.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                sx={{
                  color: '#8b4513',
                  '&:hover': { bgcolor: 'rgba(139, 69, 19, 0.1)' },
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: '#8b4513',
                  '&:hover': { bgcolor: 'rgba(139, 69, 19, 0.1)' },
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: '#8b4513',
                  '&:hover': { bgcolor: 'rgba(139, 69, 19, 0.1)' },
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: '#8b4513',
                  '&:hover': { bgcolor: 'rgba(139, 69, 19, 0.1)' },
                }}
              >
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box
          sx={{
            borderTop: '1px solid #e8e0d6',
            mt: 4,
            pt: 3,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#7a6a53',
              fontFamily: 'Georgia, serif',
            }}
          >
            © 2025 Balvinder Kumar. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer; 