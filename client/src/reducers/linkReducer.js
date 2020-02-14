import {
  GET_NEW_LINK,
  GET_NEW_LINK_FAILED,
  GET_ALL_LINKS,
  GET_ALL_LINKS_FAILED,
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
    case GET_ALL_LINKS:
      return {
        ...state,
        AllLinks: action.payload,
        loading: false
      }
    case GET_NEW_LINK_FAILED:
    case GET_ALL_LINKS_FAILED:
      return {
        ...state
      }
    default:
      return state;
  }
}