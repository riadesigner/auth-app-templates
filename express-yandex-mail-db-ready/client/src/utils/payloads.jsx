import { jwtDecode } from './jwtUtils'

export const getPayloads = ()=>{    
    const jwt = localStorage.getItem('jwt');    
    const [err, payloads] = jwtDecode(jwt);
    err && console.log('err = ', err);
    return payloads;
}