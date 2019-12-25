import React, { Fragment } from "react";
import {
  Row,
  Col,
  Avatar,
  List,
  Collapse,
  Icon,
  Button,
  Upload,
  // Tabs,
  Steps,
  Cascader,
  Divider,
  Input,
  // Card,
  Checkbox,
  Radio,
  Skeleton,
  DatePicker,
  Form,
  Select
} from "antd";
import ProfileRegister from "components/Account/CompleteRegisterAccount/StepRegister/MultiStep/Profile";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import Widget from "components/GlobalComponent/Widget";
import IntlMessages from "util/IntlMessages";
// import PricingTable from "./MemberPackage/PricingTable";
// import ScrollAutomatically from "routes/Home/StepRegister/Carousel";
// import Verification from "routes/Home/StepRegister/index";
import { notiChange } from "util/Notification";
import License from "components/Account/CompleteRegisterAccount/StepRegister/license";
// import { Link } from "react-router-dom";
const { Step } = Steps;
const Dragger = Upload.Dragger;
// const TabPane = Tabs.TabPane;
const Option = Select.Option;
const InputGroup = Input.Group;
const { OptGroup } = Select;

const props = {
  name: "file",
  multiple: true,
  action: "//jsonplaceholder.typicode.com/posts/",
  onChange(info) {
    const status = info.file.status;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      // message.success(`${info.file.name} file uploaded successfully.`);
      notiChange("success", "Upload file success");
    } else if (status === "error") {
      // message.error(`${info.file.name} file upload failed.`);
      notiChange("error", "Upload file failed");
    }
  }
};

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

const { Panel } = Collapse;
const residences = [
  {
    value: "hanoi",
    label: "Hà Nội",
    children: [
      {
        value: "dongda",
        label: "Đống Đa"
      },
      {
        value: "caugiay",
        label: "Cầu giấy"
      },
      {
        value: "hoangmai",
        label: "Hoàng Mai"
      }
    ]
  },
  {
    value: "saigon",
    label: "Hồ Chí Minh",
    children: [
      {
        value: "quan1",
        label: "Quận 1"
      },
      {
        value: "quan2",
        label: "Quận 2"
      }
    ]
  }
];

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { xs: 24, sm: 6 },
  wrapperCol: { xs: 24, sm: 18 }
};
class CompleteRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      typeAccount: 0,
      typeCompany: 0,
      typeSubCompany: 0,
      done: false,
      statusJob: 0,
      help: false,
      toShowList: false,
      company: false,
      create: false,
      FreeLancer: 0,
      admin: 0,
      showSearch: false,
      nextTab: false,
      ariaDisable: false,
      currentStep: 0,
      current: 0
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  onBackStep = () => {
    this.setState((prevState, props) => {
      return {
        currentStep: prevState.currentStep - 1
      };
    });
  };
  onNextStep = () => {
    this.setState((prevState, props) => {
      return {
        currentStep: prevState.currentStep + 1
      };
    });
  };

  showSearch = () => {
    this.setState({
      showSearch: !this.state.showSearch
    });
  };

  setAdmin = value => {
    if (this.state.admin === 0)
      this.setState({
        admin: value
      });
    else
      this.setState({
        admin: 0
      });
    if (value === 2) {
      this.setState({
        create: true
      });
    } else
      this.setState({
        create: false
      });
  };
  onChoseAdmin = () => {
    return (
      <Row>
        <Col span={12} onClick={() => this.setAdmin(1)}>
          <Widget
            styleName={
              this.state.admin === 1
                ? "gx-bg-dark-primary gx-highlight"
                : "gx-bg-dark-primary gx-link"
            }
          >
            <div className="gx-text-center">
              <h2 className="h3 gx-mb-3 gx-text-white">Cá nhân</h2>
              <i className={`icon icon-user gx-fs-xlxl gx-text-white`} />
              <p className="gx-text-white gx-mb-3">
                - Tham gia các hoạt động, sự kiện trên sàn.
              </p>
              <p className="gx-text-white gx-mb-3">
                - Không yêu cầu giấy phép kinh doanh.
              </p>
            </div>
          </Widget>
        </Col>
        <Col span={12} onClick={() => this.setAdmin(2)}>
          <Widget
            styleName={this.state.admin === 2 ? "gx-highlight" : "gx-link"}
          >
            <div className="gx-text-center">
              <h2 className="h3 gx-mb-3 ">Đại diện công ty</h2>
              <i className={`icon icon-company gx-fs-xlxl `} />
              <p className=" gx-mb-3">
                - Tham gia các hoạt động, mua bán, sự kiện trên sàn.
              </p>
              <p className=" gx-mb-3">
                - Yêu cầu có giấy phép hoạt động kinh doanh, chứng nhận,...
              </p>
            </div>
          </Widget>
          {/* <Widget
            styleName={
              this.state.admin === 2
                ? "gx-bg-dark-primary gx-highlight"
                : "gx-bg-dark-primary gx-link"
            }
          >
            <div className="gx-text-center">
              <h2 className="h3 gx-mb-3 gx-text-white">Đại diện công ty</h2>
              <i className={`icon icon-company gx-fs-xlxl gx-text-white`} />
              <p className="gx-text-white gx-mb-3">
                - Tham gia các hoạt động, mua bán, sự kiện trên sàn.
              </p>
              <p className="gx-text-white gx-mb-3">
                - Yêu cầu có giấy phép hoạt động kinh doanh, chứng nhận,...
              </p>
            </div>
          </Widget> */}
        </Col>
      </Row>
    );
  };

  onChosePlan = e => {
    this.setState({
      typeAccount: e.target.value
    });
  };

  onChangeFreeLancer = e => {
    this.setState({
      FreeLancer: e.target.value
    });
  };

  onChangeTypeCompany = e => {
    this.setState({
      typeCompany: e
    });
  };

  onChangeStatusJob = e => {
    this.setState({
      statusJob: e.target.value
    });
  };

  choseSubCompany = e => {
    this.setState({
      typeSubCompany: e.target.value
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      help: false
    });
  };

  onSubCompany = () => {
    return (
      <Select defaultValue="1" style={{ width: "100%" }} mode="multiple">
        <Option value="1">Lữ hành quốc tế Inbound</Option>
        <Option value="2">Lữ hành quốc tế Outbound</Option>
        <Option value="3">Lữ hành nội địa</Option>
        <Option value="4">Đại lý Du lịch</Option>
        <Option value="5">Vận tải</Option>
        <Option value="6">Hàng không</Option>
        <Option value="7">Cơ sỏ lưu trú</Option>
        <Option value="8">Nhà hàng</Option>
      </Select>
    );
  };

  nextStep = () => {
    this.setState({
      currentStep: this.state.currentStep + 1
    });
  };

  backStep = () => {
    this.setState({
      currentStep: this.state.currentStep - 1,
      create: 0,
      typeAccount: 0,
      FreeLancer: 0
    });
  };

  titleIndustry() {
    if (this.state.typeCompany !== 1) {
      switch (this.state.typeCompany) {
        case 2:
          return "Tổng cục Du lịch, Sở VHTT & Du lịch, Trung tâm xúc tiến Du Lịch";
        case 3:
          return "Triển lãm Thương mại, Giao dục, Công nghệ, Tư vấn, ...";
        case 4:
          return "Hiệp hội Du lịch, Câu lạc bộ, Diễn đàn, Chi Hội Du lịch";
        case 5:
          return "Hướng dẫn viên du lịch";
        case 6:
          return "Báo chí, truyền thông, cộng đồng mạng về Du lịch";
        default:
          break;
      }
    }
  }

  showList = () => {
    this.setState({
      toShowList: true,
      company: false
    });
  };

  choseCompany = value => {
    this.setState({
      currentStep: this.state.currentStep + 1,
      company: true
    });
  };

  listCompany = () => {
    const data = [
      {
        id: 1,
        avatar: "",
        title: "Công ty Du lịch Việt Hàn"
      },
      {
        id: 2,
        avatar: "",
        title: "Công ty Du lịch Đất Việt"
      },
      {
        id: 3,
        avatar: "",
        title: "Công ty phát triển Du lịch Việt Nam TVN"
      },
      {
        id: 4,
        avatar: "",
        title: "Trung tâm kết nối Du lịch"
      }
    ];
    const { initLoading } = this.state;
    return (
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item
            actions={[
              <span
                className="gx-link"
                onClick={() => this.choseCompany(item.id)}
              >
                Tham gia
              </span>
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={item.title}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    );
  };

  contentStep1 = () => {
    return (
      <div>
        <ProfileRegister />
      </div>
    );
  };

  contentStep2 = () => {
    return (
      <div>
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
            key={1}
            style={
              this.state.typeCompany === "1"
                ? chosenPanelStyle
                : customPanelStyle
            }
          >
            <div
              style={{ borderRadius: "5px 5px 5px5px", marginLeft: "1.5em" }}
            >
              <h4 className="gx-text-grey">Cá nhân, tổ chức</h4>
              <p>
                Bao gồm: Lữ hành Quốc tế Inbound, Lức hành Quốc tế Outbound, Lữ
                hành nội địa, Đại lý Du lịch, Vận tải, Hàng không, Cơ sở lưu
                trú, Nhà hàng.
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
              style={{ borderRadius: "5px 5px 5px5px", marginLeft: "1.5em" }}
            >
              <h4 className="gx-text-grey">Cá nhân</h4>
              <p>Bao gồm: Hiệp hội Du lịch, Câu lạc bộ, Chi hội Du lịch.</p>
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
              style={{ borderRadius: "5px 5px 5px5px", marginLeft: "1.5em" }}
            >
              <h4 className="gx-text-grey">Cá nhân</h4>
              <p>
                Bao gồm: Các nhà báo, phóng viên, biên tập viên của các tòa
                soạn.
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
              style={{ borderRadius: "5px 5px 5px5px", marginLeft: "1.5em" }}
            >
              <h4 className="gx-text-grey">Cá nhân, tổ chức</h4>
              <p>
                Bao gồm: Các đơn vị truyền thông, quảng cáo các lĩnh vực liên
                quan đến Du lịch.
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
              style={{ borderRadius: "5px 5px 5px5px", marginLeft: "1.5em" }}
            >
              <h4 className="gx-text-grey">Cá nhân</h4>
              <p>
                Bao gồm: Tổng cục Du lịch, Sở Văn hóa thông tin và Du lịch,
                Trung tâm xúc tiến Du lịch.
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
              style={{ borderRadius: "5px 5px 5px5px", marginLeft: "1.5em" }}
            >
              <h4 className="gx-text-grey">Cá nhân</h4>
              <p>
                Bao gồm: Tổng cục Du lịch, Sở Văn hóa thông tin và Du lịch,
                Trung tâm xúc tiến Du lịch.
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
              style={{ borderRadius: "5px 5px 5px5px", marginLeft: "1.5em" }}
            >
              <h4 className="gx-text-grey">Cá nhân, tổ chức</h4>
              <p>
                Bao gồm: Các trường đại học, cao đẳng, trung cấp nghề, trung tâm
                đào tạo về lĩnh vực du lịch.
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
              style={{ borderRadius: "5px 5px 5px5px", marginLeft: "1.5em" }}
            >
              <h4 className="gx-text-grey">Cá nhân</h4>
              <p>
                Bao gồm: Các hướng dẫn viên trong và ngoài nước được cấp giấy
                phép hoạt động.
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
              style={{ borderRadius: "5px 5px 5px5px", marginLeft: "1.5em" }}
            >
              <h4 className="gx-text-grey">Cá nhân</h4>
              <p>
                Bao gồm: Sinh viên các trường đại học, cao đẳng, trung cấp nghề
                về lĩnh vực Du lịch và Khách sạn.
              </p>
            </div>
          </Panel>
        </Collapse>
      </div>
    );
  };

  contentStep3 = () => {
    switch (this.state.typeCompany) {
      case "1":
        return (
          <div className="textt-align-center">
            <Divider> Lựa chọn kế hoạch thành viên </Divider>
            <p>
              Công ty của bạn có đang hoạt động trên sàn hay không?
              <span className="gx-link" onClick={() => this.showSearch()}>
                {" "}
                Kiểm tra
              </span>
            </p>
            {this.state.showSearch ? (
              <div>
                <FormItem {...formItemLayout} label="Quốc gia: ">
                  <Select defaultValue="vn" style={{ width: "100%" }}>
                    <OptGroup label="Châu Á">
                      <Option value="vn">Việt Nam</Option>
                      <Option value="jp">Nhật Bản</Option>
                    </OptGroup>
                    <OptGroup label="Châu Âu">
                      <Option value="fi">Pháp</Option>
                    </OptGroup>
                  </Select>
                </FormItem>

                <FormItem {...formItemLayout} label="Công ty: ">
                  <InputGroup compact>
                    <Select style={{ width: "30%" }} defaultValue="name">
                      <Option value="name">Tên công ty</Option>
                      <Option value="code">Mã số thuế</Option>
                    </Select>
                    <Input style={{ width: "50%" }} />
                    <Button style={{ width: "20%" }} type="primary">
                      Tìm kiếm
                    </Button>
                  </InputGroup>
                </FormItem>
              </div>
            ) : null}
            <FormItem {...formItemLayout} label="Trạng thái">
              <Radio.Group onChange={this.onChosePlan}>
                <Radio value={1}>
                  Công ty tôi hiện chưa hoạt động trên sàn
                </Radio>
                <Radio value={2}>
                  Công ty tôi hiện đang hoạt động trên sàn
                </Radio>
              </Radio.Group>
            </FormItem>
            {this.state.typeAccount === 2 ? (
              <div>
                <p>Thông tin công việc của bạn</p>
                <FormItem {...formItemLayout} label="Tên công ty">
                  <Input />
                </FormItem>
                <FormItem {...formItemLayout} label="Chức vụ">
                  <Input />
                </FormItem>
              </div>
            ) : null}
            {this.state.typeAccount === 1 ? (
              <div>
                <p>Phương hướng hoạt động của bạn trên sàn?</p>
                {this.onChoseAdmin()}
              </div>
            ) : null}
            {this.state.admin === 1 ? (
              <div>
                <Divider> Hồ sơ công việc </Divider>
                <FormItem {...formItemLayout} label="Tên đơn vị">
                  <Input placeholder="Tên công ty" />
                </FormItem>
                <FormItem {...formItemLayout} label="Tên thương hiệu">
                  <Input placeholder="Tên thương hiệu" />
                </FormItem>
                <FormItem {...formItemLayout} label="Chức vụ bản thân">
                  <Input placeholder="Chức vụ" />
                </FormItem>
                <FormItem {...formItemLayout} label="Email">
                  <Input placeholder="Email đơn vị" />
                </FormItem>
                <FormItem {...formItemLayout} label="Số điện thoại">
                  <Input placeholder="Số điện thoại cố định" />
                </FormItem>
                <FormItem {...formItemLayout} label="Quốc gia/ Quận/ Huyện">
                  <Cascader options={residences} />
                </FormItem>
                <FormItem {...formItemLayout} label="Địa chỉ">
                  <Input placeholder="Địa chỉ" />
                </FormItem>
              </div>
            ) : null}
            {this.state.create ? (
              <div>
                <Divider> Đăng ký thông tin doanh nghiệp </Divider>
                <FormItem {...formItemLayout} label="Lĩnh vực hoạt động">
                  {this.onSubCompany()}
                </FormItem>
                <FormItem {...formItemLayout} label="Tên công ty">
                  <Input placeholder="Tên công ty" />
                </FormItem>
                <FormItem {...formItemLayout} label="Tên thương hiệu">
                  <Input placeholder="Tên thương hiệu" />
                </FormItem>
                <FormItem {...formItemLayout} label="Email">
                  <Input placeholder="Email công ty" />
                </FormItem>
                <FormItem {...formItemLayout} label="Số điện thoại">
                  <Input placeholder="Số điện thoại cố định" />
                </FormItem>
                <FormItem {...formItemLayout} label="Quốc gia/ Quận/ Huyện">
                  <Cascader options={residences} />
                </FormItem>
                <FormItem {...formItemLayout} label="Địa chỉ">
                  <Input placeholder="Địa chỉ" />
                </FormItem>
                <FormItem {...formItemLayout} label="Ngày thành lập">
                  <DatePicker
                    className="gx-w-100"
                    placeholder="Ngày thành lập công ty trên giấy phép kinh doanh"
                  />
                </FormItem>
                <FormItem {...formItemLayout} label="Thị trường">
                  <Input placeholder="Thị trường mục tiêu" />
                </FormItem>
              </div>
            ) : null}
          </div>
        );
      case "2":
        return (
          <div>
            <Divider> Lựa chọn kế hoạch thành viên </Divider>
            <p>
              Tổ chức của bạn có đang hoạt động trên sàn hay không?
              <span className="gx-link" onClick={() => this.showSearch()}>
                {" "}
                Kiểm tra
              </span>
            </p>
            {this.state.showSearch ? (
              <FormItem {...formItemLayout} label="Thông tin tìm kiếm: ">
                <InputGroup compact>
                  <Select style={{ width: "30%" }} defaultValue="name">
                    <Option value="name">Tên tổ chức</Option>
                    <Option value="code">Mã số thuế</Option>
                  </Select>
                  <Input style={{ width: "50%" }} />
                  <Button style={{ width: "20%" }} type="primary">
                    Tìm kiếm
                  </Button>
                </InputGroup>
              </FormItem>
            ) : null}
            <FormItem {...formItemLayout} label="Trạng thái">
              <Radio.Group onChange={this.onChosePlan}>
                <Radio value={1}>
                  Tổ chức tôi hiện chưa hoạt động trên sàn
                </Radio>
                <Radio value={2}>
                  Tổ chức tôi hiện đang hoạt động trên sàn
                </Radio>
              </Radio.Group>
            </FormItem>
            {this.state.typeAccount === 1 ? (
              <div>
                <p>Hãy cho chúng tôi công việc hiện tại của bạn</p>
                <FormItem {...formItemLayout} label="Tên tổ chức:">
                  <Input />
                </FormItem>
                <FormItem {...formItemLayout} label="Địa chỉ:">
                  <Input />
                </FormItem>
                <FormItem {...formItemLayout} label="Email liên hệ:">
                  <Input placeholder="Email" />
                </FormItem>
                <FormItem {...formItemLayout} label="Chức vụ của bạn:">
                  <Input />
                </FormItem>
              </div>
            ) : null}
            {this.state.typeAccount === 2 ? (
              <div>
                <p>Hãy cho chúng tôi công việc hiện tại của bạn</p>
                <FormItem {...formItemLayout} label="Tên tổ chức:">
                  <Input />
                </FormItem>
                <FormItem {...formItemLayout} label="Chức vụ của bạn:">
                  <Input />
                </FormItem>
              </div>
            ) : null}
          </div>
        );
      case "3":
        return (
          <div>
            <Divider> Lựa chọn kế hoạch thành viên </Divider>
            <p>
              Tổ chức của bạn có đang hoạt động trên sàn hay không?
              <span className="gx-link" onClick={() => this.showSearch()}>
                {" "}
                Kiểm tra
              </span>
            </p>
            {this.state.showSearch ? (
              <FormItem {...formItemLayout} label="Thông tin tìm kiếm: ">
                <InputGroup compact>
                  <Select style={{ width: "30%" }} defaultValue="name">
                    <Option value="name">Tên tổ chức</Option>
                    <Option value="code">Mã số thuế</Option>
                  </Select>
                  <Input style={{ width: "50%" }} />
                  <Button style={{ width: "20%" }} type="primary">
                    Tìm kiếm
                  </Button>
                </InputGroup>
              </FormItem>
            ) : null}
            <FormItem {...formItemLayout} label="Trạng thái">
              <Radio.Group onChange={this.onChosePlan}>
                <Radio value={1}>Đơn vị tôi hiện chưa hoạt động trên sàn</Radio>
                <Radio value={2}>Đơn vị tôi hiện đang hoạt động trên sàn</Radio>
              </Radio.Group>
            </FormItem>
            {this.state.typeAccount === 1 ? (
              <div>
                <p>Hãy cho chúng tôi công việc hiện tại của bạn</p>
                <FormItem {...formItemLayout} label="Tên đơn vị:">
                  <Input />
                </FormItem>
                <FormItem {...formItemLayout} label="Địa chỉ:">
                  <Input />
                </FormItem>
                <FormItem {...formItemLayout} label="Email liên hệ:">
                  <Input placeholder="Email" />
                </FormItem>
                <FormItem {...formItemLayout} label="Chức vụ của bạn:">
                  <Input />
                </FormItem>
                <FormItem {...formItemLayout} label="Thông tin xác minh:">
                  <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">
                      Click hoặc kéo thả file tại khu vực này
                    </p>
                    <p className="ant-upload-hint">
                      Cập nhật/Upload giấy tờ xác thực cá nhân như thẻ nhà báo,
                      giấy phép hành nghề,...
                    </p>
                  </Dragger>
                </FormItem>
              </div>
            ) : null}
            {this.state.typeAccount === 2 ? (
              <div>
                <p>Hãy cho chúng tôi công việc hiện tại của bạn</p>
                <FormItem {...formItemLayout} label="Tên đơn vị:">
                  <Input />
                </FormItem>
                <FormItem {...formItemLayout} label="Chức vụ của bạn:">
                  <Input />
                </FormItem>
              </div>
            ) : null}
          </div>
        );
      case "4":
        return (
          <div>
            <Divider> Lựa chọn kế hoạch thành viên </Divider>
            <p>
              Tổ chức của bạn có đang hoạt động trên sàn hay không?
              <span className="gx-link" onClick={() => this.showSearch()}>
                {" "}
                Kiểm tra
              </span>
            </p>
            {this.state.showSearch ? (
              <FormItem {...formItemLayout} label="Thông tin tìm kiếm: ">
                <InputGroup compact>
                  <Select style={{ width: "30%" }} defaultValue="name">
                    <Option value="name">Tên tổ chức</Option>
                    <Option value="code">Mã số thuế</Option>
                  </Select>
                  <Input style={{ width: "50%" }} />
                  <Button style={{ width: "20%" }} type="primary">
                    Tìm kiếm
                  </Button>
                </InputGroup>
              </FormItem>
            ) : null}
            <FormItem {...formItemLayout} label="Trạng thái">
              <Radio.Group onChange={this.onChosePlan}>
                <Radio value={1}>Đơn vị tôi hiện chưa hoạt động trên sàn</Radio>
                <Radio value={2}>Đơn vị tôi hiện đang hoạt động trên sàn</Radio>
              </Radio.Group>
            </FormItem>
            {this.state.typeAccount === 1 ? (
              <div>
                <p>Phương hướng hoạt động của bạn trên sàn?</p>
                {this.onChoseAdmin()}
              </div>
            ) : null}
            {this.state.typeAccount === 2 ? (
              <div>
                <p>Hãy cho chúng tôi công việc hiện tại của bạn</p>
                <FormItem {...formItemLayout} label="Tên đơn vị:">
                  <Input />
                </FormItem>
                <FormItem {...formItemLayout} label="Chức vụ của bạn:">
                  <Input />
                </FormItem>
              </div>
            ) : null}
            {this.state.admin === 1 ? (
              <div>
                <Divider> Hồ sơ công việc </Divider>
                <FormItem {...formItemLayout} label="Tên đơn vị">
                  <Input placeholder="Tên đơn vị" />
                </FormItem>
                <FormItem {...formItemLayout} label="Tên thương hiệu">
                  <Input placeholder="Tên thương hiệu" />
                </FormItem>
                <FormItem {...formItemLayout} label="Chức vụ bản thân">
                  <Input placeholder="Chức vụ" />
                </FormItem>
                <FormItem {...formItemLayout} label="Email">
                  <Input placeholder="Email đơn vị" />
                </FormItem>
                <FormItem {...formItemLayout} label="Số điện thoại">
                  <Input placeholder="Số điện thoại cố định" />
                </FormItem>
                <FormItem {...formItemLayout} label="Quốc gia/ Quận/ Huyện">
                  <Cascader options={residences} />
                </FormItem>
                <FormItem {...formItemLayout} label="Địa chỉ">
                  <Input placeholder="Địa chỉ" />
                </FormItem>
              </div>
            ) : null}
            {this.state.create ? (
              <div>
                <Divider> Đăng ký đơn vị truyền thông/marketing </Divider>
                <FormItem {...formItemLayout} label="Tên đơn vị">
                  <Input placeholder="Tên đơn vị truyền thông/marketing" />
                </FormItem>
                <FormItem {...formItemLayout} label="Tên thương hiệu">
                  <Input placeholder="Tên thương hiệu" />
                </FormItem>
                <FormItem {...formItemLayout} label="Email">
                  <Input placeholder="Email đơn vị" />
                </FormItem>
                <FormItem {...formItemLayout} label="Số điện thoại">
                  <Input placeholder="Số điện thoại cố định" />
                </FormItem>
                <FormItem {...formItemLayout} label="Quốc gia/ Quận/ Huyện">
                  <Cascader options={residences} />
                </FormItem>
                <FormItem {...formItemLayout} label="Địa chỉ">
                  <Input placeholder="Địa chỉ" />
                </FormItem>
                <FormItem {...formItemLayout} label="Ngày thành lập">
                  <DatePicker
                    className="gx-w-100"
                    placeholder="Ngày thành lập đơn vị trên giấy phép kinh doanh"
                  />
                </FormItem>
              </div>
            ) : null}
          </div>
        );
      case "5":
        return (
          <div>
            <Divider> Lựa chọn kế hoạch thành viên </Divider>
            <p>
              Tổ chức của bạn có đang hoạt động trên sàn hay không?
              <span className="gx-link" onClick={() => this.showSearch()}>
                {" "}
                Kiểm tra
              </span>
            </p>
            {this.state.showSearch ? (
              <FormItem {...formItemLayout} label="Thông tin tìm kiếm: ">
                <InputGroup compact>
                  <Select style={{ width: "30%" }} defaultValue="name">
                    <Option value="name">Tên tổ chức</Option>
                    <Option value="code">Mã số thuế</Option>
                  </Select>
                  <Input style={{ width: "50%" }} />
                  <Button style={{ width: "20%" }} type="primary">
                    Tìm kiếm
                  </Button>
                </InputGroup>
              </FormItem>
            ) : null}
            <FormItem {...formItemLayout} label="Trạng thái">
              <Radio.Group onChange={this.onChosePlan}>
                <Radio value={1}>Đơn vị tôi hiện chưa hoạt động trên sàn</Radio>
                <Radio value={2}>Đơn vị tôi hiện đang hoạt động trên sàn</Radio>
              </Radio.Group>
            </FormItem>
            {this.state.typeAccount === 1 ? (
              <div>
                <p>Hãy cho chúng tôi công việc hiện tại của bạn</p>
                <FormItem {...formItemLayout} label="Tên cơ quan:">
                  <Input />
                </FormItem>
                <FormItem {...formItemLayout} label="Địa chỉ:">
                  <Input />
                </FormItem>
                <FormItem {...formItemLayout} label="Email liên hệ:">
                  <Input placeholder="Email" />
                </FormItem>
                <FormItem {...formItemLayout} label="Chức vụ của bạn:">
                  <Input />
                </FormItem>
              </div>
            ) : null}
            {this.state.typeAccount === 2 ? (
              <div>
                <p>Hãy cho chúng tôi công việc hiện tại của bạn</p>
                <FormItem {...formItemLayout} label="Tên cơ quan:">
                  <Input />
                </FormItem>
                <FormItem {...formItemLayout} label="Chức vụ của bạn:">
                  <Input />
                </FormItem>
              </div>
            ) : null}
          </div>
        );
      case "6":
        return (
          <div>
            <Divider> Lựa chọn kế hoạch thành viên </Divider>
            <p>
              Tổ chức của bạn có đang hoạt động trên sàn hay không?
              <span className="gx-link" onClick={() => this.showSearch()}>
                {" "}
                Kiểm tra
              </span>
            </p>
            {this.state.showSearch ? (
              <FormItem {...formItemLayout} label="Thông tin tìm kiếm: ">
                <InputGroup compact>
                  <Select style={{ width: "30%" }} defaultValue="name">
                    <Option value="name">Tên tổ chức</Option>
                    <Option value="code">Mã số thuế</Option>
                  </Select>
                  <Input style={{ width: "50%" }} />
                  <Button style={{ width: "20%" }} type="primary">
                    Tìm kiếm
                  </Button>
                </InputGroup>
              </FormItem>
            ) : null}
            <FormItem {...formItemLayout} label="Trạng thái">
              <Radio.Group onChange={this.onChosePlan}>
                <Radio value={1}>Đơn vị tôi hiện chưa hoạt động trên sàn</Radio>
                <Radio value={2}>Đơn vị tôi hiện đang hoạt động trên sàn</Radio>
              </Radio.Group>
            </FormItem>
            {this.state.typeAccount === 1 ? (
              <div>
                <p>Hãy cho chúng tôi công việc hiện tại của bạn</p>
                <FormItem {...formItemLayout} label="Cơ quan làm việc: ">
                  <Radio.Group>
                    <Radio value={1}>Đại Sứ quán</Radio>
                    <Radio value={2}>Lãnh Sự quán</Radio>
                  </Radio.Group>
                </FormItem>
                <FormItem {...formItemLayout} label="Quốc gia đại diện:">
                  <Input />
                </FormItem>
                <FormItem {...formItemLayout} label="Quốc gia đặt trụ sở:">
                  <Input />
                </FormItem>
                <FormItem {...formItemLayout} label="Địa chỉ đặt trụ sở:">
                  <Input />
                </FormItem>
                <FormItem {...formItemLayout} label="Chức vụ của bạn:">
                  <Input />
                </FormItem>
              </div>
            ) : null}
            {this.state.typeAccount === 2 ? (
              <div>
                <p>Hãy cho chúng tôi công việc hiện tại của bạn</p>
                <FormItem {...formItemLayout} label="Cơ quan làm việc: ">
                  <Input />
                </FormItem>
                <FormItem {...formItemLayout} label="Chức vụ của bạn:">
                  <Input />
                </FormItem>
              </div>
            ) : null}
          </div>
        );
      case "7":
        return (
          <div>
            <Divider> Lựa chọn kế hoạch thành viên </Divider>
            <p>
              Tổ chức của bạn có đang hoạt động trên sàn hay không?
              <span className="gx-link" onClick={() => this.showSearch()}>
                {" "}
                Kiểm tra
              </span>
            </p>
            {this.state.showSearch ? (
              <FormItem {...formItemLayout} label="Thông tin tìm kiếm: ">
                <InputGroup compact>
                  <Select style={{ width: "30%" }} defaultValue="name">
                    <Option value="name">Tên tổ chức</Option>
                    <Option value="code">Mã số thuế</Option>
                  </Select>
                  <Input style={{ width: "50%" }} />
                  <Button style={{ width: "20%" }} type="primary">
                    Tìm kiếm
                  </Button>
                </InputGroup>
              </FormItem>
            ) : null}
            <FormItem {...formItemLayout} label="Trạng thái">
              <Radio.Group onChange={this.onChosePlan}>
                <Radio value={1}>Đơn vị tôi hiện chưa hoạt động trên sàn</Radio>
                <Radio value={2}>Đơn vị tôi hiện đang hoạt động trên sàn</Radio>
              </Radio.Group>
            </FormItem>
            {this.state.typeAccount === 1 ? (
              <div>
                <p>Phương hướng hoạt động của bạn trên sàn?</p>
                {this.onChoseAdmin()}
              </div>
            ) : null}
            {this.state.typeAccount === 2 ? (
              <div>
                <p>Hãy cho chúng tôi công việc hiện tại của bạn</p>
                <FormItem {...formItemLayout} label="Tên tổ chức:">
                  <Input />
                </FormItem>
                <FormItem {...formItemLayout} label="Chức vụ của bạn:">
                  <Input />
                </FormItem>
              </div>
            ) : null}
            {this.state.create ? (
              <div>
                <Divider> Đăng ký đơn vị đào tạo </Divider>
                <FormItem {...formItemLayout} label="Tên đơn vị">
                  <Input placeholder="Tên đơn vị đào tạo" />
                </FormItem>
                <FormItem {...formItemLayout} label="Tên thương hiệu">
                  <Input placeholder="Tên thương hiệu" />
                </FormItem>
                <FormItem {...formItemLayout} label="Email">
                  <Input placeholder="Email đơn vị" />
                </FormItem>
                <FormItem {...formItemLayout} label="Số điện thoại">
                  <Input placeholder="Số điện thoại cố định" />
                </FormItem>
                <FormItem {...formItemLayout} label="Quốc gia/ Quận/ Huyện">
                  <Cascader options={residences} />
                </FormItem>
                <FormItem {...formItemLayout} label="Địa chỉ">
                  <Input placeholder="Địa chỉ" />
                </FormItem>
                <FormItem {...formItemLayout} label="Ngày thành lập">
                  <DatePicker
                    className="gx-w-100"
                    placeholder="Ngày thành lập đơn vị trên giấy phép kinh doanh"
                  />
                </FormItem>
              </div>
            ) : null}
            {this.state.admin === 1 ? (
              <div>
                <Divider> Hồ sơ công việc </Divider>
                <FormItem {...formItemLayout} label="Tên đơn vị">
                  <Input placeholder="Tên đơn vị đào tạo" />
                </FormItem>
                <FormItem {...formItemLayout} label="Tên thương hiệu">
                  <Input placeholder="Tên thương hiệu" />
                </FormItem>
                <FormItem {...formItemLayout} label="Chức vụ bản thân">
                  <Input placeholder="Chức vụ" />
                </FormItem>
                <FormItem {...formItemLayout} label="Email">
                  <Input placeholder="Email đơn vị" />
                </FormItem>
                <FormItem {...formItemLayout} label="Số điện thoại">
                  <Input placeholder="Số điện thoại cố định" />
                </FormItem>
                <FormItem {...formItemLayout} label="Quốc gia/ Quận/ Huyện">
                  <Cascader options={residences} />
                </FormItem>
                <FormItem {...formItemLayout} label="Địa chỉ">
                  <Input placeholder="Địa chỉ" />
                </FormItem>
              </div>
            ) : null}
          </div>
        );
      case "8":
        return (
          <div>
            <Divider> Lựa chọn kế hoạch thành viên </Divider>
            <p>Bạn có đang làm trong công ty nào không?</p>
            <FormItem {...formItemLayout} label="Trạng thái">
              <Radio.Group onChange={this.onChangeFreeLancer}>
                <Radio value={1}>
                  Tôi là hướng dẫn viên trực thuộc công ty
                </Radio>
                <Radio value={2}>
                  Tôi là hướng dẫn viên không trực thuộc công ty{" "}
                </Radio>
              </Radio.Group>
            </FormItem>
            {this.state.FreeLancer === 1 ? (
              <FormItem {...formItemLayout} label="Tên công ty">
                <Input />
              </FormItem>
            ) : null}
            <FormItem {...formItemLayout} label="Loại hướng dẫn viên: ">
              <Select style={{ width: "100%" }}>
                <Option value="inbound">Hướng dẫn viên Inbound</Option>
                <Option value="outbound">Hướng dẫn viên Outbound</Option>
                <Option value="inland">Hướng dẫn viên tại điểm</Option>
              </Select>
            </FormItem>
            <FormItem {...formItemLayout} label="Thông tin xác minh:">
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">
                  Click hoặc kéo thả file tại khu vực này
                </p>
                <p className="ant-upload-hint">
                  Cập nhật/Upload giấy tờ xác thực cá nhân như chứng minh thư,
                  thẻ hướng dẫn viên,...
                </p>
              </Dragger>
            </FormItem>
          </div>
        );
      case "9":
        return (
          <div>
            <Divider> Hồ sơ công việc </Divider>
            <p>Hãy cho chúng tôi công việc hiện tại của bạn</p>
            <FormItem {...formItemLayout} label="Lĩnh vực theo học: ">
              <Select style={{ width: "100%" }}>
                <OptGroup label="Du lịch">
                  <Option value="manager">Điều hành Tour</Option>
                  <Option value="sale">Nhân viên kinh doanh</Option>
                </OptGroup>
                <OptGroup label="Khách sạn">
                  <Option value="managerHotel">Quản lý khách sạn</Option>
                </OptGroup>
              </Select>
            </FormItem>
            <FormItem {...formItemLayout} label="Thông tin quan tâm: ">
              <Row>
                <Col span={12}>
                  <Checkbox>Sự kiện Du lịch</Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox>Chương trình đào tạo</Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox>Thông tin tuyển dụng</Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox>Hội chợ Du lịch</Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox>Tour Du lịch</Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox>Sản phẩm dịch vụ</Checkbox>
                </Col>
              </Row>
            </FormItem>
            <FormItem {...formItemLayout} label="Thông tin xác minh:">
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">
                  Click hoặc kéo thả file tại khu vực này
                </p>
                <p className="ant-upload-hint">
                  Cập nhật/Upload giấy tờ xác thực cá nhân như chứng minh thư,
                  thẻ sinh viên,...
                </p>
              </Dragger>
            </FormItem>
          </div>
        );
      default:
        break;
    }
  };

  render() {
    // const { current } = this.state;

    // const customPanelStyle = {
    //   background: "-webkit-linear-gradient(left, #358df1, #b6d8ff)",
    //   //   borderRadius: 4,
    //   marginBottom: 10
    //   //   border: 0,
    //   //   overflow: "hidden"
    // };
    // const { Panel } = Collapse;
    // const steps = [
    //   {
    //     title: "Send your company license",
    //     content: <License />
    //   },
    //   {
    //     title: "Choose your company's membership plan",
    //     content: "Choose your company's membership plan"
    //   }
    // ];

    return (
      <div>
        <div
          style={{
            display: "flex",
            background: "-webkit-linear-gradient(left, #4285f4, #81BEF7)",
            height: "175px",
            margin: " 0 -24px 0 -24px"
          }}
        >
          <div style={{ marginTop: 30, zIndex: 3, marginLeft: 150 }}>
            <h1 style={{ color: "#FAFAFA" }}>
              <IntlMessages id="welcome" />, Linh !
            </h1>
            <p style={{ color: "#F2F2F2" }}>
              <IntlMessages id="onlyFewStep" />
            </p>
          </div>
          <div
            style={{
              background:
                "no-repeat url(https://www.gstatic.com/identity/boq/accountsettingssecuritycommon/images/sprites/2sv_x2-376cf0cbd62be6b103c146c2464cdff9.png) 0 -2818px",
              backgroundSize: "304px 3143px",
              width: "253px",
              height: "163px",
              margin: "auto",
              marginBottom: 0,
              zIndex: 2
            }}
          ></div>
        </div>
        <div className="block-w" style={{ marginTop: 50, zIndex: 99 }}>
          <Steps
            className="pos-sticky p-b-1"
            progressDot
            current={this.state.currentStep}
          >
            <Step
              title={this.state.currentStep > 0 ? "Finished" : "In Progress "}
              // title="In Progress"
              description="Register yours and yours company profile"
            ></Step>
            <Step
              title={
                this.state.currentStep > 1
                  ? "Finished"
                  : this.state.currentStep === 1
                  ? "In Progress "
                  : "Waiting"
              }
              description="Complete your profile"
            >
              <h1>Complete your profile</h1>
            </Step>
            <Step
              title={this.state.currentStep === 2 ? "In Progress " : "Waiting"}
              description="Join a community"
            >
              <h1>Join a community</h1>
            </Step>
          </Steps>
        </div>

        {this.state.currentStep === 0 ? (
          <Fragment>
            <div className="block-w">
              <WidgetHeader title="Hồ sơ cá nhân" />
              <Row>
                <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                  <div className="block">
                    <h3 className="text-align-center">Nội dung hồ sơ</h3>
                    <div
                      className="p-3"
                      style={{ border: "1px solid #54545454" }}
                    >
                      <p> Bao gồm các thông tin cơ bản: </p>
                      <p>
                        <Icon type="check-circle" /> Ảnh đại diện: Hình ảnh cá
                        nhân
                      </p>
                      <p>
                        <Icon type="check-circle" /> Họ và tên: Họ và tên đầy đủ
                        của người dùng
                      </p>
                      <p>
                        <Icon type="check-circle" /> Giới tính: Giới tính được
                        khai trên chứng minh thư
                      </p>
                      <p>
                        <Icon type="check-circle" /> Số điện thoại: Số điện
                        thoại liên lạc thường dùng
                      </p>
                      <p>
                        <Icon type="check-circle" /> Quốc gia: Quốc gia hiện
                        đang sinh sống
                      </p>
                      <p>
                        <Icon type="check-circle" /> Quận/huyện: Quận/huyện hiện
                        đang sinh sống
                      </p>
                      <p>
                        <Icon type="check-circle" /> Địa chỉ: Khu vực hiện đang
                        sinh sống
                      </p>
                    </div>
                    <p></p>
                  </div>
                </Col>
                <Col xl={16} lg={16} md={16} sm={24} xs={24}>
                  <div>
                    <Divider> Hồ sơ công việc </Divider>
                    <FormItem {...formItemLayout} label="Tên đơn vị">
                      <Input placeholder="Tên đơn vị" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="Tên thương hiệu">
                      <Input placeholder="Tên thương hiệu" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="Chức vụ bản thân">
                      <Input placeholder="Chức vụ" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="Email">
                      <Input placeholder="Email đơn vị" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="Số điện thoại">
                      <Input placeholder="Số điện thoại cố định" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="Quốc gia/ Quận/ Huyện">
                      <Cascader options={residences} />
                    </FormItem>
                    <FormItem {...formItemLayout} label="Địa chỉ">
                      <Input placeholder="Địa chỉ" />
                    </FormItem>
                  </div>
                </Col>
              </Row>

              {/* <Tabs tabPosition="left">
                 <TabPane className="alo" tab="Enter your profile" key="1">
                   <Verification />
                 </TabPane>
                 <TabPane tab="Company license" key="2">
                   <Card
                     className="gx-card"
                     title={<IntlMessages id="inventory.create.landtour" />}
                   >
                     <Steps current={current} className="card-margin-bottom-30">
                       {steps.map(item => (
                         <Step key={item.title} title={item.title} />
                       ))}
                     </Steps>
                     <div className="">{steps[this.state.current].content}</div>
                     <div className="steps-action">
                       {this.state.current < steps.length - 1 && (
                         <Button
                           type="primary button-next-step"
                           onClick={() => this.next()}
                         >
                           Next
                         </Button>
                       )}
                       {this.state.current === steps.length - 1 && (
                         <Button
                           type="primary button-next-step"
                           // onClick={() => doneChange()}
                         >
                           Done
                         </Button>
                       )}
                       {this.state.current > 0 && (
                         <Button onClick={() => this.prev()}>Previous</Button>
                       )}
                     </div>
                   </Card>
                 </TabPane>
                 <TabPane tab="Complete your profile" key="3">
                   <h1>Complete your profile</h1>
                 </TabPane>
                 <TabPane tab="Join a community" key="4">
                   <h1>Join a community</h1>
                 </TabPane>
               </Tabs>
            */}
            </div>
            <div className="block-w">
              <Row>
                <Divider>Lĩnh vực hoạt động</Divider>
                <Col span={24}>
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
                      key={1}
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
                          Outbound, Lữ hành nội địa, Đại lý Du lịch, Vận tải,
                          Hàng không, Cơ sở lưu trú, Nhà hàng.
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
                          Bao gồm: Hiệp hội Du lịch, Câu lạc bộ, Chi hội Du
                          lịch.
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
                          Bao gồm: Các nhà báo, phóng viên, biên tập viên của
                          các tòa soạn.
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
                          Bao gồm: Các đơn vị truyền thông, quảng cáo các lĩnh
                          vực liên quan đến Du lịch.
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
                          Bao gồm: Các hướng dẫn viên trong và ngoài nước được
                          cấp giấy phép hoạt động.
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
                          Bao gồm: Sinh viên các trường đại học, cao đẳng, trung
                          cấp nghề về lĩnh vực Du lịch và Khách sạn.
                        </p>
                      </div>
                    </Panel>
                  </Collapse>
                </Col>
              </Row>
            </div>
            <div className="block-w">
              <Row>
                <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                  <div>
                    <Divider>Nội dung hoạt động</Divider>
                    <div
                      className="p-3"
                      style={{ border: "1px solid #54545454" }}
                    >
                      <p> Lựa chọn hình thức làm việc trên sàn: </p>
                      <p>
                        <Icon type="check-circle" /> Kiểm tra công ty của bạn đã
                        tồng tại bằng cách tìm kiếm trên thanh công cụ
                      </p>
                      <p>
                        <Icon type="check-circle" /> Nếu kết quả trả về có công
                        ty của bạn, bạn có thể ấn tham gia để trở thành thành
                        viên của công ty
                      </p>
                      <p>
                        <Icon type="check-circle" /> Nếu công ty của bạn chưa
                        được tạo, bạn có thể tạo mới hoặc gợi ý cho chúng tôi:
                      </p>
                      <p>
                        {" "}
                        <Icon type="minus-circle" /> Tạo mới công ty: Khi bạn là
                        người quản lý, có đầy đủ giấy phép kinh doanh của công
                        ty.
                      </p>
                      <p>
                        {" "}
                        <Icon type="minus-circle" /> Giới thiệu: Khi bạn là nhân
                        viên không có đầy đủ giấy phép kinh doanh của công ty.
                      </p>
                    </div>
                    <p></p>
                  </div>
                </Col>
                <Col xl={16} lg={16} md={16} sm={24} xs={24}>
                  <div className="textt-align-center">
                    <Divider> Lựa chọn kế hoạch thành viên </Divider>
                    <p>
                      Công ty của bạn có đang hoạt động trên sàn hay không?
                      <span
                        className="gx-link"
                        onClick={() => this.showSearch()}
                      >
                        {" "}
                        Kiểm tra
                      </span>
                    </p>
                    {this.state.showSearch ? (
                      <div>
                        <FormItem {...formItemLayout} label="Quốc gia: ">
                          <Select defaultValue="vn" style={{ width: "100%" }}>
                            <OptGroup label="Châu Á">
                              <Option value="vn">Việt Nam</Option>
                              <Option value="jp">Nhật Bản</Option>
                            </OptGroup>
                            <OptGroup label="Châu Âu">
                              <Option value="fi">Pháp</Option>
                            </OptGroup>
                          </Select>
                        </FormItem>

                        <FormItem {...formItemLayout} label="Công ty: ">
                          <InputGroup compact>
                            <Select
                              style={{ width: "30%" }}
                              defaultValue="name"
                            >
                              <Option value="name">Tên công ty</Option>
                              <Option value="code">Mã số thuế</Option>
                            </Select>
                            <Input style={{ width: "50%" }} />
                            <Button style={{ width: "20%" }} type="primary">
                              Tìm kiếm
                            </Button>
                          </InputGroup>
                        </FormItem>
                      </div>
                    ) : null}
                    <FormItem {...formItemLayout} label="Trạng thái">
                      <Radio.Group onChange={this.onChosePlan}>
                        <Radio value={1}>
                          Công ty tôi hiện chưa hoạt động trên sàn
                        </Radio>
                        <Radio value={2}>
                          Công ty tôi hiện đang hoạt động trên sàn
                        </Radio>
                      </Radio.Group>
                    </FormItem>
                    {this.state.typeAccount === 2 ? (
                      <div>
                        <p>Thông tin công việc của bạn</p>
                        <FormItem {...formItemLayout} label="Tên công ty">
                          <Input />
                        </FormItem>
                        <FormItem {...formItemLayout} label="Chức vụ">
                          <Input />
                        </FormItem>
                      </div>
                    ) : null}
                    {this.state.typeAccount === 1 ? (
                      <div>
                        <p>Phương hướng hoạt động của bạn trên sàn?</p>
                        {this.onChoseAdmin()}
                      </div>
                    ) : null}
                    {this.state.admin === 1 ? (
                      <div>
                        <Divider> Hồ sơ công việc </Divider>
                        <FormItem {...formItemLayout} label="Tên đơn vị">
                          <Input placeholder="Tên công ty" />
                        </FormItem>
                        <FormItem {...formItemLayout} label="Tên thương hiệu">
                          <Input placeholder="Tên thương hiệu" />
                        </FormItem>
                        <FormItem {...formItemLayout} label="Chức vụ bản thân">
                          <Input placeholder="Chức vụ" />
                        </FormItem>
                        <FormItem {...formItemLayout} label="Email">
                          <Input placeholder="Email đơn vị" />
                        </FormItem>
                        <FormItem {...formItemLayout} label="Số điện thoại">
                          <Input placeholder="Số điện thoại cố định" />
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="Quốc gia/ Quận/ Huyện"
                        >
                          <Cascader options={residences} />
                        </FormItem>
                        <FormItem {...formItemLayout} label="Địa chỉ">
                          <Input placeholder="Địa chỉ" />
                        </FormItem>
                      </div>
                    ) : null}
                    {this.state.create ? (
                      <div>
                        <Divider> Đăng ký thông tin doanh nghiệp </Divider>
                        <FormItem
                          {...formItemLayout}
                          label="Lĩnh vực hoạt động"
                        >
                          {this.onSubCompany()}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Tên công ty">
                          <Input placeholder="Tên công ty" />
                        </FormItem>
                        <FormItem {...formItemLayout} label="Tên thương hiệu">
                          <Input placeholder="Tên thương hiệu" />
                        </FormItem>
                        <FormItem {...formItemLayout} label="Email">
                          <Input placeholder="Email công ty" />
                        </FormItem>
                        <FormItem {...formItemLayout} label="Số điện thoại">
                          <Input placeholder="Số điện thoại cố định" />
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="Quốc gia/ Quận/ Huyện"
                        >
                          <Cascader options={residences} />
                        </FormItem>
                        <FormItem {...formItemLayout} label="Địa chỉ">
                          <Input placeholder="Địa chỉ" />
                        </FormItem>
                        <FormItem {...formItemLayout} label="Ngày thành lập">
                          <DatePicker
                            className="gx-w-100"
                            placeholder="Ngày thành lập công ty trên giấy phép kinh doanh"
                          />
                        </FormItem>
                        <FormItem {...formItemLayout} label="Thị trường">
                          <Input placeholder="Thị trường mục tiêu" />
                        </FormItem>
                      </div>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row style={{ width: "90%", margin: "auto" }}>
                <Button
                  onClick={this.onNextStep}
                  type="primary"
                  style={{ marginLeft: "auto" }}
                >
                  <IntlMessages id="complete" />
                </Button>
              </Row>
            </div>
          </Fragment>
        ) : this.state.currentStep === 1 ? (
          <div>
            <div className="block-w">
              <Row>
                <License />
              </Row>
              <Row style={{ width: "90%", margin: "auto" }}>
                <Button
                  onClick={this.onBackStep}
                  style={{ marginRight: "auto" }}
                >
                  <IntlMessages id="return" />
                </Button>
                <Button
                  onClick={this.onNextStep}
                  type="primary"
                  style={{ marginLeft: "auto" }}
                >
                  <IntlMessages id="complete" />
                </Button>
              </Row>
            </div>
          </div>
        ) : (
          <div className="block-w">
            <h1>Join a community</h1>
            <Row style={{ width: "90%", margin: "auto" }}>
              <Button onClick={this.onBackStep} style={{ marginRight: "auto" }}>
                <IntlMessages id="return" />
              </Button>
              <Button
                onClick={this.onNextStep}
                type="primary"
                style={{ marginLeft: "auto" }}
              >
                <IntlMessages id="complete" />
              </Button>
            </Row>
          </div>
        )}
      </div>
    );
  }
}
export default CompleteRegister;
