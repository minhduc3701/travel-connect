import React, { Component } from "react";
import { Col, Icon } from "antd";
import { Button, Dropdown, Menu, Modal, Empty } from "antd";
// import { Link } from "react-router-dom";
import FollowItem from "./FollowItem";
import Info from "./Info";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
// import IntlMessages from "util/IntlMessages";

class Banner extends Component {
  state = {
    visible: false
  };

  onShowModal = () => {
    this.setState({
      visible: true
    });
  };

  onHandleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    let { profile } = this.props;
    let fList = [];
    const btn_notification_menu = (
      <Menu>
        <Menu.Item>
          <Button
            onClick={this.onShowModal}
            type="link"
            className="m-b-0-i"
            size="small"
          >
            Danh sách đơn vị theo dõi
          </Button>
        </Menu.Item>
      </Menu>
    );
    isLoaded(this.props.followList) &&
      this.props.followList.forEach(doc => {
        fList.push({
          companyId: doc.fId,
          companyName: doc.fBrand,
          companyLogo: doc.fLogo,
          status: doc.status
        });
      });
    return (
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
          <Col
            xl={24}
            lg={24}
            md={24}
            sm={24}
            xs={24}
            className="text-align-right p-b-3 p-h-3 pos-rel box d-flex-i d-flex-wrap justify-flex-end"
          >
            <Dropdown
              overlay={btn_notification_menu}
              placement="bottomRight"
              className=" m-t-3-i d-inline-block"
            >
              <Button className="m-b-0-i p-h-1-i">
                <Icon type="bars" className="p-r-1" />
                <span className="gx-d-inline-flex gx-vertical-align-middle gx-ml-1 gx-ml-sm-0 p-r-1">
                  Thông tin
                </span>
              </Button>
            </Dropdown>
          </Col>
        </div>
        <Modal
          title="Danh sách đơn vị theo dõi"
          visible={this.state.visible}
          onCancel={this.onHandleCancel}
          footer={null}
        >
          <div style={{ maxHeight: "30em", overflow: "auto" }}>
            {fList.length > 0 ? (
              fList.map((item, index) => {
                return <FollowItem key={index} data={item} />;
              })
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { followList } = state.firestore.ordered;
  return {
    followList
  };
};

export default compose(
  firestoreConnect(props => {
    const user_info = JSON.parse(localStorage.getItem("user_info"));
    return [
      {
        collection: "follows",
        where: [
          ["cId", "==", user_info.company_id],
          ["status", "==", true]
        ],
        storeAs: "followList"
      }
    ];
  }),
  connect(mapStateToProps, null)
)(Banner);
