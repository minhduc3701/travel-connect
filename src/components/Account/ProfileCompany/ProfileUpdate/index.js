import React, { Component, Fragment } from "react";
import { Col, Row } from "antd";
import Banner from "./Blocks/Banner";
import Biography from "./Blocks/Biography";
import About from "./Blocks/About";
import Friends from "./Blocks/Friends/index";
import AddEvent from "./Blocks/EventsBanner/AddEvent";
import Processing from "./Blocks/Processing";
import Rating from "./Blocks/Rating";
import PropertiesCard from "./Blocks/PropertiesItemCard/PropertiesCard";
import Socials from "./Blocks/Socials";
import Media from "./Blocks/Media";
import Contact from "./Blocks/Contact";
import Navigation from "./Blocks/Navigation";
import StaticticGuest from "./Blocks/StaticticGuest";
import { friendList } from "./data";
import { CallApi_ACCOUNT } from "util/CallApi";
import { connect } from "react-redux";
import CircularProgress from "../../../GlobalComponent/CircularProgress";
import { actFetchActionRequest } from "appRedux/actions/Account";
// import { axios } from "axios";
import {
  actSaveIntroRequest,
  actSaveSocialRequest,
  actSaveWebsiteRequest,
  actSaveAddressRequest,
  actCleanReduxStore
} from "../../../../appRedux/actions/CompanyProfile";
// import { actFetchActionRequest } from "../../../../appRedux/actions/Account";

class ProfileUpdate extends Component {
  state = {
    companyId: null
  };

  componentWillMount() {
    this.props.actFetchDataAgain();
  }

  componentWillUnmount() {
    let { CompanyProfile } = this.props.profile;
    if (CompanyProfile[0]) {
      this.props.actSendIntroToServer(CompanyProfile[0]);
    }
    if (CompanyProfile[1]) {
      this.props.actSendAddressToServer(CompanyProfile[1]);
    }
    if (CompanyProfile[2]) {
      this.props.actSendSocialToServer(CompanyProfile[2]);
    }
    if (CompanyProfile[3]) {
      this.onSendImageMedia(CompanyProfile[3].company_medias);
    }
    if (CompanyProfile[4]) {
      this.props.actSendWebsiteToServer(CompanyProfile[4]);
    }
    if (CompanyProfile[5]) {
      this.onSendImageBackground(CompanyProfile[5]);
    }
    if (CompanyProfile[6]) {
      this.onSendImageLogo(CompanyProfile[6]);
    } else {
      console.log("Nothing Change");
    }
    this.props.actCleanStore();
  }

  onSendImageMedia = fileList => {
    let user = JSON.parse(localStorage.getItem("user_info"));
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append("image-", file);
    });
    CallApi_ACCOUNT(`VN/companies/${user.company_id}/medias`, "POST", formData)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  onSendImageBackground = backgrounds => {
    let user = JSON.parse(localStorage.getItem("user_info"));
    const formData = new FormData();
    backgrounds.forEach(file => {
      formData.append("image-", file);
    });
    CallApi_ACCOUNT(
      `VN/companies/${user.company_id}/backgrounds`,
      "PUT",
      formData
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  onSendImageLogo = logo => {
    let user = JSON.parse(localStorage.getItem("user_info"));
    const formData = new FormData();
    logo.forEach(file => {
      formData.append("image-", file);
    });
    CallApi_ACCOUNT(`VN/companies/${user.company_id}/logos`, "PUT", formData)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    let { Account } = this.props.profile;
    let warning = null;
    for (const key in Account) {
      if (Account[key] !== "") {
        warning = null;
      } else {
        warning = <Processing Account={Account} />;
      }
    }
    return (
      <Fragment>
        {Account.company_name ? (
          <div className="gx-profile-content">
            <Banner profile={Account} />
            <Navigation />
            <Row className="m-t-3-i">
              <Col xl={16} lg={16} md={24} sm={24} xs={24}>
                <About profile={Account} />
                <Biography profile={Account} />
                <Contact profile={Account} />
                <Row>
                  <Col xl={12} lg={12} md={24} sm={24} xs={24}></Col>
                  <Col xl={12} lg={12} md={24} sm={24} xs={24}></Col>
                </Row>
                <AddEvent />
                <PropertiesCard profile={Account} />
                <Rating profile={Account} />
              </Col>
              <Col xl={8} lg={8} md={24} sm={24} xs={24}>
                {warning}
                <StaticticGuest profile={Account} />
                <Friends profile={Account} friendList={friendList} />
                <Socials profile={Account} />
                <Media profile={Account} />
              </Col>
            </Row>
          </div>
        ) : (
          <CircularProgress />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state
  };
};

const mapDispatchToProp = (dispatch, props) => {
  return {
    actSendIntroToServer: intro => {
      dispatch(actSaveIntroRequest(intro));
    },
    actSendSocialToServer: social => {
      dispatch(actSaveSocialRequest(social));
    },
    actSendWebsiteToServer: website => {
      dispatch(actSaveWebsiteRequest(website));
    },
    actSendAddressToServer: address => {
      dispatch(actSaveAddressRequest(address));
    },
    actCleanStore: () => {
      dispatch(actCleanReduxStore());
    },
    actFetchDataAgain: () => {
      dispatch(actFetchActionRequest());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(ProfileUpdate);
