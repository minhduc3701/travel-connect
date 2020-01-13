import React, { Component } from "react";
import {
  Col,
  Form,
  Divider,
  Icon,
  Row,
  Input,
  Checkbox,
  Select,
  Radio,
  Upload,
  Cascader,
  DatePicker,
  Modal,
  Button
} from "antd";
// import { notiChange } from "util/Notification";
import { connect } from "react-redux";
import {
  actSaveProfile3,
  actUpdatePersonProfileRequest
} from "appRedux/actions/Account";
import { CallApi } from "util/CallApi";

const FormItem = Form.Item;
const Dragger = Upload.Dragger;
const Option = Select.Option;
// const InputGroup = Input.Group;
const { OptGroup } = Select;

const OPTIONS = [
  "Lữ hành quốc tế Outbound",
  "Lữ hành nội địa",
  "Đại lý Du lịch",
  "Vận tải",
  "Hàng không",
  "Cơ sỏ lưu trú",
  "Nhà hàng"
];

const formItemLayout = {
  labelCol: { xs: 24, sm: 6 },
  wrapperCol: { xs: 24, sm: 18 }
};

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

class TypeAccount extends Component {
  state = {
    typeCompany: 0,
    visiblePerson: false,
    visibleCompany: false,
    progress: 100,
    step: 3,
    FreeLancer: 0,
    infoType: {
      company_business: null,
      company_name: null,
      company_brandname: null,
      company_email: null,
      company_phone: null,
      company_nation: null,
      company_address: null,
      company_establish: null,
      company_target: null,
      company_district: null,
      company_city: null
    },
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
    imageFile: false
  };

  handleChangeBusiness = business => {
    this.setState({ business });
  };

  onChangeEstablish = (date, dateString) => {
    this.setState({ establish: dateString });
  };

  onChangeFreeLancer = e => {
    this.setState({
      FreeLancer: e.target.value
    });
  };

  handleSubmitCompany = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log("Received values of form: ", values);
        // this.props.getStateType(this.state.infoType);
        let establish = this.state.establish;
        let business = this.state.business;
        this.setState(
          {
            infoType: {
              company_business: business,
              company_name: values.company_name,
              company_brandname: values.company_brandname,
              company_email: values.company_email,
              company_phone: values.company_phone,
              company_nation: values.company_nation,
              company_address: values.company_address,
              company_establish: establish,
              company_target: values.company_target,
              company_district: values.company_district[1],
              company_city: values.company_district[0]
            },
            visiblePerson: false,
            visibleCompany: false,
            progress: 75
          },
          () => this.onSendData()
        );
      }
    });
  };
  handleSubmitTourGuide = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log("Received values of form: ", values);
        this.setState(
          {
            step: 4,
            tourGuide: {
              tour_guide_company: values.tour_guide_company
                ? values.tour_guide_company
                : "",
              tour_guide_profile: values.tour_guide_profile
                ? values.tour_guide_profile
                : "",
              tour_guide_type: values.tour_guide_type
                ? values.tour_guide_type
                : ""
            },
            visiblePerson: false,
            visibleCompany: false
          },
          () => this.onSendDataPerson()
        );
      }
    });
  };
  handleSubmitStudent = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log("Received values of form: ", values);
        this.setState(
          {
            step: 4,
            student: {
              student_specialized: values.student_specialized,
              student_info: values.student_info,
              student_verify: values.student_verify ? values.student_verify : ""
            },
            visiblePerson: false,
            visibleCompany: false
          },
          () => this.onSendDataPerson()
        );
      }
    });
  };
  handleSubmitPerson = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log("Received values of form: ", values);
        // this.props.getStateType(this.state.infoType);
        // let establish = this.state.establish;
        // let business = this.state.business;
        this.setState(
          {
            step: 4,
            infoPerson: {
              user_position: values.user_position ? values.user_position : "",
              infoUnit: values ? values : ""
            },
            visiblePerson: false,
            visibleCompany: false
          },
          () => this.onSendDataPerson()
        );
      }
    });
  };

  onChosePerson = () => {
    this.setState({
      visiblePerson: true
    });
  };
  onChoseCompany = () => {
    this.setState({
      visibleCompany: true
    });
  };

  handleCancel = () => {
    this.setState({
      visiblePerson: false,
      visibleCompany: false
    });
  };

  handleOk = () => {
    if (this.state.modalPerson !== null) {
      this.setState({
        visiblePerson: false,
        visibleCompany: false
      });
    }
  };

  onChoseAdmin = () => {
    const { business } = this.state;
    const { getFieldDecorator } = this.props.form;
    const filteredOptions = OPTIONS.filter(o => !business.includes(o));
    return (
      <Row style={{ paddingBottom: "2em" }}>
        <Col span={12}>
          <div
            className="cursor-pointer gx-text-center d-flex bor-rad-6 box-shadow"
            style={{
              flexDirection: "column",
              minHeight: "15em",
              justifyContent: "center"
            }}
            onClick={() => this.onChosePerson()}
          >
            <h2 className="h3 gx-mb-3 ">Cá nhân</h2>
            <i className={`icon icon-user gx-fs-xlxl `} />
            <p className=" gx-mb-3">
              - Tham gia các hoạt động, sự kiện trên sàn.
            </p>
            <p className=" gx-mb-3">- Không yêu cầu giấy phép kinh doanh.</p>
          </div>
          {this.state.visiblePerson ? (
            <Modal
              style={{ marginTop: "-5%" }}
              title=" Hồ sơ công việc cá nhân"
              visible={this.state.visiblePerson}
              footer={null}
              onCancel={this.handleCancel}
            >
              <div>
                <Form onSubmit={this.handleSubmitPerson}>
                  <FormItem {...formItemLayout} label="Tên đơn vị">
                    {getFieldDecorator("person_company_name", {
                      rules: [
                        {
                          required: true,
                          message: "Enter your company name!"
                        }
                      ]
                    })(<Input placeholder="Tên đơn vị" />)}
                  </FormItem>
                  <FormItem {...formItemLayout} label="Tên thương hiệu">
                    {getFieldDecorator("person_company_brand", {
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
                      type="primary"
                      htmlType="submit"
                      style={{ marginBottom: "0 !important" }}
                    >
                      Next
                    </Button>
                  </div>
                </Form>
              </div>
            </Modal>
          ) : null}
        </Col>
        <Col span={12}>
          <div
            className=" cursor-pointer gx-text-center d-flex bor-rad-6 box-shadow"
            style={{
              flexDirection: "column",
              minHeight: "15em",
              justifyContent: "center"
            }}
            onClick={() => this.onChoseCompany()}
          >
            <h2 className="h3 gx-mb-3 ">Đại diện công ty</h2>
            <i className={`icon icon-company gx-fs-xlxl `} />
            <p className=" gx-mb-3">
              Tham gia các hoạt động, mua bán, sự kiện trên sàn.
            </p>
            <p className=" gx-mb-3">
              Yêu cầu có giấy phép hoạt động kinh doanh, chứng nhận,...
            </p>
          </div>
          {this.state.visibleCompany ? (
            <Modal
              style={{ marginTop: "-5%" }}
              title="Đăng ký thông tin doanh nghiệp"
              visible={this.state.visibleCompany}
              footer={null}
              onCancel={this.handleCancel}
            >
              <div>
                <Form onSubmit={this.handleSubmitCompany}>
                  {/* <FormItem
                  {...formItemLayout}
                  label=""
                ></FormItem> */}
                  <FormItem {...formItemLayout} label="Lĩnh vực">
                    {getFieldDecorator("company_business", {
                      rules: [
                        {
                          required: true,
                          message: "Enter your company business!"
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
                  <FormItem {...formItemLayout} label="Tên thương hiệu">
                    {getFieldDecorator("company_brandname", {
                      rules: [
                        {
                          required: true,
                          message: "Enter your company brand name!"
                        }
                      ]
                    })(<Input placeholder="Tên thương hiệu" />)}
                  </FormItem>
                  <FormItem {...formItemLayout} label="Email">
                    {getFieldDecorator("company_email", {
                      rules: [
                        {
                          required: true,
                          message: "Enter your company email!"
                        }
                      ]
                    })(<Input placeholder="Email" />)}
                  </FormItem>
                  <FormItem {...formItemLayout} label="Số điện thoại">
                    {getFieldDecorator("company_phone", {
                      rules: [
                        {
                          required: true,
                          message: "Enter your company phone number!"
                        }
                      ]
                    })(<Input placeholder="Số điện thoại" />)}
                  </FormItem>
                  <FormItem {...formItemLayout} label="Quốc gia">
                    {getFieldDecorator("company_nation", {
                      rules: [
                        {
                          required: true,
                          message: "Enter your company nation!"
                        }
                      ]
                    })(
                      <Select placeholder="Quốc gia">
                        <Option value="vn">Việt Nam</Option>
                        <Option value="kr">Korea</Option>
                        <Option value="jp">Japan</Option>
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
                          message: "Enter your company address!"
                        }
                      ]
                    })(<Input placeholder="Địa chỉ" />)}
                  </FormItem>
                  <FormItem {...formItemLayout} label="Ngày thành lập">
                    {getFieldDecorator("company_establish", {
                      rules: [
                        {
                          required: true,
                          message: "Enter your company establish day!"
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
                  <FormItem {...formItemLayout} label="Thị trường">
                    {getFieldDecorator("company_target", {
                      rules: [
                        {
                          required: true,
                          message: "Enter your company target!"
                        }
                      ]
                    })(<Input placeholder="Thị trường mục tiêu" />)}
                  </FormItem>
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
                      type="primary"
                      htmlType="submit"
                      style={{ marginBottom: "0 !important" }}
                    >
                      Next
                    </Button>
                  </div>
                </Form>
              </div>
            </Modal>
          ) : null}
        </Col>
      </Row>
    );
  };

  onSendData = () => {
    this.props.getStateType(this.state.step, this.state.progress);
    this.props.actSendDetailToStore(this.state.infoType);
  };

  onSendDataPerson = () => {
    this.props.getStateType(this.state.step, this.state.progress);
    this.props.actSendDataToServer(this.state.infoPerson);
    if (this.state.imageFile) {
      this.onSendImage();
    }
  };

  normFile = e => {
    // console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  onSendImage = () => {
    let userInfo = JSON.parse(localStorage.getItem("user_info"));
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append("image-", file);
    });
    CallApi(`user/${userInfo.user_id}/images`, "POST", formData)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  onIncludeImage = () => {
    this.setState({
      imageFile: true
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let typePicked = this.props.typeMem;
    let { fileList } = this.state;
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
      <div>
        {typePicked.type === "1" ? (
          <div>
            <p>Phương hướng hoạt động của bạn trên sàn?</p>
            {this.onChoseAdmin()}
          </div>
        ) : null}
        {typePicked.type === "2" ? (
          <div>
            <p>Hãy cho chúng tôi công việc hiện tại của bạn</p>
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
                  style={{ marginLeft: "auto", marginBottom: "0 !important" }}
                >
                  Next
                </Button>
              </div>
            </Form>
          </div>
        ) : null}
        {typePicked.type === "3" ? (
          <div>
            <p>Hãy cho chúng tôi công việc hiện tại của bạn</p>
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
                onClick={() => this.onIncludeImage()}
                label="Thông tin xác minh:"
              >
                {getFieldDecorator("company_verify", {
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
                    <p className="ant-upload-hint">
                      Cập nhật/Upload giấy tờ xác thực cá nhân như thẻ nhà báo,
                      giấy phép hành nghề,...
                    </p>
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
                {/* <Button
                  onClick={this.onBack}
                  style={{ marginBottom: "0 !important" }}
                >
                  Return
                </Button> */}
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "auto", marginBottom: "0 !important" }}
                >
                  Next
                </Button>
              </div>
            </Form>
          </div>
        ) : null}
        {typePicked.type === "4" ? (
          <div>
            <p>Phương hướng hoạt động của bạn trên sàn?</p>
            {this.onChoseAdmin()}
          </div>
        ) : null}
        {typePicked.type === "5" ? (
          <div>
            <p>Hãy cho chúng tôi công việc hiện tại của bạn</p>
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
                  style={{ marginLeft: "auto", marginBottom: "0 !important" }}
                >
                  Next
                </Button>
              </div>
            </Form>
          </div>
        ) : null}
        {typePicked.type === "6" ? (
          <div>
            <p>Hãy cho chúng tôi công việc hiện tại của bạn</p>
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
                {getFieldDecorator("company_headquarters_address", {
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
                  style={{ marginLeft: "auto", marginBottom: "0 !important" }}
                >
                  Next
                </Button>
              </div>
            </Form>
          </div>
        ) : null}
        {typePicked.type === "7" ? (
          <div>
            <p>Phương hướng hoạt động của bạn trên sàn?</p>
            {this.onChoseAdmin()}
          </div>
        ) : null}
        {typePicked.type === "8" ? (
          <div>
            <Divider> Lựa chọn kế hoạch thành viên </Divider>
            <p>Bạn có đang làm trong công ty nào không?</p>
            <Form onSubmit={this.handleSubmitTourGuide}>
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
                  {getFieldDecorator("tour_guide_company", {
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
                  <FormItem {...formItemLayout} label="Loại hướng dẫn viên: ">
                    {getFieldDecorator("tour_guide_type", {
                      rules: [
                        {
                          required: true,
                          message: "Select your guide type!"
                        }
                      ]
                    })(
                      <Select style={{ width: "100%" }}>
                        <Option value="inbound">Hướng dẫn viên Inbound</Option>
                        <Option value="outbound">
                          Hướng dẫn viên Outbound
                        </Option>
                        <Option value="inland">Hướng dẫn viên tại điểm</Option>
                      </Select>
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    onClick={() => this.onIncludeImage()}
                    label="Thông tin xác minh:"
                  >
                    {getFieldDecorator("tour_guide_profile", {
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
                        <p className="ant-upload-hint">
                          Cập nhật/Upload giấy tờ xác thực cá nhân như chứng
                          minh thư, thẻ hướng dẫn viên,...
                        </p>
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
                {/* <Button
                  onClick={this.onBack}
                  style={{ marginBottom: "0 !important" }}
                >
                  Return
                </Button> */}
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "auto", marginBottom: "0 !important" }}
                >
                  Next
                </Button>
              </div>
            </Form>
          </div>
        ) : null}
        {typePicked.type === "9" ? (
          <div>
            <Divider> Hồ sơ công việc </Divider>
            <p>Hãy cho chúng tôi công việc hiện tại của bạn</p>
            <Form onSubmit={this.handleSubmitStudent}>
              <FormItem {...formItemLayout} label="Lĩnh vực theo học: ">
                {getFieldDecorator("student_specialized", {
                  rules: [
                    {
                      required: true,
                      message: "Enter your specialized!"
                    }
                  ]
                })(
                  <Select style={{ width: "100%" }}>
                    <OptGroup label="Du lịch">
                      <Option value="manager">Điều hành Tour</Option>
                      <Option value="sale">Nhân viên kinh doanh</Option>
                    </OptGroup>
                    <OptGroup label="Khách sạn">
                      <Option value="managerHotel">Quản lý khách sạn</Option>
                    </OptGroup>
                  </Select>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="Thông tin quan tâm: ">
                {getFieldDecorator("student_info", {
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
                      <Checkbox value="Tour Du lịch">Tour Du lịch</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value="Sản phẩm dịch vụ">
                        Sản phẩm dịch vụ
                      </Checkbox>
                    </Col>
                  </Row>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                onClick={() => this.onIncludeImage()}
                label="Thông tin xác minh:"
              >
                {getFieldDecorator("student_verify", {
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
                    <p className="ant-upload-hint">
                      Cập nhật/Upload giấy tờ xác thực cá nhân như chứng minh
                      thư, thẻ sinh viên,...
                    </p>
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
                {/* <Button
                  onClick={this.onBack}
                  style={{ marginBottom: "0 !important" }}
                >
                  Return
                </Button> */}
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "auto", marginBottom: "0 !important" }}
                >
                  Next
                </Button>
              </div>
            </Form>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    actSendDetailToStore: step3 => {
      dispatch(actSaveProfile3(step3));
    },
    actSendDataToServer: profile => {
      dispatch(actUpdatePersonProfileRequest(profile));
    }
  };
};

const WrappedHorizontalLoginForm = Form.create()(TypeAccount);

export default connect(null, mapDispatchToProps)(WrappedHorizontalLoginForm);
