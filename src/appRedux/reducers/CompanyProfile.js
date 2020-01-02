import {
  SAVE_DATA_INTRO,
  SAVE_DATA_SOCIAL,
  SAVE_DATA_MEDIA,
  SAVE_DATA_WEBSITE,
  SAVE_DATA_ADDRESS,
  CLEAN_STORE_REDUX,
  SAVE_DATA_BACKGROUND,
  SAVE_DATA_LOGO
} from "../../constants/ActionTypes";

// let initialState = [];

let initialState = [null, null, null, null, null, null, null];

const CompanyProfile = (state = initialState, action) => {
  let { intro, social, media, website, address, background, logo } = action;
  // console.log(state);
  switch (action.type) {
    case SAVE_DATA_INTRO:
      // state = Object.assign({}, intro, state);
      state[0] = intro;
      // console.log(state);
      return { ...state };

    case SAVE_DATA_ADDRESS:
      // state = Object.assign({}, address, state);
      state[1] = address;
      // console.log(state);
      return { ...state };

    case SAVE_DATA_SOCIAL:
      // state = Object.assign({}, social, state);
      state[2] = social;
      // console.log(state);
      return { ...state };

    case SAVE_DATA_MEDIA:
      // state = Object.assign({}, media, state);
      state[3] = media;
      // console.log(state);
      return { ...state };

    case SAVE_DATA_WEBSITE:
      // let b = website;
      // state = Object.assign({}, b, state);
      state[4] = website;
      // console.log(state);
      return { ...state };

    case SAVE_DATA_BACKGROUND:
      state[5] = background;
      console.log(state);
      return { ...state };

    case SAVE_DATA_LOGO:
      state[6] = logo;
      console.log(state);
      return { ...state };

    case CLEAN_STORE_REDUX:
      state = [null, null, null, null, null, null, null];
      // console.log(state);
      return { ...state };

    default:
      return { ...state };
  }
};

export default CompanyProfile;
