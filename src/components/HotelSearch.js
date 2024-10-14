import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

function HotelSearch({ onSearch }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            label="Поиск по городу"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Поиск
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default HotelSearch;