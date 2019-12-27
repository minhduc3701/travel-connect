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
import { connect } from "react-redux";

class ProfileUpdate extends Component {
  render() {
    let { Account } = this.props.profile;
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
  return {
    profile: state
  };
};

export default connect(mapStateToProps, null)(ProfileUpdate);
