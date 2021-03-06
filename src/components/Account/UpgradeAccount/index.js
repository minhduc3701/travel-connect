import React, { Component } from "react";
import { Radio } from "antd";
import IntlMessages from "util/IntlMessages";
import PackageMonth from "./PackageMonth";
import PackageYear from "./PackageYear";

class DynamicRules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCompany: false,
      value: null,
      package: "month",
      visible: true
    };
  }

  selectPackage = e => {
    this.setState({
      package: e.target.value
    });
  };

  render() {
    return (
      <div className="step-card ">
        <div>
          <div className="block-w bor-rad-6">
            <h1 className="p-t-5 header-upgrade">
              <IntlMessages id="account.package.title" />
            </h1>
            <h1 className="header-upgrade">
              <Radio.Group
                className="header-upgrade "
                onChange={e => this.selectPackage(e)}
              >
                <Radio.Button value="month">
                  <IntlMessages id="account.package.radio.month" />
                </Radio.Button>
                <Radio.Button value="year">
                  <IntlMessages id="account.package.radio.year" />
                </Radio.Button>
              </Radio.Group>
            </h1>
            {this.state.package === "month" ? (
              <PackageMonth />
            ) : (
              <PackageYear />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default DynamicRules;
