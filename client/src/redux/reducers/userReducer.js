import {GET_USERS} from '../constants';

const initialState = {
    users: [],
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_USERS:	
		if (typeof action.payload === 'string') 
		return {...state, users: []}
		return {...state, users: action.payload}	

		default:
			return state;
	}
}
