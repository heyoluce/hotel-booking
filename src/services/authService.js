import axiosInstance from './axiosInstance'

const authService = {
  login: async (username, password) => {
      const response = await axiosInstance.post('/login', {  username, password });
      if (response.data.id && response.data.accessToken && response.data.refreshToken) {
          localStorage.setItem('user', JSON.stringify({
              id: response.data.id,
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken
          }));
      }
      return response.data;
  },
  
  register: async (name, username, password) => {
      return axiosInstance.post('/register', { name, username, password });
  },
  
  logout: () => {
      localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
      return JSON.parse(localStorage.getItem('user'));
  },

  refreshToken: async (refreshToken) => {
      const response = await axiosInstance.post('/refresh', { refreshToken });
      if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify({
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken
          }));
      }
      return response.data;
  }
};

export default authService;
