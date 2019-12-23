import React from "react";
import {
  Row,
  Col,
  Divider,
  Input,
  Form,
  Upload,
  message,
  Select,
  Icon,
  Button
} from "antd";
// import { Link } from "react-router-dom";
const FormItem = Form.Item;
const { OptGroup } = Select;
const Dragger = Upload.Dragger;
const formItemLayout = {
  labelCol: { xs: 24, sm: 6 },
  wrapperCol: { xs: 24, sm: 18 }
};
const Option = Select.Option;
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
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};
const License = () => {
  return (
    <div className="bg-color-white m-b-3 p-3">
      <div className="">
        <Row>
          <Divider>Xác minh hồ sơ</Divider>
          <Col span={10}>
            <div>
              <div className="p-3" style={{ border: "1px solid #54545454" }}>
                <p>Xác minh thông tin,giấy phép: </p>
                <p>
                  <Icon type="check-circle" /> Nếu bạn tạo mới công ty trên sàn,
                  hãy cung cấp đầy đủ thông tin cho chúng tôi
                </p>
                <p>
                  <Icon type="check-circle" /> Nếu bạn muốn tham gia vào các tổ
                  chức, công ty đã có trên sàn, hãy đợi chúng tôi xác minh cho
                  bạn
                </p>
              </div>
              <p></p>
            </div>
          </Col>
          <Col span={14} className="">
            <Form>
              <div>
                <FormItem {...formItemLayout} label="Mã số kinh doanh">
                  <Input placeholder="Mã số giấy phép kinh doanh" />
                </FormItem>
                <FormItem {...formItemLayout} label="Giấy phép kinh doanh">
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
                </FormItem>
                <FormItem {...formItemLayout} label="Bản đăng ký PDF ">
                  <Button>Download</Button>
                </FormItem>
                <FormItem {...formItemLayout} label="Đơn vị xác minh: ">
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
                </FormItem>
              </div>
            </Form>
            {/* <div className="steps-action">
              <Button type="primary button-next-step">
                <Link to="complete_profile">Xác nhận</Link>
              </Button>

              <Button style={{ marginLeft: 8 }}>
                <Link to="complete_profile">
                  <Icon type="left-circle" /> Quay lại
                </Link>
              </Button>
            </div> */}
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default License;
