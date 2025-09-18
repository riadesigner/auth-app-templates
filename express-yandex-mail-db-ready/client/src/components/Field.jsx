
export default function Field(props){
    const {type, name, label, sublabel, placeHolder, value, onChange, disabled} = props;
    const strPlaceHolder = placeHolder??'Введите текст';    

    return(
        <div className="field">
        {
            label ? (
                sublabel ? (
                    <>
                        <label className="label mb-1">{label}</label>                    
                        <div className="subtitle is-size-7 mb-2">{sublabel}</div>
                    </>                    
                ):(
                    <label className="label">{label}</label>
                )                
            ): sublabel && (
                <div className="subtitle is-size-7 mb-2">{sublabel}</div>
            ) 
        }
        <div className="control">
            {
                type && type==='textarea' ? (
                    <textarea 
                        name={name} 
                        className="input" 
                        rows="8" 
                        placeholder={strPlaceHolder}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        disabled = {disabled} 
                        ></textarea>
                ):(
                    <input
                        disabled = {disabled} 
                        name={name}
                        className="input" 
                        type="text" 
                        placeholder={strPlaceHolder} 
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        />
                )
            }            
        </div>
        </div>        
    )
}