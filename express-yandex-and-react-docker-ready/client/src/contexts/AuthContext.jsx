import { createContext, useState, useContext } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {  

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('jwt')
  );

  const login = (token) => {
    localStorage.setItem('jwt', token);
    setIsAuthenticated(true);
    console.log('Login executed'); // Для отладки
  };  

  const logout = async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('jwt');
    setIsAuthenticated(false);    
    console.log('Logout executed'); // Для отладки
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}