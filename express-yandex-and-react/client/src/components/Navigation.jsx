import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    const isAuthenticated = !!localStorage.getItem('token');
    
    return (
        <nav style={{ 
            background: '#f8f9fa', 
            padding: '10px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Link to="/">Главная</Link>
            
            <div>
                {isAuthenticated ? (
                    <Link to="/profile">Профиль</Link>
                ) : (
                    <Link to="/login">Войти</Link>
                )}
            </div>
        </nav>
    );
};

export default Navigation;