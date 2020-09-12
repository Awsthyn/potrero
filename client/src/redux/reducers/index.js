import { combineReducers } from "redux";
import volunteersReducer from "./volunteersReducer";
import studentReducer from "./studentReducer";
import subjectReducer from "./subjectReducer"


export default combineReducers({
    volunteers: volunteersReducer,
    students: studentReducer,
    subjects: subjectReducer
    });

