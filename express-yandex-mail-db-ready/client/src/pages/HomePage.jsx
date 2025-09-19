// import MainPageBanner from '../components/MainPageBanner'
import { useAuth } from '../contexts/AuthContext';
import {getPayloads} from '../utils/payloads'
export default function HomePage(){
    
    const {isAuthenticated} = useAuth();

    const pl = getPayloads();
    

    const userRole = pl?.role || 'unknown' ;
    const arrLinks = {
        administrator: '/cp/admin',
        client: '/cp/client-admin',
        unknown: '/login'
    }

    return(
        <>
        <section className="section">
            <div className="container">
            {
                !isAuthenticated ? (
                    <div><a href="/login">Войти</a></div>
                ):(
                    <div><a href={arrLinks[userRole]}>Войти личный кабинет</a></div>
                )
            }                
            </div>            
        </section>
            
        </>
    )
}