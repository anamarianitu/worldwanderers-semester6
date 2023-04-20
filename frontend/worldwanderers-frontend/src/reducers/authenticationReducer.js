const initialState = {
  authenticated: false,
  token: null,
  refreshToken: null,
  error: null,
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTHENTICATION_SUCCESS":
      return {
        ...state,
        authenticated: true,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        error: null,
      };
    case "AUTHENTICATION_FAILURE":
      return {
        ...state,
        authenticated: false,
        token: null,
        refreshToken: null,
        error: action.payload,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default authenticationReducer;
