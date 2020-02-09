import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  errors: errorReducer
});