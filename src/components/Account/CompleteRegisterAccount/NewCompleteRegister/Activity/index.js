import React, { Component } from "react";
import { Col, Collapse, Divider, Icon, Row } from "antd";
import MemberPlan from "../MemberPlan";

const { Panel } = Collapse;

const customPanelStyle = {
  background: "#f7f7f7",
  borderRadius: 4,
  marginBottom: 12,
  border: 0,
  overflow: "hidden"
};

const chosenPanelStyle = {
  background: "#f7f777",
  borderRadius: 4,
  marginBottom: 12,
  border: 2,
  overflow: "hidden"
};

class Activity extends Component {
  state = {
    typeCompany: 0
  };

  onChangeTypeCompany = key => {
    this.setState({
      typeCompany: key
    });
  };
  render() {
    return (
      <div>
        <Row className="p-v-6">
          <Col xl={8} lg={8} md={8} sm={24} xs={24}>
            <div>
              <h3 className="m-b-10">Nội dung hoạt động</h3>
              <p> Bao gồm các thông tin : </p>
              <p>
                <Icon type="check-circle" /> Đơn vị, công ty người dùng đang làm
                việc
              </p>
              <p>
                <Icon type="check-circle" /> Công việc, chức vụ người dùng đang
                làm việc
              </p>
              <p>
                <Icon type="check-circle" /> Thông tin xác minh của người dùng
                đối với nơi đang làm việc
              </p>
            </div>
          </Col>
          <Col xl={16} lg={16} md={16} sm={24} xs={24}>
            <div className="block-w bor-rad-6">
              <Divider>Lĩnh vực hoạt động</Divider>
              <Collapse
                accordion
                bordered={false}
                onChange={this.onChangeTypeCompany}
                expandIcon={({ isActive }) => (
                  <Icon type="caret-right" rotate={isActive ? 90 : 0} />
                )}
                expandIconPosition="right"
              >
                <Panel
                  header="Làm việc tại các doanh nghiệp du lịch"
                  key="1"
                  style={
                    this.state.typeCompany === "1"
                      ? chosenPanelStyle
                      : customPanelStyle
                  }
                >
                  <div
                    style={{
                      borderRadius: "5px 5px 5px5px",
                      marginLeft: "1.5em"
                    }}
                  >
                    <h4 className="gx-text-grey">Cá nhân, tổ chức</h4>
                    <p>
                      Bao gồm: Lữ hành Quốc tế Inbound, Lức hành Quốc tế
                      Outbound, Lữ hành nội địa, Đại lý Du lịch, Vận tải, Hàng
                      không, Cơ sở lưu trú, Nhà hàng.
                    </p>
                  </div>
                </Panel>
                <Panel
                  header="Làm việc tại các tổ chức xã hội nghề nghiệp và du lịch"
                  key="2"
                  style={
                    this.state.typeCompany === "2"
                      ? chosenPanelStyle
                      : customPanelStyle
                  }
                >
                  <div
                    style={{
                      borderRadius: "5px 5px 5px5px",
                      marginLeft: "1.5em"
                    }}
                  >
                    <h4 className="gx-text-grey">Cá nhân</h4>
                    <p>
                      Bao gồm: Hiệp hội Du lịch, Câu lạc bộ, Chi hội Du lịch.
                    </p>
                  </div>
                </Panel>
                <Panel
                  header="Làm việc tại các đơn vị báo chí"
                  key="3"
                  style={
                    this.state.typeCompany === "3"
                      ? chosenPanelStyle
                      : customPanelStyle
                  }
                >
                  <div
                    style={{
                      borderRadius: "5px 5px 5px5px",
                      marginLeft: "1.5em"
                    }}
                  >
                    <h4 className="gx-text-grey">Cá nhân</h4>
                    <p>
                      Bao gồm: Các nhà báo, phóng viên, biên tập viên của các
                      tòa soạn.
                    </p>
                  </div>
                </Panel>
                <Panel
                  header="Làm việc tại các đơn vị marketing/truyền thông"
                  key="4"
                  style={
                    this.state.typeCompany === "4"
                      ? chosenPanelStyle
                      : customPanelStyle
                  }
                >
                  <div
                    style={{
                      borderRadius: "5px 5px 5px5px",
                      marginLeft: "1.5em"
                    }}
                  >
                    <h4 className="gx-text-grey">Cá nhân, tổ chức</h4>
                    <p>
                      Bao gồm: Các đơn vị truyền thông, quảng cáo các lĩnh vực
                      liên quan đến Du lịch.
                    </p>
                  </div>
                </Panel>
                <Panel
                  header="Làm việc tại các cơ quan quản lý nhà nước"
                  key="5"
                  style={
                    this.state.typeCompany === "5"
                      ? chosenPanelStyle
                      : customPanelStyle
                  }
                >
                  <div
                    style={{
                      borderRadius: "5px 5px 5px5px",
                      marginLeft: "1.5em"
                    }}
                  >
                    <h4 className="gx-text-grey">Cá nhân</h4>
                    <p>
                      Bao gồm: Tổng cục Du lịch, Sở Văn hóa thông tin và Du
                      lịch, Trung tâm xúc tiến Du lịch.
                    </p>
                  </div>
                </Panel>
                <Panel
                  header="Làm việc tại Đại sứ quán/Lãnh sự quán"
                  key="6"
                  style={
                    this.state.typeCompany === "6"
                      ? chosenPanelStyle
                      : customPanelStyle
                  }
                >
                  <div
                    style={{
                      borderRadius: "5px 5px 5px5px",
                      marginLeft: "1.5em"
                    }}
                  >
                    <h4 className="gx-text-grey">Cá nhân</h4>
                    <p>
                      Bao gồm: Tổng cục Du lịch, Sở Văn hóa thông tin và Du
                      lịch, Trung tâm xúc tiến Du lịch.
                    </p>
                  </div>
                </Panel>
                <Panel
                  header="Làm việc tại các đơn vị đào tạo (Trường học, trung tâm, doanh nghiệp,...)"
                  key="7"
                  style={
                    this.state.typeCompany === "7"
                      ? chosenPanelStyle
                      : customPanelStyle
                  }
                >
                  <div
                    style={{
                      borderRadius: "5px 5px 5px5px",
                      marginLeft: "1.5em"
                    }}
                  >
                    <h4 className="gx-text-grey">Cá nhân, tổ chức</h4>
                    <p>
                      Bao gồm: Các trường đại học, cao đẳng, trung cấp nghề,
                      trung tâm đào tạo về lĩnh vực du lịch.
                    </p>
                  </div>
                </Panel>
                <Panel
                  header="Là hướng dẫn viên du lịch"
                  key="8"
                  style={
                    this.state.typeCompany === "8"
                      ? chosenPanelStyle
                      : customPanelStyle
                  }
                >
                  <div
                    style={{
                      borderRadius: "5px 5px 5px5px",
                      marginLeft: "1.5em"
                    }}
                  >
                    <h4 className="gx-text-grey">Cá nhân</h4>
                    <p>
                      Bao gồm: Các hướng dẫn viên trong và ngoài nước được cấp
                      giấy phép hoạt động.
                    </p>
                  </div>
                </Panel>
                <Panel
                  header="Là sinh viên ngành du lịch"
                  key="9"
                  style={
                    this.state.typeCompany === "9"
                      ? chosenPanelStyle
                      : customPanelStyle
                  }
                >
                  <div
                    style={{
                      borderRadius: "5px 5px 5px5px",
                      marginLeft: "1.5em"
                    }}
                  >
                    <h4 className="gx-text-grey">Cá nhân</h4>
                    <p>
                      Bao gồm: Sinh viên các trường đại học, cao đẳng, trung cấp
                      nghề về lĩnh vực Du lịch và Khách sạn.
                    </p>
                  </div>
                </Panel>
              </Collapse>
            </div>
          </Col>
        </Row>
        <hr />
        <MemberPlan getStep={this.props} type={this.state.typeCompany} />
      </div>
    );
  }
}

export default Activity;
