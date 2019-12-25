import React, { Component } from "react";
import { Col, Row } from "antd";
import Banner from "./Blocks/Banner";
import Biography from "./Blocks/Biography";
import About from "./Blocks/About";
import Friends from "./Blocks/Friends/index";
import EventsBanner from "./Blocks/EventsBanner";
import Processing from "./Blocks/Processing";
import Rating from "./Blocks/Rating";
import PropertiesCard from "./Blocks/PropertiesItemCard/PropertiesCard";
import Socials from "./Blocks/Socials";
import Media from "./Blocks/Media";
import Contact from "./Blocks/Contact";
import Navigation from "./Blocks/Navigation";
import StaticticGuest from "./Blocks/StaticticGuest";
import { friendList } from "./data";
import { connect } from "react-redux";
import * as Actions from "appRedux/actions/Account";
// import axios from "axios";
import CallApi from "util/CallApi";

class Profile extends Component {
  state = {
    profile: null,
    loading: null
  };
  componentDidMount() {
    // let tokenID = JSON.parse(localStorage.getItem("token"));
    // let tokenSend = {
    //   headers: {
    //     Authorization: "Bearer " + tokenID
    //   }
    // };
    // axios
    //   .get(
    //     "https://us-central1-travelconnectapp.cloudfunctions.net/v1/companies/066zHzQzCt6L7RZfgbsI",
    //     tokenSend
    //   )
    //   .then(res => {
    //     console.log(res.data);
    //     this.setState({
    //       profile: res.data
    //     });
    //   });
    // CallApi("VN/companies/07WTNGl7FZsMxLJlbGRF", "GET", null).then(res => {
    //   console.log(res.data);
    // });
    this.props.actFetchProfile();
  }

  render() {
    let { profile } = this.props;
    return (
      <div className="gx-profile-content">
        <Banner profile={profile} />
        <Navigation />
        <Row className="m-t-3-i">
          <Col xl={16} lg={16} md={24} sm={24} xs={24}>
            <About />
            <Biography />
            <Contact />
            <Row>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}></Col>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}></Col>
            </Row>
            <EventsBanner />
            <PropertiesCard />
            <Rating />
          </Col>
          <Col xl={8} lg={8} md={24} sm={24} xs={24}>
            <Processing />
            <StaticticGuest />
            <Friends friendList={friendList} />
            <Socials />
            <Media />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    actFetchProfile: () => {
      dispatch(Actions.actFetchActionRequest());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
