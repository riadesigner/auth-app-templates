
import styles from '../components/CompanyGallery.module.css'

export default function CompanyGallery({gallery}){
    
    return(
        <div className={styles.gallery}>
            {
                gallery && gallery.map((img, index)=>{
                    return(
                        <a key={img.key || index} href={img.url} target="_blank">
                        <div style={{
                            background: `url(${img.url}) no-repeat center / cover`,                            
                        }}></div>
                        </a>
                    )
                })
            }
        </div>
    )
}