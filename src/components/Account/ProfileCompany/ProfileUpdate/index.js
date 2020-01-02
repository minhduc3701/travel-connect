import React, { Component } from "react";
import { Col, Row } from "antd";
import Banner from "./Blocks/Banner";
import Biography from "./Blocks/Biography";
import About from "./Blocks/About";
import Friends from "./Blocks/Friends/index";
// import EventsBanner from "./Blocks/EventsBanner";
import AddEvent from "./Blocks/EventsBanner/AddEvent";
import Processing from "./Blocks/Processing";
import Rating from "./Blocks/Rating";
import PropertiesCard from "./Blocks/PropertiesItemCard/PropertiesCard";
import Socials from "./Blocks/Socials";
import Navigation from "./Blocks/Navigation";
import Media from "./Blocks/Media";
import Contact from "./Blocks/Contact";
import StaticticGuest from "./Blocks/StaticticGuest";
import { friendList } from "./data";
import { CallApi_ACCOUNT } from "util/CallApi";
import { connect } from "react-redux";
import {
  actSaveIntroRequest,
  actSaveSocialRequest,
  actSaveWebsiteRequest,
  actSaveAddressRequest,
  actCleanReduxStore,
  actSaveMediaRequest
  // actSaveBackgroundRequest,
  // actSaveLogoRequest
} from "../../../../appRedux/actions/CompanyProfile";

class ProfileUpdate extends Component {
  componentWillUnmount() {
    let { CompanyProfile } = this.props.profile;
    // console.log("unmount nè");
    // console.log(CompanyProfile);

    if (CompanyProfile[0]) {
      this.props.actSendIntroToServer(CompanyProfile[0]);
      // console.log("ton tai0");
    }
    if (CompanyProfile[1]) {
      // console.log("ton tai1");
      this.props.actSendAddressToServer(CompanyProfile[1]);
    }
    if (CompanyProfile[2]) {
      this.props.actSendSocialToServer(CompanyProfile[2]);
      // console.log("ton tai2");
    }
    if (CompanyProfile[3]) {
      // console.log(CompanyProfile[3].company_medias);
      this.onSendImageMedia(CompanyProfile[3].company_medias);
      // console.log("ton tai");
      // this.props.actSendMediaToServer(CompanyProfile[3]);
    }
    if (CompanyProfile[4]) {
      this.props.actSendWebsiteToServer(CompanyProfile[4]);
      // console.log("ton tai4");
    }
    if (CompanyProfile[5]) {
      console.log(CompanyProfile[5].background);
      this.onSendImageBackground(CompanyProfile[5].background);
    }
    if (CompanyProfile[6]) {
      this.onSendImageLogo(CompanyProfile[6].logo);
    } else {
      console.log("Nothing Change");
    }
    this.props.actCleanStore();
  }

  onSendImageMedia = fileList => {
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append("image-", file);
    });
    // console.log(fileList);
    CallApi_ACCOUNT(
      "VN/companies/eDLBQUwHQck7eIIFyjiS/medias",
      "POST",
      formData
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  onSendImageBackground = backgrounds => {
    // const { fileList } = this.state;
    const formData = new FormData();
    backgrounds.forEach(file => {
      formData.append("image-", file);
    });
    // console.log(fileList);
    CallApi_ACCOUNT(
      "VN/companies/eDLBQUwHQck7eIIFyjiS/backgrounds",
      "PUT",
      formData
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  onSendImageLogo = logo => {
    // const { logo } = this.state;
    const formData = new FormData();
    logo.forEach(file => {
      formData.append("image-", file);
    });
    // console.log(fileList);
    CallApi_ACCOUNT("VN/companies/eDLBQUwHQck7eIIFyjiS/logos", "PUT", formData)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    let { Account } = this.props.profile;
    let { CompanyProfile } = this.props.profile;
    // console.log(Account);
    console.log(CompanyProfile);
    return (
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
            {/* <EventsBanner /> */}
            <AddEvent />
            <PropertiesCard profile={Account} />
            <Rating profile={Account} />
          </Col>
          <Col xl={8} lg={8} md={24} sm={24} xs={24}>
            <Processing />
            <StaticticGuest profile={Account} />
            <Friends profile={Account} friendList={friendList} />
            <Socials profile={Account} />
            <Media profile={Account} />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state.CompanyProfile);
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
    actSendMediaToServer: media => {
      dispatch(actSaveMediaRequest(media));
    }
    // actSendLogoToServer: logo => {
    //   dispatch(actSaveLogoRequest(logo));
    // },
    // actSendBackgroundToServer: background => {
    //   dispatch(actSaveBackgroundRequest(background));
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(ProfileUpdate);
