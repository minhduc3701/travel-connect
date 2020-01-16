import React, { Component } from "react";
import {
  Col,
  Cascader,
  Input,
  Icon,
  Form,
  Row,
  Button,
  Collapse,
  Radio,
  Select,
  Checkbox,
  Upload
} from "antd";
import { connect } from "react-redux";
import { actUpdatePersonProfileRequest } from "appRedux/actions/Account";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";

const Dragger = Upload.Dragger;
const FormItem = Form.Item;
const { Panel } = Collapse;
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

const customPanelStyle = {
  background: "#f7f7f7",
  borderRadius: 4,
  marginBottom: 12,
  border: 0,
  overflow: "hidden"
};

const chosenPanelStyle = {
  background: "#d1ecf1",
  borderRadius: 4,
  marginBottom: 12,
  border: 2,
  overflow: "hidden"
};

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
    imageFile: false
  };

  onChangeTypeCompany = key => {
    this.setState({
      typeUser: key
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
            infoPerson: {
              user_position: values.user_position ? values.user_position : "",
              infoUnit: values ? values : ""
            }
          },
          () => this.onSendDataPerson()
        );
      }
    });
  };

  onSendDataPerson = () => {
    this.props.getState(this.state.step, this.state.progress);
    this.props.actSendDataToServer(this.state.infoPerson);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    // let typePicked = this.props.typeMem;
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
      <div className="block-w bor-rad-6">
        <WidgetHeader title="Hoàn thiện hồ sơ" />
        <div
          className="bor-rad-6"
          style={{
            color: "#004085",
            // backgroundColor: "#cce5ff",
            border: "1px solid #b8daff",
            padding: "2em"
          }}
        >
          <h3>Đại diện công ty</h3>
          <p>
            <Icon type="check-circle" style={{ marginRight: 5 }} />
            Tham gia các hoạt động, mua bán, sự kiện trên sàn.
          </p>
          <p>
            <Icon type="check-circle" style={{ marginRight: 5 }} />
            Yêu cầu có giấy phép hoạt động kinh doanh, chứng nhận,..
          </p>
        </div>
        <Row className="p-v-6">
          <Col xl={8} lg={8} md={8} sm={24} xs={24}>
            <div>
              <Collapse
                accordion
                bordered={false}
                onChange={this.onChangeTypeCompany}
                expandIcon={({ isActive }) => (
                  <Icon type="caret-right" rotate={isActive ? 90 : 0} />
                )}
                defaultActiveKey={this.state.typeUser}
                expandIconPosition="right"
              >
                <Panel
                  header="Cá nhân thuộc đơn vị, công ty"
                  key="1"
                  style={
                    this.state.typeUser === "1" || this.state.typeUser === 1
                      ? chosenPanelStyle
                      : customPanelStyle
                  }
                >
                  <div
                    style={{
                      borderRadius: "5px 5px 5px5px",
                      marginLeft: "1.5em"
                    }}
                  >
                    <p> Mặc định: Tài khoản người dùng cơ bản</p>
                  </div>
                </Panel>
                <Panel
                  header="Làm việc tại các tổ chức xã hội nghề nghiệp và du lịch"
                  key="2"
                  style={
                    this.state.typeUser === "2"
                      ? chosenPanelStyle
                      : customPanelStyle
                  }
                >
                  <div
                    style={{
                      borderRadius: "5px 5px 5px5px",
                      marginLeft: "1.5em"
                    }}
                  >
                    <p>
                      Bao gồm: Hiệp hội Du lịch, Câu lạc bộ, Chi hội Du lịch.
                    </p>
                  </div>
                </Panel>
                <Panel
                  header="Làm việc tại các đơn vị báo chí"
                  key="3"
                  style={
                    this.state.typeUser === "3"
                      ? chosenPanelStyle
                      : customPanelStyle
                  }
                >
                  <div
                    style={{
                      borderRadius: "5px 5px 5px5px",
                      marginLeft: "1.5em"
                    }}
                  >
                    <p>
                      Bao gồm: Các nhà báo, phóng viên, biên tập viên của các
                      tòa soạn.
                    </p>
                  </div>
                </Panel>
                <Panel
                  header="Làm việc tại các cơ quan quản lý nhà nước"
                  key="4"
                  style={
                    this.state.typeUser === "4"
                      ? chosenPanelStyle
                      : customPanelStyle
                  }
                >
                  <div
                    style={{
                      borderRadius: "5px 5px 5px5px",
                      marginLeft: "1.5em"
                    }}
                  >
                    <p>
                      Bao gồm: Tổng cục Du lịch, Sở Văn hóa thông tin và Du
                      lịch, Trung tâm xúc tiến Du lịch.
                    </p>
                  </div>
                </Panel>
                <Panel
                  header="Làm việc tại Đại sứ quán/Lãnh sự quán"
                  key="5"
                  style={
                    this.state.typeUser === "5"
                      ? chosenPanelStyle
                      : customPanelStyle
                  }
                >
                  <div
                    style={{
                      borderRadius: "5px 5px 5px5px",
                      marginLeft: "1.5em"
                    }}
                  >
                    <p>
                      Bao gồm: Tổng cục Du lịch, Sở Văn hóa thông tin và Du
                      lịch, Trung tâm xúc tiến Du lịch.
                    </p>
                  </div>
                </Panel>
                <Panel
                  header="Là hướng dẫn viên du lịch"
                  key="6"
                  style={
                    this.state.typeUser === "6"
                      ? chosenPanelStyle
                      : customPanelStyle
                  }
                >
                  <div
                    style={{
                      borderRadius: "5px 5px 5px5px",
                      marginLeft: "1.5em"
                    }}
                  >
                    <p>
                      Bao gồm: Các hướng dẫn viên trong và ngoài nước được cấp
                      giấy phép hoạt động.
                    </p>
                  </div>
                </Panel>
                <Panel
                  header="Là sinh viên ngành du lịch"
                  key="7"
                  style={
                    this.state.typeUser === "7"
                      ? chosenPanelStyle
                      : customPanelStyle
                  }
                >
                  <div
                    style={{
                      borderRadius: "5px 5px 5px5px",
                      marginLeft: "1.5em"
                    }}
                  >
                    <p>
                      Bao gồm: Sinh viên các trường đại học, cao đẳng, trung cấp
                      nghề về lĩnh vực Du lịch và Khách sạn.
                    </p>
                  </div>
                </Panel>
              </Collapse>
            </div>
          </Col>
          <Col xl={16} lg={16} md={16} sm={24} xs={24}>
            {this.state.typeUser === "1" ? (
              <div>
                <Form
                  style={{ borderLeft: "1px solid #00000020" }}
                  onSubmit={this.handleSubmitPerson}
                >
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
                  <div
                    className=" d-flex"
                    style={{
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "flex-end"
                    }}
                  >
                    {/* <Button
                    onClick={this.handleCancel}
                    style={{ marginBottom: "0 !important" }}
                  >
                    Return
                  </Button> */}
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
            {this.state.typeUser === "2" ? (
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
            {this.state.typeUser === "3" ? (
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
                    onClick={() => this.onIncludeImage()}
                    label="Thông tin xác minh:"
                  >
                    {getFieldDecorator("company_verify", {
                      valuePropName: "fileList1",
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
                          Cập nhật/Upload giấy tờ xác thực cá nhân như thẻ nhà
                          báo, giấy phép hành nghề,...
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
            {this.state.typeUser === "4" ? (
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
            {this.state.typeUser === "5" ? (
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
            {this.state.typeUser === "6" ? (
              <div>
                {/* <Divider> Lựa chọn kế hoạch thành viên </Divider> */}
                {/* <p>Bạn có đang làm trong công ty nào không?</p> */}
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
                      <FormItem
                        {...formItemLayout}
                        label="Loại hướng dẫn viên: "
                      >
                        {getFieldDecorator("tour_guide_type", {
                          rules: [
                            {
                              required: true,
                              message: "Select your guide type!"
                            }
                          ]
                        })(
                          <Select style={{ width: "100%" }}>
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
                        onClick={() => this.onIncludeImage()}
                        label="Thông tin xác minh:"
                      >
                        {getFieldDecorator("tour_guide_profile", {
                          valuePropName: "fileList1",
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
            {this.state.typeUser === "7" ? (
              <div>
                {/* <Divider> Hồ sơ công việc </Divider> */}
                {/* <p>Hãy cho chúng tôi công việc hiện tại của bạn</p> */}
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
                          <Option value="managerHotel">
                            Quản lý khách sạn
                          </Option>
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
                      valuePropName: "fileList1",
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
                          minh thư, thẻ sinh viên,...
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
    }
  };
};

const WrappedHorizontalLoginForm = Form.create()(Company);

export default connect(null, mapDispatchToProps)(WrappedHorizontalLoginForm);
