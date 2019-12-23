import React from "react";
import { Col, Row } from "antd";
import ItemFirst from "./ItemFirst";
import ItemSecond from "./ItemSecond";
import ItemThird from "./ItemThird";

const Classic = () => {
  return (
    <div className="gx-price-tables gx-pt-classic p-t-8">
      <Row>
        <Col xl={8} lg={24} md={8} xs={24}>
          <ItemFirst
            styleName="gx-bg-white-light gx-package"
            headerStyle="gx-package-header gx-bg-amber gx-text-black"
            itemStyle="gx-package-body"
            footerStyle=""
            style={{ borderRadius: 10, boxShadow: "none" }}
          />
        </Col>

        <Col xl={8} lg={24} md={8} xs={24}>
          <ItemSecond
            styleName="gx-bg-white-light gx-package gx-highlight"
            headerStyle="gx-package-header gx-bg-primary gx-text-black"
            itemStyle="gx-package-body"
            footerStyle="gx-btn-primary"
          />
        </Col>

        <Col xl={8} lg={24} md={8} xs={24}>
          <ItemThird
            styleName="gx-package gx-bg-white-light"
            headerStyle="gx-package-header gx-bg-green gx-text-black"
            itemStyle="gx-package-body"
            footerStyle=""
          />
        </Col>
      </Row>
    </div>
  );
};

export default Classic;
