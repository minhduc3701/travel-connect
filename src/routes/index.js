import React from "react";
import { Switch } from "react-router-dom";
// if Have component to render, use 2 command line code below
import { Route } from "react-router-dom";
import asyncComponent from "util/asyncComponent";

// let user_info = JSON.parse(localStorage.getItem("user_info"));
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
        <Route
          path={`${match.url}dashboard`}
          component={asyncComponent(() =>
            import("../components/BreadCrumbNav/Account/Dashboard")
          )}
        />
        <Route
          path={`${match.url}member-management`}
          component={asyncComponent(() =>
            import("../components/BreadCrumbNav/Account/MemberManagement")
          )}
        />
        <Route
          path={`${match.url}upgrade-account`}
          component={asyncComponent(() =>
            import("../components/BreadCrumbNav/Account/UpgradeAccount")
          )}
        />
        <Route
          path={`${match.url}account-package`}
          component={asyncComponent(() =>
            import("../components/BreadCrumbNav/Account/UpgradeAccount")
          )}
        />
        <Route
          path={`${match.url}complete-profile`}
          component={asyncComponent(() =>
            import("../components/BreadCrumbNav/Account/CompleteProfile")
          )}
        />
        <Route
          path={`${match.url}user`}
          component={asyncComponent(() =>
            import(
              "../components/BreadCrumbNav/Account/NewCompleteProfile/User"
            )
          )}
        />
        <Route
          path={`${match.url}personal`}
          component={asyncComponent(() =>
            import(
              "../components/BreadCrumbNav/Account/NewCompleteProfile/User"
            )
          )}
        />
        <Route
          path={`${match.url}create-company`}
          component={asyncComponent(() =>
            import(
              "../components/BreadCrumbNav/Account/NewCompleteProfile/Company"
            )
          )}
        />
        <Route
          path={`${match.url}company`}
          component={asyncComponent(() =>
            import("../components/BreadCrumbNav/Account/Profile")
          )}
        />
        <Route
          path={`${match.url}profile`}
          component={asyncComponent(() =>
            import("../components/BreadCrumbNav/Account/Profile")
          )}
        />
        <Route
          path={`${match.url}profile/update`}
          component={asyncComponent(() =>
            import("../components/BreadCrumbNav/Account/Profile")
          )}
        />
        <Route
          path={`${match.url}verification`}
          component={asyncComponent(() =>
            import(
              "../components/BreadCrumbNav/Account/NewCompleteProfile/Verification"
            )
          )}
        />
      </Switch>
      <div className="gx-main-content-wrapper">
        {/* RENDER CONTENT HERE: */}
        <Switch>
          <Route
            path={`${match.url}dashboard`}
            component={asyncComponent(() =>
              import("../components/Account/HomeDashboard")
            )}
          />
          <Route
            path={`${match.url}profile`}
            component={asyncComponent(() =>
              import("../components/Account/ProfileCompany")
            )}
          />
          <Route
            path={`${match.url}member-management`}
            component={asyncComponent(() =>
              import("../components/Account/MemberManagement")
            )}
          />
          <Route
            path={`${match.url}upgrade-account`}
            component={asyncComponent(() =>
              import("../components/Account/UpgradeAccount")
            )}
          />
          {/* [New Step] */}
          <Route
            path={`${match.url}user`}
            component={asyncComponent(() =>
              import("../components/Account/NewCompleteProfile/Personal")
            )}
          />
          <Route
            path={`${match.url}personal`}
            exact
            component={asyncComponent(() =>
              import("../components/Account/NewCompleteProfile/PersonUser")
            )}
          />
          <Route
            path={`${match.url}create-company`}
            exact
            component={asyncComponent(() =>
              import("../components/Account/NewCompleteProfile/Company")
            )}
          />
          <Route
            path={`${match.url}company/:id`}
            exact
            component={asyncComponent(() =>
              import("../components/Account/ProfileCompany/ProfileGuest")
            )}
          />
          <Route
            path={`${match.url}verification`}
            exact
            component={asyncComponent(() =>
              import("../components/Account/NewCompleteProfile/Verify")
            )}
          />
          <Route
            path={`${match.url}account-package`}
            component={asyncComponent(() =>
              import("../components/Account/UpgradeAccount/UpgradeAccount")
            )}
          />
          <Route
            path={`${match.url}company/setting`}
            component={asyncComponent(() =>
              import("../components/Account/CompanySetting/RecommendList")
            )}
          />
        </Switch>
      </div>
    </div>
  </div>
);

export default App;
