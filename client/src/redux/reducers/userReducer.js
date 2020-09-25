import {GET_USERS, ADD_DATA_SHEET} from '../constants';

const initialState = {
	 users: [],
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {

		case GET_USERS:			
			return {
				...state,
				users: action.payload,
			};
		case ADD_DATA_SHEET:
			return state
		default:
			return state;
	}
}
