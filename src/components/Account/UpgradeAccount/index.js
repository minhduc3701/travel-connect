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
          </div>
        </div>
      </div>
    );
  }
}

const Membership = Form.create()(DynamicRules);

export default Membership;
