import {
  GET_USER_DATA_START,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR
} from "constants/ActionTypes";
import axios from "util/TcApp";
export const getUserData = () => {
  console.log("in");
  return dispatch => {
    dispatch({ type: GET_USER_DATA_START });
    // console.log(document.cookie.indexOf("request_token"));
    axios
      .get(
        "users/" +
          document.cookie
            .split(";")
            [document.cookie.indexOf("user_id")].split("=")[1],
        {
          headers: {
            Authorization:
              "Bearer " +
              document.cookie
                .split(";")
                [1 - document.cookie.indexOf("user_id")].split("=")[1]
          }
        }
      )
      .then(res => {
        localStorage.setItem("user_info", JSON.stringify(res.data));
        localStorage.setItem(
          "user_id",
          document.cookie
            .split(";")
            [1 - document.cookie.indexOf("user_id")].split("=")[1]
        );
      })
      .then(res => {
        dispatch({
          type: GET_USER_DATA_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => dispatch({ type: GET_USER_DATA_ERROR, payload: error }));
  };
};

export const getUserDataSuccess = () => {
  return dispatch => {
    dispatch({ type: GET_USER_DATA_SUCCESS });
  };
};
