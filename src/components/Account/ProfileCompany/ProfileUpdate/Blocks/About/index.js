import React from "react";
import { Col, Upload, Row, Modal, Icon, Button, Input } from "antd";
import AboutItem from "./AboutItem";
import IntlMessages from "util/IntlMessages";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import { notiChange } from "util/Notification";

const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text"
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      notiChange("success", `${info.file.name} file upload success.`);
    } else if (info.file.status === "error") {
      //   message.error(`${info.file.name} file upload failed.`);
      notiChange("error", `${info.file.name} file upload failed.`);
    }
  }
};

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
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: !this.state.visible
    });
  };

  handleOk = e => {
    notiChange("success", "Gửi thành công, chờ xét duyệt");
    this.setState({
      visible: false
    });
  };

  onHandleCancel = () => {
    console.log(this.state.visible);
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div className="block-w-nb" id="nav_introduction">
        <WidgetHeader
          styleName="d-flex align-items-flex-end"
          title={<IntlMessages id="company.about" />}
          extra={
            <div className="m-l-1" onClick={() => this.showModal()}>
              {this.state.visible === false ? (
                <Icon
                  type="edit"
                  className="cursor-pointer cursor-pointer--zoom"
                />
              ) : (
                <Icon
                  className="size-4 cursor-pointer cursor-pointer--zoom"
                  type="check-circle"
                />
              )}

              <Modal
                className="w-60-i"
                title="About"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.onHandleCancel}
              >
                <div
                  className=""
                  style={{ backgroundColor: "white", borderRadius: 10 }}
                >
                  <Row className="m-b-3 align-items-center">
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                      <p className="text-align-right p-r-5-i">
                        {<IntlMessages id="companyName" />}
                      </p>
                    </Col>
                    <Col className="" xs={24} sm={24} md={18} lg={18} xl={18}>
                      <Row className="m-b-3-i align-items-center">
                        <Col xs={18} sm={18} md={18} lg={20} xl={20}>
                          <Input
                            className="border-none"
                            defaultValue="Công ty TNHH giải pháp kết nối du lịch Việt Nam"
                          />
                        </Col>
                        <Col
                          className="text-align-center"
                          xs={6}
                          sm={6}
                          md={6}
                          lg={4}
                          xl={4}
                        ></Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="m-b-3 align-items-center">
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                      <p className="text-align-right p-r-5-i">
                        {<IntlMessages id="brandname" />}
                      </p>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                      <Row className="m-b-3-i align-items-center">
                        <Col xs={18} sm={18} md={18} lg={20} xl={20}>
                          <Input
                            className="border-none"
                            defaultValue="Travel Connect"
                          />
                        </Col>
                        <Col
                          className="text-align-center"
                          xs={6}
                          sm={6}
                          md={6}
                          lg={4}
                          xl={4}
                        ></Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="m-b-3  align-items-center">
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                      <p className="text-align-right p-r-5-i">
                        {<IntlMessages id="step.information.licensenumber" />}
                      </p>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                      <Row className="m-b-3-i align-items-center">
                        <Col xs={18} sm={18} md={18} lg={20} xl={20}>
                          <Input defaultValue="0105030308" />
                        </Col>
                        <Col
                          className="text-align-center"
                          xs={6}
                          sm={6}
                          md={6}
                          lg={4}
                          xl={4}
                        ></Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="m-b-3  align-items-center">
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                      <p className="text-align-right p-r-5-i">
                        {<IntlMessages id="step.information.licenseimage" />}
                      </p>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                      <Row className="m-b-3-i align-items-center">
                        <Col xs={18} sm={18} md={18} lg={20} xl={20}>
                          <p className="m-b-0-i">
                            <Upload {...props}>
                              <Button>
                                <Icon type="upload" /> Click to Upload
                              </Button>
                            </Upload>
                          </p>
                        </Col>
                        <Col
                          className="text-align-center"
                          xs={6}
                          sm={6}
                          md={6}
                          lg={4}
                          xl={4}
                        ></Col>
                      </Row>
                    </Col>
                  </Row>
                  <h5 style={{ color: "red" }}>
                    * Những thông tin này đã được xác minh. Nếu bạn muốn chỉnh
                    sửa hãy click vào nút <b>Send Request</b> và điền thông tin
                    mà bạn muốn chỉnh sửa vào form *
                  </h5>
                </div>
              </Modal>
            </div>
          }
        />
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
