import React, { Component, Fragment } from "react";
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
  Button
} from "antd";
import UploadPicture from "../../Step/SubComponent/Avatar";

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
    person: "",
    progress: 50,
    step: 1
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log("Received values of form: ", values);
        this.props.getState(this.state.step);
        this.setState({
          person: values
        });
      }
    });
  };

  onhandleSubmit = () => {
    console.log("action");
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let person = this.props.data;
    return (
      <Row className="p-v-6">
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
                {getFieldDecorator("avatar", {
                  rules: [
                    {
                      required: false,
                      message: "Enter your avatar!"
                    }
                  ]
                })(<UploadPicture />)}
              </FormItem>
              <FormItem {...formItemLayout} label="Họ và tên">
                {getFieldDecorator("name", {
                  rules: [{ required: true, message: "Enter your username!" }]
                })(<Input placeholder={person.name} />)}
              </FormItem>
              <FormItem {...formItemLayout} label="Giới tính">
                {getFieldDecorator("gendar", {
                  rules: [{ required: true, message: "Select your gendar!" }]
                })(
                  <Radio.Group name="gendar">
                    <Radio value={1}>Nam</Radio>
                    <Radio value={2}>Nữ</Radio>
                  </Radio.Group>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="Số điện thoại">
                {getFieldDecorator("telephone", {
                  rules: [{ required: true, message: "Enter your telephone!" }]
                })(<Input name="telephone" placeholder="Số điện thoại" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="Quốc gia">
                {getFieldDecorator("national", {
                  rules: [{ required: true, message: "Select your national!" }]
                })(
                  <Select name="national" showSearch>
                    <Option value="vietnam">Việt Nam</Option>
                    <Option value="japan">Nhật bản</Option>
                    <Option value="china">Trung Quốc</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="Quận/ Huyện">
                {getFieldDecorator("district", {
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
                {getFieldDecorator("address", {
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
                  onClick={this.onhandleSubmit}
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

const WrappedHorizontalLoginForm = Form.create()(Personal);

// export default Personal;
export default WrappedHorizontalLoginForm;
