import React, { Component } from "react";
import {
  Col,
  Cascader,
  Input,
  Icon,
  Form,
  Row,
  Button,
  // Collapse,
  // Radio,
  Select,
  // Checkbox,
  // Upload,
  DatePicker
} from "antd";
import { connect } from "react-redux";
import { actUpdatePersonProfileRequest } from "appRedux/actions/Account";
import { CreateCompanySDK } from "appRedux/actions/CompanyProfile";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import { Redirect } from "react-router-dom";

// const Dragger = Upload.Dragger;
const FormItem = Form.Item;
// const { Panel } = Collapse;
const formItemLayout = {
  labelCol: { xs: 24, sm: 6 },
  wrapperCol: { xs: 24, sm: 18 }
};

const Option = Select.Option;
// const InputGroup = Input.Group;
// const { OptGroup } = Select;

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
    imageFile: false,
    typeAccount: null,
    linkRe: false,
    company: {
      address: null,
      brandname: null,
      city: null,
      confirm: null,
      createdAt: null,
      district: null,
      email: null,
      establish: null,
      licence: null,
      name: null,
      nation: null,
      phone: null,
      target: null,
      licence_file: [],
      business: []
    }
  };
  handleSubmitCompany = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        let establish = this.state.establish ? this.state.establish : "";
        this.setState(
          {
            company: {
              address: values.company_address,
              brandname: values.company_brandname,
              city: values.company_district[0],
              confirm: "",
              createdAt: "",
              district: values.company_district[1],
              email: values.company_email,
              establish: establish,
              licence: "",
              name: values.company_name,
              nation: values.company_nation,
              phone: values.company_phone,
              target: values.company_target,
              licence_file: [],
              business: values.company_business
            }
          },
          () => this.onSendDataPerson()
        );
      }
    });
  };

  onSendDataPerson = async () => {
    await this.props.actCreateCompanySDK(this.state.company);
    this.setState({
      linkRe: true
    });
  };

  onChangeEstablish = (date, dateString) => {
    this.setState({ establish: dateString });
  };

  onSelectType = e => {
    this.setState({
      typeAccount: e
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let { business } = this.state;
    const filteredOptions = OPTIONS.filter(o => !business.includes(o));
    // const props = {
    //   multiple: true,
    //   onRemove: file => {
    //     this.setState(state => {
    //       const index = state.fileList.indexOf(file);
    //       const newFileList = state.fileList.slice();
    //       newFileList.splice(index, 1);
    //       return {
    //         fileList: newFileList
    //       };
    //     });
    //   },
    //   beforeUpload: file => {
    //     this.setState(state => ({
    //       // fileList: file
    //       fileList: [...state.fileList, file]
    //     }));
    //     return false;
    //   },
    //   fileList
    // };
    return (
      <div className="block-w bor-rad-6">
        {this.state.linkRe ? <Redirect to="/verification" /> : null}
        <WidgetHeader title="Hoàn thiện hồ sơ" />
        <Row className="p-v-6">
          <Col xl={8} lg={8} md={8} sm={24} xs={24}>
            <div>
              <div>
                <h3 className="m-b-10">Đại diện công ty</h3>
                <p>
                  <Icon type="check-circle" /> Tham gia các hoạt động, mua bán,
                  sự kiện trên sàn.
                </p>
                <p>
                  <Icon type="check-circle" /> Yêu cầu có giấy phép hoạt động
                  kinh doanh, chứng nhận,...
                </p>
              </div>
            </div>
          </Col>
          <Col xl={16} lg={16} md={16} sm={24} xs={24}>
            <div style={{ borderLeft: "1px solid rgba(0, 0, 0, 0.125)" }}>
              <Form onSubmit={this.handleSubmitCompany}>
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
                      <Option value="VN">Việt Nam</Option>
                      <Option value="KR">Korea</Option>
                      <Option value="JP">Japan</Option>
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
                    <Cascader placeholder="Quận/ Huyện" options={residences} />
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
    },
    actCreateCompanySDK: data => {
      dispatch(CreateCompanySDK(data));
    }
  };
};

const WrappedHorizontalLoginForm = Form.create()(Company);

export default connect(null, mapDispatchToProps)(WrappedHorizontalLoginForm);
