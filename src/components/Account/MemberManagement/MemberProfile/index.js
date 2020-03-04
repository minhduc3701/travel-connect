import React, { Component, Fragment } from "react";
import { Col, Row, Avatar, Switch, Tabs } from "antd";
import { connect } from "react-redux";
import CircularProgress from "../../../GlobalComponent/CircularProgress";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";
import Activities from "./Activities";

const { TabPane } = Tabs;

class Profile extends Component {
  state = {
    profile: null,
    loading: null,
    load: true
  };

  render() {
    let requests = null;
    isLoaded(this.props.users) &&
      this.props.users.forEach(doc => {
        requests = {
          user_id: doc.id || " - ",
          user_name: doc.name || " - ",
          user_logo: doc.imageUrl || " - ",
          user_city: doc.city || " - ",
          user_nation: doc.nation || " - ",
          user_website: doc.website || " - ",
          user_address: doc.address || " - ",
          user_email: doc.email || " - ",
          user_birth: doc.birth || " - ",
          user_display: doc.display,
          company_name: doc.companyName || " - "
        };
      });
    return (
      <Fragment>
        {!isLoaded(this.props.users) === false && requests ? (
          <div className="block_shadow">
            <Row className="p-v-5">
              <Col
                className="d-flex-i"
                style={{ justifyContent: "center", alignItems: "center" }}
                xl={8}
                lg={8}
                md={12}
                sm={24}
                xs={24}
              >
                <Avatar
                  src={requests.user_logo}
                  shape="circle"
                  className="gx-size-150"
                />
              </Col>
              <Col
                className="d-flex-i"
                style={{ alignItems: "center" }}
                xl={16}
                lg={16}
                md={12}
                sm={24}
                xs={24}
              >
                <div className="d-flex-i">
                  <ul style={{ listStyle: "none", paddingRight: "10em" }}>
                    <li className="p-b-2">Họ và tên: {requests.user_name}</li>
                    <li className="p-b-2">Ngày sinh: {requests.user_birth}</li>
                    <li className="p-b-2">Email: {requests.user_email}</li>
                    <li className="p-b-2">Địa chỉ: {requests.user_address}</li>
                    <li className="p-b-2">Quốc gia: {requests.user_nation}</li>
                  </ul>
                  <ul style={{ listStyle: "none" }}>
                    <li className="p-b-2">Thành phố: {requests.user_city}</li>
                    <li className="p-b-2">Email: {requests.user_email}</li>
                    <li className="p-b-2">Website: {requests.user_website}</li>
                    <li className="p-b-2">
                      Hiển thị:{" "}
                      <Switch defaultChecked={requests.user_display} />
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
            <hr />
            <div>
              <Tabs defaultActiveKey="1" tabPosition="left">
                <TabPane tab="Nhật ký hoạt động" key="1">
                  <Activities data={this.props.match} />
                </TabPane>
                <TabPane tab="Sản phẩm quản lý" key="2">
                  null
                </TabPane>
              </Tabs>
            </div>
          </div>
        ) : (
          <CircularProgress />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { users } = state.firestore.ordered;
  return {
    users
  };
};

export default compose(
  firestoreConnect(props => {
    let { params } = props.match;
    return [
      {
        collection: "users",
        doc: params.id
      }
    ];
  }),
  connect(mapStateToProps, null)
)(Profile);
