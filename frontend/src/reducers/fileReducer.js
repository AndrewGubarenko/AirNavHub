import {SET_FILES} from './actions/fileAction';

let startState = {
  listOfFiles: null,
  filesVisibility: "none"
};

const fileReducer = (state = startState, action) => {
  if(action.type === SET_FILES) {
    return Object.assign({}, state, {
            listOfFiles: action.listOfFiles,
            filesVisibility: action.filesVisibility
        })
  }
  return state;
};

export default fileReducer;
