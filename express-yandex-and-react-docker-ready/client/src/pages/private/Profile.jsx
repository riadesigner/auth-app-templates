import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {

    console.log('Auth status changed:', isAuthenticated);

    const fetchUser = async () => {
      try {
        const response = await api.get('/user');
        setUser(response.data);
      } catch (err) {
        console.error('Ошибка загрузки профиля', err);
        navigate('/login');
      }
    };
    
    fetchUser();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>Профиль</h1>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Загрузка...</p>
      )}      
    </div>
  );
}

export default Profile;