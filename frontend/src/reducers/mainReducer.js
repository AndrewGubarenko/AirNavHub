import newsReducer from './newsReducer';
import fileReducer from './fileReducer';
import userReducer from './userReducer';
import authContainerReducer from './AuthContainerReducer';
import adminReducer from './AdminReducer';
import onMainPageReducer from './OnMainPageReducer';
import spinnerReducer from './SpinnerReducer';
import { routerReducer } from 'react-router-redux';

let startState = {

};

const mainReducer = (state = startState, action) => {
  return {
    user: userReducer(state.user, action),
    adminDisplayMode: adminReducer(state.adminDisplayMode, action),
    news: newsReducer(state.news, action),
    files: fileReducer(state.files, action),
    authContainer: authContainerReducer(state.authContainer, action),
    toMainDisplayMode: onMainPageReducer(state.toMainDisplayMode, action),
    spinnerVisibility: spinnerReducer(state.spinnerVisibility, action),
    routing: routerReducer
  };
};

export default mainReducer;
