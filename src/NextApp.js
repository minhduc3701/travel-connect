import React from "react";
import { ConnectedRouter } from "react-router-redux";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";

import "assets/vendors/style";
import "styles/wieldy.less";
import configureStore, { history } from "./appRedux/store";
import App from "./containers/App/index";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import firebase from "firebase/firebaseAcc";
export const store = configureStore();
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
};
const NextApp = () => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </ConnectedRouter>
    </ReactReduxFirebaseProvider>
  </Provider>
);

export default NextApp;
