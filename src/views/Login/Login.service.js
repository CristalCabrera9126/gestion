import axios from "axios";
import {encrypt} from "../../utilities/encript";
const baseUrl = process.env.REACT_APP_API_KEY ;
const clave = process.env.REACT_APP_CLAVE_ENCRYPTION;


export const loginService = (email, password, navigate) => {
    const credentials= {
        "email":email,
        "password":password
    }
    axios.post(`${baseUrl}/auth/login`, credentials).then(r => {
        if (r) {
            sessionStorage.setItem('token', r.data.token);
            sessionStorage.setItem('auth', encrypt('true', clave));
            navigate('/panel', { replace: true });
            window.location.reload();
        }
    }).catch((error) =>{
        console.error('Error en la solicitud:', error.response.data);
    })
}
