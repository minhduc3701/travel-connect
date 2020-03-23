import React, { Component } from "react";
import {
  Col,
  Input,
  // Divider,
  Icon,
  Form,
  Row,
  Radio,
  Select,
  Button,
  DatePicker,
  Upload,
  Tooltip
} from "antd";
import { connect } from "react-redux";
import { actUpdateUserRequest } from "appRedux/actions/User";
// import { CallApi_USER } from "util/CallApi";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import { Redirect } from "react-router-dom";
import { SendDataUserSDK } from "appRedux/actions/CompanyProfile";
import firebase from "firebase/firebaseAcc";
import IntlMessages from "util/IntlMessages";
import { HOME } from "components/Layout/Header/NavigateLink";
import PlacesAutocomplete from "react-places-autocomplete";
import Image from "assets/images/character-illustration-people-with-packages-shipment_53876-59858.jpg";
import { nation } from "./data";

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: { xs: 24, sm: 6 },
  wrapperCol: { xs: 24, sm: 18 }
};

class Personal extends Component {
  state = {
    person: {
      logo: null,
      name: null,
      birth: null,
      gender: null,
      phone: null,
      nation: null,
      city: null,
      district: null,
      address: null
    },
    birth: "",
    fileList: [],
    uploading: false,
    progress: 25,
    step: 1,
    visible: true,
    redirect: false,
    personPick: true,
    companyPick: true,
    company: null,
    companySelect: false,
    typeAccount: null,
    link: null,
    loading: false,
    imageUrl: "",
    address: ""
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        visible: false
      });
    }, 3000);
  }

  onChosePerson = () => {
    this.setState({
      personPick: false,
      companyPick: true
    });
  };

  onChoseCompany = () => {
    this.setState({
      companyPick: false,
      personPick: true
    });
  };

  onChange = (date, dateString) => {
    this.setState({ birth: dateString });
  };

  handleSubmit = e => {
    let uId = JSON.parse(localStorage.getItem("user_info"));
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let logo = values.user_logo ? values.user_logo : uId.user_logo;
        let birth = this.state.birth;
        this.setState(
          {
            person: {
              logo: logo,
              name: values.user_name,
              gender: values.user_gender,
              birth: birth,
              phone: values.user_phone,
              nation: values.user_nation,
              city: values.user_nation,
              district: this.state.address,
              address: values.user_address
            }
          },
          () => this.onSendDataToServer(this.state.fileList)
        );
      }
    });
  };

  onChoseCompany = e => {
    this.setState({
      company: e
    });
  };

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  onSendDataToServer = async file => {
    let user_info = JSON.parse(localStorage.getItem("user_info"));
    await this.props.onSendDataUserSDK(this.state.person);
    if (user_info.company_id === "") {
      this.setState({
        companySelect: true
      });
    } else {
      window.location.href = `${HOME}/home`;
    }
  };

  onChangeRadio = e => {
    this.setState({
      typeAccount: e.target.value
    });
  };

  onUpload = () => {
    let user_info = JSON.parse(localStorage.getItem("user_info"));
    firebase
      .storage()
      .ref(`/${user_info.user_id}/${Date.now().toString()}`)
      .put(this.state.fileList[0])
      .then(res => {
        if (res) {
          firebase
            .storage()
            .ref(res.metadata.fullPath)
            .getDownloadURL()
            .then(url => {
              firebase
                .firestore()
                .collection("users")
                .doc(user_info.user_id)
                .update({
                  imageUrl: url
                });
            });
        }
      })
      .catch(err => {
        console.log(err);
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
  render() {
    const { getFieldDecorator } = this.props.form;
    let { fileList } = this.state;
    let userInfo = JSON.parse(localStorage.getItem("user_info"));
    const props = {
      multiple: false,
      listType: "picture",
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
          fileList: [file]
        }));
        return false;
      },
      fileList
    };

    return (
      <div className="block_shadow">
        {this.state.companySelect ? (
          <Redirect to={`/${this.state.typeAccount}`} />
        ) : (
          userInfo.company_id !== "" && <Redirect to="/dashboard" />
        )}
        <WidgetHeader
          title={
            <IntlMessages id="home.settings.privacy.settings.viewmyprofile" />
          }
        />
        <Row className="p-v-6">
          <Col xl={8} lg={8} md={8} sm={24} xs={24}>
            <div style={{ padding: "1em" }}>
              <h4 className="m-b-5">
                {" "}
                <IntlMessages id="account.complete.profile.guide.title" />:{" "}
              </h4>
              <p>
                <Icon type="check-circle" />{" "}
                <IntlMessages id="account.complete.profile.guide.avatar" />
              </p>
              <p>
                <Icon type="check-circle" />{" "}
                <IntlMessages id="account.complete.profile.guide.name" />
              </p>
              <p>
                <Icon type="check-circle" />{" "}
                <IntlMessages id="account.complete.profile.guide.gender" />
              </p>
              <p>
                <Icon type="check-circle" />{" "}
                <IntlMessages id="account.complete.profile.guide.phone" />
              </p>
              <p>
                <Icon type="check-circle" />{" "}
                <IntlMessages id="account.complete.profile.guide.nation" />
              </p>
              <p>
                <Icon type="check-circle" />{" "}
                <IntlMessages id="account.complete.profile.guide.district" />
              </p>
              <p>
                <Icon type="check-circle" />{" "}
                <IntlMessages id="account.complete.profile.guide.address" />
              </p>
              <img src={Image} alt="Travel Connect" />
            </div>
          </Col>
          <Col xl={16} lg={16} md={16} sm={24} xs={24}>
            <Form
              action="/complete-profile/activity"
              onSubmit={this.handleSubmit}
              style={{ borderLeft: "1px solid #00000020" }}
            >
              {/* Avatar */}
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="home.settings.general.avatar" />}
              >
                {getFieldDecorator("user_logo", {
                  valuePropName: "fileList1",
                  getValueFromEvent: this.normFile
                })(
                  <Upload customRequest={this.customUpload} {...props}>
                    <Button className="m-0-i">
                      <Icon type="upload" /> <IntlMessages id="clickToUpload" />
                    </Button>
                  </Upload>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="employee.name" />}
              >
                {getFieldDecorator("user_name", {
                  rules: [
                    {
                      required: true,
                      message: <IntlMessages id="rule.name.text" />
                    }
                  ],
                  initialValue: userInfo.user_name
                })(<Input placeholder="Name" />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="listTravelers.birthDay" />}
              >
                {getFieldDecorator("user_birth", {
                  rules: [
                    {
                      required: true,
                      message: <IntlMessages id="rule.birth.text" />
                    }
                  ]
                })(
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder="Birthday"
                    onChange={this.onChange}
                  />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="home.settings.general.gender" />}
              >
                {getFieldDecorator("user_gender", {
                  rules: [
                    {
                      required: true,
                      message: <IntlMessages id="rule.gender.text" />
                    }
                  ]
                })(
                  <Select placeholder="Gender">
                    <Option value="male">
                      <IntlMessages id="male" />
                    </Option>
                    <Option value="female">
                      <IntlMessages id="female" />
                    </Option>
                    <Option value="other">
                      <IntlMessages id="other" />
                    </Option>
                  </Select>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="home.settings.general.tel" />}
              >
                {getFieldDecorator("user_phone", {
                  rules: [
                    {
                      required: true,
                      message: <IntlMessages id="rule.phone.text" />,
                      min: 7,
                      max: 20
                    }
                  ]
                })(<Input name="telephone" placeholder="Phone number" />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={
                  <IntlMessages id="account.profile.edit.information.address.update.companynation" />
                }
              >
                {getFieldDecorator("user_nation", {
                  rules: [
                    {
                      required: true,
                      message: <IntlMessages id="rule.nation.text" />
                    }
                  ]
                })(
                  <Select name="national" showSearch placeholder="Nation">
                    {nation.map((item, index) => {
                      return (
                        <Option key={index} value={item.code}>
                          {item.name}
                        </Option>
                      );
                    })}
                    {/* <Option value="VN">
                      <IntlMessages id="nation.vietnam" />
                    </Option>
                    <Option value="JP">
                      <IntlMessages id="nation.japan" />
                    </Option>
                    <Option value="CN">
                      <IntlMessages id="nation.china" />
                    </Option>
                    <Option value="KR">
                      <IntlMessages id="nation.korea" />
                    </Option> */}
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
                    <div className="m-b-2">
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
                {getFieldDecorator("user_address", {
                  rules: [
                    {
                      required: true,
                      message: <IntlMessages id="rule.address.text" />
                    }
                  ]
                })(<Input name="address" placeholder="Address" />)}
              </FormItem>
              {userInfo.company_id === "" ? (
                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="account.complete.profile.type" />}
                >
                  <Radio.Group onChange={this.onChangeRadio}>
                    <Tooltip
                      title={
                        <IntlMessages id="account.complete.profile.type.personal.text" />
                      }
                    >
                      <Radio value="personal">
                        <IntlMessages id="account.complete.profile.type.personal" />
                      </Radio>
                    </Tooltip>
                    <br />
                    <Tooltip
                      title={
                        <IntlMessages id="account.complete.profile.type.company.text" />
                      }
                    >
                      <Radio value="create-company">
                        <IntlMessages id="account.complete.profile.type.company" />
                      </Radio>
                    </Tooltip>
                  </Radio.Group>
                </FormItem>
              ) : null}
              <div
                className=" d-flex"
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
              >
                {userInfo.company_id === "" ? (
                  <Button
                    disabled={this.state.typeAccount ? false : true}
                    style={{ marginLeft: "auto", marginBottom: "0 !important" }}
                    type="primary"
                    htmlType="submit"
                    onClick={() => this.onUpload()}
                  >
                    <IntlMessages id="button.next" />
                  </Button>
                ) : (
                  <Button
                    style={{ marginLeft: "auto", marginBottom: "0 !important" }}
                    type="primary"
                    htmlType="submit"
                    onClick={() => this.onUpload()}
                  >
                    <IntlMessages id="button.next" />
                  </Button>
                )}
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSendDataUser: (user, file) => {
      dispatch(actUpdateUserRequest(user, file));
    },
    onSendDataUserSDK: data => {
      dispatch(SendDataUserSDK(data));
    }
  };
};

const WrappedHorizontalLoginForm = Form.create()(Personal);
export default connect(null, mapDispatchToProps)(WrappedHorizontalLoginForm);
