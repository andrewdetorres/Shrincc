import {
  GET_NEW_LINK,
  GET_NEW_LINK_FAILED,
  GET_ALL_LINKS,
  GET_ALL_LINKS_FAILED,
  GET_INDIVIDUAL_LINK,
  GET_INDIVIDUAL_LINK_FAILED,
} from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_NEW_LINK:
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
    case GET_INDIVIDUAL_LINK:
      return {
        ...state,
        currentLink: action.payload,
        loading: false
      }
    case GET_NEW_LINK_FAILED:
    case GET_ALL_LINKS_FAILED:
    case GET_INDIVIDUAL_LINK_FAILED:
      return {
        ...state
      }
    default:
      return state;
  }
}