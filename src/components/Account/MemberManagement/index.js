import React from "react";
import {
  Badge,
  Icon,
  Card,
  Popconfirm,
  Form,
  Button,
  Modal,
  Table,
  Tooltip,
  Input,
  message,
  Switch,
  Col,
  Row
} from "antd";
// import WidgetHeader from "components/WidgetHeader";
import Permission from "./permission";
import IntlMessages from "util/IntlMessages";
import UploadPicture from "./Avatar";
import { doneChange, failChange } from "util/Notification";

const { Search } = Input;
const FormItem = Form.Item;

const data = [
  {
    key: 1,
    name: "Tuấn Linh",
    position: `CEO`,
    status: `Show`,
    mail: `linhlt@travelconnect.vn`,
    phone: "0376895670"
  },
  {
    key: 2,
    name: "Giáo sư",
    position: `Sale Manager`,
    status: `Show`,
    mail: `linhlt@travelconnect.vn`,
    phone: "0376895670"
  },
  {
    key: 3,
    name: "Đức Anh",
    position: `Sale`,
    status: `Hide`,
    mail: `linhlt@travelconnect.vn`,
    phone: "0376895670"
  },
  {
    key: 4,
    name: "Dr. Tùng",
    position: `Sale Manager`,
    status: `Show`,
    mail: `linhlt@travelconnect.vn`,
    phone: "0376895670"
  },
  {
    key: 5,
    name: "Dr. Nam",
    position: `Sale`,
    status: `Show`,
    mail: `linhlt@travelconnect.vn`,
    phone: "0376895670"
  }
];

const showHeader = true;

const pagination = { position: "bottom" };
const formItemLayout = {
  labelCol: { xs: 24, sm: 6 },
  wrapperCol: { xs: 24, sm: 14 }
};
class Dynamic extends React.Component {
  state = {
    pagination,
    size: "default",
    title: undefined,
    showHeader,
    scroll: undefined,
    filteredInfo: null,
    sortedInfo: null,
    loading: false,
    visible: false,
    visible2: false,
    tab: "1"
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  showModal2 = () => {
    this.setState({
      visible2: true
    });
  };
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false, visible2: false });
      doneChange();
    }, 1500);
  };
  handleCancel = () => {
    this.setState({ visible: false, visible2: false });
    failChange();
  };
  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  confirm = e => {
    doneChange();
  };

  cancel = e => {
    failChange();
  };

  setSearch = value => {
    message.info(value);
    this.setState({
      filteredInfo: value
    });
  };

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      // {
      //   title: "Avatar",
      //   dataIndex: "avatar",
      //   key: "avatar",
      //   render: avatar => (
      //     <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      //   )
      // },
      {
        title: <IntlMessages id="employee.name" />,
        dataIndex: "name",
        key: "name",
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order
      },
      {
        title: "Email",
        dataIndex: "mail",
        key: "mail",
        filteredValue: filteredInfo.mail || null,
        onFilter: (value, record) => record.mail.includes(value),
        sorter: (a, b) => a.mail.length - b.mail.length,
        sortOrder: sortedInfo.columnKey === "mail" && sortedInfo.order
      },
      {
        title: <IntlMessages id="appModule.phone" />,
        dataIndex: "phone",
        key: "phone"
      },
      {
        title: <IntlMessages id="employee.position" />,
        dataIndex: "position",
        key: "position",
        filteredValue: filteredInfo.position || null,
        onFilter: (value, record) => record.position.includes(value),
        sorter: (a, b) => a.position.length - b.position.length,
        sortOrder: sortedInfo.columnKey === "position" && sortedInfo.order
      },
      {
        title: <IntlMessages id="employee.display" />,
        dataIndex: "status",
        key: "status",
        render: tag => {
          let color, mess, type;
          if (tag === "Show") {
            color = "#04B431";
            mess = "This employee is displayed on company's contact info";
            type = "check";
          } else {
            color = "grey";
            mess = "This employee is not displayed on company's contact info";
            type = "close";
          }
          return (
            <Tooltip placement="top" title={mess}>
              <Icon type={type} style={{ color: color }} />{" "}
              <span style={{ color: color }} key={tag}>
                {tag.toUpperCase()}
              </span>
            </Tooltip>
          );
        }
      },
      {
        title: <IntlMessages id="employee.action" />,
        key: "action",
        render: (text, record) => (
          <span>
            <span className="gx-link" onClick={this.showModal2}>
              <Tooltip placement="topLeft" title="Edit">
                <Icon type="edit" theme="filled" /> <IntlMessages id="edit" />
              </Tooltip>
            </span>
            <span className="gx-link" style={{ marginLeft: 15 }}>
              <Permission />
            </span>
            <span className="gx-link" style={{ marginLeft: 15 }}>
              <Popconfirm
                onConfirm={this.confirm}
                onCancel={this.cancel}
                title="Are you sure lock this employee. This will prevent this account to log in ?"
              >
                <Tooltip
                  placement="topLeft"
                  title={<IntlMessages id="lockUser" />}
                >
                  <span style={{ color: "red" }}>
                    <Icon type="lock" theme="filled" />{" "}
                    <IntlMessages id="lock" />
                  </span>
                </Tooltip>
              </Popconfirm>
            </span>
            <span className="gx-link" style={{ marginLeft: 15 }}>
              <Popconfirm
                onConfirm={this.confirm}
                onCancel={this.cancel}
                title="Are you sure delete this employee ?"
              >
                <Tooltip
                  placement="topLeft"
                  title={<IntlMessages id="deleteUser" />}
                >
                  <span style={{ color: "red" }}>
                    <Icon type="delete" theme="filled" />{" "}
                    <IntlMessages id="delete" />
                  </span>
                </Tooltip>
              </Popconfirm>
            </span>
          </span>
        )
      }
    ];

    return (
      <Card title={<IntlMessages id="sidebar.home.membermanagement" />}>
        <Badge count={0}>
          <Button type="primary" onClick={this.showModal}>
            <IntlMessages id="newemployee" />
          </Button>
        </Badge>
        <Search
          style={{ width: "40%", float: "right" }}
          placeholder="Search"
          onSearch={value => this.setSearch(value)}
          enterButton
        />

        <Table
          bordered={true}
          className=" gx-table-no-bordered"
          {...this.state}
          columns={columns}
          dataSource={data}
          onChange={this.handleChange}
        />

        <Modal
          visible={this.state.visible}
          title={<IntlMessages id="newemployee" />}
          width={800}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              {<IntlMessages id="return" />}
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={this.state.loading}
              onClick={this.handleOk}
            >
              {<IntlMessages id="submit" />}
            </Button>
          ]}
        >
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="employee.name" />}
              >
                <Input />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="appModule.email" />}
              >
                <Input />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="appModule.password" />}
              >
                <Input type="password" />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="appModule.phone" />}
              >
                <Input />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="employee.position" />}
              >
                <Input />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="employee.display" />}
              >
                <Switch />
              </FormItem>

              <FormItem {...formItemLayout} label="Avatar">
                <UploadPicture />
              </FormItem>
            </Col>
          </Row>
        </Modal>
        <Modal
          visible={this.state.visible2}
          title="Tuan Linh"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={600}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              {<IntlMessages id="return" />}
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={this.state.loading}
              onClick={this.handleOk}
            >
              {<IntlMessages id="submit" />}
            </Button>
          ]}
        >
          <FormItem
            {...formItemLayout}
            label={<IntlMessages id="employee.position" />}
          >
            <Input defaultValue="Ceo" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<IntlMessages id="appModule.password" />}
          >
            <Input type="password" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<IntlMessages id="employee.display" />}
          >
            <Switch />
            <br />
            <span className="gx-text-grey">
              Nếu bật, thông tin liên hệ của nhân viên này sẽ được hiển thị trên
              doanh nghiệp
            </span>
          </FormItem>
        </Modal>
      </Card>
    );
  }
}

export default Dynamic;
