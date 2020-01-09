import React from "react";
import IntlMessages from "util/IntlMessages";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";

const Biography = props => {
  let { Account } = props.profile;
  return (
    <div className="block-w-nb">
      <WidgetHeader title={<IntlMessages id="account.profile.introduction" />} />
      <p className="gx-text-grey gx-fs-sm">
        {<IntlMessages id="account.profile.introduction.des" />}{" "}
        {Account.company_brandname}
      </p>
      <div className="text-align-justify">
        {!Account.length ? (
          <p className="gx-font-weight-light">
            {Account.company_introduction}
          </p>
        ) : (
            <p style={{ lineHeight: "1.5em" }}>
              <IntlMessages id="account.profile.introduction.empty" />
            </p>
          )}
      </div>
    </div>
  );
};

export default Biography;
