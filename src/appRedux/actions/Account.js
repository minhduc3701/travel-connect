import {
  FETCH_PROFILE,
  COMPANY_PROFILE_STEP3,
  COMPANY_PROFILE_STEP4,
  SAVE_LOCAL_BACKGROUND,
  GET_PRODUCT_LAND_MEMBER_START,
  GET_PRODUCT_LAND_MEMBER_SUCCESS,
  GET_PRODUCT_LAND_MEMBER_ERROR,
  GET_PRODUCT_GROUP_MEMBER_START,
  GET_PRODUCT_GROUP_MEMBER_SUCCESS,
  GET_PRODUCT_GROUP_MEMBER_ERROR,
  GET_PRODUCT_NEXT_LAND_MEMBER_START,
  GET_PRODUCT_NEXT_LAND_MEMBER_SUCCESS,
  GET_PRODUCT_NEXT_LAND_MEMBER_ERROR,
  GET_PRODUCT_NEXT_GROUP_MEMBER_START,
  GET_PRODUCT_NEXT_GROUP_MEMBER_SUCCESS,
  GET_PRODUCT_NEXT_GROUP_MEMBER_ERROR,
  RESET_CURRENT_LIST,
  GET_PREV_DATA_SUCCESS
  // FETCH_PROFILE_SDK_START
} from "../../constants/ActionTypes";
import { CallApi_USER, CallApi_ACCOUNT } from "util/CallApi";
import { notiChange } from "util/Notification";
import firebase from "firebase/firebaseAcc";

export const actFetchAction = profile => {
  return {
    type: FETCH_PROFILE,
    profile
  };
};

// lay profile company
export const actFetchActionRequest = () => {
  let uId = JSON.parse(localStorage.getItem("user_info"));
  return dispatch => {
    return CallApi_ACCOUNT(`VN/companies/${uId.company_id}`, "GET", null)
      .then(res => {
        dispatch(actFetchAction(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const actSaveProfile3 = step3 => {
  return {
    type: COMPANY_PROFILE_STEP3,
    step3
  };
};
export const actSaveProfile4 = step4 => {
  return {
    type: COMPANY_PROFILE_STEP4,
    step4
  };
};

//send resquest license update profile company
export const actChangeLicenseRequest = license => {
  let uId = JSON.parse(localStorage.getItem("user_info"));
  return dispatch => {
    return CallApi_ACCOUNT(
      `VN/companies/${uId.company_id}/requests`,
      "POST",
      license
    )
      .then(res => {
        console.log("Send request success!" + res);
      })
      .catch(err => {
        console.log(err);
      });
  };
};

//create company step 2-3
export const actCreateCompanyRequest = (profile, file) => {
  return dispatch => {
    return CallApi_ACCOUNT("companies", "POST", profile)
      .then(res => {
        onSendImage(file, res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const onSendImage = (fileList, id) => {
  let uId = JSON.parse(localStorage.getItem("user_info"));
  const formData = new FormData();
  fileList.forEach(file => {
    formData.append("image-", file);
  });
  CallApi_ACCOUNT(`VN/companies/${id.company_id}/licenceDocs`, "PUT", formData)
    .then(res => {
      let dataDup = uId;
      for (const key in id) {
        for (const newKey in dataDup) {
          if (key === newKey) {
            dataDup[newKey] = id[key];
          }
        }
      }
      if (res.data) {
        localStorage.removeItem("user_info");
        let newInfo = JSON.stringify(dataDup);
        notiChange("success", "Cập nhật thành công");
        localStorage.setItem("user_info", newInfo);
      }
    })
    .catch(err => console.log(err));
};

//Complete profile step 2 (cá nhân)
export const actUpdatePersonProfileRequest = profile => {
  let uId = JSON.parse(localStorage.getItem("user_info"));
  return dispatch => {
    return CallApi_USER(`users/${uId.user_id}/suggestion`, "PUT", profile)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
};

//update profile company
export const actUpdateCompanyProfileRequest = profile => {
  let uId = JSON.parse(localStorage.getItem("user_info"));
  return dispatch => {
    return CallApi_ACCOUNT(`VN/companies/${uId.company_id}`, "PUT", profile)
      .then(res => {
        console.log("Update success!" + res);
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const actSetNewImage = imageUrl => {
  return {
    type: SAVE_LOCAL_BACKGROUND,
    imageUrl
  };
};
export const actResetCurrentList = () => {
  return {
    type: RESET_CURRENT_LIST
  };
};

export const getPrevPageData = data => {
  return dispatch => {
    dispatch({ type: GET_PREV_DATA_SUCCESS, payload: data });
  };
};

export const getLandProductMember = (id, limit) => {
  return dispatch => {
    dispatch({ type: GET_PRODUCT_LAND_MEMBER_START });
    firebase
      .app("FirebaseB2b")
      .firestore()
      .collection("landtours")
      .where(`manager.id`, "==", id)
      .orderBy("createdAt", "desc")
      .limit(limit ? limit : 6)
      .get()
      .then(doc => {
        if (doc.docs.length < 6) {
          let number = 6 - doc.docs.length;
          dispatch(getGroupProductMember(id, number));
        }
        doc.docs.forEach(doc => {
          let productList = [];
          productList.push({
            id: doc.id,
            title: doc.data().title,
            code: doc.data().code,
            day: doc.data().durationDay,
            night: doc.data().durationNight,
            hours: doc.data().durationHours,
            publish: doc.data().publish,
            requests: doc.data().requests,
            thumb: doc.data().thumbs[0].thumb,
            status: doc.data().status,
            verify: doc.data().verify,
            createdAt: doc.data().createdAt,
            type: "landtour"
          });
          dispatch({
            type: GET_PRODUCT_LAND_MEMBER_SUCCESS,
            payload: productList
          });
        });
      })
      .catch(error => {
        dispatch({ type: GET_PRODUCT_LAND_MEMBER_ERROR, payload: error });
      });
  };
};
export const getGroupProductMember = (id, limit) => {
  return dispatch => {
    dispatch({ type: GET_PRODUCT_GROUP_MEMBER_START });
    firebase
      .app("FirebaseB2b")
      .firestore()
      .collection("grouptours")
      .where(`manager.id`, "==", id)
      .orderBy("createdAt", "desc")
      .limit(limit ? limit : 3)
      .get()
      .then(doc => {
        // if (doc.docs.length < 3) {
        //   console.log("get");
        //   let number = 3 - doc.docs.length;
        //   console.log(number);
        //   getLandProductMember(id, number);
        // }
        doc.docs.forEach(doc => {
          let productGroup = [];
          productGroup.push({
            id: doc.id,
            title: doc.data().title,
            code: doc.data().code,
            day: doc.data().durationDay,
            night: doc.data().durationNight,
            hours: doc.data().durationHours,
            publish: doc.data().publish,
            requests: doc.data().requests,
            thumb: doc.data().thumbs[0].thumb,
            status: doc.data().status,
            verify: doc.data().verify,
            createdAt: doc.data().createdAt,
            type: "grouptour"
          });
          dispatch({
            type: GET_PRODUCT_GROUP_MEMBER_SUCCESS,
            payload: productGroup
          });
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: GET_PRODUCT_GROUP_MEMBER_ERROR, payload: error });
      });
  };
};
export const getNextPageProductLand = (index, id, indexGroup) => {
  return dispatch => {
    dispatch({ type: GET_PRODUCT_NEXT_LAND_MEMBER_START });
    firebase
      .app("FirebaseB2b")
      .firestore()
      .collection("landtours")
      .where(`manager.id`, "==", id)
      .orderBy("createdAt", "desc")
      .startAfter(index)
      .limit(6)
      .get()
      .then(doc => {
        if (doc.docs.length < 6) {
          let number = 6 - doc.docs.length;
          dispatch(getNextPageProductGroup(indexGroup, id, number));
        }
        doc.docs.forEach(doc => {
          let productList = [];
          productList.push({
            id: doc.id,
            title: doc.data().title,
            code: doc.data().code,
            day: doc.data().durationDay,
            night: doc.data().durationNight,
            hours: doc.data().durationHours,
            publish: doc.data().publish,
            requests: doc.data().requests,
            thumb: doc.data().thumbs[0].thumb,
            status: doc.data().status,
            verify: doc.data().verify,
            createdAt: doc.data().createdAt,
            type: "landtour"
          });
          dispatch({
            type: GET_PRODUCT_NEXT_LAND_MEMBER_SUCCESS,
            payload: productList
          });
        });
      })
      .catch(error =>
        dispatch({ type: GET_PRODUCT_NEXT_LAND_MEMBER_ERROR, payload: error })
      );
  };
};
export const getNextPageProductGroup = (index, id, limit) => {
  return dispatch => {
    dispatch({ type: GET_PRODUCT_NEXT_GROUP_MEMBER_START });
    firebase
      .app("FirebaseB2b")
      .firestore()
      .collection("grouptours")
      .where(`manager.id`, "==", id)
      .orderBy("createdAt", "desc")
      .startAfter(index)
      .limit(limit ? limit : 6)
      .get()
      .then(doc => {
        doc.docs.forEach(doc => {
          let productGroup = [];
          productGroup.push({
            id: doc.id,
            title: doc.data().title,
            code: doc.data().code,
            day: doc.data().durationDay,
            night: doc.data().durationNight,
            hours: doc.data().durationHours,
            publish: doc.data().publish,
            requests: doc.data().requests,
            thumb: doc.data().thumbs[0].thumb,
            status: doc.data().status,
            verify: doc.data().verify,
            createdAt: doc.data().createdAt,
            type: "grouptour"
          });
          dispatch({
            type: GET_PRODUCT_NEXT_GROUP_MEMBER_SUCCESS,
            payload: productGroup
          });
        });
      })
      .catch(error =>
        dispatch({ type: GET_PRODUCT_NEXT_GROUP_MEMBER_ERROR, payload: error })
      );
  };
};
