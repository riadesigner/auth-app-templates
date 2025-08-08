import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Login = () => {
  
  const navigate = useNavigate();

  const [errMessage, setErrMessage] = useState('');

  const handleLogin = () => {
    // Открываем окно авторизации Яндекс
    window.location.href = 'http://localhost:3000/auth/yandex';
  };


useEffect(() => {
  const checkAuth = async () => {
    try {
      // 1. Используем ваш настроенный экземпляр axios (не нативный fetch)
      const response = await api.get('/check-auth');
      
      console.log('response = ', response);

      // 2. Интерцептор уже добавит токен и обработает ошибки
      if (response.data.isAuthenticated) {
        navigate('/profile');
      } else {
        navigate('/login');
      }
    } catch (error) {
      // 3. Ошибка уже обработана в интерцепторе, но можно добавить доп. логику
      console.error('Проверка авторизации не удалась:', error);
      navigate('/login');
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
      {
        errMessage && (
          <p>{errMessage}</p>
        )
      }
    </div>
  );
};

export default Login;