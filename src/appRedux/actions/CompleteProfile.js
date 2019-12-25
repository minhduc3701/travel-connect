import {
  COMPLETE_STEP1_PERSONAL_PROFILE,
  COMPLETE_STEP2_PERSONAL_PROFILE,
  COMPLETE_STEP3_PERSONAL_PROFILE,
  SEND_COMPLETE_PROFILE
} from "../../constants/ActionTypes";

export const actCompleteStep1 = person => {
  return {
    type: COMPLETE_STEP1_PERSONAL_PROFILE,
    person
  };
};
export const actCompleteStep2 = company => {
  return {
    type: COMPLETE_STEP2_PERSONAL_PROFILE,
    company
  };
};
export const actCompleteStep3 = activity => {
  return {
    type: COMPLETE_STEP3_PERSONAL_PROFILE,
    activity
  };
};

export const actSendCompleteProfile = () => {
  return {
    type: SEND_COMPLETE_PROFILE
  };
};
