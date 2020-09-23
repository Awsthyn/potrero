import {
  GET_EDUCATION_LEVELS,
  GET_EDUCATION_LEVELS_DETAIL,
  ADD_EDUCATION_LEVELS,
  PUT_EDUCATION_LEVELS,
  DELETE_EDUCATION_LEVELS,
} from '../constants';

const initialState = {
  educationLevel: [],
};

export default function educationLevelReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EDUCATION_LEVELS:
      return {
        ...state,
        educationLevel: action.payload,
      };
    default:
      return state;
  }
}
