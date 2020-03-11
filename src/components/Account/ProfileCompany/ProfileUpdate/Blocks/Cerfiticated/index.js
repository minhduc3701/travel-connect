import React from "react";
import { Row, Col } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import logoISO from "assets/images/Logo-ISO-.jpg";
import travelife from "assets/images/travelife.png";

function Cerfiticated() {
  return (
    <div style={{ paddingBottom: "3em" }}>
      <WidgetHeader
        title={
          <div>
            <span>Cerfiticated</span>
          </div>
        }
      />
      <Row className="d-flex">
        <Col span={24}>
          <img
            src={travelife}
            alt="travel-life"
            style={{
              width: "6em",
              height: "6em",
              objectFit: "contain",
              paddingRight: "1em"
            }}
          />
          <span>Travelife Certified</span>
        </Col>
      </Row>
      <Row className="d-flex">
        <Col span={24}>
          <img
            src={logoISO}
            alt="travel-life"
            style={{
              width: "6em",
              height: "6em",
              objectFit: "contain",
              paddingRight: "1em"
            }}
          />
          <span>ISO Certified</span>
        </Col>
      </Row>
    </div>
  );
}
export default Cerfiticated;
