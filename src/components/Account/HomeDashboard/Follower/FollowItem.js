import React, { Fragment } from "react";
import { Avatar } from "antd";
import { ACCOUNT } from "components/Layout/Header/NavigateLink";

class FollowItem extends React.Component {
  render() {
    let { data } = this.props;
    return (
      <Fragment>
        {data.companyLogo !== "" ? (
          <a href={`${ACCOUNT}/company/${data.companyId}`}>
            <Avatar
              src={data.companyLogo}
              shape="circle"
              className="gx-size-40 "
            />
            <span className="gx-link p-l-2">{data.companyBrand}</span>
          </a>
        ) : (
          <a href={`${ACCOUNT}/company/${data.companyId}`}>
            <Avatar shape="circle" className="gx-size-40 gx-bg-gray" />
            <span className="gx-link p-l-2">{data.companyBrand}</span>
          </a>
        )}
      </Fragment>
    );
  }
}
export default FollowItem;
