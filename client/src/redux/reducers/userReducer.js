import {GET_USERS, GET_USER_SUBJECTS, GET_USER_STUDENTS, GET_USER_CLASS, PUT_USER, ADD_DATA_SHEET} from '../constants';

const initialState = {
	users: [],
	userSubjects:[],
	userStudents:[],
	userClass:[],
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {

		case GET_USERS:			
			return {
				...state,
				users: action.payload,
			};
		case GET_USER_SUBJECTS:			
			return {
				...state,
				userSubjects: action.payload,
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

				
			}
		case ADD_DATA_SHEET:
			return state
		default:
			return state;
	}
}
