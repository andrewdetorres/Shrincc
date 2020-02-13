import {
  GET_NEW_LINK,
  GET_NEW_LINK_FAILED
} from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_NEW_LINK:
      console.log('payload', action.payload.shortLink);
      return {
        ...state,
        shortLink: action.payload.shortLink,
        loading: false
      }
    case GET_NEW_LINK_FAILED:
      return {
        ...state
      }
    default:
      return state;
  }
}