
import styles from './MainPageYoSliders.module.css'
import { getPayloads } from '../utils/payloads'

export default function MainPageYoSlider(){

    const savedUser = getPayloads();    
    const userRole = savedUser ? savedUser.role : 'unknown'; 

    const navTo = {
        'company':'/cp/company',
        'designer':'/cp/designer',
        'administrator':'/cp/yolk-admin',
        'unknown':'/login',
    }  
        
    return(
        <>
        <section className="container is-max-desktop desktop-only">             
            <div className="section">
                <div className={styles.yoSlider}>
                <svg width="4" height="1.5" viewBox="0 0 4 1.5"></svg>
                <div className={styles.yoSliderContainer}>                    
                    <div className="p-6" onClick={()=>{location.href=navTo[userRole]}}>
                        <h1 className="title is-size-3">Создай <br />свой<br /> профиль</h1>
                        <span></span>
                    </div> 
                    <div className="p-6" onClick={()=>{location.href='/designers'}}>
                        <h1 className="title is-size-3">Найди <br />своего<br /> дизайнера</h1>
                        <span></span>
                    </div> 
                    <div className="p-6" onClick={()=>{location.href='/orders'}}>
                        <h1 className="title is-size-3" >Найди<br />свой<br />заказ</h1>
                        <span></span>
                    </div>
                </div> 
                </div>
            </div>        
        </section> 
        <div className="mobile-only">
        <section className="container mb-5">         
            <div className="section yo-main-tasks">                    
                <div className="block " onClick={()=>{location.href=navTo[userRole]}}>
                    <h1 className="title is-size-5">Создай свой профиль</h1>
                    <i className="fa-solid fa-arrow-right"></i>
                </div> 
                <div className="block " onClick={()=>{location.href='/designers'}}>                    
                    <h1 className="title is-size-5">Заполни свое портфолио</h1>
                    <i className="fa-solid fa-arrow-right"></i>
                </div> 
                <div className="block " onClick={()=>{location.href='/orders'}}>
                    <h1 className="title is-size-5">Найди свой заказ</h1>
                    <i className="fa-solid fa-arrow-right"></i>
                </div>
            </div>        
        </section> 
        </div>
        </>                 
    )
}