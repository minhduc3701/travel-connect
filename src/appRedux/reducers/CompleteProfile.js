import {
  COMPLETE_STEP1_PERSONAL_PROFILE,
  COMPLETE_STEP2_PERSONAL_PROFILE,
  COMPLETE_STEP3_PERSONAL_PROFILE,
  SEND_COMPLETE_PROFILE
} from "../../constants/ActionTypes";

let initialState = [];

const CompleteProfile = (state = initialState, action) => {
  switch (action.type) {
    case COMPLETE_STEP1_PERSONAL_PROFILE: {
      state = action.person;
      return [...state];
    }
    case COMPLETE_STEP2_PERSONAL_PROFILE: {
      state = action.person;
      return [...state];
    }
    case COMPLETE_STEP3_PERSONAL_PROFILE: {
      state = action.person;
      return [...state];
    }
    case SEND_COMPLETE_PROFILE: {
      console.log(state);
      return [...state];
    }
    default:
      return [...state];
  }
};

export default CompleteProfile;
