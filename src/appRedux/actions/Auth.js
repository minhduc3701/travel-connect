import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  INIT_URL,
  SIGNOUT_USER_SUCCESS,
  USER_DATA,
  USER_TOKEN_SET
} from "../../constants/ActionTypes";
import axios from "util/Api";

export const setInitUrl = url => {
  return {
    type: INIT_URL,
    payload: url
  };
};

export const userSignUp = ({ email, password, name }) => {
  return dispatch => {
    dispatch({ type: FETCH_START });
    axios
      .post("signup", {
        email: email,
        password: password,
        name: name
      })
      .then(({ data }) => {
        if (data.result) {
          localStorage.setItem(
            "token",
            JSON.stringify(data.token.access_token)
          );
          axios.defaults.headers.common["access-token"] =
            "Bearer " + data.token.access_token;
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: USER_TOKEN_SET, payload: data.token.access_token });
          dispatch({ type: USER_DATA, payload: data.user });
        } else {
          dispatch({ type: FETCH_ERROR, payload: "Network Error" });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const userSignIn = ({ email, password }) => {
  return dispatch => {
    dispatch({ type: FETCH_START });
    axios
      .post("auth/login", {
        email: email,
        password: password
      })
      .then(({ data }) => {
        if (data.result) {
          localStorage.setItem(
            "token",
            JSON.stringify(data.token.access_token)
          );
          axios.defaults.headers.common["access-token"] =
            "Bearer " + data.token.access_token;
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: USER_TOKEN_SET, payload: data.token.access_token });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const getUser = () => {
  return dispatch => {
    dispatch({ type: FETCH_START });
    axios
      .post("auth/me")
      .then(({ data }) => {
        if (data.result) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: USER_DATA, payload: data.user });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const userSignOut = () => {
  return dispatch => {
    dispatch({ type: FETCH_START });
    setTimeout(() => {
      localStorage.removeItem("token");
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: SIGNOUT_USER_SUCCESS });
    }, 2000);
  };
};
