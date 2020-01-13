import {
  FETCH_PROFILE,
  COMPANY_PROFILE_STEP3,
  COMPANY_PROFILE_STEP4
} from "../../constants/ActionTypes";
import { CallApi_USER, CallApi_ACCOUNT } from "util/CallApi";


export const actFetchAction = profile => {
  return {
    type: FETCH_PROFILE,
    profile
  };
};

//lay profile company
export const actFetchActionRequest = () => {
let uId = JSON.parse(localStorage.getItem("user_info"));
return dispatch => {
    return CallApi_ACCOUNT(`VN/companies/${uId.company_id}`, "GET", null)
      .then(res => {
        console.log(res);
        dispatch(actFetchAction({ ...res.data }));
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
export const actCreateCompanyRequest = profile => {
  return dispatch => {
    return CallApi_ACCOUNT("companies", "POST", profile)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
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
