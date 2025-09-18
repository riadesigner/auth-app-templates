
import useFetchNotifs from './hooks/useFetchNotifs'
import Pagination from '../components/Pagination'
import InboxMessage from '../components/InboxMessage'
import styles from './NotifsList.module.css'

export default function NotifsList(){

    const {        
        nowLoading,
        notifications,
        currentPage, 
        setCurrentPage,
        paginationParams,         
    } = useFetchNotifs();

    
    return (
        <section className="container">
            <div className="section">
                <article>
                    {
                        nowLoading ? (
                            <div>загружаем сообщения...</div>
                        ):(
                            <>      
                            <div className={styles.inboxMessages}>
                                {
                                    notifications.length > 0 ? notifications.map((msg)=>{
                                        return (
                                            <InboxMessage key={msg.id} messageData={msg} />
                                        )
                                    }):(
                                        <p className="block has-text-centered">Сообщений нет</p>
                                    )
                                }                                
                            </div>
                            <div className="block mt-6">
                                <Pagination 
                                    paginationParams={paginationParams}
                                    currentPage={currentPage} 
                                    setCurrentPage={setCurrentPage} 
                                />
                            </div>
                            </>
                        )
                    }                
                </article>
            </div>
        </section>        
    )
}