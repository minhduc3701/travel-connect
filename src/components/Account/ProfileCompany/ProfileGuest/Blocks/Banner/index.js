import React, { Component, Fragment } from "react";
import { Col, Icon } from "antd";
import { Button, Dropdown, Menu } from "antd";
// import { Link } from "react-router-dom";
import Info from "./Info";
import IntlMessages from "util/IntlMessages";
import firebase from "firebase/firebaseAcc";
import { notificationPop } from "util/Notification";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";

class Banner extends Component {
  state = {
    product: false,
    event: false
  };
  onFollow = data => {
    let user_info = JSON.parse(localStorage.getItem("user_info"));
    firebase
      .firestore()
      .collection("follows")
      .doc(`${data.company_id}_${user_info.company_id}`)
      .set({
        fId: data.company_id,
        fLogo: data.company_logo,
        fBrand: data.company_brandname,
        cId: user_info.company_id,
        cName: user_info.company_name,
        cLogo: user_info.company_logo,
        status: true,
        noti: "All"
      })
      .then(res => {
        notificationPop("success", "Theo dõi thành công!");
      })
      .catch(err => {
        notificationPop("error", "Something went wrong!");
      });
  };
  onUnFollow = data => {
    let user_info = JSON.parse(localStorage.getItem("user_info"));
    firebase
      .firestore()
      .collection("follows")
      .doc(`${data.company_id}_${user_info.company_id}`)
      .update({
        status: false,
        noti: ""
      })
      .then(res => {
        notificationPop("success", "Hủy theo dõi thành công!");
      })
      .catch(err => {
        notificationPop("error", "Something went wrong!");
      });
  };
  onNotiAll = data => {
    let { profile } = this.props;
    let user_info = JSON.parse(localStorage.getItem("user_info"));
    firebase
      .firestore()
      .collection("follows")
      .doc(`${profile.company_id}_${user_info.company_id}`)
      .update({
        noti: data
      })
      .catch(err => {
        notificationPop("error", "Something went wrong!");
      });
  };
  onNotiPick = data => {
    let { profile } = this.props;
    let user_info = JSON.parse(localStorage.getItem("user_info"));
    firebase
      .firestore()
      .collection("follows")
      .doc(`${profile.company_id}_${user_info.company_id}`)
      .update({
        noti: firebase.firestore.FieldValue.arrayUnion(data)
      })
      .catch(err => {
        notificationPop("error", "Something went wrong!");
      });
  };

  render() {
    let followAct = null;
    let productAct = false;
    let eventAct = false;
    let { profile } = this.props;
    let user_info = JSON.parse(localStorage.getItem("user_info"));
    isLoaded(this.props.followAction) &&
      this.props.followAction.forEach(doc => {
        followAct = {
          id: doc.cId,
          status: doc.status,
          noti: doc.noti
        };
      });
    if (followAct && followAct.status && typeof followAct.noti === "object") {
      for (let i = 0; i < followAct.noti.length; i++) {
        if (followAct.noti[i] === "product") {
          productAct = true;
        }
        if (followAct.noti[i] === "event") {
          eventAct = true;
        }
      }
    }

    const btn_notification_menu = followAct && (
      <Menu>
        <Menu.Item>
          <Button
            onClick={() => this.onNotiAll("All")}
            type="link"
            className="m-b-0-i"
            size="small"
          >
            {followAct &&
              followAct.noti === "All" &&
              typeof followAct.noti === "string" && (
                <Icon type="check" className="gx-link" />
              )}
            <IntlMessages id="account.profile.notifications.get.all" />
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button
            onClick={() => this.onNotiPick("product")}
            type="link"
            className="m-b-0-i"
            size="small"
          >
            {productAct && typeof followAct.noti === "object" && (
              <Icon type="check" className="gx-link" />
            )}
            <IntlMessages id="account.profile.notifications.get.product" />
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button
            onClick={() => this.onNotiPick("event")}
            type="link"
            className="m-b-0-i"
            size="small"
          >
            {eventAct && typeof followAct.noti === "object" && (
              <Icon type="check" className="gx-link" />
            )}
            <IntlMessages id="account.profile.notifications.get.event" />
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button
            onClick={() => this.onNotiAll("none")}
            type="link"
            className="m-b-0-i"
            size="small"
          >
            {followAct.noti === "none" &&
              typeof followAct.noti === "string" && (
                <Icon type="check" className="gx-link" />
              )}
            <IntlMessages id="account.profile.notifications.get.off" />
          </Button>
        </Menu.Item>
      </Menu>
    );

    return (
      <Fragment>
        <div className="m-b-5 ">
          <div className="aspect_box">
            <div className="aspect_box--inner aspect_box--retangle_1x4">
              {profile.company_background !== "" ? (
                <img
                  src={profile.company_background}
                  alt="banner"
                  className="aspect_box__img aspect_box__img--cover"
                />
              ) : (
                <div
                  className="aspect_box__img aspect_box__img--cover"
                  style={{ background: "#55555533" }}
                ></div>
              )}
            </div>
          </div>
          <div className="bg-color-white d-flex d-flex-wrap">
            <Col xl={6} lg={6} md={24} sm={24} xs={24} className="pos-rel">
              <div className="aspect_box block__banner__avatar">
                <div className="aspect_box--inner aspect_box--square --circle block__banner__avatar--inner bg-color-white">
                  {profile.company_logo !== "" ? (
                    <img
                      src={profile.company_logo}
                      alt="banner"
                      className="aspect_box__img aspect_box__img--contain"
                    />
                  ) : (
                    <div
                      className="aspect_box__img aspect_box__img--contain"
                      style={{ background: "#55555533" }}
                    ></div>
                  )}
                </div>
              </div>
              <div className="block__banner__avatar__extend">
                <div className="text-align-center">
                  <div className="d-inline-block text-align-left">
                    <h5 className=" gx-text-grey m-b-0-i">
                      <Icon type="usergroup-add" className="p-r-1" />
                      {profile.company_partner}
                    </h5>
                    <h5 className=" gx-text-grey m-b-0-i">
                      <Icon type="eye" className="p-r-1" />
                      {profile.company_views}
                    </h5>
                  </div>
                </div>
              </div>
            </Col>
            <Col xl={18} lg={18} md={24} sm={24} xs={24} className="pos-rel">
              <Info Account={profile} />
            </Col>
            {user_info.company_id !== "" && (
              <Col
                xl={24}
                lg={24}
                md={24}
                sm={24}
                xs={24}
                className="text-align-right p-b-3 p-h-3 pos-rel box d-flex-i d-flex-wrap justify-flex-end"
              >
                {followAct && followAct.status ? (
                  <Button
                    onClick={() => this.onUnFollow(profile)}
                    className="m-b-0-i d-inline-block m-r-3-i m-t-3-i p-h-1-i"
                  >
                    <Icon type="book" className="p-r-1" />
                    <span className="gx-d-inline-flex gx-vertical-align-middle gx-ml-1 gx-ml-sm-0">
                      <IntlMessages id="account.profile.unfollow" />
                    </span>
                  </Button>
                ) : (
                  <Button
                    onClick={() => this.onFollow(profile)}
                    className="m-b-0-i d-inline-block m-r-3-i m-t-3-i p-h-1-i"
                  >
                    <Icon type="book" className="p-r-1" />
                    <span className="gx-d-inline-flex gx-vertical-align-middle gx-ml-1 gx-ml-sm-0">
                      <IntlMessages id="account.profile.follow" />
                    </span>
                  </Button>
                )}
                {followAct && (
                  <Dropdown
                    overlay={btn_notification_menu}
                    placement="bottomRight"
                    className=" m-t-3-i d-inline-block"
                  >
                    <Button className="m-b-0-i p-h-1-i">
                      <Icon type="bell" className="p-r-1" />
                      <span className="gx-d-inline-flex gx-vertical-align-middle gx-ml-1 gx-ml-sm-0">
                        <IntlMessages id="account.profile.notifications.get" />
                      </span>
                    </Button>
                  </Dropdown>
                )}
              </Col>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { followAction } = state.firestore.ordered;
  return {
    followAction
  };
};

export default compose(
  firestoreConnect(props => {
    let { profile } = props;
    let user_info = JSON.parse(localStorage.getItem("user_info"));
    return [
      {
        collection: "follows",
        where: [
          ["fId", "==", profile.company_id],
          ["cId", "==", user_info.company_id],
          ["status", "==", true]
        ],
        storeAs: "followAction"
      }
    ];
  }),
  connect(mapStateToProps, null)
)(Banner);
