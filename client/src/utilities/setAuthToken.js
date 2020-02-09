import axios from "axios";

const setAuthToken = token => {
  // If the token exists, apply it to every request
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;