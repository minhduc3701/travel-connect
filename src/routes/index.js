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
        <Route
          path={`${match.url}dashboard`}
          component={asyncComponent(() =>
            import("../components/BreadCrumbNav/Account/Dashboard")
          )}
        />
        <Route
          path={`${match.url}company`}
          component={asyncComponent(() =>
            import("../components/BreadCrumbNav/Account/Profile")
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
          <Route
            path={`${match.url}dashboard`}
            component={asyncComponent(() =>
              import("../components/Account/HomeDashboard")
            )}
          />
          <Route
            path={`${match.url}company`}
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

          <Route
            path={`${match.url}complete_profile`}
            component={asyncComponent(() =>
              import(
                "../components/Account/CompleteRegisterAccount/CompleteRegister/index"
              )
            )}
          />
          <Route
            path={`${match.url}new_complete`}
            component={asyncComponent(() =>
              import(
                "../components/Account/CompleteRegisterAccount/NewCompleteRegister/index"
              )
            )}
          />
          <Route
            path={`${match.url}new_complete_1`}
            component={asyncComponent(() =>
              import(
                "../components/Account/CompleteRegisterAccount/NewCompleteRegister/Verify"
              )
            )}
          />
          <Route
            path={`${match.url}new_complete/2`}
            component={asyncComponent(() =>
              import(
                "../components/Account/CompleteRegisterAccount/NewCompleteRegister/Company"
              )
            )}
          />
          <Route
            path={`${match.url}new_complete/3`}
            component={asyncComponent(() =>
              import(
                "../components/Account/CompleteRegisterAccount/NewCompleteRegister/Activity"
              )
            )}
          />
          <Route
            path={`${match.url}new_complete/4`}
            component={asyncComponent(() =>
              import(
                "../components/Account/CompleteRegisterAccount/NewCompleteRegister/Verify"
              )
            )}
          />
        </Switch>
      </div>
    </div>
  </div>
);

export default App;
// import React from "react";
// import { Switch } from "react-router-dom";
// // if Have component to render, use 2 command line code below
// import { Route } from "react-router-dom";
// import asyncComponent from "util/asyncComponent";
// const App = ({ match }) => (
//   <div>
//     <div
//       className="gx-main-content-wrapper"
//       style={{ padding: 0, width: "100%" }}
//     >
//       {/* RENDER BREADCRUMB HERE: */}
//       <Switch>
//         {/* HOME */}
//         <Route
//           path={`${match.url}home`}
//           component={asyncComponent(() =>
//             import("../components/BreadCrumbNav/BreadcrumbBar")
//           )}
//         />
//         <Route
//           path={`${match.url}dashboard`}
//           component={asyncComponent(() =>
//             import("../components/BreadCrumbNav/BreadcrumbBar")
//           )}
//         />
//         <Route
//           path={`${match.url}company`}
//           component={asyncComponent(() =>
//             import("../components/BreadCrumbNav/BreadcrumbBar")
//           )}
//         />
//         <Route
//           path={`${match.url}member-management`}
//           component={asyncComponent(() =>
//             import("../components/BreadCrumbNav/BreadcrumbBar")
//           )}
//         />
//         <Route
//           path={`${match.url}upgrade-account`}
//           component={asyncComponent(() =>
//             import("../components/BreadCrumbNav/BreadcrumbBar")
//           )}
//         />
//         {/* Profile */}
//         {/* Account */}
//         {/* Events */}
//         {/* Community */}
//         {/* Business Matching */}
//         {/* B2B Marketplace */}
//         {/* OTA Channel */}
//         {/* Recruitment */}
//         {/* Education */}
//         {/* Destination */}
//       </Switch>
//       <div className="gx-main-content-wrapper">
//         {/* RENDER CONTENT HERE: */}
//         <Switch>
//           <Route
//             path={`${match.url}home`} // url
//             component={asyncComponent(() => import("../components/test"))} // component will render when url is match
//           />
//           <Route
//             path={`${match.url}dashboard`}
//             component={asyncComponent(() =>
//               import("../components/Account/HomeDashboard")
//             )}
//           />
//           <Route
//             path={`${match.url}company`}
//             component={asyncComponent(() =>
//               import("../components/Account/ProfileCompany")
//             )}
//           />
//           <Route
//             path={`${match.url}member-management`}
//             component={asyncComponent(() =>
//               import("../components/Account/MemberManagement")
//             )}
//           />

//           <Route
//             path={`${match.url}upgrade-account`}
//             component={asyncComponent(() =>
//               import("../components/Account/UpgradeAccount")
//             )}
//           />

//           <Route
//             path={`${match.url}complete_profile`}
//             component={asyncComponent(() =>
//               import(
//                 "../components/Account/CompleteRegisterAccount/CompleteRegister/index"
//               )
//             )}
//           />
//         </Switch>
//       </div>
//     </div>
//   </div>
// );

// export default App;
