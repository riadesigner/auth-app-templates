import { Link, NavLink, useLocation } from 'react-router-dom';

import styles from '../components/OrderPreview.module.css'

export default function OrderPreview({order}){

    const companyId = order.company.id || null;
    const companyName = order.company.name || 'не указано';
    const dateTo = order.dateTo ? order.dateTo.split('T')[0] : '';

    return (
        <div className={styles.order}>
            <Link to={`/orders/${order.id}`}>
                <h2 className="subtitle is-size-6">{order.title || ''}</h2>
                <p>
                    {order.price || 0 }
                    &nbsp;<i className="fa-solid fa-ruble-sign is-size-6 is-primary" style={{opacity:.6}}></i>
                </p>
            </Link>
            <hr />
            <div className={styles.company}>
                <span>
                    <a href={`/companies/${companyId}`}>{companyName}</a>
                </span>                
                <div className="level mt-4">
                    <div className="level-item ">
                        <span className="is-size-7">
                            <i className="fa-solid fa-eye is-primary"></i> 2
                        </span>                        
                    </div>
                    <div className="level-item is-right is-size-7">
                        <span style={{opacity:.4}}><i className="fa-regular fa-calendar-days"></i></span>
                        <span>{dateTo}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}