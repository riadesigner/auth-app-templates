

export const jwtDecode = (jwt)=>{
    if (jwt) {
        try {
            // Разбиваем JWT на части
            const [header, payload, signature] = jwt.split('.');        
            // Декодируем payload из Base64
            const decodedPayload = JSON.parse(atob(payload));                            
            return [null, decodedPayload];
        } catch (error) {                
            return [`Ошибка декодирования JWT ${error}`, null];
        }
    } else {
        return [`JWT не найден`, null];        
    }    
}