import React, { Component } from "react";
import { Avatar, Popover } from "antd";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { userSignOut } from "appRedux/actions/Auth";
import IntlMessage from "util/IntlMessages";
import { HOME } from "constants/NavigateLink";
class UserInfo extends Component {
  render() {
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
          src="https://scontent.fhan5-7.fna.fbcdn.net/v/t1.0-9/18301305_109727309601941_3221725338991253317_n.jpg?_nc_cat=100&_nc_ohc=iCjs-onfrI8AQnDZzflsOXsd7tZzz0oTnho1E8YWoI9g0Vvo_GWPJ8FvA&_nc_ht=scontent.fhan5-7.fna&oh=6f65c17bfd32a4f4fe8ab14f4e295a9d&oe=5EAF7C8D"
          className="gx-avatar gx-pointer"
          alt=""
        />
      </Popover>
    );
  }
}

export default connect(null, { userSignOut })(UserInfo);
