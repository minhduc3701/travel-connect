import React from "react";
import { Col, Row, Tag, Icon, Tooltip } from "antd";
import { B2B } from "components/Layout/Header/NavigateLink";
import IntlMessages from "util/IntlMessages";

class itemProduct extends React.Component {
  render() {
    let { detail } = this.props;
    return (
      <div className="block cursor-pointer-boxshadow">
        <Row>
          <Col className="gx-slider-img p-b-0-i" span={24}>
            <img
              style={{ width: "100%", height: "12em", objectFit: "cover" }}
              src={detail.thumb}
              alt={detail.title}
            />
          </Col>
        </Row>
        <Row className="p-v-1">
          <Col span={24}>
            <p className="text-ellipsis " style={{ whiteSpace: "nowrap" }}>
              <Tag className="p-r-1 m-b-0-i" color="#87d068">
                {detail.code}
              </Tag>
              <Tooltip title={detail.title}>
                <a href={`${B2B}/find/${detail.type}/detail/${detail.id}`}>
                  {detail.title}
                </a>
              </Tooltip>
            </p>
            <p className="gx-text-grey m-0-i p-b-1">
              <Icon type="profile" /> {detail.type.toUpperCase()} -{" "}
              <Icon type="clock-circle" />{" "}
              {detail.hours === 0 && detail.day > 0 ? (
                <span>
                  {detail.day} <IntlMessages id="day" /> , {detail.night}{" "}
                  <IntlMessages id="night" />
                </span>
              ) : detail.hours > 0 && detail.day === 0 && detail.night === 0 ? (
                <span>
                  {detail.hours} <IntlMessages id="hour" />
                </span>
              ) : (
                <span>
                  <IntlMessages id="company.contact" />
                </span>
              )}
            </p>
            <p className="gx-text-gray m-0-i">
              Tình trạng:{" "}
              {detail.verify === "active" && detail.status === "" ? (
                <span style={{ color: "#04B431" }}>ACTIVE</span>
              ) : detail.verify !== "active" && detail.status === "deny" ? (
                <span style={{ color: "gray" }}>DENY</span>
              ) : detail.verify !== "active" && detail.status === "deleted" ? (
                <span style={{ color: "red" }}>DELETED</span>
              ) : detail.verify !== "active" && detail.status === "lock" ? (
                <span style={{ color: "#FAAD14" }}>LOCKED</span>
              ) : detail.verify !== "active" && detail.status === "wait" ? (
                <span style={{ color: "#038FDE" }}>WAIT</span>
              ) : (
                <span style={{ color: "rgb(202, 109, 13)" }}>DEACTIVATE</span>
              )}
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}
export default itemProduct;
