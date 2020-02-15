import React from "react";
import { Breadcrumb, Row, Col, Icon } from "antd";

import IntlMessages from "util/IntlMessages";
const BreadcrumbBar = () => {
  return (
    <div className="bg-color-white ">
      <Row
        className="gx-main-content-wrapper m-h-0-xs-i p-v-3-i"
        style={{ marginBottom: 0 }}
      >
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Breadcrumb style={{ paddingTop: 1 }}>
            <Breadcrumb.Item>
              <span className="gx-link">
                <Icon type="home" />
              </span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="gx-link">
                <span>
                  <IntlMessages id="account.default" />
                </span>
              </span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <IntlMessages id="update.profile" />
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
    </div>
  );
};

export default BreadcrumbBar;
