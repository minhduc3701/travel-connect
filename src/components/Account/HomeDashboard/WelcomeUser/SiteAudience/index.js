import React from "react";
import LineIndicator from "./LineIndicator";
import IntlMessages from "util/IntlMessages";
const SiteAudience = props => {
  return (
    <div className="gx-site-dash gx-mb-2 gx-pt-3 gx-pt-sm-0 gx-pt-xl-2">
      <h6 className="gx-text-uppercase gx-mb-2 gx-mb-sm-4">
        <IntlMessages id="transaction" />
      </h6>
      <ul className="gx-line-indicator">
        {props.data && console.log(props.data[0])}
        <li>
          <LineIndicator
            width={
              props.data
                ? Math.round(
                    (props.data[0].requests.success * 100) /
                      props.data[0].requests.sum
                  ) + "%"
                : 0 + "%"
            }
            title={<IntlMessages id="notification.success" />}
            color="cyan"
            value={
              props.data
                ? Math.round(
                    (props.data[0].requests.success * 100) /
                      props.data[0].requests.sum
                  ) + "%"
                : 0 + " %"
            }
          />
        </li>
        <li>
          <LineIndicator
            width={
              props.data
                ? Math.round(
                    (props.data[0].requests.fail * 100) /
                      props.data[0].requests.sum
                  ) + "%"
                : 0 + "%"
            }
            title={<IntlMessages id="notSuccess" />}
            color="geekblue"
            value={
              props.data
                ? Math.round(
                    (props.data[0].requests.fail * 100) /
                      props.data[0].requests.sum
                  ) + "%"
                : 0 + " %"
            }
          />
        </li>
      </ul>
    </div>
  );
};
export default SiteAudience;
