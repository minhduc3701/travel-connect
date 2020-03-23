import React, { Component } from "react";
import {
  Col,
  Cascader,
  Input,
  Icon,
  Form,
  Row,
  Button,
  Select,
  DatePicker
} from "antd";
import { connect } from "react-redux";
import { actUpdatePersonProfileRequest } from "appRedux/actions/Account";
import {
  CreateCompanySDK,
  PositionUserSDK
} from "appRedux/actions/CompanyProfile";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import firebase from "firebase/firebaseAcc";
import { notificationPop } from "util/Notification";
import IntlMessages from "util/IntlMessages";
import PlacesAutocomplete from "react-places-autocomplete";
import { nation } from "../Personal/data";

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { xs: 24, sm: 6 },
  wrapperCol: { xs: 24, sm: 18 }
};
const Option = Select.Option;
// const residences = [
//   {
//     value: "Hà Nội",
//     label: "Hà Nội",
//     children: [
//       {
//         value: "Đống Đa",
//         label: "Đống Đa"
//       },
//       {
//         value: "Cầu giấy",
//         label: "Cầu giấy"
//       },
//       {
//         value: "Hoàng Mai",
//         label: "Hoàng Mai"
//       }
//     ]
//   },
//   {
//     value: "Hồ Chí Minh",
//     label: "Hồ Chí Minh",
//     children: [
//       {
//         value: "Quận 1",
//         label: "Quận 1"
//       },
//       {
//         value: "Quận 2",
//         label: "Quận 2"
//       }
//     ]
//   }
// ];
const OPTIONS = [
  "Lữ hành quốc tế Outbound",
  "Lữ hành nội địa",
  "Đại lý Du lịch",
  "Vận tải",
  "Hàng không",
  "Cơ sỏ lưu trú",
  "Nhà hàng"
];

class Company extends Component {
  state = {
    progress: 100,
    step: 5,
    typeUser: "1",
    infoPerson: {
      user_position: null,
      infoUnit: null
    },
    business: [],
    establish: null,
    tourGuide: {
      tour_guide_company: null,
      tour_guide_profile: null,
      tour_guide_type: null
    },
    student: {
      student_specialized: null,
      student_info: null,
      student_verify: null
    },
    fileList: [],
    imageFile: false,
    typeAccount: null,
    company: {
      address: null,
      brandname: null,
      city: null,
      confirm: null,
      createdAt: null,
      district: null,
      email: null,
      establish: null,
      licence: null,
      name: null,
      nation: null,
      phone: null,
      target: null,
      licence_file: [],
      business: []
    },
    address: ""
  };
  handleSubmitCompany = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let establish = this.state.establish ? this.state.establish : "";
        this.setState(
          {
            company: {
              address: values.company_address,
              brandname: values.company_brandname,
              city: values.company_district[0],
              confirm: "",
              createdAt: "",
              district: this.state.address,
              email: values.company_email,
              establish: establish,
              licence: "",
              name: values.company_name,
              nation: values.company_nation,
              phone: values.company_phone,
              target: values.company_target,
              licence_file: [],
              business: values.company_business
            }
          },
          () => this.onSendDataPerson()
        );
      }
    });
  };

  handleChange = address => {
    this.setState({ address });
  };
  onDestinationChange = e => {
    this.setState({
      address: e
    });
  };

  onSendDataPerson = async () => {
    await this.props.actCreateCompanySDK(this.state.company);
    this.props.actUpdatePositionSDK();
  };

  onChangeEstablish = (date, dateString) => {
    this.setState({ establish: dateString });
  };

  onSelectType = e => {
    this.setState({
      typeAccount: e
    });
  };

  onUpload = () => {
    let user_info = JSON.parse(localStorage.getItem("user_info"));
    firebase
      .storage()
      .ref(`/${user_info.company_id}/${Date.now().toString()}`)
      .put(this.state.fileList[0])
      .then(res => {
        if (res) {
          firebase
            .firestore()
            .collection("companies")
            .doc(user_info.company_id)
            .update({
              licenceDoc: `${res.metadata.fullPath}`
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let { business } = this.state;
    const filteredOptions = OPTIONS.filter(o => !business.includes(o));
    return (
      <div className="block_shadow">
        <WidgetHeader title={<IntlMessages id="account.personal.title" />} />
        <Row className="p-v-6">
          <Col xl={8} lg={8} md={8} sm={24} xs={24}>
            <div>
              <div>
                <h3 className="m-b-10">
                  <IntlMessages id="cp.company.title" />
                </h3>
                <p>
                  <Icon type="check-circle" />{" "}
                  <IntlMessages id="cp.company.text1" />
                </p>
                <p>
                  <Icon type="check-circle" />{" "}
                  <IntlMessages id="cp.company.text2" />
                </p>
              </div>
            </div>
          </Col>
          <Col xl={16} lg={16} md={16} sm={24} xs={24}>
            <div style={{ borderLeft: "1px solid rgba(0, 0, 0, 0.125)" }}>
              <Form onSubmit={this.handleSubmitCompany}>
                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="cp.company.business" />}
                >
                  {getFieldDecorator("company_business", {
                    rules: [
                      {
                        required: true,
                        message: <IntlMessages id="cp.company.business.rule" />
                      }
                    ]
                  })(
                    <Select
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
                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="companyName" />}
                >
                  {getFieldDecorator("company_name", {
                    rules: [
                      {
                        required: true,
                        message: <IntlMessages id="cp.company.name.rule" />
                      }
                    ]
                  })(<Input placeholder="Tên công ty" />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="brandname" />}
                >
                  {getFieldDecorator("company_brandname", {
                    rules: [
                      {
                        required: true,
                        message: <IntlMessages id="cp.company.brand.rule" />
                      }
                    ]
                  })(<Input placeholder="Tên thương hiệu" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Email">
                  {getFieldDecorator("company_email", {
                    rules: [
                      {
                        type: "email",
                        message: <IntlMessages id="cp.company.email.rule1" />
                      },
                      {
                        required: true,
                        message: <IntlMessages id="cp.company.email.rule2" />
                      }
                    ]
                  })(<Input placeholder="Email" />)}
                </FormItem>
                <FormItem {...formItemLayout} label={<IntlMessages id="tel" />}>
                  {getFieldDecorator("company_phone", {
                    rules: [
                      {
                        required: true,
                        message: <IntlMessages id="cp.company.phone.rule" />,
                        min: 7,
                        max: 20
                      }
                    ]
                  })(<Input placeholder="Số điện thoại" />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={
                    <IntlMessages id="account.profile.edit.information.address.update.companynation" />
                  }
                >
                  {getFieldDecorator("company_nation", {
                    rules: [
                      {
                        required: true,
                        message: <IntlMessages id="cp.company.nation.rule" />
                      }
                    ]
                  })(
                    <Select placeholder="Quốc gia">
                      {nation.map((item, index) => {
                        return (
                          <Option key={index} value={item.code}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={
                    <IntlMessages id="account.profile.edit.information.address.update.companydistrict" />
                  }
                >
                  <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.onDestinationChange}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading
                    }) => (
                      <div>
                        <Input
                          {...getInputProps({
                            placeholder: "District"
                          })}
                        />
                        <div className="ant-select-dropdown-menu  ant-select-dropdown-menu-root ant-select-dropdown-menu-vertical">
                          {loading && <div>Loading...</div>}
                          {suggestions.map(suggestion => {
                            const className = suggestion.active
                              ? "ant-select-dropdown-menu-item"
                              : "ant-select-dropdown-menu-item";
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className
                                  // ,
                                  // style
                                })}
                              >
                                <span>{suggestion.description} </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="step.information.address" />}
                >
                  {getFieldDecorator("company_address", {
                    rules: [
                      {
                        required: true,
                        message: <IntlMessages id="cp.company.address.rule" />
                      }
                    ]
                  })(<Input placeholder="Địa chỉ" />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="step.information.foundingday" />}
                >
                  {getFieldDecorator("company_establish", {
                    rules: [
                      {
                        required: true,
                        message: <IntlMessages id="cp.company.establish.rule" />
                      }
                    ]
                  })(
                    <DatePicker
                      onChange={this.onChangeEstablish}
                      className="gx-w-100"
                      placeholder="Ngày thành lập công ty"
                    />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="cp.company.target" />}
                >
                  {getFieldDecorator("company_target", {
                    rules: [
                      {
                        required: true,
                        message: <IntlMessages id="cp.company.target.rule" />
                      }
                    ]
                  })(<Input placeholder="Thị trường mục tiêu" />)}
                </FormItem>
                <div
                  className=" d-flex"
                  style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "flex-end"
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginBottom: "0 !important" }}
                    onClick={() => this.onUpload()}
                  >
                    <IntlMessages id="button.next" />
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    actSendDataToServer: profile => {
      dispatch(actUpdatePersonProfileRequest(profile));
    },
    actCreateCompanySDK: data => {
      dispatch(CreateCompanySDK(data));
    },
    actUpdatePositionSDK: () => {
      dispatch(PositionUserSDK());
    }
  };
};

const WrappedHorizontalLoginForm = Form.create()(Company);

export default connect(null, mapDispatchToProps)(WrappedHorizontalLoginForm);
