import axios from "axios";
import { store } from "../store/store";

const API_URL = "http://localhost:8082/api/auth/";

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
