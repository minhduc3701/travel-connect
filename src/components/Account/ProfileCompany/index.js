import React from "react";
// import IntlMessages from "util/IntlMessages";
import { Route, Switch } from "react-router-dom";

import asyncComponent from "util/asyncComponent";

class CompanyInfo extends React.Component {
  render() {
    let user_info = JSON.parse(localStorage.getItem("user_info"));
    return (
      <div>
        <Switch>
          <Route
            exact
            path={`${this.props.match.url}`}
            component={asyncComponent(() => import("./Profile/index"))}
          />
          <Route
            path={`${this.props.match.url}/setting`}
            component={asyncComponent(() =>
              import("./Profile/updateProfile/index")
            )}
          />
          {user_info.user_position === "CEO" ? (
            <Route
              path={`${this.props.match.url}/update`}
              component={asyncComponent(() => import("./ProfileUpdate/index"))}
            />
          ) : null}
        </Switch>
      </div>
    );
  }
}

export default CompanyInfo;
