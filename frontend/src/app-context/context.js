import UserService from "./../services/userService";
import RepresentationService from "./../services/representationService";
import AdminService from "./../services/adminService";
import AesUtil from './../services/CipherService.js';
import { createStore } from 'redux';
import mainReducer from './../reducers/mainReducer';

let store;

let startUrl;

/*if(process.env.NODE_ENV === "production") {*/
	startUrl = "/airnavigation/";
	store = createStore(mainReducer);
/*}*/

/*if(process.env.NODE_ENV === "development") {
	startUrl = "http://localhost:8080/";
	store = createStore(mainReducer,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}*/

const userService = new UserService(startUrl);
const adminService = new AdminService(startUrl);
const representationService = new RepresentationService(startUrl);
const cipherService = new AesUtil(128, 125);

export {representationService, userService, adminService, cipherService, store};
