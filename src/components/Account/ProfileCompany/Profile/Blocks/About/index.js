import React from "react";
import { Col, Row } from "antd";
import AboutItem from "./AboutItem";
import IntlMessages from "util/IntlMessages";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";

const aboutList = [
  {
    id: 1,
    title: <IntlMessages id="brandname" />,
    icon: "company",
    userList: "",
    desc: ["Travel Connect "],
    verify: "check-circle-o"
  },
  {
    id: 2,
    title: <IntlMessages id="establishdate" />,
    icon: "schedule",
    userList: "",
    desc: ["Dec 07, 2010"]
  },
  {
    id: 6,
    title: <IntlMessages id="licence" />,
    icon: "inputnumber",
    userList: "",
    desc: "0105030308"
  },
  {
    id: 3,
    title: <IntlMessages id="step.information.address" />,
    icon: "location",
    userList: "",
    desc: "Số 2 đường 3.5 Gamuda Gardens, Hoàng Mai, Hà Nội"
  },
  {
    id: 4,
    title: <IntlMessages id="step.product" />,
    icon: "product-list",
    userList: "",
    desc: ["Tour"]
  },
  {
    id: 5,
    title: <IntlMessages id="businesstype" />,
    icon: "company",
    userList: "",
    desc: "Đại lý du lịch"
  }
];
export const ticketList = [
  {
    id: 2,
    avatar: "https://via.placeholder.com/150x150",
    name: "Trần Thị B",
    job: [
      <span key={14} className="gx-link">
        {/* Nhân viên Kinh doanh */}
        <IntlMessages id="seller" />
      </span>
    ],
    status: 1
  },
  {
    id: 3,
    avatar: "https://via.placeholder.com/150x150",
    name: "Lê Anh C",
    job: [
      <span key={15} className="gx-link">
        <IntlMessages id="manager" />
      </span>
    ],
    status: 4
  },
  {
    id: 4,
    avatar: "https://via.placeholder.com/150x150",
    name: "Nguyễn Thanh Tùng",
    job: [
      <span key={16} className="gx-link">
        <IntlMessages id="manager" />
      </span>
    ],
    status: 4
  }
];

class About extends React.Component {
  render() {
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
