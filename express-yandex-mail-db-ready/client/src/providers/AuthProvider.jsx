// providers/AuthProvider.jsx
import { useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function AuthProvider({ children }) {  

  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('jwt'));

  const login = (token) => {
    localStorage.setItem('jwt', token);
    setIsAuthenticated(true);
    console.log('Login executed'); // Для отладки
  };  

  const logout = async () => {
    // await api.post('/auth/logout');
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