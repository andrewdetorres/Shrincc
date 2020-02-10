import axios from "axios";

//Import Types from types.js
import {
  GET_ERRORS
} from "./types";

export const getLink = (shortLink, history) => dispatch => {

  console.log(shortLink);
  axios
    .get(`/api/link/${shortLink}`)
    .then(res => {
      window.location = res.data.longLink;
    })
    .catch(errors => {
      console.log(errors);
    })
}