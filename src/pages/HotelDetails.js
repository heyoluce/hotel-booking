import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, Button } from '@mui/material';
import hotelService from '../services/hotelService';
import BookingForm from '../components/BookingForm';
import { CircularProgress, Box } from '@mui/material';

function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    fetchHotelDetails();
  }, [id]);

  const fetchHotelDetails = async () => {
    try {
      const response = await hotelService.getHotelById(id);
      setHotel(response.data);
    } catch (error) {
      console.error('Error fetching hotel details:', error);
    }
    setLoading(false);
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height="100vh" 
    >
      <CircularProgress /> 
    </Box>
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {hotel.name}
      </Typography>
      <Paper elevation={3} style={{ padding: '1rem', marginBottom: '1rem' }}>
        <Typography variant="h6">Город: {hotel.city}</Typography>
        <Typography>Адрес: {hotel.address}</Typography>
        <Typography>Рейтинг: {hotel.rating}</Typography>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowBookingForm(!showBookingForm)}
      >
        {showBookingForm ? 'Скрыть форму бронирования' : 'Забронировать'}
      </Button>
      {showBookingForm && <BookingForm hotelId={id} />}
    </Container>
  );
}

export default HotelDetails;