import React, { Component } from "react";
import { Avatar, Popover } from "antd";

class UserProfile extends Component {
  render() {
    let user = JSON.parse(localStorage.getItem("user_info"));
    const userMenuOptions = (
      <ul className="gx-user-popover">
        <li>My Account</li>
        <li>Connections</li>
      </ul>
    );

    return (
      <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
        <Popover
          placement="bottomRight"
          content={userMenuOptions}
          trigger="click"
        >
          <Avatar
            src={
              user.user_logo
                ? user.user_logo
                : `https://tix.vn/app/assets/img/avatar.png`
            }
            className="gx-size-40 gx-pointer gx-mr-3"
            alt=""
          />
          <span className="gx-avatar-name">
            {user.user_name ? user.user_name : 'user' }
            <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" />
          </span>
        </Popover>
      </div>
    );
  }
}

export default UserProfile;
