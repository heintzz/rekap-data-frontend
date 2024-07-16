import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getToken, isTokenExpired } from 'utils/auth';
import { getUser, logout } from 'utils/auth';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = getToken();
      const loggedUser = getUser();
      if (token && !isTokenExpired(token)) {
        setIsAuthenticated(true);
        setUser(loggedUser);
      } else if (token) {
        setIsAuthenticated(false);
        setUser(null);
        logout();
        navigate('/login');
        toast.error('Sesi berakhir. Mohon login lagi.');
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
