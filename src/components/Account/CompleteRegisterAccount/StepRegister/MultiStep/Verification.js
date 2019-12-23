import React from "react";
import { Select, Form } from "antd";

const FormItem = Form.Item;
const { OptGroup } = Select;
const Option = Select.Option;
const formItemLayout = {
  labelCol: { xs: 24, sm: 6 },
  wrapperCol: { xs: 24, sm: 18 }
};

class Verification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  verificatiType = () => {
    return (
      <div>
        {this.props.multiVerificati ? (
          <div>
            <FormItem
              {...formItemLayout}
              label="Đơn vị xác minh"
              onClick={() => this.openNotificationWithIcon("verify")}
            >
              <Select
                mode="single"
                defaultValue={"1"}
                onChange={() => this.openNotificationWithIcon("verify")}
                style={{ width: "100%" }}
              >
                <OptGroup label="Đơn vị chính">
                  <Option value="1">Travel Connect</Option>
                </OptGroup>
                <OptGroup label="Các đơn vị khác">
                  <Option value="2">Cộng đồng Du Lịch</Option>
                  <Option value="3">Hiệp hội Du Lịch</Option>
                  <Option value="4">Câu lạc bộ</Option>
                </OptGroup>
              </Select>
            </FormItem>
          </div>
        ) : (
          <div>
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
              </Select>
            </FormItem>
          </div>
        )}
      </div>
    );
  };

  render() {
    return <div>{this.verificatiType()}</div>;
  }
}
export default Verification;
