import React from "react";
import { Button } from "antd";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import IntlMessages from "util/IntlMessages";

class AccountPackage extends React.Component {
  render() {
    return (
      <div className="block_shadow">
        <WidgetHeader
          title={<IntlMessages id="home.settings.packageaccount" />}
        />
        <div className="gx-currentplan-row">
          <div className="gx-currentplan-col">
            <h2 className="gx-text-primary gx-fs-xlxl gx-font-weight-medium gx-mb-1">
              $0
              <sub className="gx-fs-md gx-bottom-0">
                /<IntlMessages id="month" />
              </sub>
            </h2>
            <p className="gx-mb-1">
              <span className="gx-size-8 gx-bg-dark gx-rounded-xs gx-d-inline-block gx-mr-1" />
              Max listing items 2K
            </p>
            <p>
              <span className="gx-size-8 gx-bg-dark gx-rounded-xs gx-d-inline-block gx-mr-1" />{" "}
              Max agents - 10
            </p>
          </div>
          <div className="gx-currentplan-col gx-currentplan-right">
            <div className="gx-currentplan-right-content">
              <p className="gx-text-red">
                <IntlMessages id="daysLeft" />
              </p>
              <Button className="gx-btn gx-btn-orange gx-mb-0 gx-mr-0 gx-text-uppercase">
                <IntlMessages id="renew" />
              </Button>
              <span className="gx-text-primary gx-fs-md gx-pointer gx-mts-3 gx-oth-plans-down">
                Dịch vụ khác{" "}
                <i className="icon icon-long-arrow-right gx-fs-xxl gx-ml-2 gx-d-inline-flex gx-vertical-align-middle" />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AccountPackage;
