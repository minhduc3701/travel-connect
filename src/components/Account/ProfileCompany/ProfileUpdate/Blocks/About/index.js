import React from "react";
import {
  Col,
  Upload,
  Row,
  Modal,
  Icon,
  Button,
  Input,
  Form,
  Select
} from "antd";
import AboutItem from "./AboutItem";
import IntlMessages from "util/IntlMessages";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import { notiChange } from "util/Notification";
import { connect } from "react-redux";
import { actChangeLicenseRequest } from "appRedux/actions/Account";
import { CallApi } from "util/CallApi";

// const { Option } = Select;
const formItemLayout = {
  wrapperCol: { xs: 24, sm: 24 }
};
const FormItem = Form.Item;

const OPTIONS = [
  "Lữ hành quốc tế Outbound",
  "Lữ hành nội địa",
  "Đại lý Du lịch",
  "Vận tải",
  "Hàng không",
  "Cơ sỏ lưu trú",
  "Nhà hàng"
];

class About extends React.Component {
  state = {
    loading: false,
    visible: false,
    message: "",
    business: [],
    fileList: [],
    requestChange: {
      company_name: null,
      company_brandname: null,
      company_licence_file: null,
      company_licence: null
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState(
            {
              loading: false,
              visible: false,
              requestChange: {
                company_name: values.company_name,
                company_brandname: values.company_brandname,
                company_licence_file: values.company_licence_file
                  ? values.company_licence_file
                  : "",
                company_licence: values.company_licence
              }
            },
            () => this.onSendDataToServer()
          );
          notiChange("success", "Send message success!");
        }, 1500);
      }
    });
  };

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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
      notiChange("success", "Send request success!");
    }, 3000);
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  handleChangeBusiness = business => {
    this.setState({ business });
  };

  onSendImage = () => {
    let user= JSON.parse(localStorage.getItem('user_info'))
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append("image-", file);
    });
    CallApi(`user/${user.user_id}/images`, "POST", formData)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  onSendDataToServer = () => {
    this.onSendImage();
    this.props.actSendRequestToServer(this.state.requestChange);
  };

  render() {
    let { business, fileList } = this.state;
    let { profile } = this.props;
    const filteredOptions = OPTIONS.filter(o => !business.includes(o));
    const { getFieldDecorator } = this.props.form;
    const aboutList = [
      {
        id: 1,
        title: <IntlMessages id="account.profile.about.brand" />,
        icon: "company",
        userList: "",
        desc: profile.company_brandname,
        verify: "check-circle-o"
      },
      {
        id: 2,
        title: <IntlMessages id="account.profile.about.establishdate" />,
        icon: "schedule",
        userList: "",
        desc: profile.company_establish
      },
      {
        id: 6,
        title: <IntlMessages id="account.profile.about.licence" />,
        icon: "inputnumber",
        userList: "",
        desc: profile.company_licence
      },
      {
        id: 3,
        title: <IntlMessages id="account.profile.about.address" />,
        icon: "location",
        userList: "",
        desc: profile.company_address
      },
      {
        id: 4,
        title: <IntlMessages id="account.profile.about.product" />,
        icon: "product-list",
        userList: "",
        desc: profile.company_service
      },
      {
        id: 5,
        title: <IntlMessages id="account.profile.about.businesstype" />,
        icon: "company",
        userList: "",
        desc: profile.company_business
      }
    ];

    const props = {
      multiple: true,
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          // fileList: file
          fileList: [...state.fileList, file]
        }));
        return false;
      },
      fileList
    };

    return (
      <div className="block-w-nb" id="nav_introduction">
        <WidgetHeader
          styleName="d-flex align-items-flex-end"
          title={<IntlMessages id="account.profile.edit.about.update" />}
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
                    {<IntlMessages id="account.profile.edit.about.update.companyname" />}
                  </p>
                </Col>
                <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                  <FormItem {...formItemLayout}>
                    {getFieldDecorator("company_name", {
                      rules: [
                        {
                          required: true,
                          message: <IntlMessages id="account.profile.edit.about.update.companyname.msg.error" />
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
                  <p className="text-align-right"><IntlMessages id="account.profile.edit.about.update.brandname" /></p>
                </Col>
                <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                  <FormItem {...formItemLayout}>
                    {getFieldDecorator("company_brandname", {
                      rules: [
                        {
                          required: true,
                          message: <IntlMessages id="account.profile.edit.about.update.brandname.msg.error" />
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
                  <p className="text-align-right"><IntlMessages id="account.profile.edit.about.update.licensenumber" /></p>
                </Col>
                <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                  <FormItem {...formItemLayout}>
                    {getFieldDecorator("company_licence", {
                      rules: [
                        {
                          required: true,
                          message: <IntlMessages id="account.profile.edit.about.update.licensenumber.msg.error" />
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
                  <p className="text-align-right"><IntlMessages id="account.profile.edit.about.update.businesstype" /></p>
                </Col>
                <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                  <FormItem {...formItemLayout}>
                    {getFieldDecorator("company_business", {
                      rules: [
                        {
                          required: true,
                          message: <IntlMessages id="account.profile.edit.about.update.businesstype.msg.error" />
                        }
                      ]
                    })(
                      <Select
                        style={{ width: "80%" }}
                        mode="multiple"
                        value={business}
                        onChange={this.handleChangeBusiness}
                        placeholder="Lĩnh vực"
                      >
                        {filteredOptions.map(item => (
                          <Select.Option key={item} value={item}>
                            {item}
                          </Select.Option>
                        ))}
                      </Select>
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
                  <p className="text-align-right"><IntlMessages id="account.profile.edit.about.update.licenseimage" /></p>
                </Col>
                <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                  <FormItem {...formItemLayout}>
                    {getFieldDecorator("company_licence_file", {
                      valuePropName: "fileList",
                      getValueFromEvent: this.normFile
                    })(
                      <Upload {...props}>
                        <Button style={{ margin: 0 }}>
                          <Icon type="upload" /> <IntlMessages id="account.profile.edit.about.update.licenseimage.btn.upload" />
                        </Button>
                      </Upload>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <p className="text-align-center gx-text-red">
                <IntlMessages id="account.profile.edit.about.update.guide" />
              </p>
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
                  <IntlMessages id="general.btn.return" />
                </Button>
                <Button
                  loading={this.state.loading ? true : false}
                  htmlType="submit"
                  type="primary"
                  style={{ marginBottom: "0 !important" }}
                >
                  <IntlMessages id="general.btn.sentrequest" />
                </Button>
              </div>
            </Form>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    actSendRequestToServer: license => {
      dispatch(actChangeLicenseRequest(license));
    }
  };
};

const WrappedHorizontalLoginForm = Form.create()(About);

export default connect(null, mapDispatchToProps)(WrappedHorizontalLoginForm);
