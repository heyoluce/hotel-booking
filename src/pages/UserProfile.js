import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, TextField, Button, Paper, CircularProgress, Box } from '@mui/material'; 
import { AuthContext } from '../context/AuthContext';
import bookingService from '../services/bookingService';

function UserProfile() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.id) {
      fetchUserBookings();
    } else {
      setLoading(false); 
      setError('User not found.'); 
    }
  }, [user]);

  const fetchUserBookings = async () => {
    setLoading(true);
    setError(null); 
    try {
      const response = await bookingService.getUserBookings(user.id);
      setBookings(response.data.content || []); 
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      setError('Failed to fetch bookings.'); 
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (userId, bookingId) => {
    try {
      await bookingService.cancelBooking(userId, bookingId); 
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId)); 
    } catch (error) {
      console.error('Error cancelling booking:', error);
      setError('Failed to cancel booking.');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress /> 
      </Box>
    );  
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User profile
      </Typography>
      <Paper elevation={3} style={{ padding: '1rem', marginBottom: '1rem' }}>
        <Typography variant="h6">Info about you</Typography>
        <TextField
          fullWidth
          label="Username"
          value={user ? user.username : ''} 
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
      </Paper>
      {error && <Typography color="error">{error}</Typography>} {}
      <Typography variant="h6" gutterBottom>
        Your bookings
      </Typography>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <Paper key={booking.id} elevation={3} style={{ padding: '1rem', marginBottom: '1rem' }}>
            <Typography variant="body1"><strong>Hotel ID:</strong> {booking.hotelId}</Typography>
            <Typography variant="body1"><strong>Check-in Date:</strong> {new Date(booking.checkInDate).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
            <Typography variant="body1"><strong>Check-out Date:</strong> {new Date(booking.checkOutDate).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
            <Typography variant="body1"><strong>Total Price:</strong> {booking.totalPrice}$ </Typography>
            <Typography variant="body1"><strong>Status:</strong> {booking.isActive ? 'Active' : 'Cancelled'}</Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleCancelBooking(user.id, booking.id)} 
              style={{ marginTop: '0.5rem' }}
              disabled={!booking.isActive} 
            >
              Cancel booking
            </Button>
          </Paper>
        ))
      ) : (
        <Typography>You don't have bookings yet.</Typography>
      )}
    </Container>
  );
}

export default UserProfile;
