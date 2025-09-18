import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

export default function LoginPage(){

    const hdlYandexLogin = () => {
        window.location.href = 'http://localhost:3000/auth/yandex';
    };

    const hdlMailruLogin = () => {
        window.location.href = 'http://localhost:3000/auth/mailru';
    };        

    // const navigate = useNavigate();
    // const [searchParams] = useSearchParams();
    // const error = searchParams.get('error');  

    // useEffect(() => {
    //     const checkAuth = async () => {
    //         try {
    //             const response = await api.get('/auth/check-auth');
    //             console.log('response', response);
    //             if (response.data.isAuthenticated) {                
    //                 console.log(' готов перейти в личный кабинет')
    //             }             
    //         } catch (err) {                
    //             console.log('Пользователь не аутентифицирован. Необходимо заново войти', err);
    //         }
    //     };
    //     checkAuth();
    // }, []);

    return(
        <>
            <section className="container is-max-desktop desktop-only">
            <div className="section">
                <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li><a href="/">Главная</a></li>
                    <li className="is-active"><a href="#" aria-current="page">Авторизация</a></li>
                </ul>
                </nav>
            </div>
            </section>
            <section className="container is-max-desktop">
            <div className="section site-content">
                <article>
                    <div className="box">
                        <h2 className="title has-text-centered mt-6 mt-3-mobile mb-0">Выберите способ входа:</h2>
                        <div className="pages">
                            <div className="page is-centered">
                                <div className="loggin-block">
                                    <button className="button is-large is-regular-mobile is-link" onClick={hdlYandexLogin}>Войти через Яндекс</button><br />
                                    <button className="button is-large is-regular-mobile is-link" onClick={hdlMailruLogin}>Войти через Mail.ru</button>
                                </div>                    
                            </div>
                        </div>            
                        <div className="block">
                            <p className="has-text-centered is-size-7-mobile">
                                <i className="fa-solid fa-check"></i> &nbsp;                                
                                Я согласен с <Link to="/useragree">политикой обработки персональных данных</Link>
                            </p>
                        </div>
                    </div>
                </article>
            </div>
            </section>            
        </>
    )
}