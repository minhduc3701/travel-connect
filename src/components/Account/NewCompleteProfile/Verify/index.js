import React, { Component } from "react";
import { Col, Input, Icon, Form, Row, Button, Select, Upload } from "antd";
import { connect } from "react-redux";
import { VerifyCompanySDK } from "appRedux/actions/CompanyProfile";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";

const Dragger = Upload.Dragger;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { xs: 24, sm: 6 },
  wrapperCol: { xs: 24, sm: 18 }
};

const Option = Select.Option;
// const InputGroup = Input.Group;
const { OptGroup } = Select;

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
    verifyData: {
      license: null,
      // licence_file: null,
      licenceDoc: null,
      confirm: null
    }
  };
  handleSubmitPerson = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let licenceFile = values.company_licence_file
          ? values.company_licence_file
          : "";
        this.setState(
          {
            verifyData: {
              license: values.company_licence,
              // licence_file: null,
              licenceDoc: licenceFile,
              confirm: values.company_unit_confirm
            }
          },
          () => this.onSendDataPerson()
        );
      }
    });
  };

  onSendDataPerson = async () => {
    await this.props.actSendDataToServer(this.state.verifyData);
  };

  onSelectType = e => {
    this.setState({
      typeAccount: e
    });
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
        <Row className="p-v-6">
          <Col xl={8} lg={8} md={8} sm={24} xs={24}>
            <div style={{ borderRight: "1px solid rgba(0, 0, 0, 0.125)" }}>
              <h3 className="m-b-10">Xác minh thông tin, giấy phép</h3>
              <p>
                <Icon type="check-circle" /> Nếu bạn tạo mới công ty trên sàn,
                hãy cung cấp đầy đủ thông tin cho chúng tôi
              </p>
              <p>
                <Icon type="check-circle" /> Nếu bạn muốn tham gia vào các tổ
                chức, công ty đã có trên sàn, hãy đợi chúng tôi xác minh cho bạn
              </p>
            </div>
          </Col>
          <Col xl={16} lg={16} md={16} sm={24} xs={24}>
            <div style={{ paddingBottom: "2em" }}>
              <Form onSubmit={this.handleSubmitPerson}>
                <FormItem {...formItemLayout} label="Mã số kinh doanh">
                  {getFieldDecorator("company_licence", {
                    rules: [
                      {
                        required: true,
                        message: "Enter your company license number!"
                      }
                    ]
                  })(<Input placeholder="Mã số giấy phép kinh doanh" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Giấy phép kinh doanh">
                  {getFieldDecorator("company_licence_file", {
                    valuePropName: "fileList",
                    getValueFromEvent: this.normFile,
                    rules: [
                      {
                        required: false,
                        message: "Upload your company license!"
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
                        Cập nhật/Upload giấy phép kinh doanh; Giấy phép hành
                        nghề của công ty bạn tại đây
                      </p>
                    </Dragger>
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="Bản đăng ký PDF ">
                  {/* {getFieldDecorator("company_license_number", {
                    rules: [
                      {
                        required: false,
                        message: "Enter your company license number!"
                      }
                    ]
                  })(<Button>Download</Button>)} */}
                  <Button>Download</Button>
                </FormItem>
                <FormItem {...formItemLayout} label="Đơn vị xác minh: ">
                  {getFieldDecorator("company_unit_confirm", {
                    rules: [
                      {
                        required: true,
                        message: "Chọn đơn vị xác minh!"
                      }
                    ]
                  })(
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Đơn vị xác minh"
                    >
                      <OptGroup label="Đơn vị chính">
                        <Option value="tc">Travel Connect</Option>
                      </OptGroup>
                      <OptGroup label="Cộng đồng du lịch">
                        <Option value="cdvn">Cộng đồng Du lịch Việt Nam</Option>
                        <Option value="cda">Cộng đồng Du lịch Châu Á</Option>
                        <Option value="cdqt">Cộng đồng Du lịch Quốc tế</Option>
                      </OptGroup>
                      <OptGroup label="Câu lạc bộ du lịch">
                        <Option value="clhn">Câu lạc bộ du lịch Hà Nội</Option>
                        <Option value="clhcm">
                          Câu lạc bộ du lịch Hồ Chí Minh
                        </Option>
                        <Option value="cldn">Câu lạc bộ du lịch Đà Nẵng</Option>
                      </OptGroup>
                      <OptGroup label="Hiệp hội du lịch">
                        <Option value="hhhn">Hiệp hội du lịch Hà Nội</Option>
                        <Option value="hhhcm">
                          Hiệp hội du lịch Hồ Chí Minh
                        </Option>
                        <Option value="hhdn">Hiệp hội du lịch Đà Nẵng</Option>
                      </OptGroup>
                    </Select>
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
                  {/* <Button style={{ marginBottom: "0 !important" }}>Return</Button> */}
                  <Button
                    htmlType="submit"
                    type="primary"
                    style={{ marginBottom: "0 !important" }}
                  >
                    Complete
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
      dispatch(VerifyCompanySDK(profile));
    }
  };
};

const WrappedHorizontalLoginForm = Form.create()(Company);

export default connect(null, mapDispatchToProps)(WrappedHorizontalLoginForm);
