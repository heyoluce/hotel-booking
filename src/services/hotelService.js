import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/api/hotels';

const hotelService = {
  getHotels: async (page = 0, city = '') => {
    const url = city ? `${API_URL}/city/${city}?page=${page}` : `${API_URL}?page=${page}`;
    return axios.get(url, { headers: authHeader() });
  },

  getHotelById: async (id) => {
    return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
  },

  searchHotels: async (city, page = 0) => {
    return axios.get(`${API_URL}/city/${city}?page=${page}`, { headers: authHeader() });
  },

  createHotel: async (hotelData) => {
    return axios.post(API_URL, hotelData, { headers: authHeader() });
  },

  updateHotel: async (id, hotelData) => {
    return axios.put(`${API_URL}/${id}`, hotelData, { headers: authHeader() });
  },

  deleteHotel: async (id) => {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
  }
};

export default hotelService;
