import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import IntlMessages from "../../util/IntlMessages";
import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL
} from "../../constants/ThemeSetting";
import { HOME, ACCOUNT, BUSINESS, B2B } from "../../constants/NavigateLink";
const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

class HorizontalNav extends Component {
  getNavStyleSubMenuClass = navStyle => {
    switch (navStyle) {
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return "gx-menu-horizontal gx-submenu-popup-curve";
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve";
      case NAV_STYLE_BELOW_HEADER:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-below-submenu-popup-curve";
      case NAV_STYLE_ABOVE_HEADER:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-above-submenu-popup-curve";
      default:
        return "gx-menu-horizontal";
    }
  };

  render() {
    const { pathname, navStyle } = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split("/")[1];
    return (
      <Menu
        defaultOpenKeys={[defaultOpenKeys]}
        selectedKeys={[selectedKeys]}
        mode="horizontal"
      >
        <SubMenu
          className={this.getNavStyleSubMenuClass(navStyle)}
          key="home"
          title={
            <a href={HOME} className="menu-item">
              <IntlMessages id="sidebar.home" />
            </a>
          }
        ></SubMenu>

        <SubMenu
          className={this.getNavStyleSubMenuClass(navStyle)}
          key="account"
          title={
            <a href={ACCOUNT} className="menu-item ">
              <IntlMessages id="account" />
            </a>
          }
        >
          <Menu.Item key="main">
            <Link to="/dashboard">
              <Icon type="dashboard" />
              <IntlMessages id="sidebar.home.dashboard" />
            </Link>
          </Menu.Item>
          <Menu.Item key="profileCompany">
            <Link to="/company">
              <i className="icon icon-company" />
              <IntlMessages id="profileCompany" />
            </Link>
          </Menu.Item>
          <Menu.Item key="membermanagement">
            <Link to="/member-management">
              <Icon type="solution" />
              <IntlMessages id="sidebar.home.membermanagement" />
            </Link>
          </Menu.Item>
          <Menu.Item key="company">
            <Link to="/upgrade-account">
              <Icon type="tag" />
              <IntlMessages id="sidebar.home.upgradeaccount" />
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
          title={
            <a href={BUSINESS} className="menu-item">
              <IntlMessages id="sidebar.businessmatching" />
            </a>
          }
        >
          <Menu.Item key="sidebar.home.dashboard">
            <a href="/dashboard">
              <Icon type="dashboard" />
              <IntlMessages id="sidebar.home.dashboard" />
            </a>
          </Menu.Item>
          <Menu.Item key="appointmentManagement">
            <a href="/member-management">
              <Icon type="calendar" />
              <IntlMessages id="appointmentManagement" />
            </a>
          </Menu.Item>
          <Menu.Item key="company">
            <a href="/company">
              <i className="icon icon-contacts" />
              <IntlMessages id="contactManagement" />
            </a>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          className={this.getNavStyleSubMenuClass(navStyle)}
          key="b2bmarketplace"
          title={
            <a href={B2B} className="menu-item">
              <IntlMessages id="sidebar.b2bmarketplace" />
            </a>
          }
        >
          <Menu.Item key="listlandtour">
            <a href="/b2b/dashboard">
              <Icon type="dashboard" />
              Dashboard
            </a>
          </Menu.Item>
          <SubMenu
            className={this.getNavStyleSubMenuClass(navStyle)}
            key="sell"
            title={
              <span>
                <Icon type="gift" />
                <IntlMessages id="sell" />
              </span>
            }
          >
            <SubMenu
              className="gx-menu-horizontal"
              key="b2bmarketplace.inventory"
              title={
                <span>
                  <Icon type="database" />
                  <IntlMessages id="sidebar.b2b.service.inventory" />
                </span>
              }
            >
              <Menu.Item key="inventoryLandtour">
                <a href="/b2b/inventory/landtour">
                  <i className="icon icon-map-google" />
                  <IntlMessages id="sidebar.b2bmarketplace.find.landtour" />
                </a>
              </Menu.Item>
              <Menu.Item key="inventoryGrouptour">
                <a href="/b2b/inventory/grouptour">
                  <i className="icon icon-map-styled" />
                  <IntlMessages id="sidebar.b2bmarketplace.find.grouptour" />
                </a>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="sellRequest">
              <a href="/b2b/transaction/request-sell">
                <Icon type="gift" />
                <IntlMessages id="sellRequest" />
              </a>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            className={this.getNavStyleSubMenuClass(navStyle)}
            key="buy"
            title={
              <span>
                <Icon type="shopping-cart" />
                <IntlMessages id="buy" />
              </span>
            }
          >
            <SubMenu
              className="gx-menu-horizontal"
              key="b2bmarketplace.find"
              title={
                <span>
                  <Icon type="search" />
                  <IntlMessages id="sidebar.b2bmarketplace.find" />
                </span>
              }
            >
              <Menu.Item key="listlandtour">
                <a href="/b2b/landtour">
                  <i className="icon icon-map-google" />
                  <IntlMessages id="sidebar.b2bmarketplace.find.landtour" />
                </a>
              </Menu.Item>
              <Menu.Item key="listgrouptour">
                <a href="/b2b/grouptour">
                  <i className="icon icon-map-styled" />
                  <IntlMessages id="sidebar.b2bmarketplace.find.grouptour" />
                </a>
              </Menu.Item>
            </SubMenu>
            {/* <SubMenu
              className="gx-menu-horizontal"
              key="b2bmarketplace.transaction"
              title={
                <span>
                  <i className="icon icon-transfer" />
                  <IntlMessages id="sidebar.b2bmarketplace.transaction" />
                </span>
              }
            > */}
            <Menu.Item key="buyRequest">
              <a href="/b2b/transaction/request-buy">
                <Icon type="shopping-cart" />
                <IntlMessages id="buyRequest" />
              </a>
            </Menu.Item>
            {/* </SubMenu> */}
          </SubMenu>
        </SubMenu>
        {/* <Menu.Item key="listTourist">
              <Link to="/b2b/list-tourist">
                <Icon type="team" />
                <IntlMessages id="listTravelers" />
              </Link>
            </Menu.Item> */}
        <SubMenu
          className={this.getNavStyleSubMenuClass(navStyle)}
          key="b2cchannel"
          title={<IntlMessages id="sidebar.b2cchannel" />}
        ></SubMenu>

        <SubMenu
          className={this.getNavStyleSubMenuClass(navStyle)}
          key="recruiment"
          title={<IntlMessages id="recruiment" />}
        ></SubMenu>

        <SubMenu
          className={this.getNavStyleSubMenuClass(navStyle)}
          key="education"
          title={<IntlMessages id="education" />}
        ></SubMenu>
        <SubMenu
          className={this.getNavStyleSubMenuClass(navStyle)}
          key="destination"
          title={<IntlMessages id="destination" />}
        ></SubMenu>
      </Menu>
    );
  }
}

HorizontalNav.propTypes = {};
const mapStateToProps = ({ settings }) => {
  const { themeType, navStyle, pathname, locale } = settings;
  return { themeType, navStyle, pathname, locale };
};
export default connect(mapStateToProps)(HorizontalNav);
