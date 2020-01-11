import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import IntlMessages from "util/IntlMessages";
import { actFetchActionRequest } from "appRedux/actions/Account";
import { connect } from "react-redux";

class Navigation extends Component {
  render() {
    return (
      <div className="block-w-nb block__nav__anchor">
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
          {/* <Menu.Item key="setting_company" className=" f-r f-clear-fix">
                        <Link title="Setting" to="/profile/setting">
                            <Icon type="tool" className="m-r-1-i" />
                            <span className="gx-d-inline-flex gx-vertical-align-middle gx-ml-1 gx-ml-sm-0">
                                <IntlMessages id="account.profile.settings" />
                            </span>
                        </Link>
                    </Menu.Item> */}

          <Menu.Item
            // onClick={() => this.props.actFetchDataAgain()}
            key="edit_profile"
            className=" f-r"
          >
            <Link title="Update" to="/profile">
              <Icon type="edit" className="m-r-1-i" />
              <span className="gx-d-inline-flex gx-vertical-align-middle gx-ml-1 gx-ml-sm-0">
                <IntlMessages id="account.profile.edit.btn.preview" />
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
