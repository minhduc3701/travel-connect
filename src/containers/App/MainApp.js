import React, { Component } from "react";
import { Layout } from "antd";

import Sidebar from "components/Layout/Header/Sidebar/index";
import HorizontalDefault from "../Topbar/HorizontalDefault/index";
import HorizontalDark from "components/Layout/Header/HorizontalDark/index";
import InsideHeader from "../Topbar/InsideHeader/index";
import AboveHeader from "../Topbar/AboveHeader/index";
import BelowHeader from "../Topbar/BelowHeader/index";
import Topbar from "../Topbar/index";
import { footerText } from "components/Layout/Footer/config";
import App from "routes/index";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";
import CircularProgress from "components/GlobalComponent/CircularProgress";
import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  TAB_SIZE
} from "../../constants/ThemeSetting";
import NoHeaderNotification from "../Topbar/NoHeaderNotification/index";
import { switchLanguage } from "appRedux/actions/Setting";
const { Content, Footer } = Layout;

export class MainApp extends Component {
  getContainerClass = navStyle => {
    switch (navStyle) {
      case NAV_STYLE_DARK_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_BELOW_HEADER:
        return "gx-container-wrap";
      case NAV_STYLE_ABOVE_HEADER:
        return "gx-container-wrap";
      default:
        return "";
    }
  };
  getNavStyles = navStyle => {
    switch (navStyle) {
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return <HorizontalDefault />;
      case NAV_STYLE_DARK_HORIZONTAL:
        return <HorizontalDark />;
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return <InsideHeader />;
      case NAV_STYLE_ABOVE_HEADER:
        return <AboveHeader />;
      case NAV_STYLE_BELOW_HEADER:
        return <BelowHeader />;
      case NAV_STYLE_FIXED:
        return <Topbar />;
      case NAV_STYLE_DRAWER:
        return <Topbar />;
      case NAV_STYLE_MINI_SIDEBAR:
        return <Topbar />;
      case NAV_STYLE_NO_HEADER_MINI_SIDEBAR:
        return <NoHeaderNotification />;
      case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR:
        return <NoHeaderNotification />;
      default:
        return null;
    }
  };

  getSidebar = (navStyle, width) => {
    if (width < TAB_SIZE) {
      return <Sidebar />;
    }
    switch (navStyle) {
      case NAV_STYLE_FIXED:
        return <Sidebar />;
      case NAV_STYLE_DRAWER:
        return <Sidebar />;
      case NAV_STYLE_MINI_SIDEBAR:
        return <Sidebar />;
      case NAV_STYLE_NO_HEADER_MINI_SIDEBAR:
        return <Sidebar />;
      case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR:
        return <Sidebar />;
      default:
        return null;
    }
  };

  componentDidUpdate() {
    isLoaded(this.props.userAcc) &&
      this.props.switchLanguage(this.props.userAcc[0].language);
  }

  render() {
    const { match, width, navStyle } = this.props;
    isLoaded(this.props.userAcc) &&
      localStorage.setItem(
        "user_info",
        JSON.stringify({
          user_id: this.props.userAcc[0].id,
          user_logo: this.props.userAcc[0].imageUrl,
          user_name: this.props.userAcc[0].name,
          user_website: this.props.userAcc[0].website,
          user_birth: this.props.userAcc[0].birth,
          user_gender: this.props.userAcc[0].gender,
          user_email: this.props.userAcc[0].email,
          user_phone: this.props.userAcc[0].phone,
          user_address: this.props.userAcc[0].address,
          user_district: this.props.userAcc[0].district,
          user_city: this.props.userAcc[0].city,
          user_nation: this.props.userAcc[0].nation,
          user_zipcode: this.props.userAcc[0].zipcode,
          user_position: this.props.userAcc[0].position,
          user_package: this.props.userAcc[0].package,
          user_language: this.props.userAcc[0].language,
          user_timezone: this.props.userAcc[0].timezone,
          user_currency: this.props.userAcc[0].currency,
          user_notiNewRequest: this.props.userAcc[0].notiNewRequest,
          user_notiCompany: this.props.userAcc[0].notiCompany,
          user_notiCommunity: this.props.userAcc[0].notiCommunity,
          user_notiEvents: this.props.userAcc[0].notiEvents,
          user_notiCurrentRequest: this.props.userAcc[0].notiCurrentRequest,
          user_notiSystem: this.props.userAcc[0].notiSystem,
          user_notiFlow: this.props.userAcc[0].notiFlow,
          user_sendEmail: this.props.userAcc[0].sendEmail,
          user_sendNotiPush: this.props.userAcc[0].sendNotiPush,
          user_sendNotiWeb: this.props.userAcc[0].sendNotiWeb,
          user_private: this.props.userAcc[0].private,
          user_permission: this.props.userAcc[0].permission || "",
          user_notiLogin: this.props.userAcc[0].notiLogin,
          company_id: this.props.userAcc[0].companyId,
          company_name: this.props.userAcc[0].companyName,
          company_brandname: this.props.userAcc[0].companyBrand,
          company_logo: this.props.userAcc[0].companyLogo,
          company_nation: this.props.userAcc[0].companyNation,
          company_city: this.props.userAcc[0].companyCity,
          company_district: this.props.userAcc[0].companyDistrict,
          company_address: this.props.userAcc[0].companyAddress,
          company_business: this.props.userAcc[0].companyBusiness,
          company_active: this.props.userAcc[0].companyActive,
          lastNoti: this.props.userAcc[0].lastNoti
        })
      );
    isLoaded(this.props.userAcc) &&
      this.props.switchLanguage(this.props.userAcc[0].language);

    return !isLoaded(this.props.userAcc) ? (
      <CircularProgress />
    ) : (
      <Layout className="gx-app-layout">
        {this.getSidebar(navStyle, width)}
        <Layout>
          {this.getNavStyles(navStyle)}
          <Content
            className={` gx-layout-content ${this.getContainerClass(
              navStyle
            )} `}
          >
            <App match={match} />
            <Footer className="footer">
              <div className="gx-layout-footer-content">{footerText}</div>
            </Footer>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = ({ settings, firestore }) => {
  const { width, navStyle } = settings;
  const { userAcc } = firestore.ordered;
  return { width, navStyle, userAcc };
};
// export default connect(mapStateToProps)(MainApp);
export default compose(
  firestoreConnect(props => {
    var id = document.cookie.match("(^|;) ?" + "user_id" + "=([^;]*)(;|$)");
    let uid = id[2];
    return [
      {
        collection: "users",
        doc: uid,
        storeAs: "userAcc"
      }
    ];
  }),
  connect(mapStateToProps, { switchLanguage })
)(MainApp);
