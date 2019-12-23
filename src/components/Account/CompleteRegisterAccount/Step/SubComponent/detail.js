import React, { Component } from "react";
import {

  Form,
  Select,
  DatePicker,
  Input,
  Radio,
  Col,
  Row,
  Anchor,
  Cascader,
  Divider
} from "antd";
import IntlMessages from "util/IntlMessages";
import Avatar from "./Avatar"
import "./otherFormControls.less";



const FormItem = Form.Item;
const Option = Select.Option;

const RadioGroup = Radio.Group;
class OtherFormControls extends Component {
    constructor(props) {
        super(props);
        // alert(props.option)
        this.state = {
          guild: "",
          value: 1
        }
      };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      // Should format date value before submit.
      const rangeValue = fieldsValue["range-picker"];
      const rangeTimeValue = fieldsValue["range-time-picker"];
      const values = {
        ...fieldsValue,
        "date-picker": fieldsValue["date-picker"].format("YYYY-MM-DD"),
        "date-time-picker": fieldsValue["date-time-picker"].format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        "month-picker": fieldsValue["month-picker"].format("YYYY-MM"),
        "range-picker": [
          rangeValue[0].format("YYYY-MM-DD"),
          rangeValue[1].format("YYYY-MM-DD")
        ],
        "range-time-picker": [
          rangeTimeValue[0].format("YYYY-MM-DD HH:mm:ss"),
          rangeTimeValue[1].format("YYYY-MM-DD HH:mm:ss")
        ],
        "time-picker": fieldsValue["time-picker"].format("HH:mm:ss")
      };
      console.log("Received values of form: ", values);
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
  getCompanyType(option) {
    switch (option) {
      case 20:
        return (
          <Select
            mode="single"
            defaultValue={"1"}
            onChange={() => this.openNotificationWithIcon("companytype")}
          >
            <Option value="1">Công ty/đại lý Lữ hành Nội địa</Option>
            <Option value="2">Công ty/ Đại lý Lữ Hành Quốc tế</Option>
            <Option value="3">Đại lý Du lịch Trực tuyến</Option>
            <Option value="19">Công ty/Đại lý Du lịch</Option>
          </Select>
        );
      case 2:
        return (
          <Select mode="single" defaultValue={"4"} onChange={() => this.openNotificationWithIcon("companytype")}>
            <Option value="4">Vận tải du lịch</Option>
          </Select>
        );
      case 3:
        return (
          <Select mode="single" defaultValue={"4"} onChange={() => this.openNotificationWithIcon("companytype")}>
            <Option value="4">Hàng không</Option>
          </Select>
        );
      case 4:
        return (
          <Select mode="single" defaultValue={"5"} onChange={() => this.openNotificationWithIcon("companytype")}>
            <Option value="5">Cơ sở lưu trú</Option>
          </Select>
        );
      case 5:
        return (
          <Select mode="single" defaultValue={"6"} onChange={() => this.openNotificationWithIcon("companytype")}>
            <Option value="6">Tổng cục Du lịch, Sở VHTT & DL, Trung tâm xúc tiến Du lịch</Option>
          </Select>
        );
      case 6:
        return (
          <Select
            mode="single"
            defaultValue={"7"}
            onChange={() => this.openNotificationWithIcon("companytype")}
          >
            <Option value="7">
              Triển lãm thương mại, Giáo dục, Công nghệ, Tư vấn ....
            </Option>
          </Select>
        );
      case 7:
        return (
          <Select mode="single" defaultValue={"15"} onChange={() => this.openNotificationWithIcon("companytype")}>
            <Option value="15">Hiệp hội Du lịch, Câu lạc bộ, Diễn đàn, Chi hội Du lịch</Option>
          </Select>
        );
      case 8:
        return (
          <Select
            mode="single"
            defaultValue={"7"}
            onChange={() => this.openNotificationWithIcon("companytype")}
          >
            <Option value="7">Hướng dẫn viên du lịch</Option>
          </Select>
        );
        case 9:
        return (
          <Select mode="single" defaultValue={"1"} onChange={() => this.openNotificationWithIcon("companytype")}>
            <Option value="1">Báo chí/ truyền thông/ cộng đồng mạng về Du lịch</Option>
          </Select>
        );
        case 10:
        return (
          <Select mode="single" defaultValue={"18"} onChange={() => this.openNotificationWithIcon("companytype")}>
            <Option value="18">Sinh viên ngành du lịch</Option>
          </Select>
        );
        case 11:
        return (
          <Select mode="single" defaultValue={"19"} onChange={() => this.openNotificationWithIcon("companytype")}>
            <Option value="19">Visa</Option>
            <Option value="20">Bảo hiểm du lịch</Option>
          </Select>
        );
      default:
        return null;
    }
  }
  getHelpContent(label){
      switch (label) {
        case "personname":
          return <p>Nhập vào họ và tên của bạn</p>;
        case "personphone":
          return <p>Nhập vào số điện thoại của bạn</p>;
        case "personposition":
          return <p>Nhập vào vị trí của bạn trong công ty</p>;
        case "companytype":
          return (
            <p>
              Lựa chọn loại công ty của bạn <br />
              Nếu bạn chọn<b> Công ty/ Đại lý Lữ Hành Quốc tế </b>,
              loại hình doanh nghiệp xuất hiện trong tài khoản doanh nghiệp của bạn sẽ bao gồm cả Lữ hành Nội địa
            </p>
          );
        case "companyname":
          return <p>Nhập tên công ty của bạn</p>;
        case "country":
          return <p>Chọn quốc gia và quận huyện của bạn</p>;
        case "state":
          return <p>Enter your company's state</p>;
        case "licensenumber":
          return <p>Nhập vào mã số giấy phép kinh doanh</p>;
        case "brandname":
          return (
            <p>
              Gửi hình ảnh của giấy phép kinh doanh <br />
            </p>
          );
        case "foundingday":
          return <p>Nhập vào ngày thành lập của công ty</p>;
        case "market":
          return <p>Nhập vào thị trường mà công ty đang hướng đến</p>;
        case "companyemail":
          return <p>Nhập vào email của công ty</p>;
        case "companyphone":
          return <p>Nhập vào số điện thoại cố định của công ty</p>;
          case "address":
          return <p>Nhập vào địa chỉ của công ty</p>;
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
    const radioStyle = {
      display: "inline-block",
      height: "30px",
      lineHeight: "60px",
      width: "800px",
      fontSize: "18px"
    };
  
    const residences = [
      {
        value: 'vietnam',
        label: 'Vietnam',
        children: [
          {
            value: 'hanoi',
            label: 'Hanoi',
            children: [
              {
                value: 'dongda',
                label: 'Đống Đa',
              },
            ],
          },
          {
            value: 'hanoi',
            label: 'Hanoi',
            children: [
              {
                value: 'dongda',
                label: 'Đống Đa',
              },
            ],
          },
          {
            value: 'hanoi',
            label: 'Hanoi',
            children: [
              {
                value: 'dongda',
                label: 'Đống Đa',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ];
    return (
      <Row className="step-card">
        <Col span={18}>
          <div className="step-card">
            <Form onSubmit={this.handleSubmit}>
            <Divider>Thông tin cá nhân</Divider>
              <FormItem {...formItemLayout} label="Tên">
                <Input
                  placeholder="Họ và tên"
                  onClick={() => this.openNotificationWithIcon("personname")}
                />
              </FormItem>
              <FormItem {...formItemLayout} label="Số điện thoại">
                <Input
                  placeholder="Số điện thoại liên hệ"
                  onClick={() => this.openNotificationWithIcon("personphone")}
                />
              </FormItem>
              <FormItem {...formItemLayout} label="Chức vụ">
                <Input
                  placeholder="Chức vụ"
                  onClick={() =>
                    this.openNotificationWithIcon("personposition")
                  }
                />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="step.detail.avatar" />}
              >
                <Avatar />
              </FormItem>

              {this.props.option === true ? (
                <div>
                  <Divider>Thông tin doanh nghiệp</Divider>
                  <FormItem
                    {...formItemLayout}
                    label="Ngành công nghiệp"
                    onClick={() => this.openNotificationWithIcon("companytype")}
                  >
                    {this.getCompanyType(this.props.optionNumberDetail)}
                  </FormItem>
                  <FormItem {...formItemLayout} label="Tên công ty">
                    <Input
                      placeholder="Tên công ty"
                      onClick={() =>
                        this.openNotificationWithIcon("companyname")
                      }
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
                      onClick={() =>
                        this.openNotificationWithIcon("companyemail")
                      }
                    />
                  </FormItem>
                  <FormItem {...formItemLayout} label="Số điện thoại">
                    <Input
                      placeholder="Số điện thoại cố định"
                      onClick={() =>
                        this.openNotificationWithIcon("companyphone")
                      }
                    />
                  </FormItem>
                  <FormItem {...formItemLayout} label="Quốc gia/ Quận/ Huyện">
                    <Cascader
                      options={residences}
                      onClick={() => this.openNotificationWithIcon("country")}
                    />
                  </FormItem>
                  <FormItem {...formItemLayout} label="Địa chỉ">
                    <Input placeholder="Địa chỉ"
                      onClick={() => this.openNotificationWithIcon("address")}
                    />
                  </FormItem>
            
                  <FormItem {...formItemLayout} label="Ngày thành lập">
                    <DatePicker
                      className="gx-w-100"
                      placeholder="Ngày thành lập công ty trên giấy phép kinh doanh"
                      onChange={() =>
                        this.openNotificationWithIcon("foundingday")
                      }
                    />
                  </FormItem>
                  <FormItem {...formItemLayout} label="Thị trường">
                    <Input
                      placeholder="Thị trường mục tiêu"
                      onChange={() => this.openNotificationWithIcon("market")}
                    />
                  </FormItem>
         
                </div>
              ) : (
                <div>
                  <FormItem
                    {...formItemLayout}
                    label="Tình trạng"
                  >
                    <RadioGroup
                      onChange={this.onChange}
                      value={this.state.value}
                    >
                      <Radio style={radioStyle} value={1}>
                        Tôi đã có công ty, công ty của tôi đã có trên hệ thống
                      </Radio>
                      <Radio style={radioStyle} value={2}>
                        Tôi là freelancer
                      </Radio>
                      <Radio style={radioStyle} value={3}>
                        Tôi đã có công ty nhưng công ty của tôi chưa có trên hệ thống
                      </Radio>
                    </RadioGroup>
                  </FormItem>
                  {this.state.value === 1 && (
                    <FormItem
                      {...formItemLayout}
                      label="Tên công ty"
                    >
                      <Select mode="single">
                        <Option value="red">CT1</Option>
                        <Option value="green">CT2</Option>
                        <Option value="blue">CT3</Option>
                      </Select>
                    </FormItem>
                  )}
                  {this.state.value === 2 && (
                    <div>
                      <FormItem
                        {...formItemLayout}
                        label={<IntlMessages id="step.detail.companyname" />}
                      >
                        <Select mode="single">
                          <Option value="red">CT1</Option>
                          <Option value="green">CT2</Option>
                          <Option value="blue">CT3</Option>
                        </Select>
                      </FormItem>
                    </div>
                  )}
                  {this.state.value === 3 && (
                    <div>
                    <Divider>Thông tin doanh nghiệp</Divider>
                    <FormItem
                      {...formItemLayout}
                      label="Ngành công nghiệp"
                      onClick={() => this.openNotificationWithIcon("companytype")}
                    >
                      {this.getCompanyType(this.props.optionNumberDetail)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Tên công ty">
                      <Input
                        placeholder="Tên công ty"
                        onClick={() =>
                          this.openNotificationWithIcon("companyname")
                        }
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
                        onClick={() =>
                          this.openNotificationWithIcon("companyemail")
                        }
                      />
                    </FormItem>
                    <FormItem {...formItemLayout} label="Số điện thoại">
                      <Input
                        placeholder="Số điện thoại cố định"
                        onClick={() =>
                          this.openNotificationWithIcon("companyphone")
                        }
                      />
                    </FormItem>
                   
                    <FormItem {...formItemLayout} label="Quốc gia/ Quận/ Huyện">
                      <Cascader
                        options={residences}
                        onClick={() => this.openNotificationWithIcon("country")}
                      />
                    </FormItem>
                    <FormItem {...formItemLayout} label="Địa chỉ">
                      <Input placeholder="Địa chỉ" onClick={() => this.openNotificationWithIcon("address")}/>
                    </FormItem>
                    
                    <FormItem {...formItemLayout} label="Ngày thành lập">
                      <DatePicker
                        className="gx-w-100"
                        placeholder="Ngày thành lập công ty trên giấy phép kinh doanh"
                        onChange={() =>
                          this.openNotificationWithIcon("foundingday")
                        }
                      />
                    </FormItem>
                    <FormItem {...formItemLayout} label="Thị trường">
                      <Input
                        placeholder="Thị trường mục tiêu"
                        onChange={() => this.openNotificationWithIcon("market")}
                      />
                    </FormItem>
                  </div>
                  )}
                </div>
              )}
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
