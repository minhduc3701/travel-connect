import React, { Component } from "react";
import {
  Col,
  Input,
  Divider,
  Icon,
  Form,
  Row,
  Select,
  Button,
  Upload
} from "antd";
// import { notiChange } from "util/Notification";
import { connect } from "react-redux";
import {
  actSaveProfile4,
  actCreateCompanyRequest
} from "../../../../../appRedux/actions/Account";
// import { CallApi_ACCOUNT } from "util/CallApi";

const FormItem = Form.Item;
const Dragger = Upload.Dragger;
const Option = Select.Option;
const { OptGroup } = Select;
const formItemLayout = {
  labelCol: { xs: 24, sm: 6 },
  wrapperCol: { xs: 24, sm: 18 }
};

class Verify extends Component {
  state = {
    progress: 100,
    step: 5,
    detailStep4: {
      company_licence: null,
      company_licence_file: "",
      company_unit_confirm: null
    },
    fileList: []
  };

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log("Received values of form: ", values);
        let file = values.company_licence_file
          ? values.company_licence_file
          : "";
        this.setState(
          {
            detailStep4: {
              company_licence: values.company_licence,
              company_licence_file: file,
              company_unit_confirm: values.company_unit_confirm
            }
          },
          () => this.onSaveData(this.state.fileList)
        );
      }
    });
  };
  onSaveData = file => {
    this.props.actSaveDataToStore(this.state.detailStep4);
    let data = {};
    let profiles = this.props.profile;
    let dataResult = Object.assign(data, profiles[0], profiles[1]);
    this.props.actSendDateToServer(dataResult, file);
    this.props.getState(this.state.step);
    // this.onSendImage(file);
  };

  // onSendImage = () => {
  //   let userInfo = JSON.parse(localStorage.getItem("user_info"));
  //   const { fileList } = this.state;
  //   const formData = new FormData();
  //   fileList.forEach(file => {
  //     formData.append("image-", file);
  //   });
  //   // console.log(fileList);
  //   CallApi_ACCOUNT(
  //     `VN/companies/${userInfo.user_id}/licenceDocs`,
  //     "PUT",
  //     formData
  //   )
  //     .then(res => console.log(res))
  //     .catch(err => console.log(err));
  // };

  render() {
    console.log(this.props);
    const { getFieldDecorator } = this.props.form;
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
      <Row className="p-v-6">
        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
          <div>
            <h3 className="m-b-10"> Xác minh thông tin, giấy phép </h3>
            <p>
              <Icon type="check-circle" /> Nếu bạn tạo mới công ty trên sàn, hãy
              cung cấp đầy đủ thông tin cho chúng tôi
            </p>
            <p>
              <Icon type="check-circle" /> Nếu bạn muốn tham gia vào các tổ
              chức, công ty đã có trên sàn, hãy đợi chúng tôi xác minh cho bạn
            </p>
          </div>
        </Col>
        <Col xl={16} lg={16} md={16} sm={24} xs={24}>
          <div className="block-w bor-rad-6">
            <Divider>Xác minh hồ sơ</Divider>
            <Form onSubmit={this.handleSubmit}>
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
                      Cập nhật/Upload giấy phép kinh doanh; Giấy phép hành nghề
                      của công ty bạn tại đây
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
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.Step
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    actSaveDataToStore: step4 => {
      dispatch(actSaveProfile4(step4));
    },
    actSendDateToServer: (profile, file) => {
      dispatch(actCreateCompanyRequest(profile, file));
    }
  };
};

const WrappedHorizontalLoginForm = Form.create()(Verify);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedHorizontalLoginForm);
