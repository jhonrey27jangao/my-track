import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../utils/helpers/navigationRef";
import {
  validateEmail,
  validatePassword,
  validateRequired,
} from "../utils/helpers/validator";

const initialState = {
  token: null,
  errorMessage: "",
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "ERROR":
      return {
        ...state,
        errorMessage: action.payload,
      };
    case "SIGN_UP":
    case "SIGN_IN":
      return {
        ...state,
        token: action.payload,
        errorMessage: "",
      };
    case "SIGN_OUT":
      return {
        ...state,
        token: null,
        errorMessage: "",
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        errorMessage: "",
      };
    default:
      return state;
  }
};

const signIn = (dispatch) => {
  return async ({ email, password }) => {
    const haveValue = validateRequired(email) && validateRequired(password);
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);
    if (!haveValue) {
      dispatch({ type: "ERROR", payload: "Email and password is required" });
      return;
    }
    if (!validEmail) {
      dispatch({ type: "ERROR", payload: "Please enter a valid email" });
      return;
    }

    if (!validPassword) {
      dispatch({
        type: "ERROR",
        payload: "Password must have special characters and number",
      });
      return;
    }

    try {
      const response = await trackerApi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "SIGN_IN", payload: response.data.token });
      navigate("TrackList");
    } catch (e) {
      dispatch({ type: "ERROR", payload: "Email and password is incorrect." });
    }
  };
};

const signUp = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signup", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "SIGN_UP", payload: response.data.token });
      navigate("TrackList");
    } catch (e) {
      dispatch({ type: "ERROR", payload: "Something went wrong" });
    }
  };
};

const signOut = async (dispatch) => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "SIGN_OUT" });
  navigate("loginFlow");
};

const tryLocalSignIn = async (dispatch) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "SIGN_IN", payload: token });
    navigate("Account");
  } else {
    navigate("SignUp");
  }
};

const clearErrors = (dispatch) => {
  return () => dispatch({ type: "CLEAR_ERROR" });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signIn, signOut, signUp, clearErrors, tryLocalSignIn },
  initialState
);
