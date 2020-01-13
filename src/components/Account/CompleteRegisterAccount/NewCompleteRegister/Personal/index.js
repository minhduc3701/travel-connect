import React, { Component } from "react";
import {
  Col,
  Cascader,
  Input,
  Divider,
  Icon,
  Form,
  Row,
  Radio,
  Select,
  Button,
  DatePicker,
  Upload,
  Modal
} from "antd";
import { connect } from "react-redux";
import { actUpdateUserRequest } from "appRedux/actions/User";
import { CallApi } from "util/CallApi";
import { notiChange } from "util/Notification";

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: { xs: 24, sm: 6 },
  wrapperCol: { xs: 24, sm: 18 }
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

class Personal extends Component {
  state = {
    person: {
      user_logo: null,
      user_name: null,
      user_birth: null,
      user_gender: null,
      user_phone: null,
      user_nation: null,
      user_city: null,
      user_district: null,
      user_addresss: null
    },
    birth: "",
    fileList: [],
    uploading: false,
    progress: 25,
    step: 2,
    visible: true
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        visible: false
      });
    }, 3000);
  }

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  onChange = (date, dateString) => {
    this.setState({ birth: dateString });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let logo = values.user_logo ? values.user_logo : "";
        let birth = this.state.birth;
        this.setState(
          {
            person: {
              user_logo: logo,
              user_name: values.user_name,
              user_gender: values.user_gender,
              user_birth: birth,
              user_phone: values.user_phone,
              user_nation: values.user_nation,
              user_city: values.user_district[0],
              user_district: values.user_district[1],
              user_addresss: values.user_address
            }
          },
          () => this.onSendDataToServer()
        );
      }
    });
  };

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList1;
  };

  onSendDataToServer = () => {
    this.props.onSendDataUser(this.state.person);
    this.props.getState(this.state.step);
    if (this.state.fileList.length > 0) {
      this.onSendImage();
    }
  };

  handleChange = ({ fileList }) => {
    if (this.state.fileList.length > 1) {
      this.setState({
        fileList: fileList
      });
    } else {
      this.setState({
        fileList
      });
    }
  };

  onSendImage = () => {
    let userInfo = JSON.parse(localStorage.getItem("user_info"));
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append("image-", file);
    });
    CallApi(`user/${userInfo.user_id}/images`, "POST", formData)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => notiChange("error", "Somthing went wrong! Try again"));
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let { fileList } = this.state;
    let userInfo = JSON.parse(localStorage.getItem("user_info"));
    let name = userInfo.user_name.split(" ");
    let nameWelcome = name[name.length - 1];
    const props = {
      multiple: false,
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
          fileList: [file]
        }));
        return false;
      },
      fileList
    };

    return (
      <Row className="p-v-6">
        <Modal
          className="w-50-i"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[
            <Button onClick={this.handleCancel} type="primary">
              Ok
            </Button>
          ]}
        >
          <Row className="d-flex justify-content-center align-items-center">
            <Col span={12}>
              <img
                src="https://image.freepik.com/free-vector/character-illustration-people-with-packages-shipment_53876-59858.jpg"
                alt="...."
              />
            </Col>
            <Col span={12}>
              <h1>Welcome {nameWelcome}!</h1>
              <p>Only few step to complete your account!</p>
              <p>Follow these step to do it.</p>
            </Col>
          </Row>
        </Modal>
        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
          <h3 className="m-b-10">Nội dung hồ sơ</h3>
          <p> Bao gồm các thông tin cơ bản: </p>
          <p>
            <Icon type="check-circle" /> Ảnh đại diện: Hình ảnh cá nhân
          </p>
          <p>
            <Icon type="check-circle" /> Họ và tên: Họ và tên đầy đủ của người
            dùng
          </p>
          <p>
            <Icon type="check-circle" /> Giới tính: Giới tính được khai trên
            chứng minh thư
          </p>
          <p>
            <Icon type="check-circle" /> Số điện thoại: Số điện thoại liên lạc
            thường dùng
          </p>
          <p>
            <Icon type="check-circle" /> Quốc gia: Quốc gia hiện đang sinh sống
          </p>
          <p>
            <Icon type="check-circle" /> Quận/huyện: Quận/huyện hiện đang sinh
            sống
          </p>
          <p>
            <Icon type="check-circle" /> Địa chỉ: Khu vực hiện đang sinh sống
          </p>
        </Col>
        <Col xl={16} lg={16} md={16} sm={24} xs={24}>
          <div className="block-w bor-rad-6">
            <Divider>Hồ sơ cá nhân</Divider>
            <Form onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label="Ảnh đại diện">
                {getFieldDecorator("user_logo", {
                  valuePropName: "fileList1",
                  getValueFromEvent: this.normFile
                })(
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    {...props}
                  >
                    <div>
                      <Icon type="plus" />
                      <div className="ant-upload-text">Upload</div>
                    </div>
                  </Upload>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="Họ và tên">
                {getFieldDecorator("user_name", {
                  rules: [{ required: true, message: "Enter your username!" }],
                  initialValue: userInfo.user_name
                })(<Input placeholder="Họ và tên" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="Ngày sinh">
                {getFieldDecorator("user_birth", {
                  rules: [
                    { required: true, message: "Enter your date of birth!" }
                  ]
                })(
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder="Ngày sinh"
                    onChange={this.onChange}
                  />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="Giới tính">
                {getFieldDecorator("user_gender", {
                  rules: [{ required: true, message: "Select your gendar!" }]
                })(
                  <Radio.Group name="gendar">
                    <Radio value="male">Nam</Radio>
                    <Radio value="female">Nữ</Radio>
                  </Radio.Group>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="Số điện thoại">
                {getFieldDecorator("user_phone", {
                  rules: [{ required: true, message: "Enter your telephone!" }]
                })(<Input name="telephone" placeholder="Số điện thoại" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="Quốc gia">
                {getFieldDecorator("user_nation", {
                  rules: [{ required: true, message: "Select your national!" }]
                })(
                  <Select name="national" showSearch placeholder="Quốc gia">
                    <Option value="vn">Việt Nam</Option>
                    <Option value="jp">Nhật bản</Option>
                    <Option value="cn">Trung Quốc</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="Quận/ Huyện">
                {getFieldDecorator("user_district", {
                  rules: [{ required: true, message: "Select your district!" }]
                })(
                  <Cascader
                    name="district"
                    options={residences}
                    placeholder="Quận/ Huyện"
                  />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="Địa chỉ">
                {getFieldDecorator("user_address", {
                  rules: [{ required: true, message: "Enter your address!" }]
                })(<Input name="address" placeholder="Địa chỉ" />)}
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
                  style={{ marginLeft: "auto", marginBottom: "0 !important" }}
                  type="primary"
                  htmlType="submit"
                >
                  Next
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSendDataUser: user => {
      dispatch(actUpdateUserRequest(user));
    }
  };
};

const WrappedHorizontalLoginForm = Form.create()(Personal);
export default connect(null, mapDispatchToProps)(WrappedHorizontalLoginForm);
