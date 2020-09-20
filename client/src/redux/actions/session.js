import { LOGIN, LOGOUT } from '../constants';
import axios from 'axios';

// ----------------- LOGIN --------
export function sessionLogin(data){
	return function (dispatch) {
		return axios
			.post(`http://localhost:3001/auth/login`, data , {withCredentials : true})
			.then(res =>{
				dispatch({type: LOGIN , payload: res.data});
			})
			.catch(err => {
				throw new Error('Error al autenticar, verifique los datos ingresados')
			})
	}
}

// ----------------- LOGOUT --------
export function sessionLogout(data){
	return function (dispatch) {
		return axios
			.get(`http://localhost:3001/auth/logout`, data , {withCredentials : true})
			.then(res =>{
				dispatch({type: LOGOUT });
			})
			.catch(err => {
                //swal('Error al desloguearse');
                console.log(err)});
	}
}
//Trae usuario logueado
export function getCurrentUser() {
    return function(dispatch) {
        return axios
            .get(`http://localhost:3001/auth/`
            ,{withCredentials: true})
    .then(res => {
        dispatch({type: LOGIN, payload: res.data})
        return res
    })
    .catch(err => {
        console.info("Error al recuperar usuario")
    })
    }
}

// ------------- Envia email con token ---------------
export function sendForgotMail(email) {
    return function(dispatch) {
        return fetch(`http://localhost:3001/auth/setPassword`, {
            method: 'POST',
            body: JSON.stringify(email),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .catch((error) => {
            console.error(error);
        });
    }
}

//------------ Ejecuta el cambio de contraseña ---------------
export function changePassword(token, password) {
    return function(dispatch) {
        return fetch(`http://localhost:3001/resetPassword/reset/${token}`, {
            method: 'PUT',
            body: JSON.stringify(password),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .catch((error) => {
            console.error(error);
        });
    }
}

//-----------------------Envía token para cuando olvida la contraseña ----------
export function mailParaResetPassword(email) {
    return function(dispatch) {
        return axios
            .post(`http://localhost:3001/resetPassword/forgot`, email,{withCredentials: true})
    .then(res => {
        return res
    })
    .catch(err => {
        console.info("Error al enviar email de reset password")
    })
    }
}
