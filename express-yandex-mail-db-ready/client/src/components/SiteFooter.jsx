import { Link, NavLink, useLocation } from 'react-router-dom';

import imgFooterLogo from '../i/yolk-logo.svg'

export default function SiteFooter(){
    // const location = useLocation();
    return (
        <>
        <section className="container is-max-desktop mt-6 yo-footer">
            <div className="section ">
                <div className="level">
                    <div className="level-item is-left">
                        <Link to="/"><img className="yo-footer-logo" 
                            src={imgFooterLogo} 
                            alt="" 
                            style={{
                            height: '40px'
                        }} /></Link>
                    </div>
                    <hr className="mobile-only" />
                    <div className="level-item is-right yo-footer-menu">                
                        
                        <NavLink to="/about"
                        className={({ isActive }) => isActive ? "level-item nav-link is-active" : "level-item nav-link" }
                        >О нас</NavLink>

                        <NavLink to="/faq" 
                        className={({ isActive }) => isActive ? "level-item nav-link is-active" : "level-item nav-link" }
                        >FAQ</NavLink>

                        <NavLink to="/startup" 
                        className={({ isActive }) => isActive ? "level-item nav-link is-active" : "level-item nav-link" }
                        >Страница стартапа</NavLink>                

                    </div>                
                </div>
            </div>         
        </section>


        <section className="container">
            <div className="section">
            <h2 className="subtitle is-size-6 mb-3">Временное меню</h2>
            <Link to='/chats/123'>Чат с дизайнером</Link><br />
            </div>
        </section>

        <div className="site-footer mt-5"></div>       
        </>
    )
} 