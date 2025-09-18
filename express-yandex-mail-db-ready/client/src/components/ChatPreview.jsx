import styles from '../components/ChatPreview.module.css'

export default function ChatPreview({chatId, user, lastMessage}){
    const title = user?`${user.name} ${user.surname}`:'Неизвестный чат';
    const linkToChat = `/chats/${chatId}`;
    return(
        <a href={linkToChat}>
        <div className={styles.preview}>
            <div>
                <div className={styles.avatar}
                    style={{
                        background:`url(${user.avatar}) no-repeat center/cover`
                    }}
                ></div>
            </div>
            <div>
                <h3 className="subtitle is-size-7 mb-1">{title}</h3>
                <p className="is-size-7 mb-0">{lastMessage}</p>
            </div>
        </div>
        </a>
    )
}