import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getPayloads } from '../utils/payloads'

export default function SeconMenu(){
    
    const dologout = () => {
        logout();
        navigate('/');
    };

    const navigate = useNavigate();
    const location = useLocation();
    
    const { isAuthenticated, logout } = useAuth();
    
    const savedUser = getPayloads();    
    const userRole = savedUser ? savedUser.role : 'unknown'; 

    console.log('savedUser', savedUser)
    
    const navTo = {
        'company':'/cp/company',
        'designer':'/cp/designer',
        'administrator':'/cp/yolk-admin',
        'unknown':'/',
    } 
    
    return(
        <div className="second-menu">

            {
                isAuthenticated ? (
                    <div className="second-menu-private">
                        <div className="level">
                            <div className="level-item">
                                <div className="tabs is-boxed ">                
                                    <ul>
                                        <li><a href="#"><i className="fa-regular fa-envelope"></i></a></li>                                        
                                        <li><a href="#"><i className="fa-regular fa-bell"></i></a></li>

                                        <li className={location.pathname === navTo[userRole] ? "is-active" : ""}>
                                            <NavLink to={navTo[userRole]}><i className="fa-regular fa-user"></i></NavLink>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                            <div className="desktop-only">
                            <div className="level-item">
                                <button className="button"  onClick={dologout}>                            
                                    <span><i className="fa-solid fa-arrow-right-from-bracket"></i></span>                
                                </button>                        
                            </div>
                            </div>
                        </div>
                    </div> 
                ):(
                    <div className="second-menu-public">
                        <div className="tabs is-right is-boxed ">                
                        <ul>                          
                            <li className={location.pathname === "/login" ? "is-active" : ""}>
                            <NavLink to="/login" end className="nav-link">Вход / Регистрация</NavLink></li>
                        </ul>
                        </div>
                    </div>
                )
            }
    </div>          
    )
}