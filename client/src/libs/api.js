import axios from 'axios';

const api = axios.create({
  baseURL: 'https://kanban-api-5pni.onrender.com/api/v1',
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
