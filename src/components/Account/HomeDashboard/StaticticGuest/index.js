import React from "react";
import { Row, Col } from "antd";
import HightLightItem from "./HightLightItem";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import IntlMessage from "util/IntlMessages";

class StaticticGuest extends React.Component {
  render() {
    return (
      <div className="block_shadow">
        <WidgetHeader
          title={
            <div>
              <span>
                <IntlMessage id="overview" />{" "}
              </span>
              <span className="size-1 gx-post-designation">
                ( <IntlMessage id="today" /> 00:00 14:00 )
              </span>
            </div>
          }
        />
        <Row>
          <Col xl={12} lg={12} md={12} sm={12} xs={24}>
            <HightLightItem
              colorTitle="primary"
              color="white"
              values="35"
              title={<IntlMessage id="access" />}
              info="Tổng số khách truy cập (xem trang sản phẩm) từ web và ứng dụng của Travel Connect. Một khách xem nhiều sản phẩm chỉ tính là 1 khách truy cập."
              desc={<IntlMessage id="dashboard.Conversion.Rate" />}
              icon="map-styled"
            />
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={24}>
            <HightLightItem
              colorTitle="primary"
              color="white"
              values="125.246"
              title={<IntlMessage id="view" />}
              info="Tổng số lần xem trang sản phẩm từ web và ứng dụng của Travel Connect."
              desc={<IntlMessage id="dashboard.Conversion.Rate" />}
              icon="inbuilt-apps"
            />
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={24}>
            <HightLightItem
              colorTitle="primary"
              color="white"
              values="146"
              title={<IntlMessage id="request" />}
              info="Tổng số yêu cầu báo giá đã nhận được từ người mua"
              desc={<IntlMessage id="dashboard.Conversion.Rate" />}
              icon="revenue-new"
            />
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={24}>
            <HightLightItem
              colorTitle="primary"
              color="white"
              values="66.66%"
              title={<IntlMessage id="dashboard.Conversion.Rate" />}
              info="Số lượng khách truy cập và đặt hàng chia cho tổng số khách truy cập trong khoảng thời gian đã chọn. "
              desc={<IntlMessage id="dashboard.Conversion.Rate" />}
              icon="visits"
            />
          </Col>
        </Row>
      </div>
    );
  }
}
export default StaticticGuest;
