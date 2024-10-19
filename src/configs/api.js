import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_ENDPOINT_URL,
  key: import.meta.env.VITE_AUTH_KEY,
  password: import.meta.env.VITE_AUTH_PASSWORD,
});

export default api;
