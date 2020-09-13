import {ADD_VOLUNTARY, ADD_SCHEDULE, GET_VOLUNTEERS, DELETE_VOLUNTEER} from '../constants';

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
			console.log(action.volunteers instanceof String)
				
			return {
				...state,
				volunteers: action.volunteers,
			};

		default:
			return state;
	}
}
