import React, { Component, Fragment } from "react";
import { Col, Cascader, Input, Divider, Icon, Form, Row, Button } from "antd";

const FormItem = Form.Item;

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

class Company extends Component {
  state = {
    progress: 75,
    step: 2
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

  onBack = () => {
    this.setState({
      step: 0
    });
    this.props.getState(this.state.step);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let company = this.props.data;
    return (
      <Row className="p-v-6">
        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
          <div>
            <h3 className="m-b-10">Nội dung hoạt động</h3>
            <p> Bao gồm các thông tin : </p>
            <p>
              <Icon type="check-circle" /> Đơn vị, công ty người dùng đang làm
              việc
            </p>
            <p>
              <Icon type="check-circle" /> Công việc, chức vụ người dùng đang
              làm việc
            </p>
            <p>
              <Icon type="check-circle" /> Thông tin xác minh của người dùng đối
              với nơi đang làm việc
            </p>
          </div>
        </Col>
        <Col xl={16} lg={16} md={16} sm={24} xs={24}>
          <div className="block-w bor-rad-6">
            <Divider> Hồ sơ công việc </Divider>
            <Form onSubmit={this.handleSubmit}>
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
                {getFieldDecorator("company_brand", {
                  rules: [
                    {
                      required: true,
                      message: "Enter your company brand!"
                    }
                  ]
                })(<Input placeholder="Tên thương hiệu" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="Chức vụ bản thân">
                {getFieldDecorator("position", {
                  rules: [
                    {
                      required: true,
                      message: "Enter your position!"
                    }
                  ]
                })(<Input placeholder="Chức vụ bản thân" />)}
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
                      required: false,
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
                {getFieldDecorator("address", {
                  rules: [
                    {
                      required: false,
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
        </Col>
      </Row>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create()(Company);

export default WrappedHorizontalLoginForm;
