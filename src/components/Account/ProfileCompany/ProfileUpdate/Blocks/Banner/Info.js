import React from "react";
import doneChange from "util/Notification";
import { Col, Icon, Row, Select, Input } from "antd";
const { Option } = Select;
const selectBefore = (
  <Select defaultValue="Http://" style={{ width: 90 }}>
    <Option value="Http://">Http://</Option>
    <Option value="Https://">Https://</Option>
  </Select>
);

class Info extends React.Component {
  state = {
    stt_website: false
  };

  changeWebsiteToEdit = () => {
    if (this.state.stt_website === true) {
      doneChange();
      this.setState({ stt_website: false });
    }
    if (this.state.stt_website === false) this.setState({ stt_website: true });
  };
  render() {
    return (
      <div className="p-t-4">
        <h3>Travel Connect</h3>
        <h2>Công ty TNHH Kết nối du lịch Việt Nam</h2>
        <Row>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <h5 className=" gx-text-grey ">
              <Icon type="appstore" className="p-r-3" /> Travel Agency,
              Accommodation, Restaurance, Transport{" "}
            </h5>
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <h5 className=" gx-text-grey ">
              <Icon type="environment" className="p-r-3" /> Hà Nội, Việt Nam
            </h5>
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <h5 className=" gx-text-grey d-block  d-flex align-items-center">
              <Icon type="global" className="p-r-3" />
              {this.state.stt_website === false ? (
                <a
                  href="http://travelconnect.vn"
                  className="d-inline-block"
                  title="Công ty TNHH Kết nối du lịch Việt Nam"
                >
                  http://travelconnect.vn
                </a>
              ) : (
                <Input
                  addonBefore={selectBefore}
                  size="small"
                  className="d-inline-block w-65-i"
                  defaultValue="http://travelconnect.vn"
                />
              )}
              <span
                className="d-inline-block m-l-1  gx-text-primary"
                onClick={() => this.changeWebsiteToEdit()}
              >
                {this.state.stt_website === false ? (
                  <Icon
                    type="edit"
                    className="cursor-pointer cursor-pointer--zoom"
                  />
                ) : (
                  <Icon
                    className="size-4 cursor-pointer cursor-pointer--zoom"
                    type="check-circle"
                  />
                )}
              </span>
            </h5>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Info;
