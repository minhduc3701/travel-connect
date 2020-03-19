import React, { Component, Fragment } from "react";
import { Col, Row, Button, Result } from "antd";
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
import { connect } from "react-redux";
import CircularProgress from "../../../GlobalComponent/CircularProgress";
import Cerfiticated from "./Blocks/Cerfiticated";
import {
  actSaveIntroRequestSDK,
  actSaveSocialRequestSDK,
  actSaveWebsiteRequestSDK,
  actSaveAddressRequestSDK,
  actCleanReduxStore
} from "../../../../appRedux/actions/CompanyProfile";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { Link, Redirect } from "react-router-dom";
import { compose } from "redux";
import IntlMessages from "util/IntlMessages";
import firebase from "firebase/firebaseAcc";

class ProfileUpdate extends Component {
  state = {
    companyId: null,
    warningTool: true,
    saved: false,
    saveLoading: false
  };

  componentWillUnmount() {
    this.props.actCleanStore();
  }

  onCloseWarning = () => {
    this.setState({
      warningTool: false
    });
  };

  saveData = async () => {
    let user_info = JSON.parse(localStorage.getItem("user_info"));
    let { CompanyProfile } = this.props.profile;
    let dataDetail = {};
    this.setState({
      saveLoading: true
    });
    let detail = [
      CompanyProfile[0],
      CompanyProfile[1],
      CompanyProfile[2],
      CompanyProfile[4]
    ];
    await detail.forEach(element => {
      if (element) {
        Object.assign(dataDetail, element);
      }
    });
    {
      CompanyProfile[6] && (await this.onSendImageLogo(CompanyProfile[6]));
    }
    {
      CompanyProfile[5] &&
        (await this.onSendImageBackground(CompanyProfile[5]));
    }
    {
      CompanyProfile[3] && (await this.onUploadImageMedia(CompanyProfile[3]));
    }
    firebase
      .firestore()
      .collection("companies")
      .doc(user_info.company_id)
      .update(dataDetail)
      .then(res => {
        if (
          CompanyProfile[0] !== null ||
          CompanyProfile[1] !== null ||
          CompanyProfile[2] !== null ||
          CompanyProfile[4] !== null
        ) {
          this.setState({
            saveLoading: false
          });
        } else {
          setTimeout(() => {
            this.setState({
              saveLoading: false
            });
          }, 3000);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  onSendImageLogo = logo => {
    let user_info = JSON.parse(localStorage.getItem("user_info"));
    firebase
      .storage()
      .ref(`/${user_info.company_id}/${Date.now().toString()}`)
      .put(logo[0])
      .then(res => {
        if (res) {
          firebase
            .storage()
            .ref(res.metadata.fullPath)
            .getDownloadURL()
            .then(url => {
              firebase
                .firestore()
                .collection("companies")
                .doc(user_info.company_id)
                .update({
                  logo: url
                })
                .then(res => {
                  this.setState({
                    saveLoading: false
                  });
                });
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  onSendImageBackground = background => {
    let user_info = JSON.parse(localStorage.getItem("user_info"));
    firebase
      .storage()
      .ref(`/${user_info.company_id}/${Date.now().toString()}`)
      .put(background[0])
      .then(res => {
        if (res) {
          firebase
            .storage()
            .ref(res.metadata.fullPath)
            .getDownloadURL()
            .then(url => {
              firebase
                .firestore()
                .collection("companies")
                .doc(user_info.company_id)
                .update({
                  background: url
                })
                .then(res => {
                  this.setState({
                    saveLoading: false
                  });
                });
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  onUploadImageMedia = async media => {
    let user_info = JSON.parse(localStorage.getItem("user_info"));
    await media.forEach(fileItem => {
      firebase
        .storage()
        .ref(`/${user_info.company_id}/${Date.now().toString()}`)
        .put(fileItem)
        .then(res => {
          if (res) {
            firebase
              .storage()
              .ref(res.metadata.fullPath)
              .getDownloadURL()
              .then(url => {
                firebase
                  .firestore()
                  .collection("companies")
                  .doc(user_info.company_id)
                  .update({
                    medias: firebase.firestore.FieldValue.arrayUnion(url)
                  })
                  .then(res => {
                    this.setState({
                      saveLoading: false
                    });
                  });
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  render() {
    let warning = false;
    let mList = [];
    let requests = null;
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
          company_views: doc.views,
          company_partner: doc.partner
        };
      });

    isLoaded(this.props.memberDisplay) &&
      this.props.memberDisplay.forEach(doc => {
        mList.push({
          mId: doc.id,
          mJob: doc.position,
          mName: doc.name,
          mStatus: doc.diplay,
          mLogo: doc.imageUrl
        });
      });
    if (requests) {
      for (const key in requests) {
        if (requests[key] === "") {
          warning = true;
        }
      }
    }

    return (
      <Fragment>
        {this.state.warningTool && (
          <div
            className="block d-flex-i align-items-center"
            style={{
              borderRadius: 10,
              justifyContent: "space-between",
              color: "#155724",
              backgroundColor: "#d4edda",
              borderColor: "#c3e6cb"
            }}
          >
            <IntlMessages id="profile.preview" />
            <Link style={{ color: "#155724" }} to="/profile">
              <span onClick={this.onCloseWarning}>
                <IntlMessages id="return" />
              </span>
            </Link>
          </div>
        )}
        {!isLoaded(this.props.profileData) === false &&
        !isLoaded(this.props.memberDisplay) === false &&
        user_info.company_id !== "" ? (
          <div className="gx-profile-content ">
            <div
              className={`block_shadow ${this.state.saveLoading &&
                "disable_layer_block"}`}
            >
              <Banner profile={requests} />
              <Navigation />
            </div>
            <Row className="m-t-3-i">
              <Col xl={16} lg={16} md={24} sm={24} xs={24}>
                <div
                  className={`block_shadow ${this.state.saveLoading &&
                    "disable_layer_block"}`}
                >
                  <About profile={requests} />
                  <Biography profile={requests} />
                  <Contact member={mList} profile={requests} />
                  <Row>
                    <Col xl={12} lg={12} md={24} sm={24} xs={24}></Col>
                    <Col xl={12} lg={12} md={24} sm={24} xs={24}></Col>
                  </Row>
                  <AddEvent />
                  <PropertiesCard profile={requests} />
                  {requests.company_rating > 0 && requests ? (
                    <Rating profile={requests} />
                  ) : null}
                </div>
              </Col>
              <Col xl={8} lg={8} md={24} sm={24} xs={24}>
                {warning && (
                  <div
                    className={`${this.state.saveLoading &&
                      "disable_layer_block"}`}
                  >
                    <Processing Account={requests} />
                  </div>
                )}
                <div
                  className={`block_shadow ${this.state.saveLoading &&
                    "disable_layer_block"}`}
                >
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
            title={<IntlMessages id="profile.result.title" />}
            subTitle={<IntlMessages id="profile.result.subtitle" />}
            extra={
              <Link to={{ pathname: "/profile" }}>
                <Button type="primary">
                  <IntlMessages id="profile.try" />
                </Button>
              </Link>
            }
          />
        ) : (
          <CircularProgress />
        )}

        <Button
          type="primary"
          loading={this.state.saveLoading}
          style={{
            position: "fixed",
            bottom: "4em",
            right: "2em",
            margin: 0
          }}
          onClick={() => this.saveData()}
        >
          <IntlMessages id="general.btn.save" />
        </Button>
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
    actSendIntroToServer: intro => {
      dispatch(actSaveIntroRequestSDK(intro));
    },
    actSendSocialToServer: social => {
      dispatch(actSaveSocialRequestSDK(social));
    },
    actSendWebsiteToServer: website => {
      dispatch(actSaveWebsiteRequestSDK(website));
    },
    actSendAddressToServer: address => {
      dispatch(actSaveAddressRequestSDK(address));
    },
    actCleanStore: () => {
      dispatch(actCleanReduxStore());
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
)(ProfileUpdate);
