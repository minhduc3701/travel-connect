import React, { Component } from "react";
import { Anchor, Row, Col, Divider, Icon, Button } from "antd";
import IntlMessages from "util/IntlMessages";
import { updatePackage } from "appRedux/actions/Auth";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
// import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";

const { Link } = Anchor;
const getCurrentAnchor = () => {
  return "#components-anchor-demo-static";
};

class PackageYear extends Component {
  state = {
    value: null,
    content: null
  };

  handleCLick = (key, pack) => {
    if (this.state.value !== key)
      this.setState({
        value: key,
        content: pack
      });
    else
      this.setState({
        value: null,
        content: null
      });
    return this.props.updatePackage(pack);
  };

  render() {
    return (
      <Row>
        <Col span={24} className="" style={{ padding: 10 }}>
          {this.props.packYear ? (
            this.props.packYear.length > 0 ? (
              <div className="gx-price-tables gx-pt-classic">
                <Row>
                  {this.props.packYear.map((data, index) => (
                    <Col xl={8} lg={24} md={8} xs={24}>
                      <div
                        className={`gx-package ${
                          data.pack === this.state.value
                            ? "gx-highlight gx-border-0"
                            : null
                        }`}
                        style={{ borderRadius: 10 }}
                      >
                        <div className="gx-package-header gx-bg-blue gx-text-white">
                          <p className="gx-letter-spacing-base gx-text-white gx-text-uppercase gx-mb-0">
                            {
                              <IntlMessages
                                id={`account.package.${data.content.title}.title`}
                              />
                            }
                          </p>
                        </div>
                        <div className="">
                          <h2 className="gx-text-primary gx-fs-xlxl gx-font-weight-medium gx-mb-1  p-t-2 header-upgrade">
                            {data.content.money}{" "}
                            <sub className="gx-fs-md gx-bottom-0">
                              <span className="gx-text-red gx-fs-xlxl gx-font-weight-medium gx-text-uppercase">
                                VND
                              </span>
                              /
                              <IntlMessages id="account.package.radio.year" />
                            </sub>
                          </h2>

                          <ul className="gx-package-items">
                            <Anchor
                              affix={false}
                              getCurrentAnchor={getCurrentAnchor}
                            >
                              <Link
                                href="#account.package.b2b.title"
                                title={
                                  <IntlMessages id="account.package.b2b.title" />
                                }
                              />
                              <Link
                                href="#account.package.community.title"
                                title={
                                  <IntlMessages id="account.package.community.title" />
                                }
                              />
                              <Link
                                href="#account.package.matching.title"
                                title={
                                  <IntlMessages id="account.package.matching.title" />
                                }
                              />
                              <Link
                                href="#account.package.events.title"
                                title={
                                  <IntlMessages id="account.package.events.title" />
                                }
                              />
                              <Link
                                href="#account.package.recruitment.title"
                                title={
                                  <IntlMessages id="account.package.recruitment.title" />
                                }
                              />
                            </Anchor>
                          </ul>
                          <div className="p-2">
                            <Button
                              type={
                                this.state.value === data.pack
                                  ? "primary"
                                  : null
                              }
                              onClick={() => this.handleCLick(data.pack, data)}
                              block
                            >
                              {this.state.value === data.pack ? (
                                <IntlMessages id="account.package.selected" />
                              ) : (
                                <IntlMessages id="account.package.select" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            ) : (
              <div className="pos-abs pos-abs-center">
                <ul className="gx-sub-popover">
                  <p className="text-align-center text-color-sub">
                    <i className="icon icon-inbox size-6"></i>
                  </p>
                  <h5 className="text-align-center text-color-sub">
                    <IntlMessages id="home.activities.empty" />
                  </h5>
                </ul>
              </div>
            )
          ) : (
            <div className="pos-abs pos-abs-center">
              <ul className="gx-sub-popover">
                <p className="text-align-center text-color-sub">
                  <i className="icon icon-inbox size-6"></i>
                </p>
                <h5 className="text-align-center text-color-sub">
                  <IntlMessages id="home.activities.empty" />
                </h5>
              </ul>
            </div>
          )}
        </Col>
        <Col span={24}>
          <Divider orientation="left" id="account.package.b2b.title">
            <IntlMessages id="account.package.b2b.title" />
          </Divider>
          <Row>
            {this.props.packYear
              ? this.props.packYear.map((data, key) => (
                  <Col span={8} value={key}>
                    {data.b2b
                      ? data.b2b.map((data, index) => (
                          <p value={index}>
                            <Icon
                              type="plus-circle"
                              theme="twoTone"
                              twoToneColor="#52c41a"
                            />{" "}
                            {data}
                          </p>
                        ))
                      : null}
                  </Col>
                ))
              : null}
          </Row>
        </Col>
        <Col span={24}>
          <Divider orientation="left" id="account.package.community.title">
            <IntlMessages id="account.package.community.title" />
          </Divider>
          <Row>
            {this.props.packYear
              ? this.props.packYear.map((data, key) => (
                  <Col span={8} value={key}>
                    {data.community
                      ? data.community.map((data, index) => (
                          <p value={index}>
                            <Icon
                              type="plus-circle"
                              theme="twoTone"
                              twoToneColor="#52c41a"
                            />{" "}
                            {data}
                          </p>
                        ))
                      : null}
                  </Col>
                ))
              : null}
          </Row>
        </Col>
        <Col span={24}>
          <Divider orientation="left" id="account.package.matching.title">
            <IntlMessages id="account.package.matching.title" />
          </Divider>
          <Row>
            {this.props.packYear
              ? this.props.packYear.map((data, key) => (
                  <Col span={8} value={key}>
                    {data.matching
                      ? data.matching.map((data, index) => (
                          <p value={index}>
                            <Icon
                              type="plus-circle"
                              theme="twoTone"
                              twoToneColor="#52c41a"
                            />
                            {data}
                          </p>
                        ))
                      : null}
                  </Col>
                ))
              : null}
          </Row>
        </Col>
        <Col span={24}>
          <Divider orientation="left" id="account.package.events.title">
            <IntlMessages id="account.package.events.title" />
          </Divider>
          <Row>
            {this.props.packYear
              ? this.props.packYear.map((data, key) => (
                  <Col span={8} value={key}>
                    {data.events
                      ? data.events.map((data, index) => (
                          <p value={index}>
                            <Icon
                              type="plus-circle"
                              theme="twoTone"
                              twoToneColor="#52c41a"
                            />{" "}
                            {data}
                          </p>
                        ))
                      : null}
                  </Col>
                ))
              : null}
          </Row>
        </Col>
        <Col span={24}>
          <Divider orientation="left" id="account.package.recruitment.title">
            <IntlMessages id="account.package.recruitment.title" />
          </Divider>
          <Row>
            {this.props.packYear
              ? this.props.packYear.map((data, key) => (
                  <Col span={8} value={key}>
                    {data.recruitment
                      ? data.recruitment.map((data, index) => (
                          <p value={index}>
                            <Icon
                              type="plus-circle"
                              theme="twoTone"
                              twoToneColor="#52c41a"
                            />{" "}
                            {data}
                          </p>
                        ))
                      : null}
                  </Col>
                ))
              : null}
          </Row>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ firestore }) => {
  const { packYear } = firestore.ordered;
  return {
    packYear
  };
};

export default compose(
  firestoreConnect(props => {
    return [
      {
        collection: "packages",
        limit: 3,
        where: ["duration", "==", "year"],
        orderBy: ["pack", "asc"],
        storeAs: "packYear"
      }
    ];
  }),
  connect(mapStateToProps, { updatePackage })
)(PackageYear);
