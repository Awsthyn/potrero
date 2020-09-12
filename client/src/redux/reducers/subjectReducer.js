import {ADD_SUBJECT, EDIT_SUBJECT, GET_SUBJECTS, GET_SUBJECT_DETAIL, DELETE_SUBJECT} from '../constants';

const initialState = {
	subjects:[],
	subjectDetail: {}
};

export default function subjectReducer(state = initialState, action) {
	switch (action.type) {
		case GET_SUBJECTS:
			return {
				...state,
				subjects: action.payload,
			};
		case GET_SUBJECT_DETAIL:
			return {
				...state,
				subjectDetail: action.payload
			}	
		case ADD_SUBJECT:
			return {
				...state,
				students: state.students.concat(action.payload)}
		case EDIT_SUBJECT:
			return {
				...state,
				subjects: state.subjects.map((subject) => {
				if(subject.id === action.payload.id) {
				  return action.payload
				}
				return subject;
			  })
			}
        case DELETE_SUBJECT:
            return {
                ...state,
                subjects: state.subjects.filter(subject => Number(subject.id) !== Number(action.payload.id))
            }      
			
		default:
			return state;
	}
}
