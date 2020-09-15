import {ADD_VOLUNTARY, ADD_SCHEDULE, GET_VOLUNTEERS, DELETE_VOLUNTEER, ACCEPT_VOLUNTEER} from '../constants';

const initialState = {
	volunteers: [],
	schedule: [],
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_VOLUNTARY:
			return {
				...state,
				volunteers: [...state.volunteers, action.voluntary],
			};
		case ADD_SCHEDULE:
			return {
				...state,
				schedule: [...state.schedule, action.schedule],
			};
		case GET_VOLUNTEERS:
			if (typeof action.volunteers === 'string') 
				return {...state, volunteers: []}
				return {...state, volunteers: action.volunteers}
		case ACCEPT_VOLUNTEER: 
		const i = state.volunteers.indexOf(state.volunteers.filter(v => v.id == action.accepted.id)[0]);
		var accepted = state.volunteers[i];
		accepted.state = 'aceptado';

		return {
			...state,
				volunteers: [].concat(state.volunteers.slice(0,i),accepted,state.volunteers.slice(i+1))
			}
		
		

		default:
			return state;
	}
}
