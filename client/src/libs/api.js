import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
  withCredentials: true
})

api.interceptors.request.use(config => {
  // agregar encabezados a la solicitud
  config.headers = {
    'Content-Type': 'application/json',
    'SameSite': 'none'
  };
  return config;
});

export default api;
