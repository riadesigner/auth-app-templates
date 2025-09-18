import { Link, NavLink, useLocation } from 'react-router-dom';

import styles from '../components/CompanyPreview.module.css'

export default function CompanyPreview({company}){
    return(
        <a href={`/companies/${company.id}`}>
        <div id={company.id} className={styles.preview}>
            <h2 className="title is-size-5">{company.name}</h2>
        </div>
        </a>
    )
}