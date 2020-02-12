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
import { HOME } from "constants/NavigateLink";

const Dragger = Upload.Dragger;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const formItemLayout = {
  labelCol: { xs: 24, sm: 6 },
  wrapperCol: { xs: 24, sm: 18 }
};

const Option = Select.Option;
// const InputGroup = Input.Group;
const { OptGroup } = Select;

const residences = [
  {
    value: "hanoi",
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
    value: "saigon",
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
    personAccDetail: null
  };
  handleSubmitPerson = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState(
          {
            infoPerson: {
              user_position: values.user_position ? values.user_position : "",
              infoUnit: values ? values : ""
            },
            personAccDetail: {
              companyName: values.company_name ? values.company_name : "",
              companyBrand: values.company_brandname
                ? values.company_brandname
                : "",
              companyAddress: values.company_address
                ? values.company_address
                : "",
              companyEmail: values.company_email ? values.company_email : "",
              verifyPerson: values.user_verify ? values.user_verify : "",
              companyBusiness: values.company_business
                ? [values.company_business]
                : "",
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
              position: values.user_position ? values.user_position : ""
            }
          },
          () => this.onSendDataPerson()
        );
      }
    });
  };

  onSendDataPerson = async () => {
    let uId = JSON.parse(localStorage.getItem("user_info"));
    console.log(uId.user_id);
    await this.props.actSendDataCompanyUser(
      this.state.personAccDetail,
      uId.user_id
    );
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
              .firestore()
              .collection("users")
              .doc(user_info.user_id)
              .update({
                verifyPerson: firebase.firestore.FieldValue.arrayUnion(
                  res.metadata.fullPath
                )
              })
              .then(ress => {
                window.location.href = `${HOME}/home`;
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

  render() {
    const { getFieldDecorator } = this.props.form;
    let { fileList } = this.state;
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
    return (
      <div className="block-w bor-rad-6">
        <WidgetHeader title="Hoàn thiện hồ sơ" />
        <Row className="p-v-6">
          <Col xl={8} lg={8} md={8} sm={24} xs={24}>
            <div>
              <div>
                <h3 className="m-b-10">Nội dung hoạt động</h3>
                <p> Bao gồm các thông tin : </p>
                <p>
                  <Icon type="check-circle" /> Đơn vị, công ty người dùng đang
                  làm việc
                </p>
                <p>
                  <Icon type="check-circle" /> Công việc, chức vụ người dùng
                  đang làm việc
                </p>
                <p>
                  <Icon type="check-circle" /> Thông tin xác minh của người dùng
                  đối với nơi đang làm việc
                </p>
              </div>
              {this.state.typeAccount === "social" ? (
                <div>
                  <h3 className=" m-v-5">Mô tả</h3>
                  <p>Bạn đang làm việc tại các tổ chức xã hội và du lịch</p>
                  <p style={{ fontStyle: "italic" }}>
                    Bao gồm: Hiệp hội Du lịch, Câu lạc bộ, Chi hội Du lịch.
                  </p>
                </div>
              ) : null}
              {this.state.typeAccount === "journalist" ? (
                <div>
                  <h3 className=" m-v-5">Mô tả</h3>
                  <p>Bạn đang làm việc tại các đơn vị báo chí</p>
                  <p style={{ fontStyle: "italic" }}>
                    Bao gồm: Các nhà báo, phóng viên, biên tập viên của các tòa
                    soạn.
                  </p>
                </div>
              ) : null}
              {this.state.typeAccount === "government" ? (
                <div>
                  <h3 className=" m-v-5">Mô tả</h3>
                  <p>Bạn đang làm việc tại các cơ quan quản lý nhà nước</p>
                  <p style={{ fontStyle: "italic" }}>
                    Bao gồm: Tổng cục Du lịch, Sở Văn hóa thông tin và Du lịch,
                    Trung tâm xúc tiến Du lịch.
                  </p>
                </div>
              ) : null}
              {this.state.typeAccount === "embassy" ? (
                <div>
                  <h3 className=" m-v-5">Mô tả</h3>
                  <p>Bạn đang làm việc tại Đại sứ quán/Lãnh sự quán</p>
                  <p style={{ fontStyle: "italic" }}>
                    Bao gồm: Tổng cục Du lịch, Sở Văn hóa thông tin và Du lịch,
                    Trung tâm xúc tiến Du lịch.
                  </p>
                </div>
              ) : null}
              {this.state.typeAccount === "tourguide" ? (
                <div>
                  <h3 className=" m-v-5">Mô tả</h3>
                  <p>Bạn là hướng dẫn viên du lịch</p>
                  <p style={{ fontStyle: "italic" }}>
                    Bao gồm: Các hướng dẫn viên trong và ngoài nước được cấp
                    giấy phép hoạt động.
                  </p>
                </div>
              ) : null}
              {this.state.typeAccount === "student" ? (
                <div>
                  <h3 className=" m-v-5">Mô tả</h3>
                  <p>Bạn là sinh viên ngành du lịch</p>
                  <p style={{ fontStyle: "italic" }}>
                    Bao gồm: Sinh viên các trường đại học, cao đẳng, trung cấp
                    nghề về lĩnh vực Du lịch và Khách sạn.
                  </p>
                </div>
              ) : null}
              {this.state.typeAccount === "company" ? (
                <div>
                  <h3 className=" m-v-5">Mô tả</h3>
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
                <FormItem {...formItemLayout} label="Lựa chọn đơn vị làm việc">
                  <Select
                    placeholder="Lựa chọn đơn vị làm việc"
                    onChange={this.onSelectType}
                    style={{ width: "100%" }}
                  >
                    <OptGroup label="Công ty">
                      <Option value="company">
                        Làm việc tại công ty, doanh nghiệp du lịch hoặc các đơn
                        vị truyền thông về du lịch
                      </Option>
                    </OptGroup>
                    <OptGroup label="Đơn vị đặc thù">
                      <Option value="social">
                        Làm việc tại các tổ chức xã hội nghề nghiệp và du lịch
                      </Option>
                      <Option value="journalist">
                        Làm việc tại các đơn vị báo chí
                      </Option>
                      <Option value="government">
                        Làm việc tại các cơ quan quản lý nhà nước
                      </Option>
                      <Option value="embassy">
                        Làm việc tại Đại sứ quán/Lãnh sự quán
                      </Option>
                    </OptGroup>
                    <OptGroup label="Khác">
                      <Option value="tourguide">
                        Là hướng dẫn viên du lịch
                      </Option>
                      <Option value="student">
                        Là sinh viên ngành du lịch
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
                    <FormItem {...formItemLayout} label="Quốc gia: ">
                      {getFieldDecorator("company_national", {
                        rules: [
                          {
                            required: true,
                            message: "Enter your company national!"
                          }
                        ]
                      })(
                        <Select
                          placeholder="Quốc gia"
                          disabled={this.state.visibleSearch}
                          defaultValue="vn"
                          style={{ width: "100%" }}
                        >
                          <OptGroup label="Châu Á">
                            <Option value="vn">Việt Nam</Option>
                            <Option value="jp">Nhật Bản</Option>
                          </OptGroup>
                          <OptGroup label="Châu Âu">
                            <Option value="fi">Pháp</Option>
                          </OptGroup>
                        </Select>
                      )}
                    </FormItem>
                  </Form>
                  {this.state.typeCompany === "other" &&
                  this.state.notExist === false ? (
                    <Form onSubmit={this.handleSubmitPerson}>
                      <FormItem {...formItemLayout} label="Quốc gia: ">
                        {getFieldDecorator("company_national", {
                          rules: [
                            {
                              required: true,
                              message: "Enter your company national!"
                            }
                          ]
                        })(
                          <Select defaultValue="vn" style={{ width: "100%" }}>
                            <OptGroup label="Châu Á">
                              <Option value="vn">Việt Nam</Option>
                              <Option value="jp">Nhật Bản</Option>
                            </OptGroup>
                            <OptGroup label="Châu Âu">
                              <Option value="fi">Pháp</Option>
                            </OptGroup>
                          </Select>
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="Công ty: ">
                        <InputGroup compact>
                          <Select style={{ width: "30%" }} defaultValue="name">
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
                          })(<Input style={{ width: "50%" }} />)}

                          <Button
                            style={{ width: "20%" }}
                            type="primary"
                            htmlType="submit"
                          >
                            Tìm kiếm
                          </Button>
                        </InputGroup>
                      </FormItem>
                    </Form>
                  ) : null}
                  {this.state.typeCompany &&
                  this.state.typeCompany !== "other" &&
                  this.state.notExist === false ? (
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
                        <FormItem {...formItemLayout} label="Email">
                          {getFieldDecorator("person_email", {
                            rules: [
                              {
                                required: true,
                                message: "Enter your email!"
                              }
                            ]
                          })(<Input placeholder="Email" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Số điện thoại">
                          {getFieldDecorator("person_phone", {
                            rules: [
                              {
                                required: true,
                                message: "Enter your phone number!"
                              }
                            ]
                          })(<Input placeholder="Số điện thoại" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Quận/ Huyện">
                          {getFieldDecorator("person_district", {
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
                          {getFieldDecorator("person_address", {
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
                  {this.state.notExist ? (
                    <div>
                      <Form onSubmit={this.handleSubmitPerson}>
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
                  {/* <p>Hãy cho chúng tôi công việc hiện tại của bạn</p> */}
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

const mapStateToProp = ({ CompanyProfile }) => {
  return {
    CompanyProfile
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    actSendDataToServer: profile => {
      dispatch(actUpdatePersonProfileRequest(profile));
    },
    actSendDataCompanyUser: (data, id) => {
      dispatch(CreateUserWorkSDK(data, id));
    }
  };
};

const WrappedHorizontalLoginForm = Form.create()(Company);

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(WrappedHorizontalLoginForm);
