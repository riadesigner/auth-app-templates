import styles from './AdminOrdersFilter.module.css'

export default function OrdersFilter(){
    return(
        <>
        <div className="block mt-0">
            <h2 className="subtitle is-size-6 mb-4">Сортировка</h2>
            <button className="button is-fluid mb-4 is-primary">
                <span>По дате</span>
                <span><i className="fa-solid fa-angle-down"></i></span>
            </button>
            <button className="button is-fluid mb-4 ">
                <span>По стоимости</span>
                <span><i className="fa-solid fa-angle-down"></i></span>                        
            </button>
        </div>
        
        <div className="block">
            <h2 className="subtitle is-size-6 mb-4">Категории</h2>
            <button className="button is-fluid mb-4 is-link is-left">
                <span>Вакантные (10)</span>                
                <span><i className="fa-solid fa-arrow-right"></i></span>                
            </button> 
            <button className="button is-fluid mb-4 is-left">
                <span>Есть исполнитель (1)</span>                
                <span><i className="fa-solid fa-arrow-right"></i></span>                
            </button>
            <button className="button is-fluid mb-4 is-left">
                <span>В работе (2)</span>                
                <span><i className="fa-solid fa-arrow-right"></i></span>                
            </button>
            <button className="button is-fluid mb-4 is-left">
                <span>Архив (5)</span>                
                <span><i className="fa-solid fa-arrow-right"></i></span>                
            </button>
            <button className="button is-fluid mb-4 is-left">
                <span>Удаленные (1)</span>                
                <span><i className="fa-solid fa-arrow-right"></i></span>                
            </button>            
        </div>

        <div className="block">
            <h2 className="subtitle is-size-6 mb-4">Статистика</h2>
            <div>
                данные в работе
            </div> 
        </div>
        

        </>
    )
}