import ico1 from '../i/ico-1.svg'
import ico2 from '../i/ico-2.svg'
import ico3 from '../i/ico-3.svg'
import imgCowork from '../i/cowork-01.jpg'

export default function MainPageWhyYolk(){
    return (
        <section className="container is-max-desktop">
            <div className="section "> 
                <h1 className="title is-size-2 is-size-4-mobile">Почему Yolk?</h1>              
                <section className="columns">
                    <div className="column is-5">
                        <div className="why-yolk-banner"
                        style={{
                            background: `url("${imgCowork}") no-repeat 50% 50%/ cover`
                        }}
                        ></div>
                    </div>
                    
                    <div className="column is-6 "> 
                        
                        <div className="block pb-4 has-text-centered-mobile">
                            <div className=""><img src={ico1} alt="" style={{width:'60px'}} /></div>
                            <h3 className="title is-size-3 is-size-4-mobile mb-2 ">Общение</h3>
                            <p className="mb-0-mobile">Связывайся с заказчиком напрямую</p>
                        </div>
                        <div className="block has-text-centered-mobile">
                            <div className=""><img src={ico2} alt="" style={{width:'60px'}} /></div>
                            <h3 className="title is-size-3 is-size-4-mobile mb-2 ">Надежность</h3>
                            <p className="mb-0-mobile">Получай своевременную оплату</p>
                        </div>             
                        <div className="block has-text-centered-mobile">
                            <div className=""><img src={ico3} alt="" style={{width:'60px'}} /></div>
                            <h3 className="title is-size-3 is-size-4-mobile mb-2 ">Рост</h3>
                            <p className="mb-0-mobile">Получай опыт в профессиональной сфере</p>
                        </div>                                        

                    </div>
                </section>
            </div>
        </section>        
    )
}