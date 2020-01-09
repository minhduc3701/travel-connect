import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";

import Auxiliary from "util/Auxiliary";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";

const SubMenu = Menu.SubMenu;
class SidebarContent extends Component {
  getNoHeaderClass = navStyle => {
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  getNavStyleSubMenuClass = navStyle => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  render() {
    const { themeType, navStyle, pathname } = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split("/")[1];
    return (
      <Auxiliary>
        <SidebarLogo />
        <div className="gx-sidebar-content">
          <div
            className={`gx-sidebar-notifications ${this.getNoHeaderClass(
              navStyle
            )}`}
          >
            <UserProfile />
            <AppsNavigation />
          </div>
          <CustomScrollbars className="gx-layout-sider-scrollbar">
            <Menu
              defaultOpenKeys={[defaultOpenKeys]}
              selectedKeys={[selectedKeys]}
              theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
              mode="inline"
            >
              <SubMenu
                className={this.getNavStyleSubMenuClass(navStyle)}
                key="Home"
                title={<IntlMessages id="sidebar.home" />}
              >
                <Menu.Item key="main">
                  <Link to="/dashboard">
                    <i className="icon icon-widgets" />
                    <IntlMessages id="sidebar.home.dashboard" />
                  </Link>
                </Menu.Item>
                <Menu.Item key="company">
                  <Link to="/company">
                    <i className="icon icon-company" />
                    <IntlMessages id="sidebar.home.company" />
                  </Link>
                </Menu.Item>
                <Menu.Item key="membermanagement">
                  <Link to="/member-management">
                    <i className="icon icon-contacts" />
                    <IntlMessages id="sidebar.home.membermanagement" />
                  </Link>
                </Menu.Item>
              </SubMenu>

              <SubMenu
                className={this.getNavStyleSubMenuClass(navStyle)}
                key="events"
                title={<IntlMessages id="sidebar.events" />}
              ></SubMenu>

              <SubMenu
                className={this.getNavStyleSubMenuClass(navStyle)}
                key="community"
                title={<IntlMessages id="sidebar.community" />}
              ></SubMenu>

              <SubMenu
                className={this.getNavStyleSubMenuClass(navStyle)}
                key="businessmatching"
                title={<IntlMessages id="sidebar.businessmatching" />}
              ></SubMenu>

              <SubMenu
                className={this.getNavStyleSubMenuClass(navStyle)}
                key="b2bmarketplace"
                title={<IntlMessages id="sidebar.b2bmarketplace" />}
              >
                <SubMenu
                  className="gx-menu-horizontal"
                  key="b2bmarketplace.find"
                  title={
                    <span>
                      <i className="icon icon-product-list" />
                      <IntlMessages id="sidebar.b2bmarketplace.find" />
                    </span>
                  }
                >
                  <Menu.Item key="listlandtour">
                    <Link to="/b2b/landtour">
                      <i className="icon icon-map-google" />
                      <IntlMessages id="sidebar.b2bmarketplace.find.landtour" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="listgrouptour">
                    <Link to="/b2b/grouptour">
                      <i className="icon icon-map-styled" />
                      <IntlMessages id="sidebar.b2bmarketplace.find.grouptour" />
                    </Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  className="gx-menu-horizontal"
                  key="b2bmarketplace.service"
                  title={
                    <span>
                      <i className="icon icon-auth-screen" />
                      <IntlMessages id="sidebar.b2b.service.inventory" />
                    </span>
                  }
                >
                  <Menu.Item key="inventoryLandtour">
                    <Link to="/b2b/inventory/landtour">
                      <i className="icon icon-map-google" />
                      <IntlMessages id="sidebar.b2bmarketplace.find.landtour" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="inventoryGrouptour">
                    <Link to="/b2b/inventory/grouptour">
                      <i className="icon icon-map-styled" />
                      <IntlMessages id="sidebar.b2bmarketplace.find.grouptour" />
                    </Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  className="gx-menu-horizontal"
                  key="b2bmarketplace.transaction"
                  title={
                    <span>
                      <i className="icon icon-transfer" />
                      <IntlMessages id="sidebar.b2bmarketplace.transaction" />
                    </span>
                  }
                >
                  <Menu.Item key="sellRequest">
                    <Link to="/b2b/transaction/request-sell">
                      <i className="icon icon-inbox" />
                      Selling Request
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="buyRequest">
                    <Link to="/b2b/transaction/request-buy">
                      <i className="icon icon-shopping-cart" />
                      Buying Request
                    </Link>
                  </Menu.Item>
                </SubMenu>
                <Menu.Item key="listTourist">
                  <Link to="/b2b/list-tourist">
                    <i className="icon icon-map-google" />
                    List Tourist
                  </Link>
                </Menu.Item>
              </SubMenu>

              <SubMenu
                className={this.getNavStyleSubMenuClass(navStyle)}
                key="b2cchannel"
                title={<IntlMessages id="sidebar.b2cchannel" />}
              ></SubMenu>

              <SubMenu
                className={this.getNavStyleSubMenuClass(navStyle)}
                key="vitm"
                title={<IntlMessages id="sidebar.vitm" />}
              ></SubMenu>

              <SubMenu
                className={this.getNavStyleSubMenuClass(navStyle)}
                key="tourguide"
                title={<IntlMessages id="sidebar.tourguide" />}
              ></SubMenu>
            </Menu>
          </CustomScrollbars>
        </div>
      </Auxiliary>
    );
  }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({ settings }) => {
  const { navStyle, themeType, locale, pathname } = settings;
  return { navStyle, themeType, locale, pathname };
};
export default connect(mapStateToProps)(SidebarContent);
