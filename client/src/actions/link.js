import axios from "axios";

//Import Types from types.js
import {
  GET_NEW_LINK,
  GET_NEW_LINK_FAILED,
  GET_ALL_LINKS,
  GET_ALL_LINKS_FAILED,
  GET_INDIVIDUAL_LINK,
  GET_INDIVIDUAL_LINK_FAILED,
  LINK_DELETED,
  LINK_DELETED_FAILED,
  GET_ERRORS
} from "./types";

export const createLink = (longLink) => dispatch => {
  axios
    .post('/api/link/new', longLink)
    .then(res => {
      dispatch({
        type: GET_NEW_LINK,
        payload: res.data
      });
    })
    .catch(errors => {
      dispatch({
        type: GET_NEW_LINK_FAILED
      });
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data
      });
    })
}

export const getAllLinks = () => dispatch => {
  axios
    .get('/api/click/all')
    .then(res => {
      dispatch({
        type: GET_ALL_LINKS,
        payload: res.data
      });
    })
    .catch(errors => {
      dispatch({
        type: GET_ALL_LINKS_FAILED
      });
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data
      });
    })
}

export const getIndividualLink = (linkId) => dispatch => {
  axios
    .get(`/api/click/all/${linkId}`)
    .then(res => {
      dispatch({
        type: GET_INDIVIDUAL_LINK,
        payload: res.data
      });
    })
    .catch(errors => {
      dispatch({
        type: GET_INDIVIDUAL_LINK_FAILED
      });
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data
      });
    })
}

export const deleteLink = (linkId) => dispatch => {
  axios
    .delete(`/api/link/${linkId}`)
    .then(res => {
      dispatch({
        type: LINK_DELETED,
      });
    })
    .catch(errors => {
      dispatch({
        type: LINK_DELETED_FAILED
      });
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data
      });
    })
}