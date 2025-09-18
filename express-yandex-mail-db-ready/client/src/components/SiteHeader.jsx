import { Link, NavLink, useLocation } from 'react-router-dom';
// import styles from '../pages/SiteHeader.module.css'
import SiteMobileMenu from '../components/SiteMobileMenu'
import SearchAll from '../components/SearchAll'
import SecondMenu from '../components/SecondMenu'

import yolkLogo from '../i/yolk-logo.svg'

export default function SiteHeader() {    
  
    return (
        <>
        <SiteMobileMenu />
        <section className="container is-fluid">        
        <div className="section">
            <div className="level is-6 is-2-mobile">
                <div className="level-item is-5 ">
                    <Link to="/" style={{fontSize:0}}>
                    <img src={yolkLogo} alt="" style={{height:'64px'}}/>
                    </Link>
                </div>
                <div className="column is-5 is-right is-centered-mobile">
                    <SearchAll />
                </div>
                <div className="column  is-right is-centered-mobile" >
                    <SecondMenu />
                </div>
            </div>
        </div>            
        </section>
        </>
  )
}
