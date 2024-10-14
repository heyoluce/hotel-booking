import React from 'react';
import { Container, Typography, Button } from '@mui/material'; // Изменил путь импорта

import { Link as RouterLink } from 'react-router-dom';

function Home() {
  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem', textAlign: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Добро пожаловать в систему бронирования отелей
      </Typography>
      <Typography variant="body1" paragraph>
        Найдите и забронируйте лучшие отели для вашего путешествия.
      </Typography>
      <Button variant="contained" color="primary" component={RouterLink} to="/hotels">
        Начать поиск
      </Button>
    </Container>
  );
}

export default Home;
