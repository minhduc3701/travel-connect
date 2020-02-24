import React, { Component } from "react";
import { connect } from "react-redux";
import URLSearchParams from "url-search-params";
import { Redirect, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";
import AppLocale from "lngProvider";
import MainApp from "./MainApp";
import {
  onLayoutTypeChange,
  onNavStyleChange,
  setThemeType
} from "appRedux/actions/Setting";
import { setInitUrl, userSignInSuccess } from "appRedux/actions/Auth";
import {
  LAYOUT_TYPE_BOXED,
  LAYOUT_TYPE_FRAMED,
  LAYOUT_TYPE_FULL,
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  THEME_TYPE_DARK
} from "../../constants/ThemeSetting";
import CircularProgress from "components/GlobalComponent/CircularProgress";
import firebaseAcc from "firebase/firebaseAcc";

const RestrictedRoute = ({ component: Component, authUser, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authUser !== -1 ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
class App extends Component {
  setLayoutType = layoutType => {
    if (layoutType === LAYOUT_TYPE_FULL) {
      document.body.classList.remove("boxed-layout");
      document.body.classList.remove("framed-layout");
      document.body.classList.add("full-layout");
    } else if (layoutType === LAYOUT_TYPE_BOXED) {
      document.body.classList.remove("full-layout");
      document.body.classList.remove("framed-layout");
      document.body.classList.add("boxed-layout");
    } else if (layoutType === LAYOUT_TYPE_FRAMED) {
      document.body.classList.remove("boxed-layout");
      document.body.classList.remove("full-layout");
      document.body.classList.add("framed-layout");
    }
  };

  setNavStyle = navStyle => {
    if (
      navStyle === NAV_STYLE_DEFAULT_HORIZONTAL ||
      navStyle === NAV_STYLE_DARK_HORIZONTAL ||
      navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL ||
      navStyle === NAV_STYLE_ABOVE_HEADER ||
      navStyle === NAV_STYLE_BELOW_HEADER
    ) {
      document.body.classList.add("full-scroll");
      document.body.classList.add("horizontal-layout");
    } else {
      document.body.classList.remove("full-scroll");
      document.body.classList.remove("horizontal-layout");
    }
  };

  componentWillMount() {
    if (this.props.initURL === "") {
      this.props.setInitUrl(this.props.history.location.pathname);
    }

    const params = new URLSearchParams(this.props.location.search);
    if (params.has("theme")) {
      this.props.setThemeType(params.get("theme"));
    }
    if (params.has("nav-style")) {
      this.props.onNavStyleChange(params.get("nav-style"));
    }
    if (params.has("layout-type")) {
      this.props.onLayoutTypeChange(params.get("layout-type"));
    }
  }

  render() {
    const {
      match,
      location,
      themeType,
      layoutType,
      navStyle,
      locale,
      initURL,
      authUser
    } = this.props;
    if (themeType === THEME_TYPE_DARK) {
      document.body.classList.add("dark-theme");
    }
    if (location.pathname === "/") {
      if (authUser === -1) {
        return (window.location.href =
          "http://app.travelconnect.global/signin");
      }
      if (initURL === "" || initURL === "/" || initURL === "/signin") {
        return <Redirect to={"/dashboard"} />;
      } else {
        return <Redirect to={initURL} />;
      }
    }
    this.setLayoutType(layoutType);

    this.setNavStyle(navStyle);
    const currentAppLocale = AppLocale[locale.locale];
    firebaseAcc.auth().onAuthStateChanged(function(user) {
      if (user) {
        var id = document.cookie.match("(^|;) ?" + "user_id" + "=([^;]*)(;|$)");
        let uid = id[2];
        if (user.uid !== uid) {
          firebaseAcc.auth().signOut();
          document.cookie =
            "acc_token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT;domain=travelconnect.global";
          document.cookie =
            "user_id= ; expires = Thu, 01 Jan 1970 00:00:00 GMT;domain=travelconnect.global";
          window.location.href = "https://app.travelconnect.global/signin";
        }
      } else {
        // console.log(document.cookie.indexOf("acc_token"));
        var v = document.cookie.match(
          "(^|;) ?" + "acc_token" + "=([^;]*)(;|$)"
        );
        let token = v[2];
        firebaseAcc
          .auth()
          .signInWithCustomToken(token)
          .catch(function(error) {
            console.log(error);
          });
      }
    });
    console.log(currentAppLocale);

    return (
      <ConfigProvider locale={currentAppLocale.antd}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          {this.props.authUser === -1 ? (
            <CircularProgress />
          ) : (
            <RestrictedRoute
              path={`${match.url}`}
              authUser={authUser}
              component={MainApp}
            />
          )}
        </IntlProvider>
      </ConfigProvider>
    );
  }
}

const mapStateToProps = ({ settings, state, auth, getUser }) => {
  const { locale, navStyle, themeType, layoutType } = settings;
  const { loading, data } = getUser;
  const { authUser, initURL } = auth;
  return {
    locale,
    navStyle,
    themeType,
    layoutType,
    state,
    loading,
    data,
    authUser,
    initURL
  };
};

export default connect(mapStateToProps, {
  setThemeType,
  onNavStyleChange,
  onLayoutTypeChange,
  setInitUrl,
  userSignInSuccess
})(App);
