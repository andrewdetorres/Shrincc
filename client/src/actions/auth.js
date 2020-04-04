import axios from "axios";
import setAuthToken from "../utilities/setAuthToken";

//Import Types from types.js
import {
  REGISTER_SUCCESSFUL,
  REGISTER_FAILED,
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED,
  RESET_SUCCESSFUL,
  EMAIL_RESET_SUCCESSFUL,
  IS_ACTIVATED_SUCCESSFUL,
  RESET_FAILED,
  ACCOUNT_DELETED,
  GET_ERRORS,
  USER_LOADED,
  AUTH_ERROR,
} from "./types";

// Sign up a new user
export const registerNewUser = (userData) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESSFUL,
        payload: res.data
      });
      dispatch(fetchUser());
    })
    .catch(errors => {
      dispatch({
        type: REGISTER_FAILED
      });
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data
      });
    });
};

// Login a user
export const loginUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESSFUL,
        payload: res.data
      });
      dispatch(fetchUser());
      history.push("/");
    })
    .catch(errors => {
      dispatch({
        type: LOGIN_FAILED
      });
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data
      });
    });
};

// Send reset token to user
export const passwordReset = (userData) => dispatch => {
  axios
    .post("/auth/reset", userData)
    .then(res => {
      dispatch({
        type: RESET_SUCCESSFUL,
        payload: {success : "Please check your email for your password reset"}
      });
    })
    .catch(errors => {
      dispatch({
        type: RESET_FAILED
      });
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data
      });
    });
};

// Send reset token to user
export const passwordResetConfirm = (userData, history) => dispatch => {
  axios
    .post(`/auth/reset/verify/${userData.token}`, userData)
    .then(res => {
      dispatch({
        type: RESET_SUCCESSFUL
      });
      history.push("/login");
    })
    .catch(errors => {
      dispatch({
        type: RESET_FAILED
      });
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data
      });
    });
};

// Set the logged in user
export const fetchUser = () => dispatch => {

  if (localStorage.token) {
    // set token to the auth header
    setAuthToken(localStorage.token);
  }
  //get request to login passing the user data as the parameters
  axios
    .get("/api/users/current")
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Check if user account is activated
export const isActivated = () => dispatch => {
  axios
  .get("/auth/activated")
  .then(res => {
    dispatch({
      type: IS_ACTIVATED_SUCCESSFUL,
      payload: res.data
    });
  })
  .catch(errors => {
    dispatch({
      type: GET_ERRORS,
      payload: errors.response.data
    });
  });
}

// Send reset token to user
export const emailReset = (userData) => dispatch => {
  axios
    .post("/auth/reset/email", userData)
    .then(res => {
      dispatch({
        type: EMAIL_RESET_SUCCESSFUL,
        payload: res.data
      });
    })
    .catch(errors => {
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data
      });
    });
};


// Send reset token to user
export const deleteAccount = (history) => dispatch => {
  axios
    .delete("/auth/delete")
    .then(
      dispatch({
        type: ACCOUNT_DELETED,
      })
    )
    .catch(errors => {
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data
      });
    });
};

export const contactForm = (submission) => dispatch => {
  axios
    .post("/auth/contactform", submission)
    .catch(errors => {
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data
      });
    });
}

export const logoutUser = (history) => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('token');
  // Remove auth header for future requests
  setAuthToken(false);
  // Push to logout
  history.push("/api/logout");
};