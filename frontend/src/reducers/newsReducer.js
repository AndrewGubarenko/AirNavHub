import {SET_NEWS} from './actions/newsAction';

const newsReducer = (state, action) => {
  if(action.type === SET_NEWS) {
    return Object.assign({}, state, {
            listOfNews: action.listOfNews
        });
  }
  return state;
};

export default newsReducer;
