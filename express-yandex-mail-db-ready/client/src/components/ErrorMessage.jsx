

export default function ErrorMessage({message}){
    return (
        <section className="container">
            <div className="section has-text-centered is-danger">
                Ошибка: {message}!
            </div>
        </section>
    )
}