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
import { notiChange } from "util/Notification";

const FormItem = Form.Item;
const Dragger = Upload.Dragger;
const Option = Select.Option;
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
      notiChange("success", `${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      notiChange("error", `${info.file.name} file upload failed.`);
    }
  }
};

class Verify extends Component {
  state = {
    progress: 100,
    step: 4
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

  render() {
    const { getFieldDecorator } = this.props.form;
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
            <Form onSubmit={this.handleSubmit}>
              <div>
                <Divider>Xác minh hồ sơ</Divider>
                <FormItem {...formItemLayout} label="Mã số kinh doanh">
                  {getFieldDecorator("company_license_number", {
                    rules: [
                      {
                        required: true,
                        message: "Enter your company license number!"
                      }
                    ]
                  })(<Input placeholder="Mã số giấy phép kinh doanh" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Giấy phép kinh doanh">
                  {getFieldDecorator("company_upload_license", {
                    rules: [
                      {
                        required: true,
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
                  {getFieldDecorator("company_license_number", {
                    rules: [
                      {
                        required: true,
                        message: "Enter your company license number!"
                      }
                    ]
                  })(<Button>Download</Button>)}
                </FormItem>
                <FormItem {...formItemLayout} label="Đơn vị xác minh: ">
                  {getFieldDecorator("company_comm", {
                    rules: [
                      {
                        required: true,
                        message: "Chọn đơn vị xác minh!"
                      }
                    ]
                  })(
                    <Select style={{ width: "100%" }}>
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
              </div>
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

const WrappedHorizontalLoginForm = Form.create()(Verify);

export default WrappedHorizontalLoginForm;
