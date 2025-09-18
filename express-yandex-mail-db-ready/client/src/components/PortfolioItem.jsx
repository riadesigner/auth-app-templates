import styles from './PortfolioItem.module.css'
import noImage from '/no-image.jpg' 

export default function PortfolioItem(props){
    const {title, img, linkTo} = props;
    const strImg = img?img:noImage;

    return (
        <div className="column is-4">
            <a href={linkTo}>
            <div className={styles.portfolioItem}>                
                <span>
                    <img src={strImg} alt={title} style={{
                        width:'100%',                            
                        height:'100%',
                        objectFit:'cover',                        
                    }}/>                        
                    </span>
                <span>
                    <h2 className="subtitle is-size-7 m-0">{title}</h2>
                </span>                
            </div>
            </a>            
        </div>
    )
}

