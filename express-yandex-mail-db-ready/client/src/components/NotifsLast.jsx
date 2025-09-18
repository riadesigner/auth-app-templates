
import InboxMessage from '../components/InboxMessage'

export default function NotifsLast(props){

    const {nowLoading, notifications, linkToAll} = props;

    return (
            <div className="column is-6">
                <h2 className="is-size-5-mobile">Сообщения</h2>
                {
                    nowLoading ? (
                        <div>Загрузка...</div>
                    ):(
                    <div className="inbox-messages" id="inbox-messages">
                        {
                            notifications && notifications.length > 0 ? notifications.map((msg)=>{
                                return (
                                    <InboxMessage key={msg.id} messageData={msg} />
                                )
                            }):(
                                <p className="block has-text-centered">Сообщений нет</p>
                            )
                        }                 
                        <p className="has-text-centered"><a href={linkToAll}>Показать все сообщения</a></p>
                    </div> 
                    )
                }                            
            </div>               
    )
}