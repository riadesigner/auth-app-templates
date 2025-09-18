import { Link, NavLink, useNavigate} from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function ClientAdminPage(){

    const dologout = () => {
        logout();
        navigate('/');
    };

    const navigate = useNavigate();    

    const { isAuthenticated, logout } = useAuth();

    return (
        <>
        <section className="section">
            <div className="container">
                <h1 className="title">Кабинет пользователя (клиента)</h1>
                <div><a href="/">На главную</a></div>
                <br/>
                <br/>
                {
                    isAuthenticated ? (
                        <button className="button"  onClick={dologout}>                            
                            <span><i className="fa-solid fa-arrow-right-from-bracket"></i></span>                
                        </button>                           
                    ):(
                        <>
                        <h2 className="title is-size-6">Вы не прошли аутентификацию</h2>
                        <a href="/login">Войти</a>                        
                        </>                        
                    )
                }
                
            </div>            
        </section>        
            
        </>
    )
}