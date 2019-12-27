import * as Types from "constants/ActionTypes";

let initialState = [];

const Account = (state = initialState, action) => {
  let { profile } = action;
  switch (action.type) {
    case Types.FETCH_PROFILE:
      state = profile;
      return { ...state };

    case Types.UPDATE_COMPANY_PROFILE:
      state = profile;
      return { ...state };

    default:
      return { ...state };
  }
};

export default Account;
