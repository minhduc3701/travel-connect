import React from "react";
import IntlMessages from "util/IntlMessages";
// import { introData } from "components/Account/ProfileCompany/Profile/data";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";

const Biography = props => {
  let { Account } = props.profile;
  return (
    <div className="block-w-nb">
      <WidgetHeader title={<IntlMessages id="company.introduction" />} />
      <p className="gx-text-grey gx-fs-sm">
        {<IntlMessages id="company.introduction.des" />}{" "}
        {Account.company_brandname}
      </p>
      <div className="text-align-justify">
        {!Account.length ? (
          <p className="gx-font-weight-light">
            {/* <i className="icon icon-sweet-alert"></i>{" "} */}
            {/* <IntlMessages id="guide.company.intro" /> */}
            {Account.company_introduction}
            {/* <b>
              <i className="icon icon-setting"></i>{" "}
              <IntlMessages id="company.setting" />
            </b> */}
          </p>
        ) : (
          <p style={{ lineHeight: "1.5em" }}>
            {/* {introData.map((data, index) => data.content)} */}
            Introduction empty
          </p>
        )}
      </div>
    </div>
  );
};

export default Biography;
