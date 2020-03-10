import {
  SWITCH_LANGUAGE,
  TOGGLE_COLLAPSED_NAV,
  WINDOW_WIDTH
} from "constants/ActionTypes";
import {
  LAYOUT_TYPE,
  NAV_STYLE,
  THEME_COLOR_SELECTION,
  THEME_TYPE
} from "../../constants/ThemeSetting";
import firebaseAcc from "firebase/firebaseAcc";

export function toggleCollapsedSideNav(navCollapsed) {
  return { type: TOGGLE_COLLAPSED_NAV, navCollapsed };
}

export function updateWindowWidth(width) {
  return { type: WINDOW_WIDTH, width };
}

export function setThemeType(themeType) {
  return { type: THEME_TYPE, themeType };
}

export function setThemeColorSelection(colorSelection) {
  return { type: THEME_COLOR_SELECTION, colorSelection };
}

export function onNavStyleChange(navStyle) {
  return { type: NAV_STYLE, navStyle };
}

export function onLayoutTypeChange(layoutType) {
  return { type: LAYOUT_TYPE, layoutType };
}

export function switchLanguage(locale) {
  return {
    type: SWITCH_LANGUAGE,
    payload: locale
  };
}

export function updateLanguage(language) {
  let uid = JSON.parse(localStorage.getItem("user_info"));

  return dispatch => {
    firebaseAcc
      .firestore()
      .collection("users")
      .doc(uid.user_id)
      .update({
        language: language
      })
      .then()
      .catch(err => {
        console.log(err);
      });
  };
}

export function changeNoti(noti) {
  return dispatch => {
    if (noti[0])
      firebaseAcc
        .firestore()
        .doc(`users/${JSON.parse(localStorage.getItem("user_info")).user_id}`)
        .update({
          lastNoti: noti[0].id
        })
        .then(function(doc) {})
        .catch(function(error) {});
  };
}
