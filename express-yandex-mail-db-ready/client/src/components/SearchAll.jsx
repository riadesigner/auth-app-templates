import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchAll(){

    const [userInput, setUserInput] = useState('');
    const navigate = useNavigate()

    const hdlSearch = ((e)=>{
        e.preventDefault();  
        if(userInput.trim().length > 0){
            navigate(`orders/search/${userInput}`)        
            setUserInput('')
        }      
    })

    return(
        <div className="field has-addons mb-0">
            <p className="control">
            <input 
                className="input" 
                type="text" 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Поиск ..." 
                />
            </p>
            <p className="control">
            <button className="button" onClick={(e)=>{hdlSearch(e)}}>Найти</button>
            </p>
        </div>        
    )
}