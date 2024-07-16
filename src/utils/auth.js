import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const removeToken = () => Cookies.remove('accessToken');
const removeUser = () => Cookies.remove('user');

export const getToken = () => Cookies.get('accessToken');
export const setToken = (token) => Cookies.set('accessToken', token);
export const setUser = (user) => Cookies.set('user', JSON.stringify(user));
export const getUser = () => {
  return Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
};

export const logout = () => {
  removeToken();
  removeUser();
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  const decoded = jwtDecode(token);
  return decoded.exp * 1000 < Date.now();
};
