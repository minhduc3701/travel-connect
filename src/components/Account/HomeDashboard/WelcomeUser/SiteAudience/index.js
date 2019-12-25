import React from "react";
import LineIndicator from "./LineIndicator";
import IntlMessages from "util/IntlMessages";
const SiteAudience = () => {
  return (
    <div className="gx-site-dash gx-mb-2 gx-pt-3 gx-pt-sm-0 gx-pt-xl-2">
      <h6 className="gx-text-uppercase gx-mb-2 gx-mb-sm-4">
        <IntlMessages id="transaction" />
      </h6>
      <ul className="gx-line-indicator">
        <li>
          <LineIndicator
            width="56%"
            // title="Success"
            title={<IntlMessages id="notification.success" />}
            color="cyan"
            value="56"
          />
        </li>
        <li>
          <LineIndicator
            width="42%"
            // title="Not success"
            title={<IntlMessages id="notSuccess" />}
            color="geekblue"
            value="42"
          />
        </li>
      </ul>
    </div>
  );
};
export default SiteAudience;
