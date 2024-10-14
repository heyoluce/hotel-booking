import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import bookingService from '../services/bookingService';

function BookingForm({ hotelId }) {
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleBooking = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await bookingService.createBooking({
        hotelId,
        checkIn,
        checkOut,
        guests
      });
      setSuccess('Booking success!');
    } catch (error) {
      setError('Error! Try again.');
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '1rem', marginTop: '1rem' }}>
      <Typography variant="h6" gutterBottom>
        Форма бронирования
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="primary">{success}</Typography>}
      <form onSubmit={handleBooking}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>Дата заезда</Typography>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              dateFormat="dd/MM/yyyy"
              className="date-picker"
              isClearable
              placeholderText="Pick the date"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>Дата выезда</Typography>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              dateFormat="dd/MM/yyyy"
              className="date-picker"
              isClearable
              placeholderText="Pick the date"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Count of guests"
              type="number"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              OK
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default BookingForm;
