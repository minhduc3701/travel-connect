import React from "react";
import { Row, Col } from "antd";
import HightLightItem from "./HightLightItem";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";

import IntlMessages from "util/IntlMessages";

class StaticticGuest extends React.Component {
  onGetLength = product => {
    let count = 0;
    let i;
    for (i in product) {
      if (product.hasOwnProperty(i)) {
        count++;
      }
    }
    return count;
  };

  render() {
    let { profile } = this.props;
    return (
      <div id="nav_statistics" style={{ paddingBottom: "3em" }}>
        <div>
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
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <HightLightItem
                colorTitle="primary"
                color="white"
                values={profile.company_products_number}
                title={
                  <IntlMessages id="account.profile.statistics.products" />
                }
                info={
                  <IntlMessages id="account.profile.statistics.products.info" />
                }
                icon="diamond"
              />
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
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
          </Row>
          <Row>
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <HightLightItem
                colorTitle="primary"
                color="white"
                values={profile.company_deal}
                title={<IntlMessages id="account.profile.statistics.sold" />}
                info={
                  <IntlMessages id="account.profile.statistics.sold.info" />
                }
                icon="revenue-new"
              />
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
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
      </div>
    );
  }
}
export default StaticticGuest;
