import {GET_USERS, GET_USER, GET_USER_STUDENTS, GET_USER_CLASS, PUT_USER, ADD_DATA_SHEET} from '../constants';

const initialState = {
	users: [],
	user:[],
	userStudents:[],
	userClass:[],
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {

		case GET_USERS:	
			if (typeof action.payload === 'string') 
			return {...state, users: []}
			return {...state, users: action.payload}	
		case GET_USER:			
			return {
				...state,
				user: action.payload,
			};
		case GET_USER_STUDENTS:			
			return {
				...state,
				userStudents: action.payload,
			};
		case GET_USER_CLASS:			
			return {
				...state,
				userClass: action.payload,
			};
		case PUT_USER:
			return {
				...state,
				users: state.users.map((user) => {
				if(user.id === action.payload.id) {
					return action.payload
				}
				return user;
			  })
			}
		case ADD_DATA_SHEET:
			return state
		default:
			return state;
	}
}
