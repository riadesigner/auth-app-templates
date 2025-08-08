import { useEffect, useState } from 'react';
import api from '../../utils/api';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/user');
        setUser(response.data);
      } catch (err) {
        console.error('Ошибка загрузки профиля', err);
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