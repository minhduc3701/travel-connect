import React, { Component } from "react";
import { Avatar, Popover, Icon } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { userSignOut } from "appRedux/actions/Auth";
import IntlMessages from "util/IntlMessages";
import { HOME, ACCOUNT } from "components/Layout/Header/NavigateLink";
class UserInfo extends Component {
  render() {
    const domain = window.location.host;
    let srcAvatar = JSON.parse(localStorage.getItem("user_info"));
    const userMenuOptions = (
      <ul className="gx-user-popover">
        <li className="p-v-1-i text-align-center text-ellipsis">
          Travel Connect Brand name
        </li>
        <li className="p-v-1-i">
          {domain === "account.travelconnect.global" ? (
            <Link to="/dashboard" className="gx-text-dark">
              <Icon className="m-r-1" type="dashboard" />
              <IntlMessages id="general.default.account.dashboard" />
            </Link>
          ) : (
            <a href={`${ACCOUNT}/dashboard`} className="gx-text-dark">
              <Icon className="m-r-1" type="dashboard" />{" "}
              <IntlMessages id="general.default.account.dashboard" />
            </a>
          )}
        </li>
        <li className="p-v-1-i">
          {domain === "account.travelconnect.global" ? (
            <Link to="/profile" className="gx-text-dark">
              <Icon className="m-r-1" type="area-chart" />
              <IntlMessages id="general.default.account.profile" />
            </Link>
          ) : (
            <a href={`${ACCOUNT}/profile`} className="gx-text-dark">
              <Icon className="m-r-1" type="area-chart" />{" "}
              <IntlMessages id="general.default.account.profile" />
            </a>
          )}
        </li>
        <li className="p-v-1-i">
          {domain === "account.travelconnect.global" ? (
            <Link to="/member-management" className="gx-text-dark">
              <Icon className="m-r-1" type="solution" />{" "}
              <IntlMessages id="general.default.account.membermanagement" />
            </Link>
          ) : (
            <a href={`${ACCOUNT}/member-management`} className="gx-text-dark">
              <Icon className="m-r-1" type="solution" />{" "}
              <IntlMessages id="general.default.account.membermanagement" />
            </a>
          )}
        </li>
        <li className="p-v-1-i">
          {domain === "account.travelconnect.global" ? (
            <Link to="/upgrade-account" className="gx-text-dark">
              <Icon className="m-r-1" type="trophy" />
              <IntlMessages id="general.default.account.upgradeaccount" />
            </Link>
          ) : (
            <a href={`${ACCOUNT}/upgrade-account`} className="gx-text-dark">
              <Icon className="m-r-1" type="trophy" />{" "}
              <IntlMessages id="general.default.account.upgradeaccount" />
            </a>
          )}
        </li>
        <li className="bor-b p-t-1-i m-b-1-i"></li>
        <li className="p-v-1-i">
          {domain === "app.travelconnect.global" ? (
            <Link to="/user/settings" className="gx-text-dark">
              <Icon className="m-r-1" type="user" />{" "}
              <IntlMessages id="general.default.user.settings" />
            </Link>
          ) : (
            <a href={`${HOME}/user/settings`} className="gx-text-dark">
              <Icon className="m-r-1" type="user" />{" "}
              <IntlMessages id="general.default.user.settings" />
            </a>
          )}
        </li>
        <li className="gx-text-red" onClick={() => this.props.userSignOut()}>
          <Icon className="m-r-1" type="poweroff" />{" "}
          <IntlMessages id="general.default.logout" />
        </li>
      </ul>
    );

    return (
      <Popover
        overlayClassName="gx-popover-horizantal user_popup_menu"
        placement="bottomRight"
        content={userMenuOptions}
        trigger="click"
      >
        <Avatar
          src={
            srcAvatar.user_logo
              ? srcAvatar.user_logo
              : srcAvatar.user_logo === ""
              ? `https://tix.vn/app/assets/img/avatar.png`
              : `https://tix.vn/app/assets/img/avatar.png`
          }
          className="gx-avatar gx-pointer"
          alt=""
        />
      </Popover>
    );
  }
}

export default connect(null, { userSignOut })(UserInfo);
