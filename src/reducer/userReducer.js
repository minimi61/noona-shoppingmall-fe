import * as types from "../constants/user.constants";
const initialState = {};

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.REGISTER_USER_REQUEST:
    case types.LOGIN_WITH_TOKEN_REQUEST:
    case types.GOOGLE_LOGIN_REQUEST:
      return { ...state, loading: true };
    case types.LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case types.LOGIN_SUCCESS:
    case types.GOOGLE_LOGIN_SUCCESS:
    case types.LOGIN_WITH_TOKEN_SUCCESS:
      return { ...state, loading: false, user: payload.user };
    case types.LOGIN_FAIL:
    case types.GOOGLE_LOGIN_FAIL:
      return { ...state, loading: false, error: payload };
    case types.REGISTER_USER_FAIL:
      return { ...state, loading: false, error: payload };
    case types.LOGIN_WITH_TOKEN_FAIL:
      return { ...state, loading: false };
    case types.LOGOUT:
      return { ...state, user: null };
    case types.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

export default userReducer;
