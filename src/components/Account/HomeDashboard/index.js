import React, { Fragment } from "react";
import { Col, Row } from "antd";
import HightLight from "./HightLight";
import WelcomeUser from "./WelcomeUser";
import AccountPackage from "./AccountPackage";
import HistoryActivities from "./HistoryActivities";
import InviteMember from "./InviteMember";
import NewPartner from "./NewPartner";
// import { connect } from "react-redux";
import Statistic from "./Statistic";
import StaticticGuest from "./StaticticGuest";
import WelcomeCard from "./WelcomeCard";
import Follower from "./Follower";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

class HomeDashboard extends React.Component {
  render() {
    let notiList = [];
    isLoaded(this.props.newNotification) &&
      this.props.newNotification.forEach(doc => {
        notiList.push(doc);
      });

    return (
      <Fragment>
        <div>
          <Row>
            <Col xl={8} lg={8} md={24} sm={24} xs={24}>
              <WelcomeCard />
              {/* <WelcomeCard Account={Account} /> */}
            </Col>
            <Col xl={16} lg={16} md={24} sm={24} xs={24}>
              <WelcomeUser />
            </Col>
          </Row>
          <Row>
            <Col xl={16} lg={16} md={24} sm={24} xs={24}>
              <HightLight />
              {/* <HightLight profile={Account} /> */}
              <Statistic />
              <StaticticGuest />
              <NewPartner />
            </Col>
            <Col xl={8} lg={8} md={24} sm={24} xs={24}>
              <HistoryActivities data={notiList} />
              <AccountPackage />
              <Follower />
              <InviteMember />
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

// export default HomeDashboard;
const mapStateToProps = ({ firestore }) => {
  const { newNotification } = firestore.ordered;
  return {
    newNotification
  };
};
export default compose(
  firestoreConnect(props => {
    const user_info = JSON.parse(localStorage.getItem("user_info"));
    return [
      {
        collection: "notifications",
        where: [`object.id`, "==", user_info.company_id],
        // orderBy: ["createdAt", "desc"],
        limit: 6,
        storeAs: "newNotification"
      }
    ];
  }),
  connect(mapStateToProps, null)
)(HomeDashboard);
