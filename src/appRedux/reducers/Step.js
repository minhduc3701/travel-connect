import {
  COMPANY_PROFILE_STEP3,
  COMPANY_PROFILE_STEP4
} from "../../constants/ActionTypes";

let initialState = [{ step3: "" }, { step4: "" }];

const Step = (state = initialState, action) => {
  let { step3, step4 } = action;
  switch (action.type) {
    case COMPANY_PROFILE_STEP3:
      state[0] = step3;
      return { ...state };
    case COMPANY_PROFILE_STEP4:
      state[1] = step4;
      // let data = {};
      // let dataResult = Object.assign(data, state[0], state[1]);
      // state = dataResult;
      return { ...state };
    // case COMPANY_PROFILE_STEP3:
    //   state = profile;
    //   return { ...state };

    default:
      return { ...state };
  }
};

export default Step;
