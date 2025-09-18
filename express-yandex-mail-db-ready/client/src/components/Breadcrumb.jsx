import { Link } from 'react-router-dom';

export default function Breadcrumb({links}){    
    return (
        <nav className="breadcrumb" aria-label="breadcrumbs">            
        <ul>
            {
                links.map((i, index)=>{
                    return i.isActive?(
                        <li key={index} className="is-active"><a>{i.title}</a></li>
                    ):(
                        <li key={index}><Link to={i.link}>{i.title}</Link></li>
                    )
                })
            }
        </ul>
        </nav>
    )
}