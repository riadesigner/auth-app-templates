
import styles from './AdminCompanyPreview.module.css'

export default function AdminCompanyPreview({company}){
    return (
        <div className={styles.companyPreview}>
            <span>{company.name}</span>
            <span>{company.city}</span>
            <span>{company.specialization}</span>
            <span>Заказов всего: {company.ordersAmount}</span>
        </div>
    )
}