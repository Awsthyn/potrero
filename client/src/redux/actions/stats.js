import axios from 'axios';
import { GET_ALL_ASSISTANCE, GET_ASSISTANCE_STUDENT } from '../constants';

export function getAllAssistance(){
    return function(dispatch){
        return axios
         .get(`http://localhost:3001/stats/assistances`, {withCredentials: true})
         .then(res => {
             console.log(res)
             dispatch({type: GET_ALL_ASSISTANCE, payload: res.data});
         })
         .catch( err => console.log( err ));
    }
}

export function getAssistanceStudent(id) {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3001/stats/assistances/${id}`, {withCredentials: true})
			.then(res => {
                console.log(res)
				dispatch({type: GET_ASSISTANCE_STUDENT, payload: res.data});
			})
			.catch(err => console.log(err));
	};
}