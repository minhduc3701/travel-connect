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
    let { Account } = this.props.profile;
    let product = Account.company_products;
    return (
      <div className="block-w-nb" id="nav_statistics">
        {product ? (
          <div>
            <WidgetHeader
              title={
                <div>
                  <span>
                    <IntlMessages id="Statistics" />
                  </span>
                </div>
              }
            />
            <Row>
              <Col xl={24} lg={24} md={12} sm={12} xs={24}>
                <HightLightItem
                  colorTitle="primary"
                  color="white"
                  // values={this.onGetLength(product)}
                  values={Account.company_products_number}
                  title={<IntlMessages id="saleDataProduct" />}
                  info="Tổng số khách truy cập (xem trang sản phẩm) từ web và ứng dụng của Travel Connect. Một khách xem nhiều sản phẩm chỉ tính là 1 khách truy cập."
                  desc="Vs hôm qua 22.00%"
                  icon="diamond"
                />
              </Col>
              <Col xl={24} lg={24} md={12} sm={12} xs={24}>
                <HightLightItem
                  colorTitle="primary"
                  color="white"
                  values={Account.company_orders}
                  title={<IntlMessages id="ordered" />}
                  info="Tổng số lần xem trang sản phẩm từ web và ứng dụng của Travel Connect."
                  desc="Vs hôm qua 12.33%"
                  icon="inbuilt-apps"
                />
              </Col>
              <Col xl={24} lg={24} md={12} sm={12} xs={24}>
                <HightLightItem
                  colorTitle="primary"
                  color="white"
                  values={Account.company_deal}
                  title={<IntlMessages id="deal" />}
                  info="Tổng số yêu cầu báo giá đã nhận được từ người mua"
                  desc="Vs hôm qua 110.00%"
                  icon="revenue-new"
                />
              </Col>
              <Col xl={24} lg={24} md={12} sm={12} xs={24}>
                <HightLightItem
                  colorTitle="primary"
                  color="white"
                  values={Account.company_partner}
                  title={<IntlMessages id="partnerCompany" />}
                  info="Số lượng khách truy cập và đặt hàng chia cho tổng số khách truy cập trong khoảng thời gian đã chọn. "
                  desc="Vs hôm qua 16.66%"
                  icon="profile"
                />
              </Col>
            </Row>
          </div>
        ) : null}
      </div>
    );
  }
}
export default StaticticGuest;
