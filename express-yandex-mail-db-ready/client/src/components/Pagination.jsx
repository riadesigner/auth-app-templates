import styles from './Pagination.module.css'

export default function Pagination({paginationParams, currentPage, setCurrentPage}){

    console.log('paginationParams', paginationParams)
    const {
         totalPages,
         hasNextPage,
         hasPrevPage,
         nextPage,
         prevPage,
    } = paginationParams;

    const hdlClick = (page)=>{
        setCurrentPage(page);
    }

    return(
        <>
        <div className={styles.pageLinks}>        
            {
                (
                    <>
                    {hasPrevPage && (<a href={`#page=${prevPage}`} onClick={()=>hdlClick(prevPage)}>Назад</a>)}
                    <span>{`${currentPage} / ${totalPages||1}`}</span>
                    {hasNextPage && (<a href={`#page=${nextPage}`} onClick={()=>hdlClick(nextPage)}>Вперед</a>)}
                    </>
                )
            }        
        </div> 
        </>
    )
}