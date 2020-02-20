import React from "react";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";

// import Widget from "components/Widget/index";
import IntlMessages from "util/IntlMessages";
import doneChangeNoti from "util/Notification";
// import Avatar from "../../../Step/SubComponent/Avatar";
import { Tooltip, Button, Cascader, Input, Row, Col } from "antd";

const residences = [
  {
    value: "vietnam",
    label: "Việt Nam",
    children: [
      {
        value: "hanoi",
        label: "Hà Nội",
        children: [
          {
            value: "dongda",
            label: "Đống Đa"
          }
        ]
      },
      {
        value: "haiphong",
        label: "Hải Phòng",
        children: [
          {
            value: "lechan",
            label: "Lê Chân"
          }
        ]
      },
      {
        value: "haiduong",
        label: "Hải Dương",
        children: [
          {
            value: "dongda",
            label: "Chí Linh"
          }
        ]
      }
    ]
  },
  {
    value: "england",
    label: "Anh",
    children: [
      {
        value: "london",
        label: "London",
        children: [
          {
            value: "??",
            label: "??"
          }
        ]
      }
    ]
  }
];
class Address extends React.Component {
  state = {
    tel: false,
    address: false,
    zip: false,
    gendar: false,
    website: false
  };
  changeTelToEdit = () => {
    if (this.state.tel === true) {
      doneChangeNoti();
      this.setState({ tel: false });
    }
    if (this.state.tel === false) this.setState({ tel: true });
  };
  changeAddressToEdit = () => {
    if (this.state.address === true) {
      doneChangeNoti();
      this.setState({ address: false });
    }
    if (this.state.address === false) this.setState({ address: true });
  };
  changeZipToEdit = () => {
    if (this.state.zip === true) {
      doneChangeNoti();
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
    return (
      <div>
        <WidgetHeader
          styleName="gx-flex-row"
          title={<IntlMessages id="step.information.address" />}
        />
        <div
          className="block"
          style={{ backgroundColor: "white", borderRadius: 10 }}
        >
          {/* Country */}
          <Row className="m-b-3 align-items-center">
            <Col xs={24} sm={24} md={6} lg={4} xl={4}>
              <p className="text-align-right p-r-5-i">
                {<IntlMessages id="stateCityCountry" />}
              </p>
            </Col>
            <Col className="bor-b" xs={24} sm={24} md={18} lg={20} xl={20}>
              <Row className="m-b-3-i align-items-center">
                <Col xs={18} sm={18} md={18} lg={20} xl={20}>
                  {this.state.tel === false ? (
                    <p className="m-b-0-i">Hoàng Mai, Hà Nội, Việt Nam</p>
                  ) : (
                    <Tooltip title="Chỉnh sửa tên quốc gia, quận, huyện của doanh nghiệp">
                      <Cascader options={residences} />
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

          {/* Address */}
          <Row className="m-b-3 align-items-center">
            <Col xs={24} sm={24} md={6} lg={4} xl={4}>
              <p className="text-align-right p-r-5-i">
                {<IntlMessages id="step.information.address" />}
              </p>
            </Col>
            <Col className="bor-b" xs={24} sm={24} md={18} lg={20} xl={20}>
              <Row className="m-b-3-i align-items-center">
                <Col xs={18} sm={18} md={18} lg={20} xl={20}>
                  {this.state.address === false ? (
                    <div>
                      <p className="m-b-0-i">Số 2 đường 3.5 Gamuda Garden</p>
                    </div>
                  ) : (
                    <Tooltip title="Chỉnh sửa địa chỉ của doanh nghiệp">
                      <Input defaultValue="Số 2 đường 3.5 Gamuda Garden" />
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

          {/* Postcode */}
          <Row className="m-b-3 align-items-center">
            <Col xs={24} sm={24} md={6} lg={4} xl={4}>
              <p className="text-align-right p-r-5-i">
                {<IntlMessages id="inventory.create.location.postcode" />}
              </p>
            </Col>
            <Col xs={24} sm={24} md={18} lg={20} xl={20}>
              <Row className="m-b-3-i align-items-center">
                <Col xs={18} sm={18} md={18} lg={20} xl={20}>
                  {this.state.zip === false ? (
                    <p className="m-b-0-i">1234</p>
                  ) : (
                    <Tooltip title="Chỉnh sửa mã số bưu điện ở quận, huyện của doanh nghiệp">
                      <Input defaultValue="1234" />
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
export default Address;
