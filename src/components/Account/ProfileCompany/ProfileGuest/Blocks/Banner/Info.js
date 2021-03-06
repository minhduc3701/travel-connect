import React from "react";
import { Col, Icon, Row } from "antd";

class Info extends React.Component {
  render() {
    let { Account } = this.props;
    let bussLength = Account ? Account.company_business.length - 1 : null;
    return (
      <div className="p-t-4">
        <h3>{Account.company_brandname}</h3>
        <h2 className="text-trans-upper">{Account.company_name}</h2>
        <Row>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <h5 className=" gx-text-grey ">
              <Icon type="appstore" className="p-r-3" />
              {Account.company_business.map((buss, index) => {
                if (index === bussLength) {
                  return <span>{buss}...</span>;
                } else {
                  return <span>{buss}, </span>;
                }
              })}
            </h5>
          </Col>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <h5 className=" gx-text-grey ">
              <Icon type="environment" className="p-r-3" />
              {Account.company_city}, {Account.company_nation}
            </h5>
          </Col>
          {Account.company_website !== "" && (
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <h5 className=" gx-text-grey ">
                <Icon type="global" className="p-r-3" />{" "}
                <a href={Account.company_website} title={Account.company_name}>
                  {Account.company_website}
                </a>
              </h5>
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

export default Info;
