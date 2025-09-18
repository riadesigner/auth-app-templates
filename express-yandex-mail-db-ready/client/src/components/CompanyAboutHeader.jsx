import { Link, NavLink, useLocation } from 'react-router-dom';

const logoImage = '/company-logo.jpg'; 

export default function CompanyAboutHeader({company, orders=[], privateMode}){    

    console.log('company ====', company)

    return(
            <section className="container">            
                <div className="section ">
                <div className="level mb-5">
                    <div className="level-item">
                        <h2 className="is-size-3 is-size-4-mobile mb-0 mb-1-mobile">О компании</h2>
                    </div>                    
                    {
                        privateMode==="true"  && (
                        <div className="level-item is-right">
                            <Link to="/cp/company/info/edit">
                            <button className="button is-primary is-small-mobile">
                                <span><i className="fa-regular fa-pen-to-square"></i></span>
                                <span>Редактировать</span>
                            </button>
                            </Link>
                        </div>
                        )
                    }                    
                </div>
                <div className="columns">
                    <div className="column is-3">
                        <img src={logoImage} alt="" 
                        className="is-max-3-mobile"
                            style={{
                            width:'80%', 
                            borderRadius:'8px'                            
                            }}/>                            
                    </div>
                    <div className="column is-9">
                        <h1 className="title is-size-3 mb-2">{company && company.name}</h1>
                        <p>{company && company.city}</p>
                        <p className="is-size-7 mb-0 subtitle"><strong>Специализация</strong></p>
                        <p className="mt-1 " style={{lineHeight:1.4}}>{company && company.specialization}</p>
                        <p className="is-size-7 mb-2 is-primary"><strong>Статистика</strong></p>
                        <div className="is-size-7">
                            <span style={{marginRight:'10px'}} className="is-primary"><i className="fa-regular fa-face-smile"></i></span>
                            <span> Размещенных заказов: {orders.length}</span>
                        </div>                    
                    </div>
                </div>     
                </div>
            </section>          
    )    
}