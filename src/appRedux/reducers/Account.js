import { FETCH_PROFILE } from "../../constants/ActionTypes";

let initialState = [];

const Account = (state = initialState, action) => {
  let { profile } = action;
  switch (action.type) {
    case FETCH_PROFILE:
      state = profile;
      return { ...state };
    default:
      return { ...state };
  }
};

export default Account;
