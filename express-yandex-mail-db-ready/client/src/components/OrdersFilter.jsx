import { useParams } from 'react-router-dom'
import styles from './OrdersFilter.module.css'
import { useLocation, Link } from 'react-router-dom';

export default function OrdersFilter({userCategories, setUserCategories}){

    const params = useParams();
    const {userInput} = params;

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const date = searchParams.get('date') || '';
    const price = searchParams.get('price') || '';    
    const defaultSort = !date && !price;

    const hdlCatClick = (e, catId)=>{
        console.log('catId', catId);
        const newSelections = [
            ...userCategories,
        ]
        newSelections.map((cat)=>{
            if(cat.id===catId){
                cat.selected = !cat.selected;
            }
        })        
        setUserCategories(newSelections);
    }

    const hdlDateFilter = ()=>{
        window.location.href = `/orders?date=${date==='up'?'down':'up'}`;
    } 

    const hdlPriceFilter = ()=>{
        window.location.href = `/orders?price=${price==='up'?'down':'up'}`;
    }     

    return(
        <>

        {
            userInput && (
                <>
                <div className="block mt-0">
                    <h2 className="subtitle is-size-6 mb-4">Найдено</h2>
                    <p>По запросу: {userInput}</p>                    
                </div>                
                <hr />
                </>
            )
        }

        <div className="block mt-0">
            <h2 className="subtitle is-size-6 mb-4">Сортировка</h2>
            <button className={`button is-fluid mb-4 ${defaultSort ? 'is-primary' : date && 'is-primary'}`} onClick={hdlDateFilter}>
                <span>По дате</span>
                <span><i className={`fa-solid ${defaultSort ? 'fa-angle-down' : date==='up'? 'fa-angle-up' : 'fa-angle-down'}`}></i></span>
            </button>
            <button className={`button is-fluid mb-4 ${price && !date && 'is-primary'}`} onClick={hdlPriceFilter}>
                <span>По стоимости</span>
                <span><i className={`fa-solid ${price==='up' ? 'fa-angle-up' : 'fa-angle-down'}`}></i></span>
            </button>
        </div>
        
        <div className="block">
            <h2 className="subtitle is-size-6 mb-4">Категории</h2>
            {
                userCategories.length > 0 &&                     
                    userCategories.map((cat)=>{
                        return (                            
                            cat.selected ? (
                            <button key={cat.id} className="button is-fluid mb-4 is-left is-link" onClick={(e)=>{hdlCatClick(e, cat.id)}}>
                                <span><i className="fa-regular fa-square-check"></i></span>
                                <span>{cat.name}</span>                
                            </button>                            
                            ):(
                            <button key={cat.id} className="button is-fluid mb-4 is-left" onClick={(e)=>{hdlCatClick(e, cat.id)}}>
                                <span>{cat.name}</span>                
                            </button>
                            )
                        )
                    })               
            }

        </div>

        {/* <div className="block">
            <h2 className="subtitle is-size-6 mb-4">Теги</h2>
            <div className={styles.tags}>
            <button className="button is-small">Графический дизайн</button>
            <button className="button is-small">Веб</button>
            <button className="button is-small">Видео</button>
            <button className="button is-small">Фирменный стиль</button>               
            <button className="button is-small">UI Kit</button>
            <button className="button is-small">3D</button>
            </div> 
        </div> */}
        

        </>
    )
}