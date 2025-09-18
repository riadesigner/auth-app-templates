
export default function Progressbar(props){
    const value = props.value ?? 10;
    const title = props.title ?? 'Без названия';
    return (        
        <div className="block">
            <p className="mb-1">{title}</p>
            <div className="progress-bar is-primary">
                <span style={{
                    width:value+'%'
                }}></span>
            </div>
        </div>
    )
}