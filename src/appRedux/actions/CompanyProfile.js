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
import { CallApi_ACCOUNT } from "util/CallApi";

let uId = JSON.parse(localStorage.getItem("user_info"));

// Intro
export const actSaveIntro = intro => {
  return {
    type: SAVE_DATA_INTRO,
    intro
  };
};
export const actSaveIntroRequest = intro => {
  return dispatch => {
    return CallApi_ACCOUNT(
      `VN/companies/${uId.company_id}/introduction`,
      "PUT",
      intro
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
};

// Social
export const actSaveSocial = social => {
  return {
    type: SAVE_DATA_SOCIAL,
    social
  };
};
export const actSaveSocialRequest = social => {
  return dispatch => {
    return CallApi_ACCOUNT(
      `VN/companies/${uId.company_id}/social`,
      "PUT",
      social
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
};

// Media
export const actSaveMedia = media => {
  return {
    type: SAVE_DATA_MEDIA,
    media
  };
};
export const actSaveMediaRequest = media => {
  return dispatch => {
    return CallApi_ACCOUNT(
      `VN/companies/${uId.company_id}/medias`,
      "POST",
      media
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
};

// Website
export const actSaveWebsite = website => {
  return {
    type: SAVE_DATA_WEBSITE,
    website
  };
};
export const actSaveWebsiteRequest = website => {
  return dispatch => {
    return CallApi_ACCOUNT(
      `VN/companies/${uId.company_id}/website`,
      "PUT",
      website
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
};

// Address
export const actSaveAddress = address => {
  return {
    type: SAVE_DATA_ADDRESS,
    address
  };
};
export const actSaveAddressRequest = address => {
  return dispatch => {
    return CallApi_ACCOUNT(
      `VN/companies/${uId.company_id}/location`,
      "PUT",
      address
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
};

//CLEAN STORE
export const actCleanReduxStore = () => {
  return {
    type: CLEAN_STORE_REDUX
  };
};

//Change Background
export const actChangeBackground = background => {
  return {
    type: SAVE_DATA_BACKGROUND,
    background
  };
};
// export const actSaveBackgroundRequest = background => {
//   return dispatch => {
//     return CallApi_ACCOUNT(
//       "VN/companies/eDLBQUwHQck7eIIFyjiS/backgrounds",
//       "PUT",
//       background
//     )
//       .then(res => console.log(res))
//       .catch(err => console.log(err));
//   };
// };

//Change Logo
export const actChangeLogo = logo => {
  return {
    type: SAVE_DATA_LOGO,
    logo
  };
};
// export const actSaveLogoRequest = logo => {
//   return dispatch => {
//     return CallApi_ACCOUNT(
//       "VN/companies/eDLBQUwHQck7eIIFyjiS/logos",
//       "PUT",
//       logo
//     )
//       .then(res => console.log(res))
//       .catch(err => console.log(err));
//   };
// };
