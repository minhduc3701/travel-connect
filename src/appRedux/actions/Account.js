import * as Types from "constants/ActionTypes";
import CallApi from "util/CallApi";

export const actFetchAction = profile => {
  return {
    type: Types.FETCH_PROFILE,
    profile
  };
};

export const actFetchActionRequest = () => {
  return dispatch => {
    return CallApi("VN/companies/07WTNGl7FZsMxLJlbGRF", "GET", null)
      .then(res => {
        dispatch(actFetchAction({ ...res.data }));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
