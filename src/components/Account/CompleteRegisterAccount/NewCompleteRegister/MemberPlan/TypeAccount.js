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
import { notiChange } from "util/Notification";

const FormItem = Form.Item;
const Dragger = Upload.Dragger;
const Option = Select.Option;
// const InputGroup = Input.Group;
const { OptGroup } = Select;

const formItemLayout = {
  labelCol: { xs: 24, sm: 6 },
  wrapperCol: { xs: 24, sm: 18 }
};

const props = {
  name: "file",
  multiple: true,
  action: "//jsonplaceholder.typicode.com/posts/",
  onChange(info) {
    const status = info.file.status;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      // message.success(`${info.file.name} file uploaded successfully.`);
      notiChange("success", "Upload file success");
    } else if (status === "error") {
      // message.error(`${info.file.name} file upload failed.`);
      notiChange("error", "Upload file failed");
    }
  }
};

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

class TypeAccount extends Component {
  state = {
    typeCompany: 0,
    visiblePerson: false,
    visibleCompany: false,
    progress: 100,
    step: 3,
    FreeLancer: 0,
    infoType: ""
  };

  onChangeFreeLancer = e => {
    this.setState({
      FreeLancer: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log("Received values of form: ", values);
        // this.props.getStateType(this.state.infoType);
        this.setState(
          {
            infoType: values,
            visiblePerson: false,
            visibleCompany: false
          },
          () => this.onSendData()
        );
        // this.setState({
        //   infoType: values
        // });
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
    const { getFieldDecorator } = this.props.form;
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
            >
              <div>
                <Form onSubmit={this.handleSubmit}>
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
                    {getFieldDecorator("person_position", {
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
                    })(<Input placeholder="Số điện thoạ" />)}
                  </FormItem>
                  <FormItem {...formItemLayout} label="Quốc gia/ Quận/ Huyện">
                    {getFieldDecorator("person_district", {
                      rules: [
                        {
                          required: true,
                          message: "Select your district!"
                        }
                      ]
                    })(<Cascader options={residences} />)}
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
              - Tham gia các hoạt động, mua bán, sự kiện trên sàn.
            </p>
            <p className=" gx-mb-3">
              - Yêu cầu có giấy phép hoạt động kinh doanh, chứng nhận,...
            </p>
          </div>
          {this.state.visibleCompany ? (
            <Modal
              style={{ marginTop: "-5%" }}
              title="Đăng ký thông tin doanh nghiệp"
              visible={this.state.visibleCompany}
              footer={null}
            >
              <div>
                <Form onSubmit={this.handleSubmit}>
                  {/* <FormItem
                  {...formItemLayout}
                  label=""
                ></FormItem> */}
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
                    {getFieldDecorator("company_brand", {
                      rules: [
                        {
                          required: true,
                          message: "Enter your company brand!"
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
                  <FormItem {...formItemLayout} label="Quốc gia/ Quận/ Huyện">
                    {getFieldDecorator("company_district", {
                      rules: [
                        {
                          required: true,
                          message: "Enter your company district!"
                        }
                      ]
                    })(<Cascader options={residences} />)}
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
                    {getFieldDecorator("company_establish_day", {
                      rules: [
                        {
                          required: true,
                          message: "Enter your company establish_day!"
                        }
                      ]
                    })(
                      <DatePicker
                        className="gx-w-100"
                        placeholder="Ngày thành lập công ty trên giấy phép kinh doanh"
                      />
                    )}
                  </FormItem>
                  <FormItem {...formItemLayout} label="Thị trường">
                    {getFieldDecorator("company_market", {
                      rules: [
                        {
                          required: true,
                          message: "Enter your company market!"
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
    this.props.getStateType(this.state.step);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let typePicked = this.props.typeMem;
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
            <Form onSubmit={this.handleSubmit}>
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
                {getFieldDecorator("company_position", {
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
            <Form onSubmit={this.handleSubmit}>
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
                {getFieldDecorator("company_position", {
                  rules: [
                    {
                      required: true,
                      message: "Enter your company position!"
                    }
                  ]
                })(<Input placeholder="Chức vụ" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="Thông tin xác minh:">
                {getFieldDecorator("company_verify", {
                  rules: [
                    {
                      required: true,
                      message: "Upload your company verify!"
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
            <Form onSubmit={this.handleSubmit}>
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
                {getFieldDecorator("company_position", {
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
            <Form onSubmit={this.handleSubmit}>
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
                    <Radio value={1}>Đại Sứ quán</Radio>
                    <Radio value={2}>Lãnh Sự quán</Radio>
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
                {getFieldDecorator("company_positon", {
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
            <Form onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label="Trạng thái">
                {getFieldDecorator("tour_guid_type", {
                  rules: [
                    {
                      required: true,
                      message: "Select your tour guide type!"
                    }
                  ]
                })(
                  <Radio.Group onChange={this.onChangeFreeLancer}>
                    <Radio value={1}>
                      Tôi là hướng dẫn viên trực thuộc công ty
                    </Radio>
                    <Radio value={2}>
                      Tôi là hướng dẫn viên không trực thuộc công ty{" "}
                    </Radio>
                  </Radio.Group>
                )}
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
                    {getFieldDecorator("guide_type", {
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
                  <FormItem {...formItemLayout} label="Thông tin xác minh:">
                    {getFieldDecorator("tour_guide_profile", {
                      rules: [
                        {
                          required: true,
                          message: "Upload your detail profile!"
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
            <Form onSubmit={this.handleSubmit}>
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
                      <Checkbox>Sự kiện Du lịch</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox>Chương trình đào tạo</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox>Thông tin tuyển dụng</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox>Hội chợ Du lịch</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox>Tour Du lịch</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox>Sản phẩm dịch vụ</Checkbox>
                    </Col>
                  </Row>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="Thông tin xác minh:">
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">
                    Click hoặc kéo thả file tại khu vực này
                  </p>
                  <p className="ant-upload-hint">
                    Cập nhật/Upload giấy tờ xác thực cá nhân như chứng minh thư,
                    thẻ sinh viên,...
                  </p>
                </Dragger>
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

const WrappedHorizontalLoginForm = Form.create()(TypeAccount);

export default WrappedHorizontalLoginForm;
