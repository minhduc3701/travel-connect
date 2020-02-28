import React, { Component, Fragment } from "react";
import {
  Col,
  Cascader,
  Input,
  Icon,
  Form,
  Row,
  Button,
  Radio,
  Select,
  Checkbox,
  Upload
} from "antd";
import { connect } from "react-redux";
import { actUpdatePersonProfileRequest } from "appRedux/actions/Account";
import { CreateUserWorkSDK } from "appRedux/actions/CompanyProfile";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import firebase from "firebase/firebaseAcc";
// import { HOME } from "components/Layout/Header/NavigateLink";
import IntlMessages from "util/IntlMessages";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";
import { notificationPop } from "util/Notification";
import { HOME } from "components/Layout/Header/NavigateLink";

const Dragger = Upload.Dragger;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const formItemLayout = {
  labelCol: { xs: 24, sm: 6 },
  wrapperCol: { xs: 24, sm: 18 }
};
const Option = Select.Option;
const { OptGroup } = Select;
const residences = [
  {
    value: "Hà Nội",
    label: "Hà Nội",
    children: [
      {
        value: "Đống Đa",
        label: "Đống Đa"
      },
      {
        value: "Cầu giấy",
        label: "Cầu giấy"
      },
      {
        value: "Hoàng Mai",
        label: "Hoàng Mai"
      }
    ]
  },
  {
    value: "Hồ Chí Minh",
    label: "Hồ Chí Minh",
    children: [
      {
        value: "Quận 1",
        label: "Quận 1"
      },
      {
        value: "Quận 2",
        label: "Quận 2"
      }
    ]
  }
];

class Company extends Component {
  state = {
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
    typeCompany: null,
    FreeLancer: 0,
    notExist: false,
    selectVisible: false,
    visibleSearch: false,
    personAccDetail: null,
    nationSearch: null,
    searchText: null,
    inputDisplay: true,
    companyDetail: null
  };
  handleSubmitPerson = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState(
          {
            personAccDetail: {
              companyName: values.company_name ? values.company_name : "",
              companyBrand: values.company_brandname
                ? values.company_brandname
                : "",
              companyAddress: values.company_address
                ? values.company_address
                : "",
              companyEmail: values.company_email ? values.company_email : "",
              // verifyPerson: values.user_verify ? values.user_verify : "",
              companyBusiness: values.company_business
                ? [values.company_business]
                : "",
              companyPhone: values.company_phone ? [values.company_phone] : "",
              companyHeadquarters: values.company_headquarters
                ? values.company_headquarters
                : "",
              tourGuide: values.tour_guide ? values.tour_guide : "",
              companyNation: values.company_national
                ? values.company_national
                : "",
              interested: values.user_interested ? values.user_interested : "",
              specialized: values.user_specialized
                ? values.user_specialized
                : "",
              companyCity: values.company_district
                ? values.company_district[0]
                : "",
              companyDistrict: values.company_district
                ? values.company_district[1]
                : "",
              position: values.user_position ? values.user_position : "",
              type: this.state.typeAccount
            }
          },
          () => this.onSendDataPerson()
        );
      }
    });
  };

  handleSubmitUserCompany = e => {
    e.preventDefault();
    let uId = JSON.parse(localStorage.getItem("user_info"));
    this.props.form.validateFields((err, values) => {
      if (!err) {
        firebase
          .firestore()
          .collection("users")
          .doc(uId.user_id)
          .update({
            position: values.user_position,
            companyAddress: this.state.companyDetail.company_address,
            companyBrand: this.state.companyDetail.company_brandname,
            companyBusiness: this.state.companyDetail.company_business,
            companyCity: this.state.companyDetail.company_city,
            companyDistrict: this.state.companyDetail.company_district,
            companyName: this.state.companyDetail.company_name,
            companyNation: this.state.companyDetail.company_national,
            companyId: this.state.companyDetail.company_id,
            companyLogo: this.state.companyDetail.company_logo,
            status: ""
          })
          .then(res => {
            notificationPop(
              "success",
              "Bổ sung thông tin thành công!",
              "Thông tin công việc của bạn đã được thêm thành công, Công ty bạn làm việc nhận được thống báo!"
            );
          })
          .then(ress => {
            window.location.href = `${HOME}/home`;
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };
  handleSubmitOtherCompany = e => {
    e.preventDefault();
    let uId = JSON.parse(localStorage.getItem("user_info"));
    this.props.form.validateFields((err, values) => {
      if (!err) {
        firebase
          .app("FirebaseApp")
          .firestore()
          .collection("units")
          .add({
            position: values.user_position,
            address: values.company_address,
            brandname: values.company_brandname,
            business: values.company_business,
            city: values.company_district[0],
            district: values.company_district[1],
            name: values.company_name,
            nation: values.company_national,
            email: values.company_email,
            phone: values.company_phone
          });

        firebase
          .firestore()
          .collection("users")
          .doc(uId.user_id)
          .update({
            position: values.user_position,
            companyAddress: values.company_address,
            companyBrand: values.company_brandname,
            companyBusiness: values.company_business,
            companyCity: values.company_district[0],
            companyDistrict: values.company_district[1],
            companyName: values.company_name,
            companyNation: values.company_national,
            status: ""
          })
          .then(res => {
            notificationPop(
              "success",
              "Bổ sung thông tin thành công!",
              "Thông tin công việc của bạn đã được thêm thành công, Công ty bạn làm việc nhận được thống báo!"
            );
          })
          .then(ress => {
            window.location.href = `${HOME}/home`;
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  onSendDataPerson = async () => {
    await this.props.actSendDataCompanyUser(this.state.personAccDetail);
  };

  onSelectType = e => {
    this.setState({
      typeAccount: e
    });
  };

  onChoseCompany = e => {
    this.setState({
      typeCompany: e
    });
  };
  onNotExist = e => {
    this.setState({
      notExist: !this.state.notExist,
      visibleSearch: !this.state.visibleSearch
    });
  };

  onChangeFreeLancer = e => {
    this.setState({
      FreeLancer: e.target.value
    });
  };

  onOtherCompany = () => {
    this.setState({
      notExist: !this.state.notExist,
      selectVisible: !this.state.selectVisible,
      visibleSearch: !this.state.visibleSearch
    });
  };

  onChoiseNation = e => {
    this.setState({
      nationSearch: e,
      inputDisplay: false
    });
  };

  onUploadImage = () => {
    let user_info = JSON.parse(localStorage.getItem("user_info"));
    this.state.fileList.forEach(fileItem => {
      firebase
        .storage()
        .ref(`/${user_info.user_id}/${Date.now().toString()}`)
        .put(fileItem)
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
                    verifyPerson: firebase.firestore.FieldValue.arrayUnion(url)
                  });
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  onTextFind = e => {
    this.setState({
      // searchText: e
      searchText: e.target.value
    });
  };

  onChoiseCompany = detail => {
    this.setState({
      companyDetail: detail,
      searchText: "",
      visibleSearch: true
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let { fileList } = this.state;
    let cList = [];
    isLoaded(this.props.companyList) &&
      this.props.companyList.forEach(doc => {
        if (this.state.nationSearch && this.state.nationSearch === doc.nation) {
          cList.push({
            company_id: doc.id,
            company_name: doc.name,
            company_brandname: doc.brandname,
            company_address: doc.address,
            company_license: doc.license,
            company_business: doc.companyBusiness,
            company_city: doc.companyCity,
            company_district: doc.companyDistrict,
            company_logo: doc.companyLogo,
            company_national: doc.companyNation
          });
        }
      });
    const props = {
      multiple: true,
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
          // fileList: file
          fileList: [...state.fileList, file]
        }));
        return false;
      },
      fileList
    };
    let filterCompany = cList.filter(company => {
      return company.company_name.indexOf(this.state.searchText) !== -1;
    });

    return (
      <div className="block-w bor-rad-6">
        <WidgetHeader title={<IntlMessages id="account.personal.title" />} />
        <Row className="p-v-6">
          <Col xl={8} lg={8} md={8} sm={24} xs={24}>
            <div>
              <div>
                <h3 style={{ fontSize: "1rem" }} className="m-b-10">
                  <IntlMessages id="account.personal.detail" />
                </h3>
                <p>
                  {" "}
                  <IntlMessages id="account.complete.profile.guide.title" /> :{" "}
                </p>
                <p>
                  <Icon type="check-circle" />{" "}
                  <IntlMessages id="account.personal.company" />
                </p>
                <p>
                  <Icon type="check-circle" />{" "}
                  <IntlMessages id="account.personal.position" />
                </p>
                <p>
                  <Icon type="check-circle" />{" "}
                  <IntlMessages id="account.personal.verify" />
                </p>
              </div>
              {this.state.typeAccount === "social" ? (
                <div>
                  <h3 className=" m-v-5">
                    <IntlMessages id="account.personal.Described" />{" "}
                  </h3>
                  <p>Bạn đang làm việc tại các tổ chức xã hội và du lịch</p>
                  <p style={{ fontStyle: "italic" }}>
                    Bao gồm: Hiệp hội Du lịch, Câu lạc bộ, Chi hội Du lịch.
                  </p>
                </div>
              ) : null}
              {this.state.typeAccount === "journalist" ? (
                <div>
                  <h3 className=" m-v-5">
                    <IntlMessages id="account.personal.Described" />{" "}
                  </h3>
                  <p>Bạn đang làm việc tại các đơn vị báo chí</p>
                  <p style={{ fontStyle: "italic" }}>
                    Bao gồm: Các nhà báo, phóng viên, biên tập viên của các tòa
                    soạn.
                  </p>
                </div>
              ) : null}
              {this.state.typeAccount === "government" ? (
                <div>
                  <h3 className=" m-v-5">
                    <IntlMessages id="account.personal.Described" />{" "}
                  </h3>
                  <p>Bạn đang làm việc tại các cơ quan quản lý nhà nước</p>
                  <p style={{ fontStyle: "italic" }}>
                    Bao gồm: Tổng cục Du lịch, Sở Văn hóa thông tin và Du lịch,
                    Trung tâm xúc tiến Du lịch.
                  </p>
                </div>
              ) : null}
              {this.state.typeAccount === "embassy" ? (
                <div>
                  <h3 className=" m-v-5">
                    <IntlMessages id="account.personal.Described" />{" "}
                  </h3>
                  <p>Bạn đang làm việc tại Đại sứ quán/Lãnh sự quán</p>
                  <p style={{ fontStyle: "italic" }}>
                    Bao gồm: Tổng cục Du lịch, Sở Văn hóa thông tin và Du lịch,
                    Trung tâm xúc tiến Du lịch.
                  </p>
                </div>
              ) : null}
              {this.state.typeAccount === "tourguide" ? (
                <div>
                  <h3 className=" m-v-5">
                    <IntlMessages id="account.personal.Described" />{" "}
                  </h3>
                  <p>Bạn là hướng dẫn viên du lịch</p>
                  <p style={{ fontStyle: "italic" }}>
                    Bao gồm: Các hướng dẫn viên trong và ngoài nước được cấp
                    giấy phép hoạt động.
                  </p>
                </div>
              ) : null}
              {this.state.typeAccount === "student" ? (
                <div>
                  <h3 className=" m-v-5">
                    <IntlMessages id="account.personal.Described" />{" "}
                  </h3>
                  <p>Bạn là sinh viên ngành du lịch</p>
                  <p style={{ fontStyle: "italic" }}>
                    Bao gồm: Sinh viên các trường đại học, cao đẳng, trung cấp
                    nghề về lĩnh vực Du lịch và Khách sạn.
                  </p>
                </div>
              ) : null}
              {this.state.typeAccount === "company" ? (
                <div>
                  <h3 className=" m-v-5">
                    <IntlMessages id="account.personal.Described" />{" "}
                  </h3>
                  <p>Bạn đang làm việc tại công ty, doanh nghiệp du lịch</p>
                  <p style={{ fontStyle: "italic" }}>
                    <Icon type="check-circle" style={{ marginRight: 5 }} />
                    Tham gia các hoạt động, mua bán, sự kiện trên sàn.
                  </p>
                  <p style={{ fontStyle: "italic" }}>
                    <Icon type="check-circle" style={{ marginRight: 5 }} />
                    Yêu cầu có giấy phép hoạt động kinh doanh, chứng nhận,..
                  </p>
                </div>
              ) : null}
            </div>
          </Col>
          <Col
            style={{ borderLeft: "1px solid rgba(0, 0, 0, 0.125)" }}
            xl={16}
            lg={16}
            md={16}
            sm={24}
            xs={24}
          >
            <div
              style={{
                paddingBottom: "1em"
              }}
            >
              <Form>
                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="account.personal.select" />}
                >
                  <Select
                    placeholder="Select working unit"
                    onChange={this.onSelectType}
                    style={{ width: "100%" }}
                  >
                    <OptGroup
                      label={
                        <IntlMessages id="home.settings.notification.whatreceive.company" />
                      }
                    >
                      <Option value="company">
                        <IntlMessages id="account.personal.select.company" />
                      </Option>
                    </OptGroup>
                    <OptGroup
                      label={
                        <IntlMessages id="account.personal.special.unit" />
                      }
                    >
                      <Option value="social">
                        <IntlMessages id="account.personal.select.social" />
                      </Option>
                      <Option value="journalist">
                        <IntlMessages id="account.personal.select.journalist" />
                      </Option>
                      <Option value="government">
                        <IntlMessages id="account.personal.select.government" />
                      </Option>
                      <Option value="embassy">
                        <IntlMessages id="account.personal.select.embassy" />
                      </Option>
                    </OptGroup>
                    <OptGroup label={<IntlMessages id="other" />}>
                      <Option value="tourguide">
                        <IntlMessages id="account.personal.select.tourguide" />
                      </Option>
                      <Option value="student">
                        <IntlMessages id="account.personal.select.studen" />
                      </Option>
                    </OptGroup>
                  </Select>
                </FormItem>
              </Form>
            </div>

            <div style={{ paddingTop: "2em" }}>
              {this.state.typeAccount === "company" ? (
                <Fragment>
                  <Form>
                    <FormItem
                      {...formItemLayout}
                      label={
                        <IntlMessages id="account.profile.edit.information.address.update.companynation" />
                      }
                    >
                      {getFieldDecorator("company_national", {
                        rules: [
                          {
                            required: true,
                            message: <IntlMessages id="rule.nation.text" />
                          }
                        ]
                      })(
                        <Select
                          placeholder="Quốc gia"
                          disabled={this.state.visibleSearch}
                          defaultValue="VN"
                          onChange={this.onChoiseNation}
                          style={{ width: "100%" }}
                        >
                          <OptGroup label={<IntlMessages id="asian" />}>
                            <Option value="VN">
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
                            </Option>
                          </OptGroup>
                          <OptGroup label={<IntlMessages id="Europe" />}>
                            <Option value="ENG">
                              <IntlMessages id="nation.england" />
                            </Option>
                          </OptGroup>
                          <OptGroup label={<IntlMessages id="Americas" />}>
                            <Option value="USA">
                              <IntlMessages id="nation.america" />
                            </Option>
                          </OptGroup>
                        </Select>
                      )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Công ty: ">
                      <Fragment>
                        <InputGroup compact>
                          <Select
                            disabled={this.state.visibleSearch}
                            style={{ width: "30%" }}
                            defaultValue="name"
                          >
                            <Option value="name">Tên công ty</Option>
                            <Option value="code">Mã số thuế</Option>
                          </Select>
                          {getFieldDecorator("company_detail", {
                            rules: [
                              {
                                required: true,
                                message: "Enter your company detail!"
                              }
                            ]
                          })(
                            <Input
                              disabled={
                                this.state.inputDisplay ||
                                this.state.visibleSearch
                              }
                              style={{ width: "50%" }}
                              onChange={this.onTextFind}
                            />
                          )}

                          <Button
                            disabled={this.state.visibleSearch}
                            style={{ width: "20%", margin: 0 }}
                            type="primary"
                            htmlType="submit"
                          >
                            Tìm kiếm
                          </Button>
                        </InputGroup>
                        {this.state.searchText === "" ||
                        filterCompany.length < 1 ? (
                          <p className="gx-link" onClick={this.onNotExist}>
                            Công ty tôi làm việc chưa tồn tại trên Travel
                            Connect
                          </p>
                        ) : null}
                        <ul>
                          {filterCompany.length > 0 &&
                          this.state.searchText !== ""
                            ? filterCompany.map((item, index) => {
                                return (
                                  <li
                                    className="gx-link"
                                    onClick={() => this.onChoiseCompany(item)}
                                    key={index}
                                  >
                                    {item.company_name}
                                  </li>
                                );
                              })
                            : null}
                        </ul>
                      </Fragment>
                    </FormItem>
                  </Form>
                  {this.state.companyDetail && this.state.notExist === false ? (
                    <div>
                      <Form onSubmit={this.handleSubmitPerson}>
                        <FormItem {...formItemLayout} label="Chức vụ bản thân">
                          {getFieldDecorator("user_position", {
                            rules: [
                              {
                                required: true,
                                message: "Enter your position!"
                              }
                            ]
                          })(<Input placeholder="Chức vụ" />)}
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
                          >
                            Next
                          </Button>
                        </div>
                      </Form>
                    </div>
                  ) : null}
                  {this.state.notExist ? (
                    <div>
                      <Form onSubmit={this.handleSubmitOtherCompany}>
                        <FormItem {...formItemLayout} label="Tên đơn vị">
                          {getFieldDecorator("company_name", {
                            rules: [
                              {
                                required: true,
                                message: "Enter your company name!"
                              }
                            ]
                          })(<Input placeholder="Tên đơn vị" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Tên thương hiệu">
                          {getFieldDecorator("company_brandname", {
                            rules: [
                              {
                                required: true,
                                message: "Enter your company brand!"
                              }
                            ]
                          })(<Input placeholder="Tên thương hiệu" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Chức vụ bản thân">
                          {getFieldDecorator("user_position", {
                            rules: [
                              {
                                required: true,
                                message: "Enter your position!"
                              }
                            ]
                          })(<Input placeholder="Chức vụ" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Email">
                          {getFieldDecorator("company_email", {
                            rules: [
                              {
                                required: true,
                                message: "Enter your email!"
                              }
                            ]
                          })(<Input placeholder="Email" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Số điện thoại">
                          {getFieldDecorator("company_phone", {
                            rules: [
                              {
                                required: true,
                                message: "Enter your phone number!"
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
                                message: <IntlMessages id="rule.nation.text" />
                              }
                            ]
                          })(
                            <Select
                              name="national"
                              showSearch
                              placeholder="Quốc gia"
                            >
                              <Option value="VN">
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
                              </Option>
                            </Select>
                          )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Quận/ Huyện">
                          {getFieldDecorator("company_district", {
                            rules: [
                              {
                                required: true,
                                message: "Select your district!"
                              }
                            ]
                          })(
                            <Cascader
                              placeholder="Quận/ Huyện"
                              options={residences}
                            />
                          )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Địa chỉ">
                          {getFieldDecorator("company_address", {
                            rules: [
                              {
                                required: true,
                                message: "Enter your address!"
                              }
                            ]
                          })(<Input placeholder="Địa chỉ" />)}
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
                          >
                            Next
                          </Button>
                        </div>
                      </Form>
                    </div>
                  ) : null}
                </Fragment>
              ) : null}
              {this.state.typeAccount === "social" ? (
                <div>
                  <Form onSubmit={this.handleSubmitPerson}>
                    <FormItem {...formItemLayout} label="Tên tổ chức:">
                      {getFieldDecorator("company_name", {
                        rules: [
                          {
                            required: true,
                            message: "Enter your company name!"
                          }
                        ]
                      })(<Input placeholder="Tên tổ chức" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Địa chỉ:">
                      {getFieldDecorator("company_address", {
                        rules: [
                          {
                            required: true,
                            message: "Enter your company address!"
                          }
                        ]
                      })(<Input placeholder="Địa chỉ" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Email liên hệ:">
                      {getFieldDecorator("company_email", {
                        rules: [
                          {
                            required: true,
                            message: "Enter your company email!"
                          }
                        ]
                      })(<Input placeholder="Email" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Chức vụ của bạn:">
                      {getFieldDecorator("user_position", {
                        rules: [
                          {
                            required: true,
                            message: "Enter your company position!"
                          }
                        ]
                      })(<Input placeholder="Chức vụ" />)}
                    </FormItem>
                    <div
                      className=" d-flex"
                      style={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "flex-end"
                      }}
                    >
                      {/* <Button
                    onClick={this.onBack}
                    style={{ marginBottom: "0 !important" }}
                  >
                    Return
                  </Button> */}
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                          marginLeft: "auto",
                          marginBottom: "0 !important"
                        }}
                      >
                        Next
                      </Button>
                    </div>
                  </Form>
                </div>
              ) : null}
              {this.state.typeAccount === "journalist" ? (
                <div>
                  <Form onSubmit={this.handleSubmitPerson}>
                    <FormItem {...formItemLayout} label="Tên đơn vị:">
                      {getFieldDecorator("company_name", {
                        rules: [
                          {
                            required: true,
                            message: "Enter your company name!"
                          }
                        ]
                      })(<Input placeholder="Tên đơn vị" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Địa chỉ:">
                      {getFieldDecorator("company_address", {
                        rules: [
                          {
                            required: true,
                            message: "Enter your company address!"
                          }
                        ]
                      })(<Input placeholder="Địa chỉ" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Email liên hệ:">
                      {getFieldDecorator("company_email", {
                        rules: [
                          {
                            required: true,
                            message: "Enter your company email!"
                          }
                        ]
                      })(<Input placeholder="Email" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Chức vụ của bạn:">
                      {getFieldDecorator("user_position", {
                        rules: [
                          {
                            required: true,
                            message: "Enter your company position!"
                          }
                        ]
                      })(<Input placeholder="Chức vụ" />)}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      // onClick={() => this.onIncludeImage()}
                      label="Thông tin xác minh:"
                    >
                      {getFieldDecorator("user_verify", {
                        valuePropName: "fileList",
                        getValueFromEvent: this.normFile,
                        rules: [
                          {
                            required: true,
                            message: "Upload your infomation to verify!"
                          }
                        ]
                      })(
                        <Dragger {...props}>
                          <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                          </p>
                          <p className="ant-upload-text">
                            Click hoặc kéo thả file tại khu vực này
                          </p>
                          {this.state.fileList.length < 1 ? (
                            <p className="ant-upload-hint">
                              Cập nhật/Upload giấy tờ xác thực cá nhân như chứng
                              minh thư, thẻ sinh viên,...
                            </p>
                          ) : (
                            ""
                          )}
                        </Dragger>
                      )}
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
                        style={{
                          marginLeft: "auto",
                          marginBottom: "0 !important"
                        }}
                        onClick={() => this.onUploadImage()}
                      >
                        Next
                      </Button>
                    </div>
                  </Form>
                </div>
              ) : null}
              {this.state.typeAccount === "government" ? (
                <div>
                  <Form onSubmit={this.handleSubmitPerson}>
                    <FormItem {...formItemLayout} label="Tên cơ quan:">
                      {getFieldDecorator("company_name", {
                        rules: [
                          {
                            required: true,
                            message: "Enter your company name!"
                          }
                        ]
                      })(<Input placeholder="Tên cơ quan" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Địa chỉ:">
                      {getFieldDecorator("company_address", {
                        rules: [
                          {
                            required: true,
                            message: "Enter your company address!"
                          }
                        ]
                      })(<Input placeholder="Địa chỉ" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Email liên hệ:">
                      {getFieldDecorator("company_email", {
                        rules: [
                          {
                            required: true,
                            message: "Enter your company email!"
                          }
                        ]
                      })(<Input placeholder="Email" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Chức vụ của bạn:">
                      {getFieldDecorator("user_position", {
                        rules: [
                          {
                            required: true,
                            message: "Enter your company position!"
                          }
                        ]
                      })(<Input placeholder="Chức vụ" />)}
                    </FormItem>
                    <div
                      className=" d-flex"
                      style={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "flex-end"
                      }}
                    >
                      {/* <Button
                    onClick={this.onBack}
                    style={{ marginBottom: "0 !important" }}
                  >
                    Return
                  </Button> */}
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                          marginLeft: "auto",
                          marginBottom: "0 !important"
                        }}
                      >
                        Next
                      </Button>
                    </div>
                  </Form>
                </div>
              ) : null}
              {this.state.typeAccount === "embassy" ? (
                <div>
                  <Form onSubmit={this.handleSubmitPerson}>
                    <FormItem {...formItemLayout} label="Cơ quan làm việc: ">
                      {getFieldDecorator("company_business", {
                        rules: [
                          {
                            required: true,
                            message: "Select your company business!"
                          }
                        ]
                      })(
                        <Radio.Group>
                          <Radio value="Đại Sứ quán">Đại Sứ quán</Radio>
                          <Radio value="Lãnh Sự quán">Lãnh Sự quán</Radio>
                        </Radio.Group>
                      )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Quốc gia đại diện:">
                      {getFieldDecorator("company_national", {
                        rules: [
                          {
                            required: true,
                            message: "Enter your company national!"
                          }
                        ]
                      })(<Input placeholder="Quốc gia đại diện" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Quốc gia đặt trụ sở:">
                      {getFieldDecorator("company_headquarters", {
                        rules: [
                          {
                            required: true,
                            message: "Enter your company headquarters!"
                          }
                        ]
                      })(<Input placeholder="Quốc gia đặt trụ sở" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Địa chỉ đặt trụ sở:">
                      {getFieldDecorator("company_address", {
                        rules: [
                          {
                            required: true,
                            message: "Enter your company headquarters address!"
                          }
                        ]
                      })(<Input placeholder="Địa chỉ đặt trụ sở" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Chức vụ của bạn:">
                      {getFieldDecorator("user_position", {
                        rules: [
                          {
                            required: true,
                            message: "Enter your company position!"
                          }
                        ]
                      })(<Input placeholder="Chức vụ" />)}
                    </FormItem>
                    <div
                      className=" d-flex"
                      style={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "flex-end"
                      }}
                    >
                      {/* <Button
                    onClick={this.onBack}
                    style={{ marginBottom: "0 !important" }}
                  >
                    Return
                  </Button> */}
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                          marginLeft: "auto",
                          marginBottom: "0 !important"
                        }}
                      >
                        Next
                      </Button>
                    </div>
                  </Form>
                </div>
              ) : null}
              {this.state.typeAccount === "tourguide" ? (
                <div>
                  <Form onSubmit={this.handleSubmitPerson}>
                    <FormItem {...formItemLayout} label="Trạng thái">
                      <Radio.Group onChange={this.onChangeFreeLancer}>
                        <Radio value={1}>
                          Tôi là hướng dẫn viên trực thuộc công ty
                        </Radio>
                        <Radio value={2}>
                          Tôi là hướng dẫn viên không trực thuộc công ty{" "}
                        </Radio>
                      </Radio.Group>
                    </FormItem>
                    {this.state.FreeLancer === 1 ? (
                      <FormItem {...formItemLayout} label="Tên công ty">
                        {getFieldDecorator("company_name", {
                          rules: [
                            {
                              required: true,
                              message: "Enter your company name!"
                            }
                          ]
                        })(<Input placeholder="Tên công ty" />)}
                      </FormItem>
                    ) : null}
                    {this.state.FreeLancer === 2 ? (
                      <div>
                        <FormItem
                          {...formItemLayout}
                          label="Loại hướng dẫn viên: "
                        >
                          {getFieldDecorator("tour_guide", {
                            rules: [
                              {
                                required: true,
                                message: "Select your guide type!"
                              }
                            ]
                          })(
                            <Select
                              placeholder="Loại hướng dẫn viên"
                              style={{ width: "100%" }}
                            >
                              <Option value="inbound">
                                Hướng dẫn viên Inbound
                              </Option>
                              <Option value="outbound">
                                Hướng dẫn viên Outbound
                              </Option>
                              <Option value="inland">
                                Hướng dẫn viên tại điểm
                              </Option>
                            </Select>
                          )}
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          // onClick={() => this.onIncludeImage()}
                          label="Thông tin xác minh:"
                        >
                          {getFieldDecorator("user_verify", {
                            valuePropName: "fileList",
                            getValueFromEvent: this.normFile,
                            rules: [
                              {
                                required: true,
                                message: "Upload your infomation verify!"
                              }
                            ]
                          })(
                            <Dragger {...props}>
                              <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                              </p>
                              <p className="ant-upload-text">
                                Click hoặc kéo thả file tại khu vực này
                              </p>
                              {this.state.fileList.length < 1 ? (
                                <p className="ant-upload-hint">
                                  Cập nhật/Upload giấy tờ xác thực cá nhân như
                                  chứng minh thư, thẻ sinh viên,...
                                </p>
                              ) : (
                                ""
                              )}
                            </Dragger>
                          )}
                        </FormItem>
                      </div>
                    ) : null}
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
                        style={{
                          marginLeft: "auto",
                          marginBottom: "0 !important"
                        }}
                        onClick={() => this.onUploadImage()}
                      >
                        Next
                      </Button>
                    </div>
                  </Form>
                </div>
              ) : null}
              {this.state.typeAccount === "student" ? (
                <div>
                  <Form onSubmit={this.handleSubmitPerson}>
                    <FormItem {...formItemLayout} label="Lĩnh vực theo học: ">
                      {getFieldDecorator("user_specialized", {
                        rules: [
                          {
                            required: true,
                            message: "Enter your specialized!"
                          }
                        ]
                      })(
                        <Select
                          placeholder="Lĩnh vực theo học"
                          style={{ width: "100%" }}
                        >
                          <OptGroup label="Du lịch">
                            <Option value="manager">Điều hành Tour</Option>
                            <Option value="sale">Nhân viên kinh doanh</Option>
                          </OptGroup>
                          <OptGroup label="Khách sạn">
                            <Option value="managerHotel">
                              Quản lý khách sạn
                            </Option>
                          </OptGroup>
                        </Select>
                      )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Thông tin quan tâm: ">
                      {getFieldDecorator("user_interested", {
                        rules: [
                          {
                            required: true,
                            message: "Pick your company info!"
                          }
                        ]
                      })(
                        <Row>
                          <Col span={12}>
                            <Checkbox value="Sự kiện Du lịch">
                              Sự kiện Du lịch
                            </Checkbox>
                          </Col>
                          <Col span={12}>
                            <Checkbox value="Chương trình đào tạo">
                              Chương trình đào tạo
                            </Checkbox>
                          </Col>
                          <Col span={12}>
                            <Checkbox value="Thông tin tuyển dụng">
                              Thông tin tuyển dụng
                            </Checkbox>
                          </Col>
                          <Col span={12}>
                            <Checkbox value="Hội chợ Du lịch">
                              Hội chợ Du lịch
                            </Checkbox>
                          </Col>
                          <Col span={12}>
                            <Checkbox value="Tour Du lịch">
                              Tour Du lịch
                            </Checkbox>
                          </Col>
                          <Col span={12}>
                            <Checkbox value="Sản phẩm dịch vụ">
                              Sản phẩm dịch vụ
                            </Checkbox>
                          </Col>
                        </Row>
                      )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Thông tin xác minh:">
                      {getFieldDecorator("user_verify", {
                        valuePropName: "fileList",
                        getValueFromEvent: this.normFile
                      })(
                        <Dragger {...props}>
                          <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                          </p>
                          <p className="ant-upload-text">
                            Click hoặc kéo thả file tại khu vực này
                          </p>
                          {this.state.fileList.length < 1 ? (
                            <p className="ant-upload-hint">
                              Cập nhật/Upload giấy tờ xác thực cá nhân như chứng
                              minh thư, thẻ sinh viên,...
                            </p>
                          ) : (
                            ""
                          )}
                        </Dragger>
                      )}
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
                        style={{
                          marginLeft: "auto",
                          marginBottom: "0 !important"
                        }}
                        onClick={() => this.onUploadImage()}
                      >
                        Next
                      </Button>
                    </div>
                  </Form>
                </div>
              ) : null}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { companyList } = state.firestore.ordered;
  return {
    companyList
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    actSendDataToServer: profile => {
      dispatch(actUpdatePersonProfileRequest(profile));
    },
    actSendDataCompanyUser: data => {
      dispatch(CreateUserWorkSDK(data));
    }
  };
};

const WrappedHorizontalLoginForm = Form.create()(Company);
export default compose(
  firestoreConnect(props => {
    return [
      {
        collection: "companies",
        storeAs: "companyList"
      }
    ];
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(WrappedHorizontalLoginForm);
