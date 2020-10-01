import {ADD_STUDENT_SCHEDULE, EDIT_STUDENT_SCHEDULE, DELETE_STUDENT_SCHEDULE} from '../constants';



const initialState = {
schedule: []
};

export default function studentFormReducer (state = initialState, action) {
    switch (action.type) {
                case ADD_STUDENT_SCHEDULE:
                    return {
                        ...state,
                        schedule: state.schedule.concat(action.payload)}
                case EDIT_STUDENT_SCHEDULE:
                    if(state.schedule.find(e => e.nameWeekDay == action.payload.nameWeekDay) === undefined){
                        return {
                            ...state,
                            schedule: state.schedule.concat(action.payload)}
                        }
                    else return {
                        ...state,
                        schedule: state.schedule.map((s) => {
                        if(s.nameWeekDay === action.payload.nameWeekDay) {
                          return action.payload
                        }
                        return s;
                      })
                    }
                case DELETE_STUDENT_SCHEDULE:
                    return {
                        ...state,
                        schedule: state.schedule.filter(e => e.nameWeekDay !== action.payload.nameWeekDay)
                        }
                default:
                    return state;
        }
}