import {
  CURRENT_PROFILE_LOADED,
  CURRENT_PROFILE_FAILED,
  USER_FOLLOWED,
  USER_FOLLOWED_FAILED,
  USER_FOLLOWING_FAILED,
  PROFILE_LOADED,
  PROFILE_LOADED_FAILED,
  USERNAME_LOADED,
} from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADED:
      return {
        ...state,
        profile: action.payload,
        loading: false
      }
    case USER_FOLLOWED:
      return {
        ...state,
        profile: action.payload,
        loading: false
      }
    case CURRENT_PROFILE_LOADED:
      return {
        ...state,
        userProfile: action.payload,
        loading: false
      }
    case USERNAME_LOADED:
      return {
        ...state,
        username: action.payload,
        loading: false
      }
    case CURRENT_PROFILE_FAILED:
    case USER_FOLLOWED_FAILED:
    case USER_FOLLOWING_FAILED:
    case PROFILE_LOADED_FAILED:
      return {
        ...state
      }
    default:
      return state;
  }
}