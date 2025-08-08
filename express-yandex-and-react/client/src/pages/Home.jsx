import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Добро пожаловать!</h1>
            <p>Это главная страница приложения</p>
            
            <div style={{ marginTop: '20px' }}>
                <Link 
                    to="/login" 
                    style={{
                        padding: '10px 20px',
                        background: '#007bff',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '5px',
                        display: 'inline-block'
                    }}
                >
                    Войти (через Яндекс, Mail.ru и тд)
                </Link>
            </div>
        </div>
    );
};

export default Home;