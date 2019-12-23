import React from "react";
import { Divider, Form, Input, Cascader, Radio, Select } from "antd";
import UploadPicture from "../../Step/SubComponent/Avatar";

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

class ProfileRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Divider>Hồ sơ cá nhân</Divider>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="Ảnh đại diện">
            <UploadPicture />
          </FormItem>
          <FormItem {...formItemLayout} label="Họ và tên">
            <Input placeholder="Họ và tên" />
          </FormItem>
          <FormItem {...formItemLayout} label="Giới tính">
            <Radio.Group>
              <Radio value={1}>Nam</Radio>
              <Radio value={2}>Nữ</Radio>
            </Radio.Group>
          </FormItem>
          <FormItem {...formItemLayout} label="Số điện thoại">
            <Input placeholder="Số điện thoại" />
          </FormItem>
          <FormItem {...formItemLayout} label="Quốc gia">
            <Select showSearch>
              <Option value="viet nam">Việt Nam</Option>
              <Option value="nhat bản">Nhật bản</Option>
              <Option value="trungquoc">Trung Quốc</Option>
            </Select>
          </FormItem>
          <FormItem {...formItemLayout} label="Quận/ Huyện">
            <Cascader options={residences} />
          </FormItem>
          <FormItem {...formItemLayout} label="Địa chỉ">
            <Input placeholder="Địa chỉ" />
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default ProfileRegister;
