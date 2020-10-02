import { combineReducers } from "redux";
import volunteersReducer from "./volunteersReducer";
import studentReducer from "./studentReducer";
import subjectReducer from "./subjectReducer"
import sessionReducer from "./sessionReducer";
import userReducer from "./userReducer";
import statsReducer from './statsReducer';
import educationLevelReducer from './educationLevelReducer';
import academicReducer from "./academicReducer";
import userScheduleReducer from './userScheduleReducer';
import difficultyReducer from './difficultyReducer';
import classesReducer from './classesReducer';
import studentFormReducer from "./studentForm"

export default combineReducers({
    volunteers: volunteersReducer,
    students: studentReducer,
    subjects: subjectReducer,
    sessions: sessionReducer,
    users: userReducer,
    stats: statsReducer,
    educationLevel: educationLevelReducer,
    academic: academicReducer,
    userSchedule: userScheduleReducer,
    classes:classesReducer,
    studentForm: studentFormReducer
});