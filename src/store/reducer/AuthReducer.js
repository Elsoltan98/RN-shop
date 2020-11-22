import { AUTHANTICATE, LOGOUT } from "../actions/AuthActions";

const initialState = {
  token: null,
  userId: null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHANTICATE:
      return {
        token: action.token,
        userId: action.userId,
      };
    // case SIGN_IN:
    //   return {
    //     token: action.token,
    //     userId: action.userId,
    //   };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
