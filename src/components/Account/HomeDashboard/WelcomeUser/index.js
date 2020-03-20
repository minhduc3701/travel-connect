import React from "react";
import { Row, Col } from "antd";
import SiteAudience from "./SiteAudience";
import SiteVisit from "./SiteVisit";

class WelcomeUser extends React.Component {
  render() {
    return (
      <div className="block_shadow">
        <div className="gx-card-body">
          <Row>
            <SiteAudience data={this.props.analysis} />
            {/* <Col
              xl={16}
              lg={16}
              md={16}
              sm={24}
              xs={24}
              className="gx-visit-col"
            >
              <SiteVisit data={this.props.analysis} />
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} className="gx-audi-col">
              
            </Col> */}
          </Row>
        </div>
      </div>
    );
  }
}
export default WelcomeUser;
