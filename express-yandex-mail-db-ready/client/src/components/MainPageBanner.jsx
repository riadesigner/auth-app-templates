import { Link } from 'react-router-dom';
import coworkImage from '../i/cowork-02.jpg'
import { useAuth } from '../contexts/AuthContext';
import { getPayloads } from '../utils/payloads'

export default function SiteBanner(){

    const { isAuthenticated } = useAuth();

    const savedUser = getPayloads();    
    const userRole = savedUser ? savedUser.role : 'unknown'; 

    const navTo = {
        'company':'/cp/company',
        'designer':'/cp/designer',
        'administrator':'/cp/yolk-admin',
        'unknown':'/login',
    }     
    
return (
    <section className="container is-fluid ">
        <div className="section">
        <div className="banner is-link yo-top-banner">    
            <div className="banner-image" style={{ 
                background: 
                    `var(--link-color) 
                    url(${coworkImage}) 
                    no-repeat 50% 50% /cover !important`                
            }}></div>            
            <div className="banner-body">
                <p className="title is-size-1 is-size-2-mobile ">Yolk – это сайт по подбору разовых заказов</p>
                <p className="mb-6 mb-5-mobile">Выбирай работу, собирай портфолио и развивайся</p>

                {
                    <Link to={navTo[userRole]}>
                    <button className="button is-link is-large is-regular-mobile is-inverted mt-4">                
                        <span>{
                            isAuthenticated ? (<>Войти</>):(<>Начать</>)
                            }</span>
                        <span className="icon"><i className="fa-solid fa-arrow-right"></i></span>                
                    </button>
                    </Link>        
                }

            </div>        
        </div> 
        </div>              
    </section>    
)
}