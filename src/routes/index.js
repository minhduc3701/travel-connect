import React from "react";
import { Switch } from "react-router-dom";
// if Have component to render, use 2 command line code below
import { Route } from "react-router-dom";
import asyncComponent from "util/asyncComponent";
const App = ({ match }) => (
  <div>
    <div
      className="gx-main-content-wrapper"
      style={{ padding: 0, width: "100%" }}
    >
      {/* RENDER BREADCRUMB HERE: */}
      <Switch>
        {/* HOME */}
        <Route
          path={`${match.url}home`}
          component={asyncComponent(() =>
            import("../components/BreadCrumbNav/BreadcrumbBar")
          )}
        />
        {/* Profile */}
        {/* Account */}
        {/* Events */}
        {/* Community */}
        {/* Business Matching */}
        {/* B2B Marketplace */}
        {/* OTA Channel */}
        {/* Recruitment */}
        {/* Education */}
        {/* Destination */}
      </Switch>
      <div className="gx-main-content-wrapper">
        {/* RENDER CONTENT HERE: */}
        <Switch>
          <Route
            path={`${match.url}home`} // url
            component={asyncComponent(() => import("../components/test"))} // component will render when url is match
          />
        </Switch>
      </div>
    </div>
  </div>
);

export default App;
