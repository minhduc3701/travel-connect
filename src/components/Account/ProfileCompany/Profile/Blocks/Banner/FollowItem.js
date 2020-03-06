import React from "react";
import { Avatar } from "antd";
import { ACCOUNT } from "components/Layout/Header/NavigateLink";

class FollowItem extends React.Component {
  render() {
    let { data } = this.props;
    return (
      <p>
        <a href={`${ACCOUNT}/company/${data.companyId}`}>
          <Avatar
            src={data.companyLogo}
            shape="circle"
            className="gx-size-40 "
          />
          <span className="gx-link p-l-2">{data.companyName}</span>
        </a>
      </p>
    );
  }
}
export default FollowItem;
