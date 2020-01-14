import React from "react";
import { Col, Row } from "antd";
import AboutItem from "./AboutItem";
import IntlMessages from "util/IntlMessages";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";

class About extends React.Component {
  render() {
    let { Account } = this.props.profile;
    const aboutList = [
      {
        id: 1,
        title: <IntlMessages id="account.profile.about.brand" />,
        icon: "company",
        userList: "",
        desc: [Account.company_brandname],
        verify: "check-circle-o"
      },
      {
        id: 2,
        title: <IntlMessages id="account.profile.about.establishdate" />,
        icon: "schedule",
        userList: "",
        desc: [Account.company_establish]
      },
      {
        id: 6,
        title: <IntlMessages id="account.profile.about.licence" />,
        icon: "inputnumber",
        userList: "",
        desc: Account.company_licence
      },
      {
        id: 3,
        title: <IntlMessages id="account.profile.about.address" />,
        icon: "location",
        userList: "",
        desc: [Account.company_address]
      },
      {
        id: 4,
        title: <IntlMessages id="account.profile.about.product" />,
        icon: "product-list",
        userList: "",
        desc: [Account.company_service]
      },
      {
        id: 5,
        title: <IntlMessages id="account.profile.about.businesstype" />,
        icon: "company",
        userList: "",
        desc: Account.company_business[0]
      }
    ];

    return (
      <div className="block-w-nb" id="nav_introduction">
        <WidgetHeader title={<IntlMessages id="company.about" />} />
        <div className="gx-mb-2">
          <Row>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Row>
                {aboutList.map((about, index) => (
                  <Col key={index} xl={8} lg={12} md={12} sm={12} xs={24}>
                    <AboutItem data={about} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default About;
