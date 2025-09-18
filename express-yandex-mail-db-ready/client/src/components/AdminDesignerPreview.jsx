
import styles from './AdminDesignerPreview.module.css'

export default function AdminCompanyPreview({designer}){
    return (
        <div className={styles.designerPreview}>
            <span>{designer.name}</span>
            <span>{designer.city}</span>
            <span>{designer.specialization}</span>
            <span>Выполнил заказов: {designer.ordersAmount}</span>
        </div>
    )
}