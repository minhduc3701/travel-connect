import React, { Component } from "react";
import { Avatar, Popover } from "antd";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { userSignOut } from "appRedux/actions/Auth";
import IntlMessage from "util/IntlMessages";
import { HOME } from "constants/NavigateLink";
class UserInfo extends Component {
  render() {
    let srcAvatar = JSON.parse(localStorage.getItem("user_info"));

    const userMenuOptions = (
      <ul className="gx-user-popover">
        <li>
          <a href={`${HOME}/profile`}>
            <IntlMessage id="myAccount" />
          </a>
        </li>
        <li onClick={() => this.props.userSignOut()}>
          <IntlMessage id="logOut" />
        </li>
      </ul>
    );

    return (
      <Popover
        overlayClassName="gx-popover-horizantal"
        placement="bottomRight"
        content={userMenuOptions}
        trigger="click"
      >
        <Avatar
          src={srcAvatar.user_logo}
          className="gx-avatar gx-pointer"
          alt=""
        />
      </Popover>
    );
  }
}

export default connect(null, { userSignOut })(UserInfo);
