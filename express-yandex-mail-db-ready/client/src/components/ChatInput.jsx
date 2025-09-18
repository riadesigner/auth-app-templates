

export default function ChatInput(){
    return(
        <div className="field has-addons is-fluid">
            <p className="control">
            <input className="input" type="text" placeholder="Введите текст ..." />
            </p>
            <p className="control">
            <button className="button is-primary">Отправить</button>
            </p>
        </div>        
    )
}