import {SET_ADMIN_DISPLAY_MODE} from './actions/AdminAction';

let startState = {
  adminDisplayMode: "none"
};

const adminReducer = (state = startState, action) => {
  if(action.type === SET_ADMIN_DISPLAY_MODE) {
    return Object.assign({}, state, {
            adminDisplayMode: action.adminDisplayMode
        });
  }
  return state;
};
export default adminReducer;
