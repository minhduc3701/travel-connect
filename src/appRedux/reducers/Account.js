import {
  FETCH_PROFILE,
  SAVE_LOCAL_BACKGROUND,
  SAVE_LOCAL_LOGO
} from "../../constants/ActionTypes";

let initialState = [];

const Account = (state = initialState, action) => {
  let { profile } = action;
  switch (action.type) {
    case FETCH_PROFILE:
      state = profile;
      return { ...state };

    case SAVE_LOCAL_BACKGROUND:
      for (const key in state) {
        if (key === "company_background") {
          state[key] = action.imageUrl;
        }
      }
      return { ...state };

    case SAVE_LOCAL_LOGO:
      for (const key in state) {
        if (key === "company_logo") {
          state[key] = action.imageUrl;
        }
      }
      return { ...state };

    default:
      return { ...state };
  }
};

export default Account;
