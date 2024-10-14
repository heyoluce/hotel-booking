import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/auth';

const authService = {
  login: async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },
  
  register: async (username, email, password) => {
    return axios.post(`${API_URL}/register`, { username, email, password });
  },
  
  logout: () => {
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },

  refreshToken: async (refreshToken) => {
    const response = await axios.post(`${API_URL}/refresh`, { refreshToken });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }
};

export default authService;