import React from "react";
import IntlMessages from "util/IntlMessages";
import WidgetHeader from "components/WidgetHeader";
import IconWithTextCard from "./IconWithTextCard";

// import { eventList } from "./dataSale";
import { Col, Row } from "antd";

function SaleData2() {
  return (
    <div className="block-w">
      <WidgetHeader title={<IntlMessages id="statistical" />} />
      <div className="gx-pt-2">
        <Row>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <IconWithTextCard
              icon="orders"
              title="20"
              subTitle={<IntlMessages id="saleDataProduct" />}
            />
            <IconWithTextCard
              icon="revenue-new"
              title="297"
              subTitle={<IntlMessages id="ordered" />}
            />
          </Col>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <IconWithTextCard
              icon="shopping-cart"
              title="561"
              subTitle={<IntlMessages id="deal" />}
            />
            <IconWithTextCard
              icon="company"
              title="96"
              subTitle={<IntlMessages id="partnerCompany" />}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default SaleData2;
