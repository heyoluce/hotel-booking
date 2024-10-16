import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/api/bookings';

const bookingService = {
  createBooking: async (bookingData) => {
    return axios.post(API_URL, bookingData, { headers: authHeader() });
  },

  getBookingById: async (id) => {
    return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
  },

  getUserBookings: async (userId, page = 0) => {
    return axios.get(`${API_URL}/user/${userId}?page=${page}`, { headers: authHeader() });
  },

  updateBooking: async (id, updatedBooking) => {
    return axios.put(`${API_URL}/${id}`, updatedBooking, { headers: authHeader() });
  },

  deleteBooking: async (userId, id) => {
    return axios.delete(`${API_URL}/${userId}/${id}`, { headers: authHeader() });
  },

  cancelBooking: async (userId, id) => {
    return axios.patch(`${API_URL}/cancel/${userId}/${id}`, {}, { headers: authHeader() });
  }
};

export default bookingService;
