import {
  FETCH_PROFILE,
  COMPANY_PROFILE_STEP3,
  COMPANY_PROFILE_STEP4,
  SAVE_LOCAL_BACKGROUND,
  SAVE_LOCAL_LOGO

  // FETCH_PROFILE_SDK_START
} from "../../constants/ActionTypes";
import { CallApi_USER, CallApi_ACCOUNT } from "util/CallApi";
import { notiChange } from "util/Notification";
// import firebase from "firebase/firebaseAcc";

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
export const actSetNewAvatar = imageUrl => {
  return {
    type: SAVE_LOCAL_LOGO,
    imageUrl
  };
};
