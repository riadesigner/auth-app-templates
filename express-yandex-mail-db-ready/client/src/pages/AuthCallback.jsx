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
      console.log('token = ', token)
    
      // const checkAuth = async ()=>{
      //       const response = await api.get('/auth/check-auth');
      //       console.log('response', response);
      //       if (response.data.isAuthenticated) {                
      //           const user = response.data.user;                

      //           switch(user.role){
      //             case 'designer': navigate('/cp/designer'); break;
      //             case 'company': navigate('/cp/company'); break;
      //             case 'manager': navigate('/cp/manager'); break;
      //             case 'administrator': navigate('/cp/yolk-admin'); break;
      //             default:navigate('/role-selection');
      //           }
                
      //       }else{
      //         navigate('/');
      //       }
      //   };
      // checkAuth();

    } else {      
       console.log('токен неопределен')
      //navigate('/login'); // Если токена нет
    }
  });

  return <div>Processing authentication...</div>;
}