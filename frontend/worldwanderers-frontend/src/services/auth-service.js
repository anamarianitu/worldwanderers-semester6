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

export const refreshToken = (refreshToken) => {
  return (dispatch) => {
    return axios
      .post(
        API_URL + "token",
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      )
      .then((response) => {
        if (response.data) {
          dispatch(
            authenticationSuccess(
              response.data.accessToken,
              response.data.refreshToken
            )
          );
        }
      })
      .catch((error) => {
        dispatch(authenticationFailure(error.message));
      });
  };
};

const startTokenRefresh = (refreshToken) => {
  setInterval(() => {
    store.dispatch(refreshToken(refreshToken));
  }, 240000);
};

export const authenticationSuccess = (token, refreshToken) => {
  return {
    type: "AUTHENTICATION_SUCCESS",
    payload: { token, refreshToken },
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
