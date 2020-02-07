import React from "react";
import { Button } from "antd";
import IntlMessages from "util/IntlMessages";

const InviteMember = () => {
  return (
    <div className="gx-bg-dark-primary block">
      <div className="gx-flex-row gx-justify-content-center gx-mb-3 gx-mb-md-4">
        <i className={`icon icon-refer gx-fs-xlxl gx-text-white`} />
      </div>
      <div className="gx-text-center">
        <h2 className="h3 gx-mb-3 gx-text-white">
          <IntlMessages id="dashboard.inviteMember" />
        </h2>
        <p className="gx-text-white gx-mb-3">
          <IntlMessages id="dashboard.inviteMember.detail" />
        </p>
        <Button size="large" className="gx-btn-secondary gx-mt-md-5 gx-mb-1">
          <IntlMessages id="dashboard.invitePartner" />
        </Button>
      </div>
    </div>
  );
};

export default InviteMember;
