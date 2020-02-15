import React from "react";
import { notiChange } from "util/Notification";
import {
  Col,
  Icon,
  Row,
  Select,
  Input,
  Modal,
  Form,
  Cascader,
  Button
} from "antd";
import IntlMessages from "util/IntlMessages";
import {
  actSaveWebsite,
  actSaveAddress
} from "appRedux/actions/CompanyProfile";
import { connect } from "react-redux";
// import data from "./data";

const formItemLayout = {
  wrapperCol: { xs: 24, sm: 24 }
};
const residences = [
  {
    value: "HA NOI",
    label: "Hà Nội",
    children: [
      {
        value: "dongda",
        label: "Đống Đa"
      },
      {
        value: "caugiay",
        label: "Cầu giấy"
      },
      {
        value: "hoangmai",
        label: "Hoàng Mai"
      }
    ]
  },
  {
    value: "Ho Chi Minh",
    label: "Hồ Chí Minh",
    children: [
      {
        value: "quan1",
        label: "Quận 1"
      },
      {
        value: "quan2",
        label: "Quận 2"
      }
    ]
  }
];
const FormItem = Form.Item;
const { Option } = Select;
const selectBefore = (
  <Select defaultValue="Http://" style={{ width: 90 }}>
    <Option value="Http://">Http://</Option>
    <Option value="Https://">Https://</Option>
  </Select>
);

class Info extends React.Component {
  state = {
    stt_website: false,
    loading: false,
    stt_address: false,
    website: {
      company_website: null
    },
    address: {
      company_district: null,
      company_address: null,
      company_city: null,
      company_nation: null
    },
    districtUpdate: null,
    addressUpdate: null,
    cityUpdate: null,
    nationUpdate: null
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState(
          {
            address: {
              company_district: values.company_district[1],
              company_address: values.company_address,
              company_city: values.company_district[0],
              company_nation: values.company_nation
            },
            loading: true
          },
          () => this.props.actSaveDataAddress(this.state.address)
        );
        setTimeout(() => {
          this.setState(
            {
              stt_address: false,
              loading: false
            }
            // () => this.props.actSendRequestToServer(this.state.requestChange)
          );
          notiChange("success", "Send message success!");
        }, 1500);
      }
    });
  };

  handleOk = e => {
    this.setState({
      stt_address: false
    });
  };

  handleCancel = e => {
    this.setState({
      stt_address: false
    });
  };

  changeWebsiteToEdit = () => {
    if (this.state.stt_website === true) {
      this.setState({ stt_website: false });
    }
    if (this.state.stt_website === false) this.setState({ stt_website: true });
  };

  changeAddressToEdit = () => {
    if (this.state.stt_address === false) this.setState({ stt_address: true });
  };

  onChangeInput = event => {
    let target = event.target;
    let value = target.value;
    this.setState({
      website: {
        company_website: value
      }
    });
  };

  onChangeAddress = e => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value
    });
  };

  onSaveData = () => {
    let { profile } = this.props.profile;
    let websiteResult = this.state.website.company_website
      ? this.state.website
      : profile.company_website;
    this.props.actSaveData(websiteResult);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let { profile } = this.props.profile;
    let bussLength = null;
    if (profile.company_business) {
      bussLength = profile.company_business.length - 1;
    }
    let src = `https://${
      this.state.website ? this.state.website : profile.company_website
    }`;
    return (
      <div className="p-t-4">
        <h3>{profile.company_brandname}</h3>
        <h2 className="text-trans-upper">{profile.company_name}</h2>
        <Row>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <h5 className=" gx-text-grey ">
              <Icon type="appstore" className="p-r-3" />
              {profile.company_business.map((buss, index) => {
                if (index === bussLength) {
                  return <span>{buss}...</span>;
                } else {
                  return <span>{buss}, </span>;
                }
              })}
            </h5>
          </Col>
          <Col
            style={{ display: "flex" }}
            xl={12}
            lg={12}
            md={12}
            sm={24}
            xs={24}
          >
            <h5 className=" gx-text-grey">
              <Icon type="environment" className="p-r-3" />
              {this.state.address.company_city
                ? this.state.address.company_city
                : profile.company_city}
              ,{" "}
              {this.state.address.company_nation
                ? this.state.address.company_nation
                : profile.company_nation}
            </h5>
            <div className="m-l-1" onClick={() => this.changeAddressToEdit()}>
              {this.state.stt_address === false ? (
                <Icon
                  type="edit"
                  className="gx-link cursor-pointer cursor-pointer--zoom"
                />
              ) : (
                <Icon
                  // onClick={() => this.onSaveData()}
                  className=" gx-link size-4 cursor-pointer cursor-pointer--zoom"
                  type="check-circle"
                />
              )}
              <Modal
                className="w-50-i"
                title={
                  <IntlMessages id="account.profile.edit.information.address.update" />
                }
                visible={this.state.stt_address}
                onCancel={this.handleCancel}
                footer={null}
              >
                <div style={{ padding: "0 50px" }}>
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
                          <IntlMessages id="account.profile.edit.information.address.update.companynation" />
                        </p>
                      </Col>
                      <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <FormItem {...formItemLayout}>
                          {getFieldDecorator("company_nation", {
                            rules: [
                              {
                                required: true,
                                message: (
                                  <IntlMessages id="account.profile.edit.information.address.update.companynation.msg.error" />
                                )
                              }
                            ]
                          })(
                            <Select
                              // name="nationUpdate"
                              // onChange={this.onChangeAddress}
                              placeholder={
                                <IntlMessages id="account.profile.edit.information.address.update.companynation" />
                              }
                            >
                              <Option value="VN">Việt Nam</Option>
                              <Option value="USA">America</Option>
                              <Option value="RUS">Russia</Option>
                              <Option value="KR">Korea</Option>
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
                        <p className="text-align-right">
                          <IntlMessages id="account.profile.edit.information.address.update.companydistrict" />
                        </p>
                      </Col>
                      <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <FormItem {...formItemLayout}>
                          {getFieldDecorator("company_district", {
                            rules: [
                              {
                                required: true,
                                message: (
                                  <IntlMessages id="account.profile.edit.information.address.update.companydistrict.msg.error" />
                                )
                              }
                            ]
                          })(
                            <Cascader
                              placeholder="District"
                              options={residences}
                            />
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
                        <p className="text-align-right">
                          <IntlMessages id="account.profile.edit.information.address.update.companyaddress" />
                        </p>
                      </Col>
                      <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <FormItem {...formItemLayout}>
                          {getFieldDecorator("company_address", {
                            rules: [
                              {
                                required: true,
                                message: (
                                  <IntlMessages id="account.profile.edit.information.address.update.companyaddress.msg.error" />
                                )
                              }
                            ]
                          })(
                            <Input
                              placeholder="Address"
                              // name="addressUpdate"
                              // onChange={this.onChangeAddress}
                            />
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                    <div
                      className=" d-flex m-t-2"
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
                        <IntlMessages id="general.btn.cancel" />
                      </Button>
                      <Button
                        loading={this.state.loading ? true : false}
                        htmlType="submit"
                        type="primary"
                        style={{ marginBottom: "0 !important" }}
                      >
                        <IntlMessages id="general.btn.confirm" />
                      </Button>
                    </div>
                  </Form>
                </div>
              </Modal>
            </div>
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <h5 className=" gx-text-grey d-block  d-flex align-items-center">
              <Icon type="global" className="p-r-3" />
              {this.state.stt_website === false ? (
                <a
                  href={src}
                  className="d-inline-block"
                  title={
                    this.state.website.company_website
                      ? this.state.website.company_website
                      : profile.company_website
                  }
                >
                  {this.state.website.company_website
                    ? this.state.website.company_website
                    : profile.company_website}
                </a>
              ) : (
                <Input
                  onChange={this.onChangeInput}
                  addonBefore={selectBefore}
                  size="small"
                  className="d-inline-block w-65-i"
                  defaultValue={
                    this.state.website.company_website
                      ? this.state.website.company_website
                      : profile.company_website
                  }
                />
              )}
              <span
                className="d-inline-block m-l-1  gx-text-primary"
                onClick={() => this.changeWebsiteToEdit()}
              >
                {this.state.stt_website === false ? (
                  <Icon
                    type="edit"
                    className="cursor-pointer cursor-pointer--zoom"
                  />
                ) : (
                  <Icon
                    onClick={() => this.onSaveData()}
                    className="size-4 cursor-pointer cursor-pointer--zoom"
                    type="check-circle"
                  />
                )}
              </span>
            </h5>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    actSaveData: intro => {
      dispatch(actSaveWebsite(intro));
    },
    actSaveDataAddress: address => {
      dispatch(actSaveAddress(address));
    }
  };
};

const WrappedHorizontalLoginForm = Form.create()(Info);

export default connect(null, mapDispatchToProps)(WrappedHorizontalLoginForm);
