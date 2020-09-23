import axios from 'axios';
import {ADD_VOLUNTARY, ADD_SCHEDULE, GET_VOLUNTEERS, DELETE_VOLUNTEER, ACCEPT_VOLUNTEER, ADD_SUBJECTS_VOLUNTEER} from '../constants';
// Agrega un Voluntario --> Crea Calendario --> Envía Mail de Bienvenida 
export function postVoluntary(voluntary, subjects, schedule) {
	console.log(voluntary)
	return function (dispatch) {
		console.log(subjects);
		console.log(schedule);
		return axios
			.post(`http://localhost:3001/users`, voluntary, {withCredentials: true})
			.then(res => {
				dispatch(postMailWelcome(res.data))
				.then(() => {
					dispatch(postSubjectVoluntary(subjects, res.data.id))
					.then(() => dispatch(addSchedule(schedule, res.data.id)))
				})
				// .then(() => dispatch(addSchedule(schedule, res.data.id)))
				// dispatch(postSubjectVoluntary(subjects, res.data.id));
				// dispatch(addSchedule(schedule, res.data.id))
			})
			.catch(err => console.log(err));
	};
}
// Trae todos los Voluntarios
export function getVolunteers() {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3001/users`, {withCredentials: true})
			.then(res => {
				const pendientes = res.data.filter(e=> e.state === "pendiente")
				dispatch({type: GET_VOLUNTEERS, volunteers:pendientes});
					return pendientes;
			})
			.catch(err => console.log(err));
	};
}

// Elimina(deshabilida para Login) a un Voluntario
export function deleteVolunteer(id) {
	return function (dispatch) {
		return axios
			.put(`http://localhost:3001/users/${id}`,{disabled:true} ,{withCredentials: true})
			.then(() => {
				dispatch(getVolunteers());
			})
			.catch(err => console.log(err));
	};
}

// Agrega Calendario(disponibilidad)
export function addSchedule(schedules, userId) {
	console.log(schedules)
	return function (dispatch) {
		return axios
			.post(`http://localhost:3001/userSchedule/${userId}`, {dias: schedules}, {withCredentials: true})
			.then(res => {
				dispatch({type: ADD_SCHEDULE, schedule: res.data});
			})
			.catch(err => console.log(err));
	};
}

// Acepta Voluntario --> User.state:  <<<< "pendiente" ==> "aceptado" >>>>
export function acceptVolunteer(volunteer) {
	return function (dispatch) {
		return axios
			.put(`http://localhost:3001/users/${volunteer.id}`, {state: 'aceptado'}, {withCredentials: true})
			.then(res => {
				console.info('acceptVolunteer.then', res)
				dispatch(mailAdmission(volunteer));
				dispatch({type: ACCEPT_VOLUNTEER, accepted: res.data});
			})
			.catch(err => console.log(err));
	};
}

// Crea relación entre Materia y Voluntario
export function postSubjectVoluntary(subjects, userId) {
	console.log(subjects)
	return function (dispatch) {
		return axios
			.post(`http://localhost:3001/subjectxuser/${userId}/subjects`, {subjects}, {withCredentials: true})
			.then(res => {
				dispatch({type: ADD_SUBJECTS_VOLUNTEER, subjects: res.data});
			})
			.catch(err => console.error(err));
	};
}

// Actions inherentes a la Bienvenida, Rechazo y Admisión de Voluntarios

export function postMailWelcome(voluntary) {
	return function (dispatch) {
		return axios
			.post(`http://localhost:3001/mailWelcomeRejection/mail`, voluntary, {withCredentials: true})
			.then(res => {
				dispatch({type: ADD_VOLUNTARY, voluntary: res.data});
			})
			.catch(err => console.error('postMailWelcome.catch', err));
	};
}


export function mailAdmission(voluntary) {
	return function (dispatch) {
		return axios
			.post(`http://localhost:3001/mailAdmission/setPassword`, voluntary, {withCredentials: true})
			.then(res => {
				console.info('Admission', res)
				dispatch(getVolunteers());
			})
			.catch(err => console.error('mailAdmissionerror', err));
	};
}