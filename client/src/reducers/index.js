import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import linkReducer from './linkReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  link: linkReducer,
  errors: errorReducer
});