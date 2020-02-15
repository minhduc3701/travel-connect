import React from "react";
import ProductComment from "./ProductComment";
import { Col, Row, Pagination, Tabs, Select, Button } from "antd";
import { hidden } from "ansi-colors";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Detail from "./Detail";
import IntlMessages from "util/IntlMessages";

// const Tooltips = Tooltip;
const TabPane = Tabs.TabPane;
const { Option } = Select;

const COLORS = ["#ca4ce9", "#FF8042", "#FFBB28", "#0088FE", "#00C49F"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class Rating extends React.Component {
  state = {
    viewAll: false,
    cmts: 4
  };
  viewAll = () => {
    this.setState({
      viewAll: true
    });
  };
  closeViewAll = () => {
    this.setState({
      viewAll: false
    });
  };
  // componentDidUpdate() {
  //   window.scrollTo({ top: 10000, behavior: "smooth" });
  // }

  render() {
    let { profile } = this.props;
    const data02 = [
      {
        name: <IntlMessages id="account.profile.rating.unit.bad" />,
        value: profile.company_rating_bad
      },
      {
        name: <IntlMessages id="account.profile.rating.unit.notgood" />,
        value: profile.company_rating_fail
      },
      {
        name: <IntlMessages id="account.profile.rating.unit.normal" />,
        value: profile.company_rating_normal
      },
      {
        name: <IntlMessages id="account.profile.rating.unit.good" />,
        value: profile.company_rating_good
      },
      {
        name: <IntlMessages id="account.profile.rating.unit.great" />,
        value: profile.company_rating_great
      }
    ];

    return (
      <div id="nav_rating" style={{ minHeight: "16em" }}>
        <Tabs defaultActiveKey="1" tabPosition="top">
          <TabPane tab={<IntlMessages id="account.profile.rating" />} key="1">
            <Row>
              <Col xl={14} lg={14} md={14} sm={24} xs={24}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart onMouseEnter={this.onPieEnter}>
                    <Pie
                      dataKey="value"
                      data={data02}
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#003366"
                    >
                      {data02.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Col>
              <Col xl={10} lg={10} md={10} sm={24} xs={24}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%"
                  }}
                >
                  <h2 className="h4 gx-mb-2 ">
                    <IntlMessages id="general.text.total" />:{" "}
                    {profile.company_rating}{" "}
                    <IntlMessages id="account.profile.rating" />
                  </h2>
                  <br />
                  <p className="gx-text-grey">
                    <IntlMessages id="general.text.year" /> 2019
                  </p>
                  <Detail Account={profile} />
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab={<IntlMessages id="account.profile.comment" />} key="2">
            {this.state.viewAll === false ? (
              <Row>
                <Col
                  xl={24}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  className="p-r-3-lg-i"
                >
                  <div className="p-3 m-b-3 h-300 overflow-scroll">
                    <ProductComment cmt={this.state.cmts} Account={profile} />
                    <p
                      className="view-all-comment gx-link "
                      onClick={() => this.viewAll()}
                    >
                      <IntlMessages id="general.text.all" />{" "}
                      <IntlMessages id="account.profile.comment" />
                    </p>
                  </div>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <div className="p-3 m-b-3 bg-color-white bor-rad-6">
                    <Button
                      onClick={() => this.closeViewAll()}
                      style={{ height: 30 }}
                    >
                      <i className="icon icon-arrow-left"></i>
                    </Button>
                    <Row>
                      <Col xl={10} lg={10} md={10} sm={24} xs={24}>
                        <Select
                          showSearch
                          className="w-90"
                          placeholder="Select a type mail"
                          defaultValue="1"
                        >
                          <Option value="1">
                            <IntlMessages id="general.all" />{" "}
                            <IntlMessages id="account.profile.comment" />
                          </Option>
                          <Option value="2">
                            <IntlMessages id="account.profile.comment.filter.rating.unit.great" />
                          </Option>
                          <Option value="3">
                            <IntlMessages id="account.profile.comment.filter.rating.unit.good" />
                          </Option>
                          <Option value="4">
                            <IntlMessages id="account.profile.comment.filter.rating.unit.normal" />
                          </Option>
                          <Option value="5">
                            <IntlMessages id="account.profile.comment.filter.rating.unit.notgood" />
                          </Option>
                          <Option value="6">
                            <IntlMessages id="account.profile.comment.filter.rating.unit.bad" />
                          </Option>
                        </Select>
                      </Col>
                      <Col xl={4} lg={4} md={4} sm={24} xs={24}>
                        <div className="text-align-center">
                          <Button
                            className=""
                            style={{
                              backgroundColor: "#038FDE",
                              color: "white"
                            }}
                          >
                            <IntlMessages id="account.profile.comment.filter" />
                          </Button>
                        </div>
                      </Col>
                      <Col xl={10} lg={10} md={10} sm={24} xs={24}></Col>
                    </Row>
                    <br />
                    <div style={{ height: 300, overflow: hidden }}>
                      <ProductComment Account={profile} />
                      <Pagination
                        defaultCurrent={1}
                        total={50}
                        style={{ marginTop: 10, float: "right" }}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            )}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export default Rating;
