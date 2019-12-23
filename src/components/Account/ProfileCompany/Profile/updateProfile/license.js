import React from "react";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";

// import Widget from "components/Widget/index";
import IntlMessages from "util/IntlMessages";
// import doneChange from "util/Notification";
import { doneChange, failChange } from "util/Notification";
// import Avatar from "../../../Step/SubComponent/Avatar";
import {
  Tooltip,
  Button,
  Input,
  message,
  Row,
  Col,
  Icon,
  Upload,
  Modal
} from "antd";

const { TextArea } = Input;

const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text"
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};
class License extends React.Component {
  state = {
    visible: false,
    loading: false
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
      doneChange();
    }, 1500);
  };
  handleCancel = () => {
    failChange();
    this.setState({ visible: false });
  };
  render() {
    return (
      <div>
        <WidgetHeader
          styleName="gx-flex-row"
          title={<IntlMessages id="license" />}
        />
        <div
          className="block"
          style={{ backgroundColor: "white", borderRadius: 10 }}
        >
          <Row className="m-b-3 align-items-center">
            <Col xs={24} sm={24} md={6} lg={4} xl={4}>
              <p className="text-align-right p-r-5-i">
                {<IntlMessages id="companyName" />}
              </p>
            </Col>
            <Col className="bor-b" xs={24} sm={24} md={18} lg={20} xl={20}>
              <Row className="m-b-3-i align-items-center">
                <Col xs={18} sm={18} md={18} lg={20} xl={20}>
                  <p className="m-b-0-i">
                    Công ty TNHH giải pháp kết nối du lịch Việt Nam
                  </p>
                </Col>
                <Col
                  className="text-align-center"
                  xs={6}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={4}
                >
                  <Tooltip
                    className="m-l-3-i"
                    placement="topLeft"
                    title="Verified"
                  >
                    <Icon type="check-circle" className="color-green-i" />
                  </Tooltip>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="m-b-3 align-items-center">
            <Col xs={24} sm={24} md={6} lg={4} xl={4}>
              <p className="text-align-right p-r-5-i">
                {<IntlMessages id="brandname" />}
              </p>
            </Col>
            <Col className="bor-b" xs={24} sm={24} md={18} lg={20} xl={20}>
              <Row className="m-b-3-i align-items-center">
                <Col xs={18} sm={18} md={18} lg={20} xl={20}>
                  <p className="m-b-0-i">Travel Connect</p>
                </Col>
                <Col
                  className="text-align-center"
                  xs={6}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={4}
                >
                  <Tooltip
                    className="m-l-3-i"
                    placement="topLeft"
                    title="Verified"
                  >
                    <Icon type="check-circle" className="color-green-i" />
                  </Tooltip>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="m-b-3  align-items-center">
            <Col xs={24} sm={24} md={6} lg={4} xl={4}>
              <p className="text-align-right p-r-5-i">
                {<IntlMessages id="step.information.licensenumber" />}
              </p>
            </Col>
            <Col xs={24} sm={24} md={18} lg={20} xl={20} className="bor-b">
              <Row className="m-b-3-i align-items-center">
                <Col xs={18} sm={18} md={18} lg={20} xl={20}>
                  <p className="m-b-0-i">0105030308</p>
                </Col>
                <Col
                  className="text-align-center"
                  xs={6}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={4}
                >
                  <Tooltip
                    className="m-l-3-i"
                    placement="topLeft"
                    title="Verified"
                  >
                    <Icon type="check-circle" className="color-green-i" />
                  </Tooltip>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="m-b-3  align-items-center">
            <Col xs={24} sm={24} md={6} lg={4} xl={4}>
              <p className="text-align-right p-r-5-i">
                {<IntlMessages id="step.information.licenseimage" />}
              </p>
            </Col>
            <Col xs={24} sm={24} md={18} lg={20} xl={20}>
              <Row className="m-b-3-i align-items-center">
                <Col xs={18} sm={18} md={18} lg={20} xl={20}>
                  <p className="m-b-0-i">
                    <img
                      src="https://sites.google.com/site/thanhlapgiayphepkinhdoanhhcm/_/rsrc/1484097890554/home/unnamed.jpg"
                      width={150}
                      height={150}
                      alt="anhgiayphep"
                      className="m-r-1"
                    />
                    <img
                      src="https://sites.google.com/site/thanhlapgiayphepkinhdoanhhcm/_/rsrc/1484097890554/home/unnamed.jpg"
                      width={150}
                      height={150}
                      alt="anhgiayphep"
                    />
                  </p>
                </Col>
                <Col
                  className="text-align-center"
                  xs={6}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={4}
                >
                  <Tooltip
                    className="m-l-3-i"
                    placement="topLeft"
                    title="Verified"
                  >
                    <Icon type="check-circle" className="color-green-i" />
                  </Tooltip>
                </Col>
              </Row>
            </Col>
          </Row>
          <h5 style={{ color: "red" }}>
            * Những thông tin này đã được xác minh. Nếu bạn muốn chỉnh sửa hãy
            click vào nút <b>Send Request</b> và điền thông tin mà bạn muốn
            chỉnh sửa vào form *
          </h5>
          <Button
            type="primary"
            className="button-updateform"
            onClick={this.showModal}
          >
            <div className="text-align-center">
              <i
                className="icon icon-sent"
                style={{ paddingRight: 10, fontSize: 12 }}
              />
              <IntlMessages id="sendRequest" />
            </div>
          </Button>
          {/* <div className="p-t-3-i text-align-center">
            <Button type="primary" icon="search">
              <IntlMessages id="sendRequest" />
            </Button>
          </div> */}
        </div>

        {/* Modal Send Request */}
        <Modal
          visible={this.state.visible}
          title="Yêu cầu cập nhật thông tin"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={this.state.loading}
              onClick={this.handleOk}
            >
              Submit
            </Button>
          ]}
          style={{ marginTop: -75 }}
        >
          <p>
            Send from: Travel Connect - CÔNG TY TNHH GIẢI PHÁP KẾT NỐI DU LỊCH
            VIỆT NAM
          </p>
          {/* <p>Product code: NHK002</p> */}
          <Input placeholder="Tiêu đề" style={{ marginBottom: 10 }} />
          <TextArea
            rows={10}
            placeholder="Nội dung yêu cầu"
            style={{ marginBottom: 10 }}
          />
          <p>Tập tin bổ sung thông tin đính kèm:</p>
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>
          <p>File đính kèm (doc, docx, pdf) - kích thước nhỏ hơn 5Mib</p>
        </Modal>
      </div>
    );
  }
}
export default License;
