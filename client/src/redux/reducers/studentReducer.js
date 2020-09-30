import {ADD_STUDENT, PUT_STUDENT, GET_STUDENTS, GET_STUDENT_DETAIL, GET_MATCHING_SCHEDULES, DELETE_CLASS_FROM_STUDENT} from '../constants';

const initialState = {
	students:[],
	studentDetail: {},
	matchingSchedule: []
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
		case PUT_STUDENT:
			return {
				...state,
				students: state.students.map((student) => {
				if(student.id === action.payload.id) {
				  return action.payload
				}
				return student;
			  })
			}
		case GET_MATCHING_SCHEDULES:
			return {
				...state,
				matchingSchedule: action.payload
			}
		case DELETE_CLASS_FROM_STUDENT:
			return {
				...state,
				studentDetail: {...state.studentDetail,
				classes: state.studentDetail.classes.filter(e => e.id !== action.payload)}
			}
		default:
			return state;
	}
}
