import { useState } from 'react';
import styles from '../components/PublicPortfolioItem.module.css'


export default function PublicPortfolioItem(props){

    const {id, images, title, forEdit, hdlDelete, hdlEdit} = props;

    const [showConfirm, setShowConfirm] = useState(false);
    const hdlConfirmShow = (e)=>{
        e.preventDefault();
        setShowConfirm(true);
    }
    const hdlConfirmHide = (e)=>{
        e.preventDefault();
        setShowConfirm(false);
    }        

    let imageToShow = ['','','','']
    imageToShow = imageToShow.map((im,i)=>{
        return images[i]?images[i]:im;        
    })

    return (               
        <div className="box p-5">
        <div className={styles.portItem}>
            <div className={styles.imagesBlock}>
                {
                    imageToShow && (
                        imageToShow.map((im, i)=>{                            
                            return im ? (
                                <span key={im.key} style={{
                                    background:`url(${im.url}) no-repeat center/100%`
                                }}></span>
                            ):(
                                <span key={i} ></span>
                            )
                        })
                    )
                }
            </div>
            <h1 className='title is-size-5 is-size-6-mobile mb-0 mt-3'>{title}</h1>            
            {
                forEdit && (
                    <div className="level mt-3">
                        <div className="level-item">                    
                            <button onClick={(e)=>hdlConfirmShow(e)} className="button is-small">X</button>
                        </div>
                        <div className="level-item is-right">
                            <button className="button is-primary is-small" onClick={(e)=>hdlEdit(e, id)}>Редактировать</button>
                        </div>
                    </div>
                )
            }
            {
                showConfirm && (
                <div className={styles.confirmWindow}>
                    <div className="has-text-centered">
                        <h2 className="title">Действительно удалить?</h2>
                        <button className="button mr-5 is-primary" onClick={(e)=>hdlConfirmHide(e)} >Отмена</button>
                        <button className="button is-danger" onClick={(e)=>hdlDelete(e, id)}>Да, удалить</button>                    
                    </div>
                </div>
                )
            }
        </div>    
        </div>     
    )
}