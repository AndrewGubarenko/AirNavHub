import {SET_SPINNER_VISIBILITY} from './actions/spinnerAction';

const spinnerReducer = (state = {spinnerVisibility: "none"}, action) => {
  if(action.type === SET_SPINNER_VISIBILITY) {
    return Object.assign({}, state, {
            spinnerVisibility: action.spinnerVisibility
        });
  }
  return state;
};

export default spinnerReducer;
