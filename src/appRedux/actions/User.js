import { UPDATE_USER_PROFILE } from "../../constants/ActionTypes";
import { CallApi_USER } from "util/CallApi";


export const actUpdateUser = user => {
  return {
    type: UPDATE_USER_PROFILE,
    user
  };
};

export const actUpdateUserRequest = user => {
let uId = JSON.parse(localStorage.getItem("user_info"));
return dispatch => {
    return CallApi_USER(`users/${uId.user_id}`, "PUT", user)
      .then(res => {
        // dispatch(actUpdateUser({ ...res.data }));
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
};
