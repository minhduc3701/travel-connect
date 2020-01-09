import React, { Component, Fragment } from "react";
import { Col, Row, Button } from "antd";
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
import CircularProgress from "../../../GlobalComponent/CircularProgress";

class Profile extends Component {
  state = {
    profile: null,
    loading: null,
    load: true
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        load: false
      });
    }, 10000);
  }

  render() {
    let { profile } = this.props;

    console.log(profile.company_name);
    return (
      <Fragment>
        {profile.company_name ? (
          <div className="gx-profile-content">
            <Banner profile={profile} />
            <Navigation />
            <Row className="m-t-3-i">
              <Col xl={16} lg={16} md={24} sm={24} xs={24}>
                <About profile={profile} />
                <Biography profile={profile} />
                <Contact profile={profile} />
                <Row>
                  <Col xl={12} lg={12} md={24} sm={24} xs={24}></Col>
                  <Col xl={12} lg={12} md={24} sm={24} xs={24}></Col>
                </Row>
                <EventsBanner profile={profile} />
                <PropertiesCard profile={profile} />
                <Rating profile={profile} />
              </Col>
              <Col xl={8} lg={8} md={24} sm={24} xs={24}>
                <Processing />
                <StaticticGuest profile={profile} />
                <Friends profile={profile} friendList={friendList} />
                <Socials profile={profile} />
                <Media profile={profile} />
              </Col>
            </Row>
          </div>
        ) : profile.company_name === undefined ? (
          <div className="block-w bor-rad-6">
            <Row>
              <Col span={24}>
                <h1>Bạn chưa có công ty! Tạo ngay bây giờ</h1>
                <Button type="primary">Tạo</Button>
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

export default connect(mapStateToProps, null)(Profile);
