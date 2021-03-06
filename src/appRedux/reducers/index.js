import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import Settings from "./Settings";
import Auth from "./Auth";
import Common from "./Common";
import Account from "./Account";
import User from "./User";
import Step from "./Step";
import CompanyProfile from "./CompanyProfile";
import GetUser from "./GetUser";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const reducers = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
  commonData: Common,
  getUser: GetUser,
  Account,
  User,
  Step,
  CompanyProfile
});

export default reducers;
