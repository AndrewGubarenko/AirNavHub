import {SET_IS_AUTHENTICATED} from './actions/userAction';

let startState = {
  isAuthenticated: false,
  user: null,
  isAdmin: false
};

const userReducer = (state = startState, action) => {
  if(action.type === SET_IS_AUTHENTICATED) {
    return Object.assign({}, state, {
          isAuthenticated: action.isAuthenticated,
          user: action.user,
          isAdmin: action.isAdmin
        });
  }
  return state;
};

export default userReducer;
