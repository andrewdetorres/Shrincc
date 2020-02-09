import axios from "axios";

//Import Types from types.js
import {
  CURRENT_PROFILE_LOADED,
  CURRENT_PROFILE_FAILED,
  USER_FOLLOWED,
  USER_FOLLOWED_FAILED,
  USER_FOLLOWING,
  USER_FOLLOWING_FAILED,
  PROFILE_LOADED,
  PROFILE_LOADED_FAILED,
  PROFILE_CREATED,
  PROFILE_CREATION_FAILED,
  USERNAME_LOADED,
  USERNAME_FAILED,
  GET_ERRORS
} from "./types";


export const usernameCheck = (username) => dispatch => {
  axios
    .post('/api/profile/username', username)
    .then(res => {
      dispatch({
        type: USERNAME_LOADED,
        payload: res.data
      });
    })
    .catch(errors => {
      dispatch({
        type: USERNAME_FAILED
      });
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data
      });
    })
}

export const getCurrentUserProfile = () => dispatch => {
  axios
    .get('/api/profile')
    .then(res => {
      dispatch({
        type: CURRENT_PROFILE_LOADED,
        payload: res.data
      });
    })
    .catch(errors => {
      dispatch({
        type: CURRENT_PROFILE_FAILED
      });
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data
      });
    })
}
export const followUser = (user_id) => dispatch => {
  axios
    .put(`/api/profile/follow/${user_id}`)
    .then(res => {
      dispatch({
        type: USER_FOLLOWED,
        payload: res.data
      });
    })
    .catch(errors => {
      dispatch({
        type: USER_FOLLOWED_FAILED
      });
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data
      });
    });

  axios
    .put(`/api/profile/UpdateFollowing/${user_id}`)
    .then(res => {
      dispatch({
        type: USER_FOLLOWING
      });
    })
    .catch(errors => {
      dispatch({
        type: USER_FOLLOWING_FAILED
      });
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data
      });
    });
};

export const unfollowUser = (user_id) => dispatch => {
  axios
    .put(`/api/profile/unfollow/${user_id}`)
    .then(res => {
      dispatch({
        type: USER_FOLLOWED,
        payload: res.data
      });
    })
    .catch(errors => {
      dispatch({
        type: USER_FOLLOWED_FAILED
      });
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data
      });
    });

  axios
    .put(`/api/profile/updateUnfollowing/${user_id}`)
    .then(res => {
      dispatch({
        type: USER_FOLLOWING
      });
    })
    .catch(errors => {
      dispatch({
        type: USER_FOLLOWING_FAILED
      });
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data
      });
    });
};

export const getUserProfile = (user_id) => dispatch => {
  axios
  // @todo - Don't dispatch, just return res.data.
    .get(`/api/profile/user/${user_id}`)
    .then(res => {
      // return new Promise((resolve, error) => resolve(res.data));
      dispatch({
        type: PROFILE_LOADED,
        payload: res.data
      });
    })
    .catch(errors => {
      dispatch({
        type: PROFILE_LOADED_FAILED,
      });
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data
      });
    });
};


export const createUserProfile = (profile) => dispatch => {
  console.log(profile);
  axios
  // @todo - Don't dispatch, just return res.data.
    .post('/api/profile', profile)
    .then(res => {
      // return new Promise((resolve, error) => resolve(res.data));
      dispatch({type: PROFILE_CREATED});
      dispatch(getCurrentUserProfile());
    })
    .catch(errors => {
      dispatch({type: PROFILE_CREATION_FAILED});
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data
      });
    });
};
