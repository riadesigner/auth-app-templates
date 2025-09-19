import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api'

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  // const checkUser

  useEffect( () => {    
    const token = searchParams.get('token');     
    if (token) {      
      login(token); 
      window.history.replaceState({}, '', '/'); // Очищаем URL      
    
      const checkAuth = async ()=>{
            const response = await api.get('/auth/check-auth');
            console.log('response', response);
            if (response.data.isAuthenticated) {                
                const user = response.data.user;
                switch(user.role){
                  case 'client': navigate('/cp/client-admin'); break;
                  case 'administrator': navigate('/cp/admin'); break;
                  default: navigate('/'); // если роль пользователя неизвестна
                }
            }else{
              navigate('/login'); // Если не прошел аутентификацию
            }
        };
      checkAuth();
    } else {            
      navigate('/login'); // Если токена нет
    }
  }, []);

  return (
      <section className="section">
        <div className="container">
          <div>Processing authentication...</div>;
        </div>
      </section>
  )  
}