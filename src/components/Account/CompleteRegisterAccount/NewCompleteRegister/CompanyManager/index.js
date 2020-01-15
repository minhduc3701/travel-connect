import React, { Component } from "react";
import {
  Col,
  Cascader,
  Input,
  Select,
  DatePicker,
  Icon,
  Form,
  Row,
  Button
} from "antd";
import { connect } from "react-redux";
import { actSaveProfile3 } from "appRedux/actions/Account";

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

const OPTIONS = [
  "Lữ hành quốc tế Outbound",
  "Lữ hành nội địa",
  "Đại lý Du lịch",
  "Vận tải",
  "Hàng không",
  "Cơ sỏ lưu trú",
  "Nhà hàng"
];

class Company extends Component {
  state = {
    progress: 75,
    step: 4,
    business: [],
    establish: null,
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
    }
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
            }
          },
          () => this.onSendData()
        );
      }
    });
  };

  onSendData = () => {
    this.props.getState(this.state.step, this.state.progress);
    this.props.actSendDetailToStore(this.state.infoType);
  };

  handleChangeBusiness = business => {
    this.setState({ business });
  };

  onChangeEstablish = (date, dateString) => {
    this.setState({ establish: dateString });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { business } = this.state;
    const filteredOptions = OPTIONS.filter(o => !business.includes(o));
    // let company = this.props.data;
    return (
      <Row className="p-v-6">
        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
          <div>
            <h3 className="m-b-10">Nội dung thông tin cá nhân</h3>
            <p>
              <Icon type="check-circle" style={{ marginRight: 5 }} />
              Tham gia các hoạt động, sự kiện trên sàn.
            </p>
            <p>
              <Icon type="check-circle" style={{ marginRight: 5 }} />
              Không yêu cầu giấy phép kinh doanh.
            </p>
          </div>
        </Col>
        <Col xl={16} lg={16} md={16} sm={24} xs={24}>
          <div className="block-w bor-rad-6">
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
                })(<Cascader placeholder="Quận/ Huyện" options={residences} />)}
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
    actSendDetailToStore: step3 => {
      dispatch(actSaveProfile3(step3));
    }
  };
};

const WrappedHorizontalLoginForm = Form.create()(Company);

export default connect(null, mapDispatchToProps)(WrappedHorizontalLoginForm);
