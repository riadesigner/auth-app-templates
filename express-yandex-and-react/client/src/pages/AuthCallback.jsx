import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');    
    console.log('jwt token = ', token);

    if (token) {
      localStorage.setItem('jwt', token);      
      window.history.replaceState({}, '', '/'); // Очищаем URL

      navigate('/profile'); // Перенаправляем в личный кабинет
    } else {
      navigate('/login'); // Если токена нет
    }



  });

  return <div>Processing authentication...</div>;
}