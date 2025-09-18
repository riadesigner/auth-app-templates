import { Link, NavLink, useLocation } from 'react-router-dom';

import PortfolioItem from "./PortfolioItem"

import styles from './Portfolio.module.css'

import img1 from "/portf/p-1.jpg"
import img2 from "/portf/p-2.jpg"
import img3 from "/portf/p-3.jpg"

export default function Portfolio({items=[], publicMode}){

    const portfolioItems = [
        {id:'1', title:'Проект с длинным названием, 2025', img:img1, linkTo:''},
        {id:'2', title:'Проект с названием, 2024', img:img2, linkTo:''},
        {id:'3', title:'Фирменный стиль для компании Новый день, 2012', img:img3, linkTo:''},
        {id:'4', title:'Разработка логотипа для рекламной кампании Opel, Москва, 2010', img:'', linkTo:''},
        {id:'5', title:'Разработка иллюстраций для книги Сказки волщебного лотоса, Владивосток, 2016', img:'', linkTo:''},
        {id:'6', title:'Разработка оформления праздничного городского трамвая, 2001', img:'', linkTo:''},
    ]
    console.log('publicMode', publicMode);

    const pItems = portfolioItems.slice(0, 4);



    return(
        <>
        <div className="columns is-6 is-1-mobile">
            <div className="column is-8">                
                <div className={styles.portfolio}>                    
                    <div className="columns">
                    {
                        pItems.map((p, i)=>{
                            return(
                                <PortfolioItem 
                                    key={i}
                                    title={p.title} 
                                    img={p.img} 
                                    linkto={p.linkTo} 
                                />
                            )
                        })
                    }
                    </div>            
                </div>
            </div>
            <div className="column is-4 is-right">
                    <div className="has-text-right ">
                        {                         
                        publicMode ? (               
                            <>
                            <Link to="/designers/123/portfolio">
                            <button className="button is-link">
                                 <span>Смотреть</span>
                                <span><i className="fa-solid fa-arrow-right"></i></span>                 
                            </button>                            
                            </Link>
                            <p className='is-size-6 mt-4'>Опубликовано проектов: 3</p>                            
                            </>
                        ):(
                            <>
                            <button className="button is-primary is-small mb-3 ">
                                    <span><i className="fa-regular fa-pen-to-square"></i></span>
                                    <span>Редактировать</span>
                                </button><br />
                                <Link to="/designers/123/portfolio">
                                <button className="button is-link is-small">
                                    <span><i className="fa-solid fa-share-from-square"></i></span>                            
                                    <span>Смотреть на сайте</span>                            
                                </button>                        
                                </Link>                             
                            </>
                        )}

                    </div>
                    
            </div>
        </div>        
        </>
    )
}