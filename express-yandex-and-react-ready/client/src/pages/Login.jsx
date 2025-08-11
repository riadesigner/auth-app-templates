import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import styles from './Login.module.css'


const Login = () => {
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');  

  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/yandex';
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Используем настроенную копию axios (а не нативный fetch) как интерцептор
        // Интерцептор созранит jwt токен и обработает ошибки
        const response = await api.get('/check-auth');        
        console.log('response = ', response);

        if (response.data.isAuthenticated) {
          // navigate('/profile');
        } 
      } catch (err) {                
        console.log('Пользователь не аутентифицирован. Необходимо заново войти', err);
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <div className="login-container">      
      <h1>Вход в систему</h1>
      <button onClick={handleLogin} className={styles.yandexLoginBtn}>
        Войти через Яндекс
      </button>

      {error === 'session_expired' && (
        <div className="alert alert-warning">
          Ваша сессия истекла. Пожалуйста, войдите снова.
        </div>
      )}
      
      {error === 'auth_failed' && (
        <div className="alert alert-danger">
          Ошибка авторизации. Попробуйте еще раз.
        </div>
      )}
                  
    </div>
    </div>
  );
};

export default Login;