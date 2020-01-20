import React from "react";
import { Row, Col } from "antd";
import HightLightItem from "./HightLightItem";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";

import IntlMessages from "util/IntlMessages";

class StaticticGuest extends React.Component {
  render() {
    let { profile } = this.props;

    return (
      <div
        className="block-w-nb disable_layer_block display-background-grey"
        style={{ paddingBottom: "3em" }}
        id="nav_statistics"
      >
        <WidgetHeader
          title={
            <div>
              <span>
                <IntlMessages id="account.profile.statistics" />
              </span>
            </div>
          }
        />
        <Row>
          <Col xl={24} lg={24} md={12} sm={12} xs={24}>
            <HightLightItem
              colorTitle="primary"
              color="white"
              values={profile.company_products_number}
              title={<IntlMessages id="account.profile.statistics.products" />}
              info={
                <IntlMessages id="account.profile.statistics.products.info" />
              }
              icon="diamond"
            />
          </Col>
          <Col xl={24} lg={24} md={12} sm={12} xs={24}>
            <HightLightItem
              colorTitle="primary"
              color="white"
              values={profile.company_orders}
              title={<IntlMessages id="account.profile.statistics.bought" />}
              info={
                <IntlMessages id="account.profile.statistics.bought.info" />
              }
              icon="inbuilt-apps"
            />
          </Col>
          <Col xl={24} lg={24} md={12} sm={12} xs={24}>
            <HightLightItem
              colorTitle="primary"
              color="white"
              values={profile.company_deal}
              title={<IntlMessages id="account.profile.statistics.sold" />}
              info={<IntlMessages id="account.profile.statistics.sold.info" />}
              icon="revenue-new"
            />
          </Col>
          <Col xl={24} lg={24} md={12} sm={12} xs={24}>
            <HightLightItem
              colorTitle="primary"
              color="white"
              values={profile.company_partner}
              title={<IntlMessages id="account.profile.statistics.partner" />}
              info={
                <IntlMessages id="account.profile.statistics.partner.info" />
              }
              icon="profile"
            />
          </Col>
        </Row>
      </div>
    );
  }
}
export default StaticticGuest;
