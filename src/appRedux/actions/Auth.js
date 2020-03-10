import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_FACEBOOK_USER,
  SIGNIN_FACEBOOK_USER_SUCCESS,
  SIGNIN_GITHUB_USER,
  SIGNIN_GITHUB_USER_SUCCESS,
  SIGNIN_GOOGLE_USER,
  SIGNIN_GOOGLE_USER_SUCCESS,
  SIGNIN_TWITTER_USER,
  SIGNIN_TWITTER_USER_SUCCESS,
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  // SIGNOUT_USER,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS
} from "constants/ActionTypes";
import firebaseAcc from "firebase/firebaseAcc";

export const updatePackage = pack => {
  pack.lastUpdate = new Date().toISOString();

  return dispatch => {
    let user = JSON.parse(localStorage.getItem("user_info"));
    firebaseAcc
      .firestore()
      .collection("users")
      .doc(user.user_id)
      .update({
        package: pack,
        [`package.deadline`]:
          pack.duration === "month"
            ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString()
            : new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 12).toISOString()
      })
      .then(res => {})
      .catch(err => {
        console.log(err);
      });
  };
};

export const userSignUp = user => {
  return {
    type: SIGNUP_USER,
    payload: user
  };
};

export const userSignIn = user => {
  return {
    type: SIGNIN_USER,
    payload: user
  };
};
export const userSignOut = () => {
  let cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let eqPos = cookie.indexOf("=");
    let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie =
      name +
      "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=travelconnect.global;path=/";
  }

  localStorage.clear();
  return (window.location.href = "http://app.travelconnect.global/signin");
};
export const userSignUpSuccess = () => {
  return {
    type: SIGNUP_USER_SUCCESS
    // payload: authUser
  };
};

export const userSignInSuccess = authUser => {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: authUser
  };
};
export const userSignOutSuccess = () => {
  return {
    type: SIGNOUT_USER_SUCCESS
  };
};

export const showAuthMessage = message => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};

export const userGoogleSignIn = () => {
  return {
    type: SIGNIN_GOOGLE_USER
  };
};
export const userGoogleSignInSuccess = authUser => {
  return {
    type: SIGNIN_GOOGLE_USER_SUCCESS,
    payload: authUser
  };
};
export const userFacebookSignIn = () => {
  return {
    type: SIGNIN_FACEBOOK_USER
  };
};
export const userFacebookSignInSuccess = authUser => {
  return {
    type: SIGNIN_FACEBOOK_USER_SUCCESS,
    payload: authUser
  };
};
export const setInitUrl = url => {
  return {
    type: INIT_URL,
    payload: url
  };
};
export const userTwitterSignIn = () => {
  return {
    type: SIGNIN_TWITTER_USER
  };
};
export const userTwitterSignInSuccess = authUser => {
  return {
    type: SIGNIN_TWITTER_USER_SUCCESS,
    payload: authUser
  };
};
export const userGithubSignIn = () => {
  return {
    type: SIGNIN_GITHUB_USER
  };
};
export const userGithubSignInSuccess = authUser => {
  return {
    type: SIGNIN_GITHUB_USER_SUCCESS,
    payload: authUser
  };
};
export const showAuthLoader = () => {
  return {
    type: ON_SHOW_LOADER
  };
};

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE
  };
};
export const hideAuthLoader = () => {
  return {
    type: ON_HIDE_LOADER
  };
};
