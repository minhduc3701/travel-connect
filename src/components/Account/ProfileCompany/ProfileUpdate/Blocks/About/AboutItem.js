import React from "react";
import Auxiliary from "util/Auxiliary";
import { Tooltip } from "antd";

const AboutItem = ({ data }) => {
  const { title, icon, desc, userList } = data;
  return (
    <Auxiliary>
      <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
        <div className="gx-mr-3">
          <i className={`icon icon-${icon} gx-fs-xlxl gx-text-primary`} />
        </div>
        <div className="gx-media-body">
          <h6 className="gx-mb-1 gx-text-grey">{title} {desc === '' && <Tooltip title="You can update this in the setting"><i className="icon icon-spam" /></Tooltip>}</h6>
          {userList === '' ? null : userList}
          {desc === '' ? null : <p className="gx-mb-0">{desc} <i className={'icon icon-' + data.verify + " guard-brandname"}></i></p>}
        </div>
      </div>
    </Auxiliary>
  );
};

export default AboutItem;
