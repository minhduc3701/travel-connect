import React from "react";
import { Col, Row } from "antd";
import HightLight from "./HightLight";
import WelcomeUser from "./WelcomeUser";
import AccountPackage from "./AccountPackage";
import HistoryActivities from "./HistoryActivities";
import InviteMember from "./InviteMember";
import NewPartner from "./NewPartner";
import { connect } from "react-redux";
import Statistic from "./Statistic";
import StaticticGuest from "./StaticticGuest";
import WelcomeCard from "./WelcomeCard";
import CircularProgress from "../../GlobalComponent/CircularProgress";

class HomeDashboard extends React.Component {
  render() {
    let { Account } = this.props.profile;
    return (
      <div>
        {Account ? (
          <div>
            <Row>
              <Col xl={8} lg={8} md={24} sm={24} xs={24}>
                <WelcomeCard Account={Account} />
              </Col>
              <Col xl={16} lg={16} md={24} sm={24} xs={24}>
                <WelcomeUser />
              </Col>
            </Row>
            <Row>
              <Col xl={16} lg={16} md={24} sm={24} xs={24}>
                <HightLight profile={Account} />
                <Statistic />
                <StaticticGuest />
                <NewPartner />
              </Col>
              <Col xl={8} lg={8} md={24} sm={24} xs={24}>
                <HistoryActivities />
                <AccountPackage />
                <InviteMember />
              </Col>
            </Row>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state
  };
};

export default connect(mapStateToProps, null)(HomeDashboard);
