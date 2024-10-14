import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, TextField, Button, Paper, CircularProgress, Box } from '@mui/material'; 
import { AuthContext } from '../context/AuthContext';
import bookingService from '../services/bookingService';

function UserProfile() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const fetchUserBookings = async () => {
    try {
      const response = await bookingService.getUserBookings();
      setBookings(response.data.content);
    } catch (error) {
      console.error('Ошибка при получении бронирований пользователя:', error);
    }
    setLoading(false);
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await bookingService.cancelBooking(bookingId); 
      setBookings(bookings.filter((booking) => booking.id !== bookingId)); 
    } catch (error) {
      console.error('Ошибка при отмене бронирования:', error);
    }
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100vh" 
      >
        <CircularProgress /> 
      </Box>
    );  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Профиль пользователя
      </Typography>
      <Paper elevation={3} style={{ padding: '1rem', marginBottom: '1rem' }}>
        <Typography variant="h6">Информация о пользователе</Typography>
        <TextField
          fullWidth
          label="Имя пользователя"
          value={user.username}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          fullWidth
          label="Email"
          value={user.email}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
      </Paper>
      <Typography variant="h6" gutterBottom>
        Ваши бронирования
      </Typography>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <Paper key={booking.id} elevation={3} style={{ padding: '1rem', marginBottom: '1rem' }}>
            <Typography>Отель: {booking.hotelName}</Typography>
            <Typography>Дата заезда: {new Date(booking.checkIn).toLocaleDateString()}</Typography>
            <Typography>Дата выезда: {new Date(booking.checkOut).toLocaleDateString()}</Typography>
            <Typography>Количество гостей: {booking.guests}</Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleCancelBooking(booking.id)} // добавлена обработка отмены бронирования
              style={{ marginTop: '0.5rem' }}
            >
              Отменить бронирование
            </Button>
          </Paper>
        ))
      ) : (
        <Typography>У вас пока нет бронирований.</Typography>
      )}
    </Container>
  );
}

export default UserProfile;
