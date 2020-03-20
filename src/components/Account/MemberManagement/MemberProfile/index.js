import React, { Component, Fragment } from "react";
import { Col, Row, Avatar, Switch, Tabs, Button } from "antd";
import { connect } from "react-redux";
import CircularProgress from "../../../GlobalComponent/CircularProgress";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";
import Activities from "./Activities";
import firebase from "firebase/firebaseAcc";
import IntlMessages from "util/IntlMessages";
import { notificationPop } from "util/Notification";
import Product from "./Product";
import { Link } from "react-router-dom";
import { actResetCurrentList } from "appRedux/actions/Account";

const { TabPane } = Tabs;

class Profile extends Component {
  state = {
    profile: null,
    loading: null,
    load: true
  };

  userStatusDisplay = status => {
    switch (status) {
      case "lock":
        return (
          <li className="p-b-2">
            <IntlMessages id="general.default.account" /> :{" "}
            <IntlMessages id={`member.status.${status}`} />
          </li>
        );
      case "deleted":
        return (
          <li className="p-b-2">
            <IntlMessages id="general.default.account" /> :{" "}
            <IntlMessages id={`member.status.${status}`} />
          </li>
        );
      case "unverify":
        return (
          <li className="p-b-2">
            <IntlMessages id="general.default.account" /> :{" "}
            <IntlMessages id={`member.status.${status}`} />
          </li>
        );

      default:
        return (
          <li className="p-b-2">
            <IntlMessages id="general.default.account" /> :{" "}
            <IntlMessages id={`member.status`} />
          </li>
        );
    }
  };

  handleUpdateData = e => {
    firebase
      .firestore()
      .collection("users")
      .doc(this.props.match.params.id)
      .update({
        status: "",
        display: e
      })
      .then(res => {
        notificationPop(
          "success",
          "Cập nhật thành công!",
          "Bạn đã thay đổi trạng thái hiển thị của thành viên thành công"
        );
      })
      .catch(err => {
        console.log(err);
      });
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
          user_gender: doc.gender || " - ",
          user_address: doc.address || " - ",
          user_email: doc.email || " - ",
          user_birth: doc.birth || " - ",
          user_display: doc.display,
          user_status: doc.status
        };
      });
    return (
      <Fragment>
        {!isLoaded(this.props.users) === false && requests ? (
          <div className="block_shadow">
            <div>
              <Link to="/member-management">
                <Button
                  onClick={() => this.props.actResetCurrentList()}
                  style={{ float: "right", marginRight: "2em" }}
                  type="primary"
                >
                  <IntlMessages id="return" />
                </Button>
              </Link>
            </div>
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
                  className="gx-size-150 p-b-3"
                />
              </Col>
              <Col
                className="d-flex-i"
                style={{ alignItems: "center" }}
                xl={8}
                lg={8}
                md={24}
                sm={24}
                xs={24}
              >
                <div className="d-flex-i">
                  <ul style={{ listStyle: "none" }}>
                    <li className="p-b-2">
                      <IntlMessages id="employee.name" /> : {requests.user_name}
                    </li>
                    <li className="p-b-2">
                      <IntlMessages id="listTravelers.birthDay" /> :{" "}
                      {requests.user_birth}
                    </li>
                    <li className="p-b-2">
                      <IntlMessages id="home.settings.general.address" /> :{" "}
                      {requests.user_address}
                    </li>
                    <li className="p-b-2">
                      <IntlMessages id="account.profile.edit.information.address.update.companynation" />{" "}
                      : {requests.user_nation}
                    </li>
                    {this.userStatusDisplay(requests.user_status)}
                  </ul>
                </div>
              </Col>
              <Col
                className="d-flex-i"
                style={{ alignItems: "center" }}
                xl={8}
                lg={8}
                md={24}
                sm={24}
                xs={24}
              >
                <div className="d-flex-i">
                  <ul style={{ listStyle: "none" }}>
                    <li className="p-b-2">
                      <IntlMessages id="City" /> : {requests.user_city}
                    </li>
                    <li className="p-b-2">Email : {requests.user_email}</li>
                    <li className="p-b-2">
                      <IntlMessages id="gender" /> :{" "}
                      <IntlMessages id={requests.user_gender} />
                    </li>
                    <li className="p-b-2">
                      <IntlMessages id="employee.display" />:{" "}
                      <Switch
                        disabled={
                          requests.user_status === "lock" ||
                          requests.user_status === "deleted"
                            ? true
                            : false
                        }
                        checked={requests.user_display}
                        onChange={e => this.handleUpdateData(e)}
                      />
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
            <hr />
            <div>
              <Tabs defaultActiveKey="1" tabPosition="left">
                <TabPane
                  tab={<IntlMessages id="home.settings.activities" />}
                  key="1"
                >
                  <Activities data={this.props.match} />
                </TabPane>
                <TabPane
                  tab={<IntlMessages id="management.member.product.list" />}
                  key="2"
                >
                  <Product data={this.props.match} />
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
  connect(mapStateToProps, { actResetCurrentList })
)(Profile);
