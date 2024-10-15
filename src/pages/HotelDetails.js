import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Grid, Typography, Paper, Alert } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import bookingService from '../services/bookingService';
import authService from '../services/authService';

const BookingForm = () => {
  const { id: hotelId } = useParams(); // Assuming your route is set up to use id as a parameter
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUserId(currentUser.id);
      } catch (error) {
        console.error('Error fetching current user:', error);
        setError('Unable to fetch user information. Please try again later.');
      }
    };
    fetchUser();
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Check if hotelId and userId are valid
    if (!hotelId) {
      setError('Hotel ID is missing. Please make sure you are on the correct page.');
      return;
    }

    if (!userId) {
      setError('User information is not available. Please log in and try again.');
      return;
    }

    // Ensure check-in and check-out dates are selected
    if (!checkInDate || !checkOutDate) {
      setError('Please select both check-in and check-out dates.');
      return;
    }

    try {
      console.log('Booking data:', { hotelId, userId, checkInDate, checkOutDate });
      await bookingService.createBooking({
        hotelId,
        userId,
        checkInDate,
        checkOutDate,
        isActive: true,
      });
      setSuccess('Booking successful!');
    } catch (error) {
      console.error('Booking error:', error);
      setError('Error occurred while booking. Please try again.');
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '1rem', marginTop: '1rem' }}>
      <Typography variant="h6" gutterBottom>
        Booking Form for Hotel ID: {hotelId || 'Not specified'}
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <form onSubmit={handleBooking}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>Check-in Date</Typography>
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              selectsStart
              startDate={checkInDate}
              endDate={checkOutDate}
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
              className="date-picker"
              isClearable
              placeholderText="Select check-in date"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>Check-out Date</Typography>
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              selectsEnd
              startDate={checkInDate}
              endDate={checkOutDate}
              minDate={checkInDate || new Date()}
              dateFormat="dd/MM/yyyy"
              className="date-picker"
              isClearable
              placeholderText="Select check-out date"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!hotelId || !userId}
            >
              Book Now
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default BookingForm;
