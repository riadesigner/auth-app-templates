import { Link, NavLink, useLocation } from 'react-router-dom';

export default function SiteMobileMenu(){
    const location = useLocation();

    return(
        <>
        <div className="navbar-burger mobile-only"> <span></span> <span></span> <span></span></div>
        <div className="navbar" id="navbar-mobile">
            <ul className="navbar-menu">        
                
                <li className={location.pathname === "/" ? "is-active" : ""}>
                    <NavLink className="nav-link" to="/">Главная</NavLink></li>
                
                <li className={location.pathname === "/about" ? "is-active" : ""}>
                    <NavLink className="nav-link" to="/about">О нас</NavLink></li>
                
                <li className={location.pathname === "/faq" ? "is-active" : ""}>
                    <NavLink className="nav-link" to="/faq">FAQ</NavLink></li>
                
                <li className={location.pathname === "/startup" ? "is-active" : ""}>
                    <NavLink className="nav-link" to="/startup">Страница стартапа</NavLink></li>

            </ul>
        </div>
        </>
    )
}