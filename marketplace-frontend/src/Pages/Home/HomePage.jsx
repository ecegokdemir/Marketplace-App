import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

export let customerReview = "https://res.cloudinary.com/lamadev/image/upload/v1723775242/posts/hg53q30etrcgrohhn7m3.jpg";

const HomePage = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Grid container spacing={2} alignItems="center">
        {/* Sol Taraf - Yazı */}
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 3 }}>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{
                fontWeight: 'bold',
                color: '#333',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome to Our Marketplace!
            </Typography>
            <Typography 
              variant="body1" 
              sx={{
                fontSize: '1.2rem',
                color: '#555',
                lineHeight: 1.6,
                fontStyle: 'italic',
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
              }}
            >
              Discover a wide range of products from different sellers. You can explore various categories, find the best deals, and enjoy a seamless shopping experience.
            </Typography>
          </Box>
        </Grid>

        {/* Sağ Taraf - Resim */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="https://res.cloudinary.com/dxguqzge7/image/upload/v1682838761/Book_lc6ikb.jpg"
            alt="Customer Review"
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
