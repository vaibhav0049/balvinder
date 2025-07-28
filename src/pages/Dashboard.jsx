import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import { 
  Dashboard as DashboardIcon, 
  Article as ArticleIcon, 
  Image as ImageIcon, 
  YouTube as YouTubeIcon,
  Category as CategoryIcon 
} from '@mui/icons-material';

const stats = [
  {
    title: "Total Blog Posts",
    value: "24",
    icon: <ArticleIcon />,
    color: "#1976d2",
    description: "Published articles"
  },
  {
    title: "Categories",
    value: "6",
    icon: <CategoryIcon />,
    color: "#388e3c",
    description: "Content categories"
  },
  {
    title: "Images",
    value: "18",
    icon: <ImageIcon />,
    color: "#f57c00",
    description: "Uploaded resources"
  },
  {
    title: "YouTube Videos",
    value: "12",
    icon: <YouTubeIcon />,
    color: "#d32f2f",
    description: "Published videos"
  }
];

export default function Dashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, color: 'primary.main' }}>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box 
                    sx={{ 
                      p: 1, 
                      borderRadius: 2, 
                      backgroundColor: `${stat.color}20`,
                      color: stat.color,
                      mr: 2
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.description}
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {stat.title}
                </Typography>
              </CardContent>
              
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button 
                  size="small" 
                  color="primary"
                  sx={{ textTransform: 'none' }}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              variant="contained" 
              fullWidth 
              startIcon={<ArticleIcon />}
              sx={{ py: 2, textTransform: 'none' }}
            >
              Create New Post
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              variant="outlined" 
              fullWidth 
              startIcon={<ImageIcon />}
              sx={{ py: 2, textTransform: 'none' }}
            >
              Upload Image
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              variant="outlined" 
              fullWidth 
              startIcon={<YouTubeIcon />}
              sx={{ py: 2, textTransform: 'none' }}
            >
              Add Video
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              variant="outlined" 
              fullWidth 
              startIcon={<CategoryIcon />}
              sx={{ py: 2, textTransform: 'none' }}
            >
              Manage Categories
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
} 