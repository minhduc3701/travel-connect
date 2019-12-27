import React from "react";
import ProductComment from "./ProductComment";
import { Col, Row, Pagination, Tabs } from "antd";
import { Select, Button } from "antd";
import { hidden } from "ansi-colors";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import IntlMessages from "util/IntlMessages";
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
    viewAll: false
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
    // console.log(profile);

    const data02 = [
      { name: "Tệ", value: profile.company_rating_bad },
      { name: "Chưa tốt", value: profile.company_rating_fail },
      { name: "Bình thường", value: profile.company_rating_normal },
      { name: "Tốt", value: profile.company_rating_good },
      { name: "Tuyệt vời", value: profile.company_rating_great }
    ];

    return (
      <div className="block-w-nb disable_layer_block" id="nav_rating">
        <Tabs defaultActiveKey="1" tabPosition="top">
          <TabPane tab={<IntlMessages id="company.rating" />} key="1">
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
                    Tổng: {profile.company_rating} Đánh giá
                  </h2>
                  <br />
                  <p className="gx-text-grey">Năm 2019</p>
                  <div
                    style={{
                      width: "70%",
                      paddingLeft: 5
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        marginBottom: 5,
                        justifyContent: "space-between"
                      }}
                    >
                      <span>Tệ :</span>
                      <span
                        style={{
                          display: "inline-block",
                          marginLeft: 5,
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          backgroundColor: "#ca4ce9"
                        }}
                      ></span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        marginBottom: 5,
                        justifyContent: "space-between"
                      }}
                    >
                      <span>Chưa tốt :</span>
                      <span
                        style={{
                          display: "inline-block",
                          marginLeft: 5,
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          backgroundColor: "#FF8042"
                        }}
                      ></span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        marginBottom: 5,
                        justifyContent: "space-between"
                      }}
                    >
                      <span>Bình thường :</span>
                      <span
                        style={{
                          display: "inline-block",
                          marginLeft: 5,
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          backgroundColor: "#FFBB28"
                        }}
                      ></span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        marginBottom: 5,
                        justifyContent: "space-between"
                      }}
                    >
                      <span>Tốt :</span>
                      <span
                        style={{
                          display: "inline-block",
                          marginLeft: 5,
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          backgroundColor: "#0088FE"
                        }}
                      ></span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        marginBottom: 5,
                        justifyContent: "space-between"
                      }}
                    >
                      <span>Tuyệt vời :</span>
                      <span
                        style={{
                          display: "inline-block",
                          marginLeft: 5,
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          backgroundColor: "#00C49F"
                        }}
                      ></span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab={<IntlMessages id="product.cat.info.comment" />} key="2">
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
                    <ProductComment />
                    <p
                      className="view-all-comment gx-link "
                      onClick={() => this.viewAll()}
                    >
                      Tất cả đánh giá
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
                          placeholder="Select a service"
                          defaultValue="1"
                        >
                          <Option value="1">Liên quan nhất</Option>
                          <Option value="2">Mới nhất</Option>
                        </Select>
                      </Col>
                      <Col xl={10} lg={10} md={10} sm={24} xs={24}>
                        <Select
                          showSearch
                          className="w-90"
                          placeholder="Select a type mail"
                          defaultValue="1"
                        >
                          <Option value="1">Tất cả xếp hạng</Option>
                          <Option value="2">Tuyệt vời</Option>
                          <Option value="3">Tốt</Option>
                          <Option value="4">Bình thường</Option>
                          <Option value="5">Chưa tốt</Option>
                          <Option value="6">Tệ</Option>
                        </Select>
                      </Col>

                      <Col xl={4} lg={4} md={4} sm={24} xs={24}>
                        <div className="text-align-center d-block">
                          <Button
                            className=""
                            style={{
                              backgroundColor: "#038FDE",
                              color: "white"
                            }}
                          >
                            Lọc
                          </Button>
                        </div>
                      </Col>
                    </Row>
                    <br />
                    <div style={{ height: 300, overflow: hidden }}>
                      <ProductComment />
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
