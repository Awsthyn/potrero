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
			.then(() => window.history.go(-1)) // Te regresa a la sección en la que estabas antes de logguearte
			.catch(err => {
				throw new Error('Error al autenticar, verifique los datos ingresados')
			})
	}
}

// ----------------- LOGOUT --------
export function sessionLogout(data){
	return function (dispatch) {
		return axios
			.post(`http://localhost:3001/auth/logout`, data , {withCredentials : true})
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
