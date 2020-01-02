import React from "react";
import { Col, Icon, Row } from "antd";
class Info extends React.Component {
  render() {
    let { Account } = this.props;
    return (
      <div className="p-t-4">
        <h3>{Account.company_brandname}</h3>
        <h2 className="text-trans-upper">
          {/* Công ty TNHH Kết nối du lịch Việt Nam */}
          {Account.company_name}
        </h2>
        <Row>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <h5 className=" gx-text-grey ">
              <Icon type="appstore" className="p-r-3" />
              {/* Travel Agency,Accommodation, Restaurance, Transport{" "} */}
              {Account.company_business}
            </h5>
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <h5 className=" gx-text-grey ">
              <Icon type="environment" className="p-r-3" />
              {/* Hà Nội, Việt Nam */}
              {Account.company_city}, {Account.company_nation}
            </h5>
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <h5 className=" gx-text-grey ">
              <Icon type="global" className="p-r-3" />{" "}
              <a href={Account.company_website} title={Account.company_name}>
                {Account.company_website}
              </a>
            </h5>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Info;
