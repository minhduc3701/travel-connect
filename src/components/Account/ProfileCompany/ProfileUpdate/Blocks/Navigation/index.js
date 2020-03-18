import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import IntlMessages from "util/IntlMessages";
import { actFetchActionRequest } from "appRedux/actions/Account";
import { connect } from "react-redux";

class Navigation extends Component {
  render() {
    return (
      <div
        className="block-w-nb block__nav__anchor m-b-0-i p-b-0-i"
        style={{ borderTop: "1px solid #00000020" }}
      >
        <Menu mode="horizontal" className="bor-b-0">
          <Menu.Item key="contact">
            <a href="#nav_contact">
              <IntlMessages id="account.profile.contact" />
            </a>
          </Menu.Item>
          <Menu.Item key="statistics">
            <a href="#nav_statistics">
              <IntlMessages id="account.profile.statistics" />
            </a>
          </Menu.Item>
          <Menu.Item key="Introduction">
            <a href="#nav_introduction">
              <IntlMessages id="account.profile.introduction" />
            </a>
          </Menu.Item>
          <Menu.Item key="Communities">
            <a href="#nav_communities">
              <IntlMessages id="account.profile.communities" />
            </a>
          </Menu.Item>
          <Menu.Item key="event" disabled>
            <a href="#nav_event">
              <IntlMessages id="account.profile.event" />
            </a>
          </Menu.Item>
          <Menu.Item key="product">
            <a href="#nav_product">
              <IntlMessages id="account.profile.product" />
            </a>
          </Menu.Item>
          <Menu.Item key="rating">
            <a href="#nav_rating">
              <IntlMessages id="account.profile.rating" />
            </a>
          </Menu.Item>
          <Menu.Item key="media">
            <a href="#nav_media">
              <IntlMessages id="account.profile.media" />
            </a>
          </Menu.Item>
          <Menu.Item key="edit_profile" className=" f-r">
            <Link to="/profile">
              <Icon type="double-left" className="m-r-1-i" />
              <span className="gx-d-inline-flex gx-vertical-align-middle gx-ml-1 gx-ml-sm-0">
                <IntlMessages id="return" />
              </span>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

const mapDispatchToProp = (dispatch, props) => {
  return {
    actFetchDataAgain: () => {
      dispatch(actFetchActionRequest());
    }
  };
};

export default connect(null, mapDispatchToProp)(Navigation);
