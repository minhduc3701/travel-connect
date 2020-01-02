import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import Settings from "./Settings";
import Auth from "./Auth";
import Common from "./Common";
import Account from "./Account";
import User from "./User";
import Step from "./Step";
import CompanyProfile from "./CompanyProfile";

const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
  commonData: Common,
  Account,
  User,
  Step,
  CompanyProfile
});

export default reducers;
