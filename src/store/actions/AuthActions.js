import { AsyncStorage } from "react-native";

export const SIGN_UP = "SIGN_UP";
export const SIGN_IN = "SIGN_IN";
export const LOGOUT = "LOGOUT";
export const AUTHANTICATE = "AUTHANTICATE";
let timer;

export const authanticate = (token, userId) => {
  return (dispatch) => {
    dispatch({ type: AUTHANTICATE, token: token, userId: userId });
  };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxe59fwiPm6yRBNRWMe9McNa7xt1_UF3o",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_EXISTS") {
        message =
          "This email exists, please enter onther email or login from this exist email !";
      }
      throw new Error(message);
    }

    const resData = await response.json();

    dispatch(authanticate(resData.idToken, resData.localId));
  };
};
export const signin = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxe59fwiPm6yRBNRWMe9McNa7xt1_UF3o",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "INVALID_PASSWORD") {
        message = "Invalid password, please enter correct password";
      } else if (errorId === "EMAIL_NOT_FOUND") {
        message =
          "This email not found, please check the correct email or sign up !";
      }
      throw new Error(message);
    }

    const resData = await response.json();

    dispatch(authanticate(resData.idToken, resData.localId));

    saveDateToStorage(resData.idToken, resData.localId);
  };
};

export const logout = () => {
  clearLogOutTimer();
  AsyncStorage.removeItem("userData");
  return {
    type: LOGOUT,
  };
};

const clearLogOutTimer = () => {
  if (timer) {
    clearTimeout(logout);
  }
};

const saveDateToStorage = (token, userId) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
    })
  );
};
