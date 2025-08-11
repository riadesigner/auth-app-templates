import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {    
    const token = searchParams.get('token');     
    if (token) {      
      login(token);      
      window.history.replaceState({}, '', '/'); // Очищаем URL
      navigate('/profile'); // Перенаправляем в личный кабинет
    } else {
      navigate('/login'); // Если токена нет
    }
  });

  return <div>Processing authentication...</div>;
}