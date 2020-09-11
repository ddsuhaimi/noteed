import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// Register user
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login user
export const loginUser = (userData, history) => (dispatch) => {
  axios.post("/api/users/login", userData).then((res) => {
    //   save to local storage
    
    // set token to local storage
    const { token } = res.data
    localStorage.setItem("jwtToken", token)

    // set token to Auth header
    setAuthToken(token)

    // decode token to get user data
    const decoded = jwt_decode(token)

    // set current user
    dispatch(setCurrentUser(decoded))
  }).catch(err => {
      dispatch({
          type: GET_ERRORS,
          payload: err.response.data
      })
  });
};


// set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// user loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    }
}

// log user out
export const logoutUser = () => dispatch => {
    // remove token from local storage
    localStorage.removeItem("jwtToken")

    // remove auth header from axios
    setAuthToken(false)

    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}))
}


// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};