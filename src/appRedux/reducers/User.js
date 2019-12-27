import { UPDATE_USER_PROFILE } from "../../constants/ActionTypes";

let initialState = [];

const User = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_PROFILE:
      state = action.user;
      return { ...state };

    default:
      return { ...state };
  }
};

export default User;
