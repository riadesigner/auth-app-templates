import { Link, NavLink, useLocation } from 'react-router-dom';

import styles from '../components/DesignerPreview.module.css'

export default function DesignerPreview({designer}){    

    console.log('designer', designer);
    
    const images = [];
    designer.portfolios.map((p)=>{
        p.images.map((i)=>{
            images.push(i);
        })
    });

    const headerImages = images.length > 3 ? images.slice(0,2): images;    

    const linkAnketa = `/designers/${designer.id}`;
    const linkPortfolio = `/designers/${designer.id}/portfolio`;
    
    return(
        <div className={styles.preview}>
            
            <div className={styles.previewHeader}>
                {
                    headerImages.map((img)=>{
                        return img && <div key={img.key} style={{
                            background:`url(${img.url}) no-repeat center/cover`
                        }}></div>                         
                    })
                }
            </div>

            <Link to={linkAnketa}>
            <div className={styles.avatar} style={{
                background:`red url(${designer.avatar}) no-repeat center/cover`
            }}></div>
            </Link>

            <div className={styles.fio}>                
                <p className="mb-0">{designer.name} {designer.surname}</p>
                {
                    designer.city && (
                        <p className="is-size-7">г. {designer.city}</p>    
                    )
                }
            </div>
            
            <div className="block mt-5 mb-0">
                        <Link to={linkAnketa}>
                        <button className="button is-small is-link is-inverted mr-2 ">
                            <span><i className="fa-regular fa-user"></i></span>
                            <span>Анкета</span>
                        </button>
                        </Link>
                        <Link to={linkPortfolio}>
                        <button className="button is-small is-link is-inverted">Портфолио</button>                        
                        </Link>
            </div>
        </div>
    )
}