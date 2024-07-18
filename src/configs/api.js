import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_ENDPOINT_URL,
});

export default api;
