import * as Types from "constants/ActionTypes";

let initialState = [];

const Account = (state = initialState, action) => {
  // let { profile } = action;
  switch (action.type) {
    case Types.FETCH_PROFILE:
      let newobj = action.profile;
      return [...state, newobj];

    default:
      return [...state];
  }
};

export default Account;
