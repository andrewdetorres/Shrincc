import {
  REGISTER_SUCCESSFUL,
  REGISTER_FAILED,
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED,
  RESET_SUCCESSFUL,
  EMAIL_RESET_SUCCESSFUL,
  RESET_FAILED,
  USER_LOADED,
  AUTH_ERROR
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESSFUL:
    case LOGIN_SUCCESSFUL:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      }
    case REGISTER_FAILED:
    case LOGIN_FAILED:
    case RESET_FAILED:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      }
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      }
    case EMAIL_RESET_SUCCESSFUL:
      return {
        ...state,
        successMessage: action.payload
      }
    case RESET_SUCCESSFUL:
      return {
        ...state,
        errors: action.payload
      }
    default:
      return state;
  }
}