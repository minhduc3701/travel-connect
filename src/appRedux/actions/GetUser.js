import {
  START_GET_COMMENT_OVERVIEW,
  GET_COMMENT_OVERVIEW_SUCCESS,
  GET_COMMENT_OVERVIEW_ERROR,
  START_GET_COMMENT,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_ERROR,
  START_GET_RECOMMEND_LAND_OVERVIEW,
  GET_RECOMMEND_LAND_OVERVIEW_SUCCESS,
  GET_RECOMMEND_LAND_OVERVIEW_ERROR,
  START_GET_RECOMMEND_GROUP_OVERVIEW,
  GET_RECOMMEND_GROUP_OVERVIEW_SUCCESS,
  GET_RECOMMEND_GROUP_OVERVIEW_ERROR
} from "constants/ActionTypes";
import firebase from "firebase/firebaseAcc";
import { notiDetail } from "util/Notification";
// import { FirebaseDataB2b } from "firebase/firebaseAcc";
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

export const getRecommendLandOverview = () => {
  let uId = JSON.parse(localStorage.getItem("user_info"));
  return dispatch => {
    dispatch({ type: START_GET_RECOMMEND_LAND_OVERVIEW });
    firebase
      .firestore()
      .collection("companies")
      .doc(uId.company_id)
      .collection("recommendProduct")
      .where("productType", "==", "landtour")
      .limit(6)
      .get()
      .then(res => {
        let recommend = [];

        res.forEach(doc => {
          recommend.push(doc.data());
        });
        dispatch({
          type: GET_RECOMMEND_LAND_OVERVIEW_SUCCESS,
          payload: recommend
        });
      })
      .catch(err => {
        dispatch({ type: GET_RECOMMEND_LAND_OVERVIEW_ERROR, payload: err });
      });
  };
};

export const getRecommendGroupOverview = () => {
  let uId = JSON.parse(localStorage.getItem("user_info"));
  return dispatch => {
    dispatch({ type: START_GET_RECOMMEND_GROUP_OVERVIEW });
    firebase
      .firestore()
      .collection("companies")
      .doc(uId.company_id)
      .collection("recommendProduct")
      .where("productType", "==", "landtour")
      .limit(6)
      .get()
      .then(res => {
        let recommend = [];

        res.forEach(doc => {
          recommend.push(doc.data());
        });
        dispatch({
          type: GET_RECOMMEND_GROUP_OVERVIEW_SUCCESS,
          payload: recommend
        });
      })
      .catch(err => {
        dispatch({ type: GET_RECOMMEND_GROUP_OVERVIEW_ERROR, payload: err });
      });
  };
};

export const unRecommend = (collection, id) => {
  const user_info = JSON.parse(localStorage.getItem("user_info"));
  return () => {
    firebase
      .app("FirebaseB2b")
      .firestore()
      .collection(collection)
      .doc(id)
      .collection("recommend")
      .where("companyId", "==", user_info.company_id)
      .get()
      .then(res => {
        res.docs.forEach(doc =>
          firebase
            .firestore()
            .collection(collection)
            .doc(id)
            .collection("recommend")
            .doc(doc.id)
            .delete()
        );
      });
    firebase

      .firestore()
      .collection("companies")
      .doc(user_info.company_id)
      .collection("recommendProduct")
      .where("productId", "==", id)
      .get()
      .then(res => {
        res.docs.forEach(doc =>
          firebase

            .firestore()
            .collection("companies")
            .doc(user_info.company_id)
            .collection("recommendProduct")
            .doc(doc.id)
            .delete()
        );
      })
      .then(() => {
        notiDetail(
          "success",
          "Thành công!",
          "Công ty bạn đã hủy recommend sản phẩm"
        );
      })
      .catch(err => {
        console.log(err);
      });
  };
};
