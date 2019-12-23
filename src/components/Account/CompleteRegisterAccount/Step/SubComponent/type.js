import React, { Component } from "react";
import { Card, Row, Col, Form, Radio, Button, Divider } from "antd";
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
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
class CompanyType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionNumber: 1,
      value: 0,
      isCompany: false
    };
    // this.props.setOptionNumber(1);
  }
  onChangeTypeCompany(option) {
    switch (option) {
      case 1:
        return (
          <FormItem {...formItemLayout}>
            <RadioGroup onChange={this.onChange2} className="radio-membership">
              <Radio style={radioStyle} value={20}>
                Công ty kinh doanh Du lịch
              </Radio>
              {this.state.value === 20 && (
                <Card className="gx-card guild-card" style={{ width: 600 }}>
                  Công ty/đại lý Lữ hành - Đại lý du lịch trực tuyến - Công ty/
                  Đại lý Du lịch
                </Card>
              )}
              <Radio style={radioStyle} value={2}>
                Vận tải Du lịch
              </Radio>
              <Radio style={radioStyle} value={3}>
                Hàng không
              </Radio>
              <Radio style={radioStyle} value={4}>
                Cơ sở lưu trú
              </Radio>
              <Radio style={radioStyle} value={11}>
                Dịch vụ khác
              </Radio>
              {this.state.value === 11 && (
                <Card className="gx-card guild-card" style={{ width: 600 }}>
                  Visa - Bảo hiểm Du lịch
                </Card>
              )}
            </RadioGroup>
          </FormItem>
        );
      case 2:
        return (
          <FormItem {...formItemLayout}>
            <RadioGroup
              onChange={this.onChange2}
              className="radio-membership"
            >
              <Radio style={radioStyle} value={5}>
                Tổng cục Du lịch, Sở VHTT & DL, Trung tâm xúc tiến Du lịch
              </Radio>
            </RadioGroup>
          </FormItem>
        );
      case 3:
        return (
          <FormItem {...formItemLayout}>
            <RadioGroup onChange={this.onChange2} className="radio-membership">
              <Radio style={radioStyle} value={6}>
                Triển lãm thương mại, Giáo dục, Công nghệ, Tư vấn ....
              </Radio>
            </RadioGroup>
          </FormItem>
        );
      case 4:
        return (
          <FormItem {...formItemLayout}>
            <RadioGroup onChange={this.onChange2} className="radio-membership">
              <Radio style={radioStyle} value={7}>
                Hiệp hội Du lịch, Câu lạc bộ, Diễn đàn, Chi hội Du lịch
              </Radio>
            </RadioGroup>
          </FormItem>
        );
      case 5:
        return (
          <FormItem {...formItemLayout}>
            <RadioGroup onChange={this.onChange2} className="radio-membership">
              <Radio style={radioStyle} value={8}>
                Hướng dẫn viên du lịch
              </Radio>
            </RadioGroup>
          </FormItem>
        );
      case 6:
        return (
          <FormItem {...formItemLayout}>
            <RadioGroup onChange={this.onChange2} className="radio-membership">
              <Radio style={radioStyle} value={9}>
                Báo chí/ truyền thông/ cộng đồng mạng về Du lịch
              </Radio>
            </RadioGroup>
          </FormItem>
        );
      case 8:
        return (
          <FormItem {...formItemLayout}>
            <RadioGroup onChange={this.onChange2} className="radio-membership">
              <Radio style={radioStyle} value={10}>
                ASSOCIATIONS, COMMUNITY
              </Radio>

              <Card className="gx-card guild-card" style={{ width: 600 }}>
                TOURISM BOARD, CONVENTION & VISITORS BUREAU, DESTINATION
                MARKETING ORGANISATION, TOURISM OFFICE, TOURISM ORGANIZATION
              </Card>
            </RadioGroup>
          </FormItem>
        );
      default:
        return null;
    }
  }
  clickOnCompany = () => {
    this.setState({
      isCompany: true
    });
    this.props.handleClickParent(true);
  };
  clickOnIndividual = () => {
    this.setState({
      isCompany: false
    });
    this.props.handleClickParent(false);
  };
  onChange = e => {
    this.setState({
      value: e.target.value
    });
  };
  onChange2 = e => {
    this.props.setOptionNumber(e.target.value);
  };
  componentDidUpdate() {
    window.scrollTo({ top: 1000000000, behavior: "smooth" });
  }
  render() {
    return (
      <div className="step-card">
        <Row>
          <Col span={4}></Col>
          <Col span={16}>
            <div>
              <FormItem {...formItemLayout}>
                <RadioGroup onChange={this.onChange}>
                  <Radio style={radioStyle} value={1}>
                    Bạn đang làm việc tại các Doanh nghiệp Du lịch?
                  </Radio>
                  {this.state.value === 1 && (
                    <Card className="gx-card guild-card">
                      Công ty Du lịch, Công ty Lữ hành, Đại lý Du lịch, Đại lý
                      du lịch trực tuyến, Cơ sở lưu trú, Nhà hàng, Vận chuyển,
                      Hàng không, Điểm đến
                    </Card>
                  )}
                  <Radio style={radioStyle} value={2}>
                    Bạn đang làm việc tại Cơ quan quản lý nhà nước về Du lịch?
                  </Radio>
                  {this.state.value === 2 && (
                    <Card className="gx-card guild-card">
                      Tổng cục Du lịch, Sở VHTT & DL, Trung tâm xúc tiến Du lịch
                    </Card>
                  )}
                  <Radio style={radioStyle} value={3}>
                    Bạn có làm việc với các khách hàng ngành Du lịch?
                  </Radio>
                  {this.state.value === 3 && (
                    <Card className="gx-card guild-card">
                      Triển lãm thương mại, Giáo dục, Công nghệ, Tư vấn ....
                    </Card>
                  )}
                  <Radio style={radioStyle} value={4}>
                    Bạn đang làm việc tại các tổ chức xã hội nghề nghiệp về Du
                    lịch?
                  </Radio>
                  {this.state.value === 4 && (
                    <Card className="gx-card guild-card">
                      Hiệp hội Du lịch, Câu lạc bộ, Diễn đàn, Chi hội Du lịch
                    </Card>
                  )}
                  <Radio style={radioStyle} value={5}>
                    Bạn là Hướng dẫn viên Du lịch?
                  </Radio>
                  <Radio style={radioStyle} value={6}>
                    Bạn đang làm việc cho các đơn vị Báo chí/ truyền thông/ cộng
                    đồng mạng về Du lịch?
                  </Radio>
                  <Radio style={radioStyle} value={7}>
                    Bạn là sinh viên trong ngành Du lịch - Khách sạn?
                  </Radio>
                </RadioGroup>
              </FormItem>

              {this.state.value !== 0 && this.state.value === 7 && (
                <Row style={{ marginTop: 60 }}>
                  <Divider>Tài khoản của bạn là</Divider>
                  <Button
                    className="button-membership-individual-alone"
                    onClick={this.clickOnIndividual}
                  >
                    Cá nhân
                  </Button>
                </Row>
              )}
              {this.state.value !== 0 && this.state.value !== 7 && (
                <div style={{ marginTop: 60 }}>
                  <Row>
                    <Divider>Tài khoản của bạn là</Divider>
                    <Radio.Group
                      className="button-membership-company"
                      size="large"
                    >
                      <Radio.Button value="a" onClick={this.clickOnIndividual}>
                        Cá nhân
                      </Radio.Button>
                      <Radio.Button value="b" onClick={this.clickOnCompany}>
                        Công ty
                      </Radio.Button>
                    </Radio.Group>
                  </Row>
                </div>
              )}
            </div>
          </Col>
        </Row>
        <div>
          <Row>
            <Col span={7}></Col>
            <Col span={16}>
              {this.state.isCompany === true &&
                this.onChangeTypeCompany(this.state.value)}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default CompanyType;
