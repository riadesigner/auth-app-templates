import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {

    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    const dologout = () => {
        logout();
        navigate('/');
    };
    
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
                    <>
                        <Link to="/profile">Профиль</Link> &nbsp;
                        <button onClick={dologout}>Выйти</button>
                    </>
                ) : (
                    <Link to="/login">Войти</Link>
                )}
            </div>
        </nav>
    );
};

export default Navigation;