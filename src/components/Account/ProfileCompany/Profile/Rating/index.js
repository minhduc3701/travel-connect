import React from "react";
import ProductComment from "./ProductComment";
import { Col, Row, Pagination, Tabs } from "antd";
// import { ResponsiveContainer, Tooltip } from "recharts";
// import { Bar, BarChart, XAxis } from "recharts";
import { Select, Button } from "antd";
import { hidden } from "ansi-colors";
// import WidgetHeader from "components/WidgetHeader";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import IntlMessages from "util/IntlMessages";
import EventItem from "components/profile/Events/EventItem";
import { eventList } from "routes/Home/Company/Profile/data";
// import SaleData2 from "../SaleData2/SaleData2";
// import WidgetHeader from "components/WidgetHeader";
const TabPane = Tabs.TabPane;
const { Option } = Select;

const data02 = [
  { name: "Tệ", value: 100 },
  { name: "Chưa tốt", value: 150 },
  { name: "Bình thường", value: 150 },
  { name: "Tốt", value: 400 },
  { name: "Tuyệt vời", value: 200 }
];

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
  componentDidUpdate() {
    window.scrollTo({ top: 10000, behavior: "smooth" });
  }

  render() {
    return (
      // <div className="block" >
      // <WidgetHeader title={<IntlMessages id="company.rating" />} />
      <div className="block-w">
        <Tabs defaultActiveKey="1" tabPosition="top">
          <TabPane tab={<IntlMessages id="company.event" />} key="1">
            {/* <div className="block-w"> */}
            <p className="gx-text-grey gx-fs-sm gx-mb-0">
              What Travel Connect is up-to
            </p>
            <Row>
              {eventList.length < 1 ? (
                <p className="gx-font-weight-light">
                  <i className="icon icon-sweet-alert"></i>
                  {<IntlMessages id="guide.company.event" />}
                </p>
              ) : (
                  eventList.map((data, index) => (
                    <Col key={index} xl={8} lg={8} md={12} sm={12} xs={24}>
                      <EventItem data={data} />
                    </Col>
                  ))
                )}
            </Row>
            {/* </div> */}
          </TabPane>
          <TabPane tab={<IntlMessages id="company.rating" />} key="2">
            <Row>
              <Col xl={16} lg={16} md={16} sm={16} xs={16}>
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
              <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%"
                  }}
                >
                  <h2 className="h4 gx-mb-2 ">Tổng: 1000 Đánh giá</h2>
                  <br />
                  <p className="gx-text-grey p-l-6">Năm 2019</p>
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
          <TabPane tab={<IntlMessages id="product.cat.info.comment" />} key="3">
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
                      Xem tất cả đánh giá
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
          {/* <TabPane tab="Sale Data" key="4">
            <SaleData2 />
          </TabPane> */}
        </Tabs>
      </div>
      //{" "}
    );
  }
}
export default Rating;
// import React from "react";
// import ProductComment from "./ProductComment";
// import { Col, Row, Pagination, Tabs, Badge } from "antd";
// import { ResponsiveContainer, Tooltip } from "recharts";
// import { Bar, BarChart, XAxis } from "recharts";
// import { Select, Button } from "antd";
// import { hidden } from "ansi-colors";
// // import WidgetHeader from "components/WidgetHeader";

// import IntlMessages from "util/IntlMessages";
// import EventItem from "components/profile/Events/EventItem";
// import { eventList } from "routes/Home/Company/Profile/data";
// // import WidgetHeader from "components/WidgetHeader";
// const TabPane = Tabs.TabPane;
// const { Option } = Select;
// const data2 = [
//   { name: "Tệ", bad: 30 },
//   { name: "Chưa tốt", notgood: 100 },
//   { name: "Bình thường", normal: 300 },
//   { name: "Tốt", good: 500 },
//   { name: "Tuyệt vời", excellent: 80 }
// ];
// class Rating extends React.Component {
//   state = {
//     viewAll: false
//   };
//   viewAll = () => {
//     this.setState({
//       viewAll: true
//     });
//   };
//   closeViewAll = () => {
//     this.setState({
//       viewAll: false
//     });
//   };
//   componentDidUpdate() {
//     window.scrollTo({ top: 10000, behavior: "smooth" });
//   }
//   render() {
//     return (
//       // <div className="block" >
//       // <WidgetHeader title={<IntlMessages id="company.rating" />} />
//       <div className="block-w">
//         <Tabs defaultActiveKey="1" tabPosition="top">
//           <TabPane tab={<IntlMessages id="company.event" />} key="1">
//             {/* <div className="block-w"> */}
//             <p className="gx-text-grey gx-fs-sm gx-mb-0">
//               What Travel Connect is up-to
//             </p>
//             <Row>
//               {eventList.length < 1 ? (
//                 <p className="gx-font-weight-light">
//                   <i className="icon icon-sweet-alert"></i>
//                   {<IntlMessages id="guide.company.event" />}
//                 </p>
//               ) : (
//                 eventList.map((data, index) => (
//                   <Col key={index} xl={8} lg={8} md={24} sm={24} xs={24}>
//                     <EventItem data={data} />
//                   </Col>
//                 ))
//               )}
//             </Row>
//             {/* </div> */}
//           </TabPane>
//           <TabPane tab={<IntlMessages id="company.rating" />} key="2">
//             <Row>
//               <Col xl={24} lg={24} md={24} sm={24} xs={24}>
//                 <div className="gx-py-3">
//                   <div className="gx-dealclose-header">
//                     <div>
//                       <h2 className="h4 gx-mb-2">Tổng: 995 Đánh giá</h2>
//                       <p className="gx-text-grey">Năm 2019</p>
//                     </div>
//                     <div className="gx-dealclose-header-right">
//                       <p className="gx-mb-4">
//                         <Badge className="gx-mb-0" status="default" />
//                         Tệ
//                       </p>
//                       <p className="gx-ml-4 gx-mb-4">
//                         <Badge className="gx-mb-0" status="processing" />
//                         Chưa tốt
//                       </p>
//                       <p className="gx-ml-4 gx-mb-4">
//                         <Badge className="gx-mb-0" status="success" />
//                         Bình thường
//                       </p>
//                       <p className="gx-ml-4 gx-mb-4">
//                         <Badge className="gx-mb-0" status="error" />
//                         Tốt
//                       </p>
//                       <p className="gx-ml-4 gx-mb-4">
//                         <Badge className="gx-mb-0" status="warning" />
//                         Tuyệt vời
//                       </p>
//                     </div>
//                   </div>
//                   <Row>
//                     <Col xl={2} lg={2} md={2} sm={2} xs={2}></Col>
//                     <Col xl={20} lg={20} md={20} sm={20} xs={20}>
//                       <ResponsiveContainer width="100%" height={150}>
//                         <BarChart
//                           data={data2}
//                           margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
//                         >
//                           <Tooltip />
//                           <XAxis dataKey="name" />
//                           <Bar
//                             dataKey="bad"
//                             stackId="a"
//                             fill="#d9d9d9"
//                             barSize={14}
//                           />
//                           <Bar
//                             dataKey="notgood"
//                             stackId="a"
//                             fill="#038fde"
//                             barSize={14}
//                           />
//                           <Bar
//                             dataKey="normal"
//                             stackId="a"
//                             fill="#52c41a"
//                             barSize={14}
//                           />
//                           <Bar
//                             dataKey="good"
//                             stackId="a"
//                             fill="#f5222d"
//                             barSize={14}
//                           />
//                           <Bar
//                             dataKey="excellent"
//                             stackId="a"
//                             fill="#fa8c16"
//                             barSize={14}
//                           />
//                         </BarChart>
//                       </ResponsiveContainer>
//                     </Col>
//                   </Row>
//                 </div>
//               </Col>
//             </Row>
//           </TabPane>
//           <TabPane tab={<IntlMessages id="product.cat.info.comment" />} key="3">
//             {this.state.viewAll === false ? (
//               <Row>
//                 <Col
//                   xl={24}
//                   lg={24}
//                   md={24}
//                   sm={24}
//                   xs={24}
//                   className="p-r-3-lg-i"
//                 >
//                   <div className="p-3 m-b-3 h-300 overflow-scroll">
//                     <ProductComment />
//                     <p
//                       className="view-all-comment gx-link "
//                       onClick={() => this.viewAll()}
//                     >
//                       Xem tất cả đánh giá
//                     </p>
//                   </div>
//                 </Col>
//               </Row>
//             ) : (
//               <Row>
//                 <Col xl={24} lg={24} md={24} sm={24} xs={24}>
//                   <div className="p-3 m-b-3 bg-color-white bor-rad-6">
//                     <Button
//                       onClick={() => this.closeViewAll()}
//                       style={{ height: 30 }}
//                     >
//                       <i className="icon icon-arrow-left"></i>
//                     </Button>
//                     <Row>
//                       <Col xl={10} lg={10} md={10} sm={24} xs={24}>
//                         <Select
//                           showSearch
//                           className="w-90"
//                           placeholder="Select a service"
//                           defaultValue="1"
//                         >
//                           <Option value="1">Liên quan nhất</Option>
//                           <Option value="2">Mới nhất</Option>
//                         </Select>
//                       </Col>
//                       <Col xl={10} lg={10} md={10} sm={24} xs={24}>
//                         <Select
//                           showSearch
//                           className="w-90"
//                           placeholder="Select a type mail"
//                           defaultValue="1"
//                         >
//                           <Option value="1">Tất cả xếp hạng</Option>
//                           <Option value="2">Tuyệt vời</Option>
//                           <Option value="3">Tốt</Option>
//                           <Option value="4">Bình thường</Option>
//                           <Option value="5">Chưa tốt</Option>
//                           <Option value="6">Tệ</Option>
//                         </Select>
//                       </Col>

//                       <Col xl={4} lg={4} md={4} sm={24} xs={24}>
//                         <div className="text-align-center d-block">
//                           <Button
//                             className=""
//                             style={{
//                               backgroundColor: "#038FDE",
//                               color: "white"
//                             }}
//                           >
//                             Lọc
//                           </Button>
//                         </div>
//                       </Col>
//                     </Row>
//                     <br />
//                     <div style={{ height: 300, overflow: hidden }}>
//                       <ProductComment />
//                       <Pagination
//                         defaultCurrent={1}
//                         total={50}
//                         style={{ marginTop: 10, float: "right" }}
//                       />
//                     </div>
//                   </div>
//                 </Col>
//               </Row>
//             )}
//           </TabPane>
//         </Tabs>
//       </div>
//       //{" "}
//     );
//   }
// }
// export default Rating;
