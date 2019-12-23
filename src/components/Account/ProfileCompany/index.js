import React from "react";
// import IntlMessages from "util/IntlMessages";
import { Route, Switch } from "react-router-dom";

import asyncComponent from "util/asyncComponent";

class CompanyInfo extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
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
          <Route
            path={`${this.props.match.url}/update`}
            component={asyncComponent(() => import("./ProfileUpdate/index"))}
          />
        </Switch>
      </div>
    );
  }
}

export default CompanyInfo;
