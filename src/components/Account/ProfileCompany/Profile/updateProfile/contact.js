import React from "react";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";

// import Widget from "components/Widget/index";
import IntlMessages from "util/IntlMessages";
import doneChange from "util/Notification";
// import Avatar from "../../../Step/SubComponent/Avatar";
import { Tooltip, Button, Input, Select, Row, Col } from "antd";
const { Option } = Select;

class Contact extends React.Component {
  state = {
    tel: false,
    address: false,
    zip: false,
    gendar: false,
    website: false
  };
  changeTelToEdit = () => {
    if (this.state.tel === true) {
      this.setState({ tel: false });
      doneChange();
    }
    if (this.state.tel === false) this.setState({ tel: true });
  };
  changeAddressToEdit = () => {
    if (this.state.address === true) {
      doneChange();
      this.setState({ address: false });
    }
    if (this.state.address === false) this.setState({ address: true });
  };
  changeZipToEdit = () => {
    if (this.state.zip === true) {
      doneChange();
      this.setState({ zip: false });
    }
    if (this.state.zip === false) this.setState({ zip: true });
  };
  changeGendarToEdit = () => {
    if (this.state.gendar === true) this.setState({ gendar: false });
    if (this.state.gendar === false) this.setState({ gendar: true });
  };
  changeWebsiteToEdit = () => {
    if (this.state.website === true) this.setState({ website: false });
    if (this.state.website === false) this.setState({ website: true });
  };
  render() {
    const selectBefore = (
      <Select defaultValue="Http://" style={{ width: 90 }}>
        <Option value="Http://">Http://</Option>
        <Option value="Https://">Https://</Option>
      </Select>
    );

    return (
      <div className="step-card">
        <WidgetHeader
          styleName="gx-flex-row"
          title={<IntlMessages id="company.contact" />}
        />
        <div
          className="block"
          style={{ backgroundColor: "white", borderRadius: 10 }}
        >
          {/* Email */}
          <Row className="m-b-3 align-items-center">
            <Col xs={24} sm={24} md={6} lg={4} xl={4}>
              <p className="text-align-right p-r-5-i">
                {<IntlMessages id="appModule.email" />}
              </p>
            </Col>
            <Col className="bor-b" xs={24} sm={24} md={18} lg={20} xl={20}>
              <Row className="m-b-3-i align-items-center">
                <Col xs={18} sm={18} md={18} lg={20} xl={20}>
                  {this.state.tel === false ? (
                    <p className="m-b-0-i">info@travelconnect.vn</p>
                  ) : (
                    <Tooltip title="Chỉnh sửa địa chỉ mail của doanh nghiệp">
                      <Input defaultValue="info@travelconnect.vn" />
                    </Tooltip>
                  )}
                </Col>
                <Col
                  className="text-align-center"
                  xs={6}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={4}
                >
                  <Button
                    className="m-b-0-i"
                    type="primary"
                    style={{ width: 96 }}
                    onClick={() => this.changeTelToEdit()}
                  >
                    {this.state.tel === false ? (
                      <IntlMessages id="edit" />
                    ) : (
                      <IntlMessages id="done" />
                    )}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Phone */}
          <Row className="m-b-3 align-items-center">
            <Col xs={24} sm={24} md={6} lg={4} xl={4}>
              <p className="text-align-right p-r-5-i">
                {<IntlMessages id="appModule.phone" />}
              </p>
            </Col>
            <Col className="bor-b" xs={24} sm={24} md={18} lg={20} xl={20}>
              <Row className="m-b-3-i align-items-center">
                <Col xs={18} sm={18} md={18} lg={20} xl={20}>
                  {this.state.address === false ? (
                    <div>
                      <p className="m-b-0-i">02466682288</p>
                    </div>
                  ) : (
                    <Tooltip title="Chỉnh sửa số điện thoại của doanh nghiệp">
                      <Input defaultValue="02466682288" />
                    </Tooltip>
                  )}
                </Col>
                <Col
                  className="text-align-center"
                  xs={6}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={4}
                >
                  <Button
                    className="m-b-0-i"
                    type="primary"
                    style={{ width: 96 }}
                    onClick={() => this.changeAddressToEdit()}
                  >
                    {this.state.address === false ? (
                      <IntlMessages id="edit" />
                    ) : (
                      <IntlMessages id="done" />
                    )}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Website */}
          <Row className="m-b-3 align-items-center">
            <Col xs={24} sm={24} md={6} lg={4} xl={4}>
              <p className="text-align-right p-r-5-i">Website</p>
            </Col>
            <Col xs={24} sm={24} md={18} lg={20} xl={20}>
              <Row className="m-b-3-i align-items-center">
                <Col xs={18} sm={18} md={18} lg={20} xl={20}>
                  {this.state.zip === false ? (
                    <p className="m-b-0-i gx-link">https://travelconnect.vn</p>
                  ) : (
                    <Tooltip title="Chỉnh sửa địa chỉ website của doanh nghiệp">
                      <Input
                        addonBefore={selectBefore}
                        defaultValue="travelconnect.global"
                      />
                    </Tooltip>
                  )}
                </Col>
                <Col
                  className="text-align-center"
                  xs={6}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={4}
                >
                  <Button
                    className="m-b-0-i"
                    type="primary"
                    style={{ width: 96 }}
                    onClick={() => this.changeZipToEdit()}
                  >
                    {this.state.zip === false ? (
                      <IntlMessages id="edit" />
                    ) : (
                      <IntlMessages id="done" />
                    )}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Contact;
