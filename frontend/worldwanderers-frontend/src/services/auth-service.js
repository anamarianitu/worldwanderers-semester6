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
              response.data.refreshToken
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
              response.data.refreshToken
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

export const authenticationSuccess = (userId, token, refreshToken) => {
  console.log(userId);
  return {
    type: "AUTHENTICATION_SUCCESS",
    payload: { userId, token, refreshToken },
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
