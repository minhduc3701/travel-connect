import React from "react";
import { Col, Row } from "antd";
import ItemFirst from "./ItemFirst";
import ItemSecond from "./ItemSecond";
import ItemThird from "./ItemThird";

const Classic = () => {
  return (
    <div className="gx-price-tables gx-pt-classic">
      <Row>
        <Col xl={8} lg={24} md={8} xs={24}>
          <ItemFirst
            styleName=" gx-package"
            headerStyle="gx-package-header gx-bg-amber gx-text-black"
            itemStyle="gx-package-body"
            footerStyle=""
          />
        </Col>
      </Row>
    </div>
  );
};

export default Classic;
