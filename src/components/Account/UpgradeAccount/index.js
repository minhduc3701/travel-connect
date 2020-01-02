import React, { Component } from "react";
import { Form, Row, Col } from "antd";
// import IntlMessages from "util/IntlMessages";
import ItemPrice from "./ItemPrice";

class DynamicRules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCompany: false,
      value: 1
    };
  }

  render() {
    return (
      <div className="step-card ">
        <div>
          <div className="block-w bor-rad-6">
            <h1 className="p-t-5 header-upgrade">
              CHOOSE YOURS MEMBERSHIP PLAN:
            </h1>
            <Row style={{ margin: "50px 0" }}>
              <Col style={{ padding: "0 70px" }} span={24}>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
                <p>
                  Where does it come from? Contrary to popular belief, Lorem
                  Ipsum is not simply random text. It has roots of classical,
                  making it over 2000 years old. Richard McClintock, a Latin
                  professor at Hampden-Sydney College in Virginia, consectetur,
                  discovered the undoubtable source.
                </p>
                <p>
                  Various versions have evolved over the years, sometimes by
                  accident, sometimes on purpose (injected humour and the like).
                </p>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <ItemPrice />
              </Col>
            </Row>

            {/* <Row>
                        <Col xl={8} lg={12} md={24} xs={24}>
                            <div className={`gx-package`} style={{marginTop: 20}}>
                                <div className={`gx-package-header gx-bg-primary gx-text-white`}>
                                    <p className="gx-letter-spacing-base gx-text-white gx-text-uppercase gx-mb-0">
                                        BASIC
                                    </p>
                                    <h2 className="gx-price">FREE</h2>
                                    <p className="gx-letter-spacing-base gx-text-white gx-text-uppercase gx-mb-0">
                                        {
                                        <IntlMessages id="step.membership.individual.month.free" />
                                        }
                                    </p>
                                </div>
                                <div className={`gx-package-body`}>
                                    <ul className="gx-package-items">
                                        <li>
                                            <i className="icon icon-translation" />
                                            <span>
                                                <IntlMessages id="travelevent" />
                                            </span>
                                        </li>
                                        <li>
                                            <i className="icon icon-font" />
                                            <span>
                                                <IntlMessages id="community" />
                                            </span>
                                        </li>
                                        <li>
                                            <i className="icon icon-hotel-booking" />
                                            <span>
                                                <IntlMessages id="businessmatching" />
                                            </span>
                                        </li>
                                        <li>
                                            <i className="icon icon-sent" />
                                            <span>
                                                <IntlMessages id="b2bmarketplace" />
                                            </span>
                                        </li>
                                        <li>
                                            <i className="icon icon-location" />
                                            <span>
                                                <IntlMessages id="otachannel" />
                                            </span>
                                        </li>
                                        <li>
                                            <i className="icon icon-location" />
                                            <span>
                                                <IntlMessages id="vitm" />
                                            </span>
                                        </li>
                                        <li>
                                            <i className="icon icon-location" />
                                            <span>
                                                <IntlMessages id="tourguide" />
                                            </span>
                                        </li>
                                    </ul>
                                    <div className="gx-package-footer">
                                        <Button type="primary" className={``}>
                                            {
                                            <IntlMessages id="pricingTable.buyNow" />}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xl={8} lg={12} md={24} xs={24}>
                            <div className={`gx-package`} style={{marginTop: 20}}>
                                <div className={`gx-package-header gx-bg-primary gx-text-white`}>
                                    <p className="gx-letter-spacing-base gx-text-white gx-text-uppercase gx-mb-0">
                                        Month
                                    </p>
                                    <h2 className="gx-price">1000$/month*</h2>
                                    <p className="gx-letter-spacing-base gx-text-white gx-text-uppercase gx-mb-0">
                                        12000$/year*
                                    </p>
                                </div>
                                <div className={`gx-package-body`}>
                                    <ul className="gx-package-items">
                                        <li>
                                            <i className="icon icon-translation" />
                                            <span>
                                                <IntlMessages id="travelevent" />
                                            </span>
                                        </li>
                                        <li>
                                            <i className="icon icon-font" />
                                            <span>
                                                <IntlMessages id="community" />
                                            </span>
                                        </li>
                                        <li>
                                            <i className="icon icon-hotel-booking" />
                                            <span>
                                                <IntlMessages id="businessmatching" />
                                            </span>
                                        </li>
                                        <li>
                                            <i className="icon icon-sent" />
                                            <span>
                                                <IntlMessages id="b2bmarketplace" />
                                            </span>
                                        </li>
                                        <li>
                                            <i className="icon icon-location" />
                                            <span>
                                                <IntlMessages id="otachannel" />
                                            </span>
                                        </li>
                                        <li>
                                            <i className="icon icon-location" />
                                            <span>
                                                <IntlMessages id="vitm" />
                                            </span>
                                        </li>
                                        <li>
                                            <i className="icon icon-location" />
                                            <span>
                                                <IntlMessages id="tourguide" />
                                            </span>
                                        </li>
                                    </ul>
                                    <div className="gx-package-footer">
                                        <Button type="primary" className={``}>
                                            <IntlMessages id="pricingTable.buyNow" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xl={8} lg={12} md={24} xs={24}>
                            <div className={`gx-package`} style={{marginTop: 20}}>
                                <div className={`gx-package-header gx-bg-primary gx-text-white`}>
                                    <p className="gx-letter-spacing-base gx-text-white gx-text-uppercase gx-mb-0">
                                        Year
                                    </p>
                                    <h2 className="gx-price">500$/month*</h2>
                                    <p className="gx-letter-spacing-base gx-text-white gx-text-uppercase gx-mb-0">
                                        6000$/year*{" "}
                                    </p>
                                </div>
                                <div className={`gx-package-body`}>
                                    <ul className="gx-package-items">
                                        <li>
                                            <i className="icon icon-translation" />
                                            <span>
                                                <IntlMessages id="travelevent" />
                                            </span>
                                        </li>
                                        <li>
                                            <i className="icon icon-font" />
                                            <span>
                                                <IntlMessages id="community" />
                                            </span>
                                        </li>
                                        <li>
                                            <i className="icon icon-hotel-booking" />
                                            <span>
                                                <IntlMessages id="businessmatching" />
                                            </span>
                                        </li>
                                        <li>
                                            <i className="icon icon-sent" />
                                            <span>
                                                <IntlMessages id="b2bmarketplace" />
                                            </span>
                                        </li>
                                        <li>
                                            <i className="icon icon-location" />
                                            <span>
                                                <IntlMessages id="otachannel" />
                                            </span>
                                        </li>
                                        <li>
                                            <i className="icon icon-location" />
                                            <span>
                                                <IntlMessages id="vitm" />
                                            </span>
                                        </li>
                                        <li>
                                            <i className="icon icon-location" />
                                            <span>
                                                <IntlMessages id="tourguide" />
                                            </span>
                                        </li>
                                    </ul>
                                    <div className="gx-package-footer">
                                        <Button type="primary" className={``}>
                                            <IntlMessages id="pricingTable.buyNow" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row> */}
          </div>
        </div>
      </div>
    );
  }
}

const Membership = Form.create()(DynamicRules);

export default Membership;
