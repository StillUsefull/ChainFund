import axios from 'axios';
import { baseUrl } from '@utils/baseUrl';


const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};


const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true 
});


api.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) {
    config.headers['Authorization'] = `${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;