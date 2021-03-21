import {SET_TO_MAIN_DISPLAY_MODE} from './actions/OnMainPageAction';

let startState = {
  toMainDisplayMode: "none"
};

const toMainReducer = (state = startState, action) => {
  if(action.type === SET_TO_MAIN_DISPLAY_MODE) {
    return Object.assign({}, state, {
            toMainDisplayMode: action.toMainDisplayMode
        });
  }
  return state;
};
export default toMainReducer;
