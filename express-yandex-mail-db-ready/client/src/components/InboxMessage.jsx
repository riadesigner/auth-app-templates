
import styles from './InboxMessage.module.css'
import {formatDateTime} from '../utils/dateUtilits'

const hdlClick = (e, url)=>{
    e.preventDefault()
    console.log('url', url)
    document.location.href=url;
}

export default function InboxMessage({messageData}){    
    const date = formatDateTime(messageData.createdAt);
    return (         
        <div className={styles.message} id={messageData.id}>            
            
            <div className={styles.messageBell} ><i className={`fa-regular fa-bell is-primary`}></i></div>
            <h3>{messageData.title}</h3>
            <small>{date}</small>
            <div className={styles.messageLinks}>
                {
                    messageData.links && messageData.links.length>0 && messageData.links.map((link, index)=>{
                        return (
                            <button key={index} 
                                className={`button ml-2 mt-2 is-small ${link.bright ? 'is-link' : 'is-primary'}`}
                                onClick={(e)=>hdlClick(e, link.url)} >
                                {link.name}
                            </button>
                        )
                    })
                }                     
            </div>
        </div>
    )
}