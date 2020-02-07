import React, { Component } from "react";
import {
  Button,
  Dropdown,
  Icon,
  Layout,
  Menu,
  message,
  Popover,
  Select
} from "antd";
import { connect } from "react-redux";
// import CustomScrollbars from "util/CustomScrollbars";
import languageData from "../languageData";
import SearchBox from "components/Layout/Header/SearchBox";
import UserInfo from "components/Layout/Header/UserInfo";
import AppNotification from "components/Layout/Header/AppNotification";
import { Link } from "react-router-dom";
import HorizontalNav from "../HorizontalNav";
import {
  switchLanguage,
  toggleCollapsedSideNav
} from "../../../appRedux/actions/Setting";
import { HOME } from "../../../constants/NavigateLink";
import { currencyData } from "../currencyData";
import IntlMessages from "../../../util/IntlMessages";

const { Header } = Layout;

const Option = Select.Option;
const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">Products</Menu.Item>
    <Menu.Item key="2">Apps</Menu.Item>
    <Menu.Item key="3">Blogs</Menu.Item>
  </Menu>
);

function handleMenuClick(e) {
  message.info("Click on menu item.");
}

function handleChange(value) {
  console.log(`selected ${value}`);
}

class HorizontalDark extends Component {
  state = {
    searchText: "",
    currency: ""
  };

  languageMenu = () => (
    <div className="gx-popover-lang-scroll">
      <ul className="gx-sub-popover">
        {languageData.map(language => (
          <li
            className="gx-media gx-pointer"
            key={JSON.stringify(language)}
            onClick={e => this.props.switchLanguage(language)}
          >
            <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`} />
            <span className="gx-language-text">{language.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  changeCurrency = () => (
    <div className="gx-popover-lang-scroll">
      <ul className="gx-sub-popover">
        {currencyData.map(currency => (
          <li
            className="gx-media gx-pointer"
            key={JSON.stringify(currency)}
            onClick={() =>
              fetch("https://api.exchangerate-api.com/v4/latest/VND")
                .then(response => {
                  return response.json();
                })
                .then(data => {
                  this.setState({ currency: currency.name });
                  localStorage.setItem(
                    "currency",
                    JSON.stringify(this.state.currency)
                  );
                })
            }
          >
            <i className={`flag flag-24 gx-mr-2 flag-${currency.icon}`} />
            <span className="gx-language-text"> {currency.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  updateSearchChatUser = evt => {
    this.setState({
      searchText: evt.target.value
    });
  };

  render() {
    const { locale, navCollapsed } = this.props;
    const domain = window.location.host;

    return (
      <div className="gx-header-horizontal gx-header-horizontal-dark">
        <Header
          className="gx-header-horizontal-main"
          style={{ padding: "10px 0 10px 0" }}
        >
          <div className="gx-container">
            <div className="gx-header-horizontal-main-flex">
              <div className="gx-d-block gx-d-lg-none gx-linebar gx-mr-xs-3">
                <i
                  className="gx-icon-btn icon icon-menu"
                  onClick={() => {
                    this.props.toggleCollapsedSideNav(!navCollapsed);
                  }}
                />
              </div>


              {
                domain === HOME ? (
                  <Link
                    to="/home"
                    className="gx-d-block gx-d-lg-none gx-pointer gx-mr-xs-3 gx-pt-xs-1 gx-w-logo"
                  >
                    <img alt="" src={require("assets/images/logo-beta.png")} />
                  </Link>
                ) : (
                    <a href={`${HOME}/home`} className="gx-d-block gx-d-lg-none gx-pointer gx-mr-xs-3 gx-pt-xs-1 gx-w-logo">
                      <img alt="" src={require("assets/images/logo-beta.png")} />
                    </a>
                  )
              }

              {
                domain === HOME ? (
                  <Link
                    to="/home"
                    className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo"
                  >
                    <img alt="" src={require("assets/images/logo-beta.png")} />
                  </Link>
                ) : (
                    <a href={`${HOME}/home`} className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo">
                      <img alt="" src={require("assets/images/logo-beta.png")} />
                    </a>
                  )
              }
              <div className="gx-header-search gx-d-none gx-d-lg-flex">
                <SearchBox
                  styleName="gx-lt-icon-search-bar-lg"
                  placeholder="Search in app..."
                  onChange={this.updateSearchChatUser.bind(this)}
                  value={this.state.searchText}
                />

                <Select
                  defaultValue="lucy"
                  style={{ width: 120 }}
                  onChange={handleChange}
                >
                  <Option value="jack">
                    {<IntlMessages id="step.product" />}
                  </Option>
                  <Option value="lucy">
                    {<IntlMessages id="sidebar.home.company" />}
                  </Option>
                  <Option value="Yiminghe">
                    {<IntlMessages id="company.communities" />}
                  </Option>
                </Select>
              </div>

              <ul className="gx-header-notifications gx-ml-auto">
                <li className="gx-notify gx-notify-search gx-d-inline-block gx-d-lg-none">
                  <Popover
                    overlayClassName="gx-popover-horizantal"
                    placement="bottomRight"
                    content={
                      <div className="gx-d-flex">
                        <Dropdown overlay={menu}>
                          <Button>
                            Category <Icon type="down" />
                          </Button>
                        </Dropdown>
                        <SearchBox
                          styleName="gx-popover-search-bar"
                          placeholder="Search in app..."
                          onChange={this.updateSearchChatUser.bind(this)}
                          value={this.state.searchText}
                        />
                      </div>
                    }
                    trigger="click"
                  >
                    <span className="gx-pointer gx-d-block">
                      <i className="icon icon-search-new" />
                    </span>
                  </Popover>
                </li>

                <li className="gx-notify">
                  <Popover
                    overlayClassName="gx-popover-horizantal"
                    placement="bottomRight"
                    content={<AppNotification />}
                    trigger="click"
                  >
                    <span className="gx-pointer gx-d-block">
                      <i className="icon icon-notification" />
                    </span>
                  </Popover>
                </li>

                <li className="gx-language">
                  <Popover
                    overlayClassName="gx-popover-horizantal"
                    placement="bottomRight"
                    content={this.languageMenu()}
                    trigger="click"
                  >
                    <span className="gx-pointer gx-flex-row gx-align-items-center">
                      <i className={`flag flag-24 flag-${locale.icon}`} />
                    </span>
                  </Popover>
                </li>
                <li className="gx-language">
                  <Popover
                    overlayClassName="gx-popover-horizantal"
                    placement="bottomRight"
                    content={this.changeCurrency()}
                    trigger="click"
                  >
                    <span className="gx-pointer gx-flex-row gx-align-items-center">
                      <span>
                        <Icon type="dollar" /> {this.state.currency}
                      </span>
                    </span>
                  </Popover>
                </li>
                <li className="gx-user-nav">
                  <UserInfo />
                </li>
              </ul>
            </div>
          </div>
        </Header>
        <div className="gx-header-horizontal-nav gx-d-none gx-d-lg-block">
          <div className="gx-container">
            <div className="gx-header-horizontal-nav-flex">
              <HorizontalNav />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale, navCollapsed } = settings;
  return { locale, navCollapsed };
};
export default connect(mapStateToProps, {
  toggleCollapsedSideNav,
  switchLanguage
})(HorizontalDark);
