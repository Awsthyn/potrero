import axios from 'axios';
import {
  GET_EDUCATION_LEVELS,
  GET_EDUCATION_LEVELS_DETAIL,
  ADD_EDUCATION_LEVELS,
  PUT_EDUCATION_LEVELS,
  DELETE_EDUCATION_LEVELS,
} from '../constants';

export function getEducationLevel() {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/educationlevel`, { withCredentials: true })
      .then((res) => {
        console.log('NAAAAAAAAAAAAAAAAAAAAAAAAA',res);
        dispatch({ type: GET_EDUCATION_LEVELS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
}
