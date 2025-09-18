import styles from '../components/AdminOrderPreview.module.css'

export default function AdminOrderPreview({order}){
    return (
    <div className={styles.order}>
        <span className="is-size-7">{order.title}</span>
        <span>{order.company}</span>
        <span>{order.price}</span>
    </div>        
    )
}
