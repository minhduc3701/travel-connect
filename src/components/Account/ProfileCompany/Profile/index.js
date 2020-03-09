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
import Media from "./Blocks/Media";
import Contact from "./Blocks/Contact";
import Navigation from "./Blocks/Navigation";
import StaticticGuest from "./Blocks/StaticticGuest";
import { friendList } from "./data";
import { connect } from "react-redux";
import CircularProgress from "../../../GlobalComponent/CircularProgress";
import { actFetchActionRequest } from "appRedux/actions/Account";
import { Link } from "react-router-dom";
import Cerfiticated from "./Blocks/Cerfiticated";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";

class Profile extends Component {
  state = {
    profile: null,
    loading: null,
    load: true
  };

  render() {
    let warning = null;
    let requests = null;
    let mList = [];
    let user_info = JSON.parse(localStorage.getItem("user_info"));
    isLoaded(this.props.profileData) &&
      this.props.profileData.forEach(doc => {
        requests = {
          company_id: doc.id,
          company_admin: doc.admin,
          company_background: doc.background,
          company_logo: doc.logo,
          company_brandname: doc.brandname,
          company_name: doc.name,
          company_business: doc.business,
          company_city: doc.city,
          company_district: doc.district,
          company_nation: doc.nation,
          company_website: doc.website,
          company_establish: doc.establish,
          company_licence: doc.license,
          company_address: doc.address,
          company_introduction: doc.introduction,
          company_contacts: doc.contacts,
          company_events: doc.events,
          company_communities: doc.communities,
          company_medias: doc.medias,
          company_products: doc.products,
          company_rating_bad: doc.rating_bad,
          company_rating: doc.rating,
          company_rating_fail: doc.rating_fail,
          company_rating_normal: doc.rating_normal,
          company_rating_good: doc.rating_good,
          company_rating_great: doc.rating_great,
          company_fb: doc.fb,
          company_linkedin: doc.linkedin,
          company_gitlab: doc.gitlab,
          company_skype: doc.skype,
          company_products_number: doc.products_number,
          company_orders: doc.orders,
          company_deal: doc.deal,
          company_partner: doc.partner
        };
      });

    isLoaded(this.props.memberDisplay) &&
      this.props.memberDisplay.forEach(doc => {
        mList.push({
          mId: doc.id,
          mJob: doc.position,
          mName: doc.name,
          mStatus: doc.display,
          mLogo: doc.imageUrl
        });
      });

    if (requests) {
      for (const key in requests) {
        if (requests[key] !== "") {
          warning = null;
        } else {
          warning = <Processing Account={requests} />;
        }
      }
    }
    return (
      <Fragment>
        {!isLoaded(this.props.profileData) === false &&
        !isLoaded(this.props.memberDisplay) === false &&
        user_info.company_id !== "" ? (
          <div className="gx-profile-content">
            <div className="block_shadow ">
              <Banner profile={requests} />
              <Navigation profile={requests} />
            </div>
            <Row className="m-t-3-i">
              <Col xl={16} lg={16} md={24} sm={24} xs={24}>
                <div className="block_shadow">
                  <About profile={requests} />
                  <Biography profile={requests} />
                  <Contact member={mList} profile={requests} />
                  <EventsBanner profile={requests} />
                  <PropertiesCard profile={requests} />
                  {requests.company_rating > 0 && requests ? (
                    <Rating profile={requests} />
                  ) : null}
                </div>
              </Col>
              <Col xl={8} lg={8} md={24} sm={24} xs={24}>
                <div className="block_shadow">
                  {warning}
                  <Cerfiticated />
                  <StaticticGuest profile={requests} />
                  <Friends profile={requests} friendList={friendList} />
                  <Socials profile={requests} />
                  <Media profile={requests} />
                </div>
              </Col>
            </Row>
          </div>
        ) : user_info.company_id === "" && this.state.load === false ? (
          <Result
            status="500"
            title="Không tìm thấy hồ sơ công ty!"
            subTitle="Kết nối của bạn gặp vấn đề hoặc tài khoản của bạn chưa có công ty. Hãy kiểm tra lại!"
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
  const { profileData, memberDisplay } = state.firestore.ordered;
  return {
    profile: state,
    profileData,
    memberDisplay
  };
};

const mapDispatchToProp = (dispatch, props) => {
  return {
    actFetchDataAgain: () => {
      dispatch(actFetchActionRequest());
    }
  };
};

export default compose(
  firestoreConnect(props => {
    const user_info = JSON.parse(localStorage.getItem("user_info"));
    return [
      {
        collection: "companies",
        doc: user_info.company_id,
        storeAs: "profileData"
      },
      {
        collection: "users",
        where: [
          ["companyId", "==", user_info.company_id],
          ["display", "==", true]
        ],
        limit: 5,
        storeAs: "memberDisplay"
      }
    ];
  }),
  connect(mapStateToProps, mapDispatchToProp)
)(Profile);
