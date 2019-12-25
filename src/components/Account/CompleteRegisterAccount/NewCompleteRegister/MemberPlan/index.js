import React, { Component } from "react";
import {
  Col,
  Input,
  Select,
  Button,
  Divider,
  Icon,
  Row,
  Radio,
  Form,
  Modal
} from "antd";
import TypeAccount from "./TypeAccount";

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { xs: 24, sm: 6 },
  wrapperCol: { xs: 24, sm: 18 }
};
const Option = Select.Option;
const InputGroup = Input.Group;
const { OptGroup } = Select;

class MemberPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      typeAccount: 0,
      step: 0
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log("Received values of form: ", values);
        // this.props.getState(this.state.step);
        this.setState(
          {
            step: 3
          },
          () => this.onSetStep()
        );
      }
    });
  };

  showSearch = () => {
    this.setState({
      search: !this.state.search
    });
  };

  onChosePlan = e => {
    this.setState({
      typeAccount: e.target.value
    });
  };

  onGetStateType = typeAcc => {
    console.log(typeAcc);
    this.setState(
      {
        step: typeAcc
      },
      () => this.onSetStep()
    );
  };

  onSetStep = () => {
    this.props.getStep.getStep(this.state.step);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    // console.log(this.props.getStep.getStep);
    return (
      <Row className="p-v-6">
        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
          <div>
            <h3 className="m-b-10">Nội dung hoạt động</h3>
            <p> Lựa chọn hình thức làm việc trên sàn: </p>
            <p>
              <Icon type="check-circle" /> Kiểm tra công ty của bạn đã tồng tại
              bằng cách tìm kiếm trên thanh công cụ
            </p>
            <p>
              <Icon type="check-circle" /> Nếu kết quả trả về có công ty của
              bạn, bạn có thể ấn tham gia để trở thành thành viên của công ty
            </p>
            <p>
              <Icon type="check-circle" /> Nếu công ty của bạn chưa được tạo,
              bạn có thể tạo mới hoặc gợi ý cho chúng tôi:
            </p>
            <p>
              {" "}
              <Icon type="minus-circle" /> Tạo mới công ty: Khi bạn là người
              quản lý, có đầy đủ giấy phép kinh doanh của công ty.
            </p>
            <p>
              {" "}
              <Icon type="minus-circle" /> Giới thiệu: Khi bạn là nhân viên
              không có đầy đủ giấy phép kinh doanh của công ty.
            </p>
          </div>
        </Col>
        <Col xl={16} lg={16} md={16} sm={24} xs={24}>
          <div className="block-w bor-rad-6" style={{ minHeight: "25em" }}>
            <div className="textt-align-center">
              <Divider> Lựa chọn kế hoạch thành viên </Divider>
              <p>
                Công ty của bạn có đang hoạt động trên sàn hay không?
                <span className="gx-link" onClick={() => this.showSearch()}>
                  {" "}
                  Kiểm tra
                </span>
              </p>
              {this.state.search ? (
                <div>
                  <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label="Quốc gia: ">
                      {getFieldDecorator("company_national", {
                        rules: [
                          {
                            required: true,
                            message: "Enter your company national!"
                          }
                        ]
                      })(
                        <Select defaultValue="vn" style={{ width: "100%" }}>
                          <OptGroup label="Châu Á">
                            <Option value="vn">Việt Nam</Option>
                            <Option value="jp">Nhật Bản</Option>
                          </OptGroup>
                          <OptGroup label="Châu Âu">
                            <Option value="fi">Pháp</Option>
                          </OptGroup>
                        </Select>
                      )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Công ty: ">
                      <InputGroup compact>
                        <Select style={{ width: "30%" }} defaultValue="name">
                          <Option value="name">Tên công ty</Option>
                          <Option value="code">Mã số thuế</Option>
                        </Select>
                        {getFieldDecorator("company_detail", {
                          rules: [
                            {
                              required: true,
                              message: "Enter your company detail!"
                            }
                          ]
                        })(<Input style={{ width: "50%" }} />)}

                        <Button
                          style={{ width: "20%" }}
                          type="primary"
                          htmlType="submit"
                        >
                          Tìm kiếm
                        </Button>
                      </InputGroup>
                    </FormItem>
                  </Form>
                </div>
              ) : null}
              <FormItem {...formItemLayout} label="Trạng thái">
                <Radio.Group onChange={this.onChosePlan}>
                  <Radio value={1} disabled={this.props.type === 0 ? true : ""}>
                    Công ty tôi hiện chưa hoạt động trên sàn
                  </Radio>
                  <Radio value={2} disabled={this.props.type === 0 ? true : ""}>
                    Công ty tôi hiện đang hoạt động trên sàn
                  </Radio>
                </Radio.Group>
              </FormItem>
              {this.state.typeAccount === 1 ? (
                <TypeAccount
                  getStateType={this.onGetStateType}
                  typeMem={this.props}
                />
              ) : null}
              {this.state.typeAccount === 2 ? (
                <div>
                  <Form onSubmit={this.handleSubmit}>
                    <p>Thông tin công việc của bạn</p>
                    <FormItem {...formItemLayout} label="Tên công ty">
                      {getFieldDecorator("company_name", {
                        rules: [
                          {
                            required: true,
                            message: "Enter your company name!"
                          }
                        ]
                      })(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Chức vụ">
                      {getFieldDecorator("company_position", {
                        rules: [
                          {
                            required: true,
                            message: "Enter your company position!"
                          }
                        ]
                      })(<Input />)}
                    </FormItem>
                    <div
                      className=" d-flex"
                      style={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "flex-end"
                      }}
                    >
                      {/* <Button
                  onClick={this.onBack}
                  style={{ marginBottom: "0 !important" }}
                >
                  Return
                </Button> */}
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                          marginLeft: "auto",
                          marginBottom: "0 !important"
                        }}
                      >
                        Next
                      </Button>
                    </div>
                  </Form>
                </div>
              ) : null}
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create()(MemberPlan);

export default WrappedHorizontalLoginForm;
