import React from "react";
import { Row, Col } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";

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
      <Row>
        <Col span={24}>
          <div className="d-flex">
            <img
              src="https://www.hotelelaphusabrac.com/EasyEdit/UserFiles/logotipi/travelife.png"
              alt="travel-life"
              style={{ width: "8em", height: "7em", objectFit: "contain" }}
            />
            <img
              src="http://vnpi-hcm.vn/wp-content/uploads/2018/03/Logo-ISO-.jpg"
              alt="iso-9001"
              style={{ width: "8em", height: "7em", objectFit: "contain" }}
            />
          </div>
        </Col>
      </Row>
      <Row className="d-flex">
        <Col span={24}>
          <img
            src="https://www.hotelelaphusabrac.com/EasyEdit/UserFiles/logotipi/travelife.png"
            alt="travel-life"
            style={{
              width: "4em",
              height: "4em",
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
            src="http://vnpi-hcm.vn/wp-content/uploads/2018/03/Logo-ISO-.jpg"
            alt="travel-life"
            style={{
              width: "4em",
              height: "4em",
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
