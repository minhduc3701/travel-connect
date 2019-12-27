import React, { Component } from "react";
import { Card, Form, Row, Col, Button, Table, Icon } from "antd";
// import IntlMessages from "util/IntlMessages";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";

const { Column } = Table;

class UpgradeAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCompany: false,
      value: 1
    };
  }

  render() {
    const data = [
      {
        key: "1",
        detail: "Create product",
        standard: true,
        business: true,
        vip: true
      },
      {
        key: "2",
        detail: "B2B Matching",
        standard: false,
        business: true,
        vip: true
      },
      {
        key: "3",
        detail: "Unlimitt B2B Marketplace",
        standard: false,
        business: false,
        vip: true
      },
      {
        key: "4",
        detail: "Event",
        standard: false,
        business: true,
        vip: true
      },
      {
        key: "5",
        detail: "Create communities",
        standard: false,
        business: false,
        vip: true
      }
    ];

    return (
      <div className="step-card">
        <div>
          <div className="block-w bor-rad-6">
            <WidgetHeader title="Package" />
            <h1 className="header-upgrade">CHOOSE YOURS MEMBERSHIP PLAN:</h1>
            <h3 className="text-align-center p-b-6">
              You can upgrade your user level you are on and get more featured!
            </h3>
            <Table dataSource={data} pagination={false}>
              <Column
                align="center"
                title={<p style={{ fontWeight: "normal" }}>Detai</p>}
                dataIndex="detail"
                key="detail"
              />
              <Column
                align="center"
                title={<p style={{ fontSize: 24 }}>Standard</p>}
                dataIndex="standard"
                key="standard"
                render={text => {
                  console.log(text);
                  return (
                    <span style={{ lineHeight: 3 }}>
                      {text ? (
                        <Icon
                          style={{ color: "#28a745", fontSize: 25 }}
                          type="check"
                        />
                      ) : null}
                    </span>
                  );
                }}
              />
              <Column
                align="center"
                title={<p style={{ fontSize: 24 }}>Business</p>}
                dataIndex="business"
                key="business"
                render={text => {
                  return (
                    <span style={{ lineHeight: 3 }}>
                      {text ? (
                        <Icon
                          style={{ color: "#28a745", fontSize: 25 }}
                          type="check"
                        />
                      ) : null}
                    </span>
                  );
                }}
              />
              <Column
                align="center"
                title={<p style={{ fontSize: 24 }}>Vip Business</p>}
                dataIndex="vip"
                key="vip"
                render={text => {
                  return (
                    <span style={{ lineHeight: 3 }}>
                      {text ? (
                        <Icon
                          style={{ color: "#28a745", fontSize: 25 }}
                          type="check"
                        />
                      ) : null}
                    </span>
                  );
                }}
              />
            </Table>
            <div
              className="d-flex w-50 p-b-6 m-t-5"
              style={{
                justifyContent: "space-around",
                marginLeft: "auto",
                padding: 20
              }}
            >
              <Button type="primary" size="large">
                Buy Now
              </Button>
              <Button type="primary" size="large">
                {/* <Button style={{ backgroundColor: "#28a745", color: "white" }}> */}
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const Membership = Form.create()(DynamicRules);

export default UpgradeAccount;
