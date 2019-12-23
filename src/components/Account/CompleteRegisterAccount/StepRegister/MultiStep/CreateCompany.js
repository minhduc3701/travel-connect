import React from 'react';
import {Form, Input,Cascader, DatePicker} from 'antd';

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
  
class CreateCompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div>
            {this.props.feild ? (
              <FormItem {...formItemLayout} label="Lĩnh vực hoạt động">
                {this.onSubCompany()}
              </FormItem>
            ) : null}
            <FormItem {...formItemLayout} label="Tên công ty">
              <Input
                placeholder="Tên công ty"
                onClick={() => this.openNotificationWithIcon("companyname")}
              />
            </FormItem>
            <FormItem {...formItemLayout} label="Tên thương hiệu">
              <Input
                placeholder="Tên thương hiệu"
                onClick={() => this.openNotificationWithIcon("brandname")}
              />
            </FormItem>
            <FormItem {...formItemLayout} label="Email">
              <Input
                placeholder="Email công ty"
                onClick={() => this.openNotificationWithIcon("companyemail")}
              />
            </FormItem>
            <FormItem {...formItemLayout} label="Số điện thoại">
              <Input
                placeholder="Số điện thoại cố định"
                onClick={() => this.openNotificationWithIcon("companyphone")}
              />
            </FormItem>
            <FormItem {...formItemLayout} label="Quốc gia/ Quận/ Huyện">
              <Cascader
                options={residences}
                onClick={() => this.openNotificationWithIcon("country")}
              />
            </FormItem>
            <FormItem {...formItemLayout} label="Địa chỉ">
              <Input
                placeholder="Địa chỉ"
                onClick={() => this.openNotificationWithIcon("address")}
              />
            </FormItem>
            <FormItem {...formItemLayout} label="Ngày thành lập">
              <DatePicker
                className="gx-w-100"
                placeholder="Ngày thành lập công ty trên giấy phép kinh doanh"
                onChange={() => this.openNotificationWithIcon("foundingday")}
              />
            </FormItem>
            {this.props.feild ?  (
              <FormItem {...formItemLayout} label="Thị trường">
                <Input
                  placeholder="Thị trường mục tiêu"
                  onChange={() => this.openNotificationWithIcon("market")}
                />
              </FormItem>
            ) : null}
          </div>
            </div>
        );
    }
}

export default CreateCompany;
