import React, { Fragment } from "react";
import {
  Icon,
  Card,
  Button,
  Modal,
  Switch,
  Col,
  Row,
  Collapse,
  Layout,
  Tooltip
} from "antd";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import IntlMessages from "util/IntlMessages";
import { doneChange } from "util/Notification";
const { Panel } = Collapse;
const { Sider, Content } = Layout;
const customPanelStyle = {
  background: "white",
  border: 0,
  overflow: "hidden"
};
const selectedPanelStyle = {
  background: "rgb(228, 247, 253)",
  border: 0,
  overflow: "hidden"
};
class Permission extends React.Component {
  state = {
    loading: false,
    visible: false,
    tab: "1"
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
    this.setState({ visible: false });
  };
  changeTab = e => {
    if (e !== undefined) this.setState({ tab: e });
  };
  render() {
    return (
      <Fragment>
        <span onClick={this.showModal}>
          <Tooltip placement="topLeft" title={<IntlMessages id="permission" />}>
            <Icon type="tool" theme="filled" /> <IntlMessages id="permission" />
          </Tooltip>
        </span>
        <Modal
          visible={this.state.visible}
          title={<IntlMessages id="permission" />}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          style={{ top: 10 }}
          width={800}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              {<IntlMessages id="return" />}
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={this.state.loading}
              onClick={this.handleOk}
            >
              {<IntlMessages id="submit" />}
            </Button>
          ]}
        >
          <Row>
            <Col span={24}>
              <Layout>
                <Sider
                  style={{ borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}
                >
                  <Collapse
                    bordered={false}
                    defaultActiveKey={["1"]}
                    expandIcon={({ isActive }) => (
                      <Icon type="caret-right" rotate={isActive ? 0 : 90} />
                    )}
                    expandIconPosition="right"
                    accordion={true}
                    className="p-0-content-box"
                    onChange={this.changeTab}
                  >
                    <Panel
                      header="B2B Marketplace"
                      key="1"
                      style={
                        this.state.tab === "1"
                          ? selectedPanelStyle
                          : customPanelStyle
                      }
                    />
                    <Panel
                      header="Community"
                      key="2"
                      style={
                        this.state.tab === "2"
                          ? selectedPanelStyle
                          : customPanelStyle
                      }
                    />
                    <Panel
                      header="Business Matching"
                      key="3"
                      style={
                        this.state.tab === "3"
                          ? selectedPanelStyle
                          : customPanelStyle
                      }
                    />
                    <Panel
                      header="Travel Events"
                      key="4"
                      style={
                        this.state.tab === "4"
                          ? selectedPanelStyle
                          : customPanelStyle
                      }
                    />
                    <Panel
                      header="OTA Chanel"
                      key="5"
                      style={
                        this.state.tab === "5"
                          ? selectedPanelStyle
                          : customPanelStyle
                      }
                    />
                    <Panel
                      header="VITM"
                      key="6"
                      style={
                        this.state.tab === "6"
                          ? selectedPanelStyle
                          : customPanelStyle
                      }
                    />
                    <Panel
                      header="Tour Guide"
                      key="7"
                      style={
                        this.state.tab === "7"
                          ? selectedPanelStyle
                          : customPanelStyle
                      }
                    />
                  </Collapse>
                </Sider>
                <Layout>
                  <Content
                    style={{
                      backgroundColor: "rgb(228, 247, 253)",
                      borderBottomRightRadius: 5,
                      borderTopRightRadius: 5
                    }}
                  >
                    <Row>
                      <Col span={24}>
                        <Col span={24}>
                          <Row>
                            <Col span={12}>
                              <h3
                                style={{
                                  color: "rgb(97, 86, 86)",
                                  marginTop: 15
                                }}
                              >
                                B2B Marketplace
                              </h3>
                            </Col>
                            <Col span={12}>
                              <Switch
                                style={{
                                  marginTop: 15,
                                  float: "right"
                                }}
                              />
                            </Col>
                          </Row>
                          <br />
                          <WidgetHeader
                            styleName="gx-flex-row"
                            title={<IntlMessages id="productManagement" />}
                          />
                          <Card>
                            <Row className="m-b-3 align-items-center">
                              <Col
                                xs={24}
                                sm={24}
                                md={6}
                                lg={6}
                                xl={6}
                                className="p-r-1-i p-d-l-0"
                              >
                                <p className="text-align-right">
                                  <IntlMessages id="management.member.permission.product1" />
                                </p>
                              </Col>
                              <Col
                                className="bor-b"
                                xs={24}
                                sm={24}
                                md={18}
                                lg={18}
                                xl={18}
                              >
                                <Row className="m-b-3-i align-items-center">
                                  <Col xs={18} sm={18} md={18} lg={20} xl={20}>
                                    <p className="m-b-0-i">
                                      <IntlMessages id="management.member.permission.product2" />
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
                                    <Switch defaultChecked />
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Card>
                          <WidgetHeader
                            styleName="gx-flex-row"
                            title="Giao dịch sản phẩm"
                          />
                          <Card>
                            <Row className="m-b-3 align-items-center">
                              <Col
                                xs={24}
                                sm={24}
                                md={6}
                                lg={6}
                                xl={6}
                                className="p-r-1-i p-d-l-0"
                              >
                                <p className="text-align-left">
                                  <IntlMessages id="general.default.b2bmarketplace.buy" />
                                </p>
                              </Col>
                              <Col
                                className="bor-b"
                                xs={24}
                                sm={24}
                                md={18}
                                lg={18}
                                xl={18}
                              >
                                <Row className="m-b-3-i align-items-center">
                                  <Col xs={18} sm={18} md={18} lg={20} xl={20}>
                                    <p className="m-b-0-i">
                                      <IntlMessages id="management.member.permission.buy" />
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
                                    <Switch defaultChecked />
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                            <Row className="m-b-3 align-items-center">
                              <Col
                                xs={24}
                                sm={24}
                                md={6}
                                lg={6}
                                xl={6}
                                className="p-r-1-i p-d-l-0"
                              >
                                <p className="text-align-left">
                                  {" "}
                                  <IntlMessages id="general.default.b2bmarketplace.sell" />
                                </p>
                              </Col>
                              <Col
                                className="bor-b"
                                xs={24}
                                sm={24}
                                md={18}
                                lg={18}
                                xl={18}
                              >
                                <Row className="m-b-3-i align-items-center">
                                  <Col xs={18} sm={18} md={18} lg={20} xl={20}>
                                    <p className="m-b-0-i">
                                      <IntlMessages id="management.member.permission.sell" />
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
                                    <Switch defaultChecked />
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                      </Col>
                    </Row>
                  </Content>
                </Layout>
              </Layout>
            </Col>
          </Row>
        </Modal>
      </Fragment>
    );
  }
}

export default Permission;
