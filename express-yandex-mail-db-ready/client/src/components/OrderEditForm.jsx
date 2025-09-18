import Field from '../components/Field'

export default function OrderEditForm({options}){
    
    const {
        title,
        setTitle,
        description,
        setDescription,
        cats,
        setCats,
        tags,
        setTags,        
        price,
        setPrice,
        dateTo,
        setDateTo,
    } = options;    

    const hdlCatClick = (e, catId)=>{
        e.preventDefault();
        const newCats = [...cats];
        newCats.map((cat)=>{
            if(cat.id===catId){
                return cat.selected ? cat.selected = false :  cat.selected = true;
            }else{
                return cat;
            }            
        })        
        setCats(newCats);
    }

    return (
        <div className="box">
            
            <div className="block">            
            <h3 >Краткое название<small>*</small></h3> 
            <Field 
                placeHolder="Разработать фирменный стиль для магазина одежды"
                value={title}
                onChange={(val) => setTitle(val)}
                />                    
            </div>
            
            <div className="block">
            <h3>Описание заказа<small>*</small></h3> 
            <Field 
                sublabel="(до 1500 символов)" 
                value={description}
                onChange={(val) => setDescription(val)}
                type="textarea"/>
            </div>            
            
            <div className="block">
            <h3>Категории заказа:</h3> 
                {
                    cats && cats.length>0 && (
                        cats.map((cat)=>{
                            return (
                                cat.selected ? (
                                    <button key={cat.id} className="button is-small is-link mr-2 mb-2" 
                                        onClick={(e)=>hdlCatClick(e,cat.id)}>
                                        <span>{cat.name}</span>
                                        <span><i className="fa-solid fa-check"></i></span>                                            
                                    </button>
                                ):(
                                    <button key={cat.id} className="button is-small mr-2 mb-2" 
                                        onClick={(e)=>hdlCatClick(e,cat.id)}>
                                        <span>{cat.name}</span>                                                
                                    </button>      
                                )
                            )
                        })
                    )
                }
            </div>     

            
            <div className="block">
            <h3>Теги заказа:</h3>
            <Field 
                sublabel="Добавьте через запятую:"  
                placeHolder="реклама, верстка, полиграфия"
                value={tags}
                onChange={(val) => setTags(val)}                        
                />                
            </div>                    
            
            <div className="block">
            <h3>Время / стоимость:</h3> 
            <div className="level">
                <div className="level-item">
                    Выполнить к: <input value={dateTo} onChange={(e) => setDateTo(e.target.value)} type="date" sublabel="Выберите дату" />                    
                </div>
                <div className="level-item is-right">
                   <span>Стоимость<small>*</small>:</span>  
                    <Field sublabel="в руб." value={price} onChange={(val) => setPrice(val)} placeHolder="1000"/> 
                </div>
            </div>
            </div>

            <br />
            <p><small>Поля со звездочкой (*) обязательные</small></p>
            
        </div>        
    )
}