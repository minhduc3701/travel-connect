import React, { Component } from "react";
import {
  Form,
  Upload,
  Icon,
  message,
  Select,
  Input,
  Col,
  Row,
  Anchor,
  Divider,
  Button
} from "antd";
// import IntlMessages from "util/IntlMessages";
import "./otherFormControls.less";



const FormItem = Form.Item;
const Option = Select.Option;
const Dragger = Upload.Dragger;
const {OptGroup} = Select;
const props = {
  name: 'file',
  multiple: true,
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
class OtherFormControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
          guild: ""
        }
      };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
    });
  };
  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  openNotificationWithIcon = (type) => {
    this.setState({
        guild : type
    })
}
 
  getHelpContent(label){
      switch (label) {
        case "verify":
          return <p>Lựa chọn đơn vị xác minh hồ sơ cho doanh nghiệp của bạn</p>;
        
        case "licensenumber":
          return <p>Nhập vào mã số giấy phép kinh doanh</p>;
        case "licenseimage":
          return (
            <p>
              Gửi hình ảnh của giấy phép kinh doanh <br />
            </p>
          );
        default:
          return <p>Điền vào các thông tin yêu cầu</p>;
      }
  }
  
  // Adds an event listener when the component is mount.
 
  render() {
  
    const formItemLayout = {
      labelCol: { xs: 24, sm: 6 },
      wrapperCol: { xs: 24, sm: 14 }
    };
  
  
    return (
      <Row className="step-card">
        <Col span={18}>
          <div className="step-card">
            <Form onSubmit={this.handleSubmit}>
              <div>
                <Divider>Thông tin để xác minh doanh nghiệp</Divider>
                <FormItem {...formItemLayout} label="Mã số kinh doanh">
                  <Input
                    placeholder="Mã số giấy phép kinh doanh"
                    onClick={() =>
                      this.openNotificationWithIcon("licensenumber")
                    }
                  />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Giấy phép kinh doanh"
                >
                  <Dragger
                    {...props}
                    onChange={() =>
                      this.openNotificationWithIcon("licenseimage")
                    }
                  >
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
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Đơn vị xác minh"
                  onClick={() => this.openNotificationWithIcon("verify")}
                >
                  <Select
                    mode="single"
                    defaultValue={"1"}
                    onChange={() => this.openNotificationWithIcon("verify")}
                  >
                    <OptGroup label="Đơn vị chính">
                      <Option value="1">Travel Connect</Option>
                    </OptGroup>
                    <OptGroup label="Các đơn vị khác">
                      <Option value="2">Đơn vị 1</Option>
                      <Option value="3">Đơn vị 2</Option>
                      <Option value="4">Đơn vị 3</Option>
                    </OptGroup>
                  </Select>
                </FormItem>
                <FormItem {...formItemLayout} label="Bản đăng ký PDF ">
                  <Button>Download</Button>
                </FormItem>
              </div>
            </Form>
          </div>
        </Col>
        <Col span={6}>
          <Anchor style={{ marginTop: 20 }} className="guide-form">
            <div className={"help-card"}>
              <div className={`gx-package`}>
                <div className={`gx-package-header header-help`} id="helper">
                  <h3 className="gx-text-white">
                    <i className="icon icon-data-display" /> Tip
                  </h3>
                </div>
                <div className="body-help">
                  {this.getHelpContent(this.state.guild)}
                </div>
              </div>
            </div>
          </Anchor>
        </Col>
      </Row>
    );
  }
}

const Detail = Form.create()(OtherFormControls);

export default Detail;
