import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/api/hotels';

const hotelService = {
  getHotels: async (page , city = '') => {
    return axios.get(`${API_URL}`, { headers: authHeader() });
  },

  getHotelById: async (id) => {
    return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
  },

  searchHotels: async (city, page = 0) => {
    return axios.get(`${API_URL}/city/${city}`, { headers: authHeader() });
  }
};

export default hotelService;