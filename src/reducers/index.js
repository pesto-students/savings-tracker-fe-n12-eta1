import {combineReducers} from 'redux';


import authReducer from './auth-reducer';
import appLoaderReducer from './app-loader-reducer';

export default combineReducers({user: authReducer, appLoader: appLoaderReducer});