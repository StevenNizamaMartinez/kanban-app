import axios from 'axios';

const api = axios.create({
  baseURL: 'https://kanban-api-lovat.vercel.app/',
  withCredentials: true
})

export default api;
