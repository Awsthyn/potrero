import {ADD_STUDENT, EDIT_STUDENT, GET_STUDENTS, GET_STUDENT_DETAIL} from '../constants';

const initialState = {
	students:[],
	studentDetail: {}
};

export default function studentReducer(state = initialState, action) {
	switch (action.type) {
		case GET_STUDENTS:
			return {
				...state,
				students: action.payload,
			};
		case GET_STUDENT_DETAIL:
			return {
				...state,
				studentDetail: action.payload
			}	
		case ADD_STUDENT:
			return {
				...state,
				students: state.students.concat(action.payload)}
		case EDIT_STUDENT:
			return {
				...state,
				students: state.student.map((student) => {
				if(student.id === action.payload.id) {
				  return action.payload
				}
				return student;
			  })
			}
		default:
			return state;
	}
}
