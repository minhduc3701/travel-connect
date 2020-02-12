import React, { Component } from "react";
import { Col, Cascader, Input, Icon, Form, Row, Button } from "antd";
import { connect } from "react-redux";
import { actUpdatePersonProfileRequest } from "appRedux/actions/Account";

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
    progress: 100,
    step: 5,
    infoPerson: {
      user_position: null,
      infoUnit: null
    }
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
    // let company = this.props.data;
    return (
      <Row className="p-v-6">
        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
          <div>
            <h3 className="m-b-10">Đại diện công ty</h3>
            <p>
              <Icon type="check-circle" style={{ marginRight: 5 }} />
              Tham gia các hoạt động, mua bán, sự kiện trên sàn.
            </p>
            <p>
              <Icon type="check-circle" style={{ marginRight: 5 }} />
              Yêu cầu có giấy phép hoạt động kinh doanh, chứng nhận,..
            </p>
          </div>
        </Col>
        <Col xl={16} lg={16} md={16} sm={24} xs={24}>
          <div className="block-w bor-rad-6">
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
                })(<Cascader placeholder="Quận/ Huyện" options={residences} />)}
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
        </Col>
      </Row>
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
