import axios from "axios";
import { store } from "../store/store";
import Cookies from "js-cookie"

const API_URL = "http://35.204.225.66/api/auth/";

const cookieOptions = {
  expires: 1, // 1 day
  secure: false, // Set to true for HTTPS only
  // sameSite: 'strict',
};

export const authenticateUser = (username, password) => {
  return (dispatch) => {
    return axios
      .post(API_URL + "login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data) {
          dispatch(
            authenticationSuccess(
              response.data.userId,
              response.data.accessToken,
              response.data.refreshToken,
              response.data.authorities[0]?.authority
            )
          );
          Cookies.set("accessToken", response.data.accessToken, cookieOptions);
          Cookies.set(
            "refreshToken",
            response.data.refreshToken,
            cookieOptions
          );
          Cookies.set("userId", response.data.userId, cookieOptions);
          startTokenRefresh(response.data.refreshToken);
          return response.data;
        }
      })
      .catch((error) => {
        dispatch(authenticationFailure(error.message));
      });
  };
};

export const registerUser = (signupDTO) => {
  return (dispatch) => {
    return axios
      .post(API_URL + "register", signupDTO)
      .then((response) => {
        if (response.data) {
          dispatch(authenticationSuccess(response.data.userId, response.data.accessToken, response.data.refreshToken, response.data.authorities[0]?.authority));
          startTokenRefresh(response.data.refreshToken);
          return response.data;
        }
      })
      .catch((error) => {
        dispatch(authenticationFailure(error.message));
      });
  };
};

export const tokenRefresh = (refreshToken) => {
  return (dispatch) => {
    return axios
      .post(API_URL + "token", { refreshToken })
      .then((response) => {
        if (response.data) {
          dispatch(
            authenticationSuccess(
              response.data.userId,
              response.data.accessToken,
              response.data.refreshToken,
              response.data.authorities[0]?.authority
            )
          );
        }
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(authenticationFailure(error.message));
      });
  };
};

const startTokenRefresh = (refreshToken) => {
  setInterval(() => {
    store.dispatch(tokenRefresh(refreshToken));
  }, 240000);
};

export const authenticationSuccess = (userId, token, refreshToken, role) => {
  console.log(userId);
  return {
    type: "AUTHENTICATION_SUCCESS",
    payload: { userId, token, refreshToken, role },
  };
};

export const authenticationFailure = (error) => {
  return {
    type: "AUTHENTICATION_FAILURE",
    payload: error,
  };
};

export const logout = () => ({
  type: "LOGOUT",
});
