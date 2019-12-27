import {
  FETCH_PROFILE,
  UPDATE_COMPANY_PROFILE
} from "../../constants/ActionTypes";
import CallApi from "util/CallApi";

export const actFetchAction = profile => {
  return {
    type: FETCH_PROFILE,
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

export const actUpdateCompany = profile => {
  return {
    type: UPDATE_COMPANY_PROFILE,
    profile
  };
};

export const actUpdateCompanyRequest = profile => {
  return dispatch => {
    return CallApi("VN/companies/07WTNGl7FZsMxLJlbGRF", "PUT", profile)
      .then(res => {
        dispatch(actUpdateCompany({ ...res.data }));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
