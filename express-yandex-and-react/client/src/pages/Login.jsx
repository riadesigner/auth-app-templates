import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Login = () => {
  
  const navigate = useNavigate();

  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/yandex';
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Используем настроенную копию axios (а не нативный fetch) как интерцептор
        // Интерцептор созранит jwt токен и обработает ошибки
        const response = await api.get('/check-auth');        
        if (response.data.isAuthenticated) {
          navigate('/profile');
        } 
      } catch (error) {                
        console.log('Пользователь не аутентифицирован. Необходимо заново войти', error);
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="login-container">
      <h1>Вход в систему</h1>
      <button onClick={handleLogin} className="yandex-login-btn">
        Войти через Яндекс
      </button>      
    </div>
  );
};

export default Login;