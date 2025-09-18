import { Link } from 'react-router-dom';

export default function ErrorPage(){
    return(
        <div className="banner">            
            <div style={{
                display:'flex',
                justifyContent: 'center',
            }}>
                <div className="box">
                    <div className="block">
                        <h1 className='title'>Ой, такой страницы не существует!</h1>
                        <Link to="/" className="nav-link"> Перейти на главную</Link>
                    </div>                    
                </div>            
            </div>            
        </div>
    )
}