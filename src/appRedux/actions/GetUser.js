import {
  GET_USER_DATA_START,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
  START_GET_COMMENT_OVERVIEW,
  GET_COMMENT_OVERVIEW_SUCCESS,
  GET_COMMENT_OVERVIEW_ERROR,
  START_GET_COMMENT,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_ERROR
} from "constants/ActionTypes";
import axios from "util/TcApp";
import firebase from "firebase/firebaseAcc";
export const getUserData = () => {
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
export const getCommentOverview = () => {
  let uId = JSON.parse(localStorage.getItem("user_info"));
  return dispatch => {
    dispatch({ type: START_GET_COMMENT_OVERVIEW });
    firebase
      .firestore()
      .collection("companies")
      .doc(uId.company_id)
      .collection("comment")
      .limit(5)
      .get()
      .then(res => {
        let comment = [];

        res.forEach(doc => {
          comment.push(doc.data());
        });
        dispatch({ type: GET_COMMENT_OVERVIEW_SUCCESS, payload: comment });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: GET_COMMENT_OVERVIEW_ERROR, payload: err });
      });
  };
};
export const getComment = () => {
  let uId = JSON.parse(localStorage.getItem("user_info"));
  return dispatch => {
    dispatch({ type: START_GET_COMMENT });
    firebase
      .firestore()
      .collection("companies")
      .doc(uId.company_id)
      .collection("comment")
      .get()
      .then(res => {
        let comment = [];
        res.forEach(doc => {
          comment.push(doc.data());
        });
        dispatch({ type: GET_COMMENT_SUCCESS, payload: comment });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: GET_COMMENT_ERROR, payload: err });
      });
  };
};

export const getCommentFilter = (filter, rank) => {
  let uId = JSON.parse(localStorage.getItem("user_info"));
  if (filter === "new") {
    if (rank === "0") {
      return dispatch => {
        dispatch({ type: START_GET_COMMENT });
        firebase
          .firestore()
          .collection("companies")
          .doc(uId.company_id)
          .collection("comment")
          .orderBy("commentAt", "desc")
          .get()
          .then(res => {
            let comment = [];
            res.forEach(doc => {
              comment.push(doc.data());
            });
            dispatch({ type: GET_COMMENT_SUCCESS, payload: comment });
          })
          .catch(err => {
            console.log(err);
            dispatch({ type: GET_COMMENT_ERROR, payload: err });
          });
      };
    } else {
      return dispatch => {
        dispatch({ type: START_GET_COMMENT });
        firebase
          .firestore()
          .collection("companies")
          .doc(uId.company_id)
          .collection("comment")
          .where("rate", "==", rank - 0)
          .orderBy("commentAt", "desc")
          .get()
          .then(res => {
            let comment = [];
            res.forEach(doc => {
              comment.push(doc.data());
            });
            dispatch({ type: GET_COMMENT_SUCCESS, payload: comment });
          })
          .catch(err => {
            console.log(err);
            dispatch({ type: GET_COMMENT_ERROR, payload: err });
          });
      };
    }
  } else {
    if (rank === "0") {
      return dispatch => {
        dispatch({ type: START_GET_COMMENT });
        firebase
          .firestore()
          .collection("companies")
          .doc(uId.company_id)
          .collection("comment")
          .get()
          .then(res => {
            let comment = [];
            res.forEach(doc => {
              comment.push(doc.data());
            });
            dispatch({ type: GET_COMMENT_SUCCESS, payload: comment });
          })
          .catch(err => {
            console.log(err);
            dispatch({ type: GET_COMMENT_ERROR, payload: err });
          });
      };
    } else {
      return dispatch => {
        dispatch({ type: START_GET_COMMENT });
        firebase
          .firestore()
          .collection("companies")
          .doc(uId.company_id)
          .collection("comment")
          .where("rate", "==", rank - 0)

          .get()
          .then(res => {
            let comment = [];
            res.forEach(doc => {
              comment.push(doc.data());
            });
            dispatch({ type: GET_COMMENT_SUCCESS, payload: comment });
          })
          .catch(err => {
            console.log(err);
            dispatch({ type: GET_COMMENT_ERROR, payload: err });
          });
      };
    }
  }
};
