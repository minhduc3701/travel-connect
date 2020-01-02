import { UPDATE_USER_PROFILE } from "../../constants/ActionTypes";
import { CallApi_USER } from "util/CallApi";

export const actUpdateUser = user => {
  return {
    type: UPDATE_USER_PROFILE,
    user
  };
};

export const actUpdateUserRequest = user => {
  return dispatch => {
    return CallApi_USER("users/giZCKQ2pN6NRAF4Hac8fbNrwjAm2", "PUT", user)
      .then(res => {
        // dispatch(actUpdateUser({ ...res.data }));
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
};
