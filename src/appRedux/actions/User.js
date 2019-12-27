import { UPDATE_USER_PROFILE } from "../../constants/ActionTypes";
import CallApi from "util/CallApi";

export const actUpdateUser = user => {
  return {
    type: UPDATE_USER_PROFILE,
    user
  };
};

export const actUpdateUserRequest = user => {
  return dispatch => {
    return CallApi("users/vo3p9jXzyEeuiZ3CaRDMo9omFHs1", "PUT", user)
      .then(res => {
        dispatch(actUpdateUser({ ...res.data }));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
