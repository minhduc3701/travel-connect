import React, { Component, Fragment } from "react";
import { Col, Row, Button, Result } from "antd";
import Banner from "./Blocks/Banner";
import Biography from "./Blocks/Biography";
import About from "./Blocks/About";
import Friends from "./Blocks/Friends/index";
import EventsBanner from "./Blocks/EventsBanner";
import Processing from "./Blocks/Processing";
import Rating from "./Blocks/Rating";
import PropertiesCard from "./Blocks/PropertiesItemCard/PropertiesCard";
import Socials from "./Blocks/Socials";
// import Media from "./Blocks/Media";
import Contact from "./Blocks/Contact";
import Navigation from "./Blocks/Navigation";
import StaticticGuest from "./Blocks/StaticticGuest";
import { friendList } from "./data";
import { connect } from "react-redux";
import CircularProgress from "../../../GlobalComponent/CircularProgress";
import { actFetchActionRequest } from "appRedux/actions/Account";
import { Link } from "react-router-dom";

class Profile extends Component {
  state = {
    profile: null,
    loading: null,
    load: true
  };

  componentWillMount() {
    console.log("unmount");
    this.props.actFetchDataAgain();
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        load: false
      });
    }, 10000);
  }

  render() {
    let { profile } = this.props;
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
        {profile.Account.company_name ? (
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
                {warning}
                <StaticticGuest profile={profile} />
                <Friends profile={profile} friendList={friendList} />
                <Socials profile={profile} />
                {/* <Media profile={profile} /> */}
              </Col>
            </Row>
          </div>
        ) : profile.Account.company_name === undefined &&
          this.state.load === false ? (
          <Result
            status="500"
            title="Không tìm thấy hồ sơ công ty!"
            subTitle="Kết nối của bạn gặp vấn đề. Hãy kiểm tra lại kết nối!"
            extra={
              <Link to={{ pathname: "/profile" }}>
                <Button type="primary">Thử lại</Button>
              </Link>
            }
          />
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
    actFetchDataAgain: () => {
      dispatch(actFetchActionRequest());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(Profile);
