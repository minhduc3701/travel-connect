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
import { HOME, BUSINESS, B2B } from "../../constants/NavigateLink";
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
    const domain = window.location.host;
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
            domain === "app.travelconnect.global" ? (
              <Link to="/home">
                <IntlMessages id="general.default.home" />
              </Link>
            ) : (
                <a href={`${HOME}/home`} className="menu-item">
                  <IntlMessages id="general.default.home" />
                </a>
              )
          }
        ></SubMenu>

        {/* <SubMenu
          className={this.getNavStyleSubMenuClass(navStyle)}
          key="account"
          title={
            <IntlMessages id="general.default.account" />
          }
        >
          <Menu.Item key="account_main">
            {domain === "account.travelconnect.global" ? (
              <Link to="/dashboard">
                <Icon type="dashboard" />
                <IntlMessages id="general.default.account.dashboard" />
              </Link>
            ) : (
                <a href={`${ACCOUNT}/dashboard`} className="menu-item ">
                  <Icon type="dashboard" />
                  <IntlMessages id="general.default.account.dashboard" />
                </a>
              )}
          </Menu.Item>
          <Menu.Item key="account_profile">
            {domain === "account.travelconnect.global" ? (
              <Link to="/profile">
                <Icon type="area-chart" />
                <IntlMessages id="general.default.account.profile" />
              </Link>
            ) : (
                <a href={`${ACCOUNT}/profile`} className="menu-item ">
                  <Icon type="area-chart" />
                  <IntlMessages id="general.default.account.profile" />
                </a>
              )}
          </Menu.Item>
          <Menu.Item key="account_membermanagement">
            {domain === "account.travelconnect.global" ? (
              <Link to="/member-management">
                <Icon type="solution" />
                <IntlMessages id="general.default.account.membermanagement" />
              </Link>
            ) : (
                <a href={`${ACCOUNT}/member-management`} className="menu-item ">
                  <Icon type="solution" />
                  <IntlMessages id="general.default.account.membermanagement" />
                </a>
              )}
          </Menu.Item>
          <Menu.Item key="account_package">
            {domain === "account.travelconnect.global" ? (
              <Link to="/upgrade-account">
                <Icon type="tag" />
                <IntlMessages id="general.default.account.upgradeaccount" />
              </Link>
            ) : (
                <a href={`${ACCOUNT}/upgrade-account`} className="menu-item ">
                  <Icon type="tag" />
                  <IntlMessages id="general.default.account.upgradeaccount" />
                </a>
              )}
          </Menu.Item>
        </SubMenu> */}

        <SubMenu
          className={this.getNavStyleSubMenuClass(navStyle)}
          key="events"
          title={<IntlMessages id="general.default.event" />}
        ></SubMenu>

        <SubMenu
          className={this.getNavStyleSubMenuClass(navStyle)}
          key="community"
          title={<IntlMessages id="general.default.community" />}
        ></SubMenu>

        <SubMenu
          className={this.getNavStyleSubMenuClass(navStyle)}
          key="businessmatching"
          title={<IntlMessages id="general.default.businessmatching" />}
        >
          <Menu.Item key="businessmatching_findpartner">
            {domain === "business.travelconnect.global" ? (
              <Link to="/findpartner">
                <Icon type="user-add" />
                <IntlMessages id="general.default.businessmatching.findpartner" />
              </Link>
            ) : (
                <a href={`${BUSINESS}/findpartner`} className="menu-item">
                  <Icon type="user-add" />
                  <IntlMessages id="general.default.businessmatching.findpartner" />
                </a>
              )}
          </Menu.Item>
          <Menu.Item key="businessmatching_appointmentManagement">
            {domain === "business.travelconnect.global" ? (
              <Link to="/appointment">
                <Icon type="schedule" />
                <IntlMessages id="general.default.businessmatching.appointmentmanagement" />
              </Link>
            ) : (
                <a href={`${BUSINESS}/appointment`} className="menu-item">
                  <Icon type="schedule" />
                  <IntlMessages id="general.default.businessmatching.appointmentmanagement" />
                </a>
              )}
          </Menu.Item>
          <Menu.Item key="businessmatching_contact">
            {domain === "business.travelconnect.global" ? (
              <Link to="/contact">
                <Icon type="read" />
                <IntlMessages id="general.default.businessmatching.contact" />
              </Link>
            ) : (
                <a href={`${BUSINESS}/contact`} className="menu-item">
                  <Icon type="read" />
                  <IntlMessages id="general.default.businessmatching.contact" />
                </a>
              )}
          </Menu.Item>
        </SubMenu>
        <SubMenu
          className={this.getNavStyleSubMenuClass(navStyle)}
          key="b2bmarketplace"
          title={<IntlMessages id="general.default.b2bmarketplace" />}
        >
          <Menu.Item key="b2bmarketplace_listlandtour">
            {domain === "b2b.travelconnect.global" ? (
              <Link to="/dashboard">
                <Icon type="dashboard" />
                <IntlMessages id="general.default.b2bmarketplace.dashboard" />
              </Link>
            ) : (
                <a href={`${B2B}/dashboard`} className="menu-item ">
                  <Icon type="dashboard" />
                  <IntlMessages id="general.default.b2bmarketplace.dashboard" />
                </a>
              )}
          </Menu.Item>
          <SubMenu
            className={this.getNavStyleSubMenuClass(navStyle)}
            key="b2bmarketplace_sell"
            title={
              <span>
                <Icon type="gift" />
                <IntlMessages id="general.default.b2bmarketplace.sell" />
              </span>
            }
          >
            <SubMenu
              className="gx-menu-horizontal"
              key="b2bmarketplace_sell_inventory"
              title={
                <span>
                  <Icon type="database" />
                  <IntlMessages id="general.default.b2bmarketplace.inventory" />
                </span>
              }
            >
              <Menu.Item key="b2bmarketplace_sell_inventory_landtour">
                {domain === "b2b.travelconnect.global" ? (
                  <Link to="/inventory/landtour">
                    <Icon type="rest" />
                    <IntlMessages id="general.default.b2bmarketplace.inventory.landtour" />
                  </Link>
                ) : (
                    <a
                      href={`${B2B}/inventory/landtour`}
                      className="menu-item "
                    >
                      <Icon type="rest" />
                      <IntlMessages id="general.default.b2bmarketplace.inventory.landtour" />
                    </a>
                  )}
              </Menu.Item>
              <Menu.Item key="b2bmarketplace_sell_inventory_grouptour">
                {domain === "b2b.travelconnect.global" ? (
                  <Link to="/inventory/grouptour">
                    <Icon type="rocket" />
                    <IntlMessages id="general.default.b2bmarketplace.inventory.grouptour" />
                  </Link>
                ) : (
                    <a
                      href={`${B2B}/inventory/grouptour`}
                      className="menu-item "
                    >
                      <Icon type="rocket" />
                      <IntlMessages id="general.default.b2bmarketplace.inventory.grouptour" />
                    </a>
                  )}
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="b2bmarketplace_sell_request">
              {domain === "b2b.travelconnect.global" ? (
                <Link to="/transaction/sell">
                  <Icon type="gift" />
                  <IntlMessages id="general.default.b2bmarketplace.sell.requests" />
                </Link>
              ) : (
                  <a href={`${B2B}/transaction/sell`} className="menu-item ">
                    <Icon type="gift" />
                    <IntlMessages id="general.default.b2bmarketplace.sell.requests" />
                  </a>
                )}
            </Menu.Item>
          </SubMenu>
          <SubMenu
            className={this.getNavStyleSubMenuClass(navStyle)}
            key="b2bmarketplace_buy"
            title={
              <span>
                <Icon type="shopping-cart" />
                <IntlMessages id="general.default.b2bmarketplace.buy" />
              </span>
            }
          >
            <SubMenu
              className="gx-menu-horizontal"
              key="b2bmarketplace_buy_find"
              title={
                <span>
                  <Icon type="search" />
                  <IntlMessages id="general.default.b2bmarketplace.buy.find" />
                </span>
              }
            >
              <Menu.Item key="b2bmarketplace_buy_find_landtour">
                {domain === "b2b.travelconnect.global" ? (
                  <Link to="/find/landtour">
                    <Icon type="rest" />
                    <IntlMessages id="general.default.b2bmarketplace.buy.find.landtour" />
                  </Link>
                ) : (
                    <a href={`${B2B}/find/landtour`} className="menu-item ">
                      <Icon type="rest" />
                      <IntlMessages id="general.default.b2bmarketplace.buy.find.landtour" />
                    </a>
                  )}
              </Menu.Item>
              <Menu.Item key="b2bmarketplace_buy_find_grouptour">
                {domain === "b2b.travelconnect.global" ? (
                  <Link to="/find/grouptour">
                    <Icon type="rocket" />
                    <IntlMessages id="general.default.b2bmarketplace.buy.find.grouptour" />
                  </Link>
                ) : (
                    <a href={`${B2B}/find/grouptour`} className="menu-item ">
                      <Icon type="rocket" />
                      <IntlMessages id="general.default.b2bmarketplace.buy.find.grouptour" />
                    </a>
                  )}
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="b2bmarketplace_buy_request">
              {domain === "b2b.travelconnect.global" ? (
                <Link to="/transaction/buy">
                  <Icon type="shopping-cart" />
                  <IntlMessages id="general.default.b2bmarketplace.buy.requests" />
                </Link>
              ) : (
                  <a href={`${B2B}/transaction/buy`} className="menu-item ">
                    <Icon type="shopping-cart" />
                    <IntlMessages id="general.default.b2bmarketplace.buy.requests" />
                  </a>
                )}
            </Menu.Item>
          </SubMenu>
        </SubMenu>

        <SubMenu
          className={this.getNavStyleSubMenuClass(navStyle)}
          key="otachannel"
          title={<IntlMessages id="general.default.otachannel" />}
        ></SubMenu>

        <SubMenu
          className={this.getNavStyleSubMenuClass(navStyle)}
          key="recruiment"
          title={<IntlMessages id="general.default.recruiment" />}
        ></SubMenu>

        <SubMenu
          className={this.getNavStyleSubMenuClass(navStyle)}
          key="education"
          title={<IntlMessages id="general.default.education" />}
        ></SubMenu>

        <SubMenu
          className={this.getNavStyleSubMenuClass(navStyle)}
          key="destination"
          title={<IntlMessages id="general.default.destination" />}
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
