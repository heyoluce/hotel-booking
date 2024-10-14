import React from 'react';
import { Container, Typography, Button } from '@mui/material'; // Изменил путь импорта

import { Link as RouterLink } from 'react-router-dom';

function Home() {
  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem', textAlign: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to hotel booking system
      </Typography>
      <Typography variant="body1" paragraph>
        Find and book best hotels for your travel!
      </Typography>
      <Button variant="contained" color="primary" component={RouterLink} to="/hotels">
        Start
      </Button>
    </Container>
  );
}

export default Home;
