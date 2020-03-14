import React from "react";
import { Button, Icon, Row, Col } from "antd";
import IntlMessages from "util/IntlMessages";
const RoadMapItem = ({ data }) => {
  return (
    <div className="gx-slider box bg-color-white">
      <div className="gx-slider-img p-b-0-i">
        <Row>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <span className="gx-link">
              <img
                className="filter-blur-1 object-pos-right block__banner__slide"
                alt="example"
                src={data.event_banner}
              />
            </span>
            <div className="pos-abs pos-abs-center z-2 w-80">
              <h3 className="text-trans-upper block__banner__color--primary">
                {" "}
                {data.event_timeStart} - {data.event_timeFinish}
              </h3>
              <h5 className="text-trans-upper block__banner__color--primary">
                {" "}
                At Ha Noi, Viet Nam
              </h5>
              <h1 className="text-trans-upper block__banner__color--primary">
                {" "}
                {data.event_title}
              </h1>
              <h3 className="color-white">{data.event_intro}</h3>
              <p className="text-align-left">
                <Button type="primary">
                  <Icon type="double-right" />{" "}
                  <IntlMessages id="account.profile.event.btn.detail" />
                </Button>
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RoadMapItem;
