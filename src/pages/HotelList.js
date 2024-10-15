import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, Paper, Button } from '@mui/material';
import hotelService from '../services/hotelService';
import HotelSearch from '../components/HotelSearch';
import Pagination from '../components/Pagination';
import { CircularProgress, Box } from '@mui/material';
import BookingForm from '../components/BookingForm';

function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [city, setCity] = useState('');
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHotels();
  }, [page, city]);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const response = await hotelService.getHotels(page, city);
      setHotels(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
    setLoading(false);
  };

  const handleSearch = (searchCity) => {
    setCity(searchCity);
    setPage(0);
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage - 1);
  };

  const handleHotelSelect = (hotelId) => {
    setSelectedHotelId(hotelId);
    navigate(`/hotel/${hotelId}`);
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
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        List of hotels
      </Typography>
      <HotelSearch onSearch={handleSearch} />
      <Paper elevation={3} style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <List>
          {hotels.map((hotel) => (
            <ListItem key={hotel.id}>
              <ListItemText primary={hotel.name} secondary={hotel.city} />
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => handleHotelSelect(hotel.id)}
              >
                Select
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} />
      
      {selectedHotelId && <BookingForm hotelId={selectedHotelId} />}
    </Container>
  );
}

export default HotelList;