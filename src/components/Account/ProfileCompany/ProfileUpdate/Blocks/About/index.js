import React from "react";
import { Col, Upload, Row, Modal, Icon, Button, Input, Form } from "antd";
import AboutItem from "./AboutItem";
import IntlMessages from "util/IntlMessages";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import { notiChange } from "util/Notification";

const formItemLayout = {
  wrapperCol: { xs: 24, sm: 24 }
};
const FormItem = Form.Item;

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
  state = {
    loading: false,
    visible: false,
    message: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        // this.props.getState(this.state.step);
        this.setState({ loading: true, message: values });
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
          notiChange("success", "Send message success!");
        }, 1500);
      }
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
      notiChange("success", "Send request success");
    }, 3000);
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  render() {
    let { profile } = this.props;
    const { getFieldDecorator } = this.props.form;
    const aboutList = [
      {
        id: 1,
        title: <IntlMessages id="brandname" />,
        icon: "company",
        userList: "",
        desc: profile.company_brandname,
        verify: "check-circle-o"
      },
      {
        id: 2,
        title: <IntlMessages id="establishdate" />,
        icon: "schedule",
        userList: "",
        desc: profile.company_establish
      },
      {
        id: 6,
        title: <IntlMessages id="licence" />,
        icon: "inputnumber",
        userList: "",
        desc: "aaaaaaaaaaaa"
        // desc: profile.company_licence
      },
      {
        id: 3,
        title: <IntlMessages id="step.information.address" />,
        icon: "location",
        userList: "",
        desc: profile.company_address
      },
      {
        id: 4,
        title: <IntlMessages id="step.product" />,
        icon: "product-list",
        userList: "",
        desc: profile.company_service
      },
      {
        id: 5,
        title: <IntlMessages id="businesstype" />,
        icon: "company",
        userList: "",
        desc: profile.company_business
      }
    ];

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
          <Modal
            className="w-60-i"
            title="About"
            visible={this.state.visible}
            onCancel={this.handleCancel}
            footer={null}
          >
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  xs={24}
                  sm={24}
                  md={6}
                  lg={6}
                  xl={6}
                >
                  <p className="text-align-right">
                    {<IntlMessages id="companyName" />}
                  </p>
                </Col>
                <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                  <FormItem {...formItemLayout}>
                    {getFieldDecorator("company_name", {
                      rules: [
                        {
                          required: true,
                          message: "Enter your company name!"
                        }
                      ]
                    })(<Input style={{ width: "80%" }} placeholder="Name" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  xs={24}
                  sm={24}
                  md={6}
                  lg={6}
                  xl={6}
                >
                  <p className="text-align-right">Brand name</p>
                </Col>
                <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                  <FormItem {...formItemLayout}>
                    {getFieldDecorator("company_brandname", {
                      rules: [
                        {
                          required: true,
                          message: "Enter your company brandname!"
                        }
                      ]
                    })(
                      <Input style={{ width: "80%" }} placeholder="Brandname" />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  xs={24}
                  sm={24}
                  md={6}
                  lg={6}
                  xl={6}
                >
                  <p className="text-align-right">License Number</p>
                </Col>
                <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                  <FormItem {...formItemLayout}>
                    {getFieldDecorator("license_id", {
                      rules: [
                        {
                          required: true,
                          message: "Enter your company license!"
                        }
                      ]
                    })(
                      <Input style={{ width: "80%" }} placeholder="License" />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  xs={24}
                  sm={24}
                  md={6}
                  lg={6}
                  xl={6}
                >
                  <p className="text-align-right">License Image</p>
                </Col>
                <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                  <FormItem {...formItemLayout}>
                    {getFieldDecorator("license_image", {
                      rules: [
                        {
                          required: false,
                          message: "Upload your licence image!"
                        }
                      ]
                    })(
                      <Upload {...props}>
                        <Button style={{ margin: 0 }}>
                          <Icon type="upload" /> Click to Upload
                        </Button>
                      </Upload>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <h5 style={{ color: "red" }}>
                * Những thông tin này đã được xác minh. Nếu bạn muốn chỉnh sửa
                hãy click vào nút <b>Send Request</b> và điền thông tin mà bạn
                muốn chỉnh sửa vào form *
              </h5>
              <hr />
              <div
                className=" d-flex"
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
              >
                <Button
                  onClick={this.handleCancel}
                  style={{ marginBottom: "0 !important" }}
                >
                  Return
                </Button>
                <Button
                  loading={this.state.loading ? true : false}
                  htmlType="submit"
                  type="primary"
                  style={{ marginBottom: "0 !important" }}
                >
                  Send Request
                </Button>
              </div>
            </Form>
          </Modal>
        </div>
      </div>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create()(About);

export default WrappedHorizontalLoginForm;
