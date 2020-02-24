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
import { doneChange, notiChange } from "util/Notification";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";
import CircularProgress from "components/GlobalComponent/CircularProgress";
import firebaseAcc from "firebase/firebaseAcc";

const { Search } = Input;
const FormItem = Form.Item;

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
    tab: "1",
    newEmployee: "",
    editEmoloyee: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const cretedMember = firebaseAcc
          .functions()
          .httpsCallable("createMember");
        cretedMember(values);
        notiChange("success", "Add employee success!");
        this.setState({
          newEmployee: values,
          visible: false,
          visible2: false
        });
      }
    });
  };

  handleSubmitMember = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState(
          {
            member: {
              email: values.employee_email,
              phoneNumber: values.employee_phone,
              password: values.employee_password,
              displayName: values.employee_name,
              photoURL: values.employee_avatar
            }
          },
          () => this.onSendDataPerson()
        );
      }
    });
  };

  handleSubmitEdit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const cretedMember = firebaseAcc
          .functions()
          .httpsCallable("createMember");
        cretedMember(values);
        notiChange("success", "Edit employee success!");
        this.setState({
          editEmoloyee: values,
          visible: false,
          visible2: false
        });
      }
    });
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

  cancel = e => {};

  setSearch = value => {
    message.info(value);
    this.setState({
      filteredInfo: value
    });
  };

  // onUploadImage = async () => {
  //   let user_info = JSON.parse(localStorage.getItem("user_info"));
  //   await this.state.fileList.forEach(fileItem => {
  //     firebase
  //       .storage()
  //       .ref(`/memberDefault/${Date.now().toString()}`)
  //       .put(fileItem)
  //       .then()
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   });
  // };

  render() {
    const { getFieldDecorator } = this.props.form;
    let data = [];
    isLoaded(this.props.members) &&
      this.props.members.forEach(doc => {
        data.push({
          key: doc.id || " - ",
          name: doc.name || " - ",
          position: doc.position || "- ",
          status: doc.contact || "Hide",
          mail: doc.email || " - ",
          phone: doc.phone || " - "
        });
      });
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
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
              <Tooltip placement="topLeft" title={<IntlMessages id="edit" />}>
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
                title={<IntlMessages id="management.member.lock.title" />}
              >
                <Tooltip
                  placement="topLeft"
                  title={<IntlMessages id="lockUser" />}
                >
                  <span style={{ color: "red" }}>
                    <Icon type="lock" theme="filled" />{" "}
                    <IntlMessages id="management.member.lock" />
                  </span>
                </Tooltip>
              </Popconfirm>
            </span>
            <span className="gx-link" style={{ marginLeft: 15 }}>
              <Popconfirm
                onConfirm={this.confirm}
                onCancel={this.cancel}
                title={<IntlMessages id="deleteConfirm.employee" />}
              >
                <Tooltip
                  placement="topLeft"
                  title={<IntlMessages id="deleteUser" />}
                >
                  <span style={{ color: "red" }}>
                    <Icon type="delete" theme="filled" />{" "}
                    <IntlMessages id="button.delete" />
                  </span>
                </Tooltip>
              </Popconfirm>
            </span>
          </span>
        )
      }
    ];

    return (
      <Card
        className="block_shadow-i"
        title={<IntlMessages id="sidebar.home.membermanagement" />}
      >
        <Row>
          <Col xl={12} lg={12} md={24} sm={24} xs={24}>
            <Badge count={0}>
              <Button type="primary" onClick={this.showModal}>
                <IntlMessages id="newemployee" />
              </Button>
            </Badge>
          </Col>
          <Col xl={12} lg={12} md={24} sm={24} xs={24}>
            <Search
              style={{ float: "right" }}
              placeholder="Search"
              onSearch={value => this.setSearch(value)}
              enterButton
            />
          </Col>
        </Row>

        <div style={{ overflow: "auto" }}>
          {!isLoaded(this.props.members) ? (
            <CircularProgress />
          ) : (
            <Table
              bordered={true}
              className=" gx-table-no-bordered"
              {...this.state}
              columns={columns}
              dataSource={data}
              onChange={this.handleChange}
            />
          )}
        </div>

        {this.state.visible ? (
          <Modal
            visible={this.state.visible}
            title={<IntlMessages id="newemployee" />}
            onCancel={this.handleCancel}
            width={800}
            footer={null}
          >
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label={<IntlMessages id="employee.name" />}
                  >
                    {getFieldDecorator("employee_name", {
                      rules: [
                        {
                          required: true,
                          message: "Enter employee name!"
                        }
                      ]
                    })(<Input placeholder="Name" />)}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={<IntlMessages id="appModule.email" />}
                  >
                    {getFieldDecorator("employee_email", {
                      rules: [
                        {
                          required: true,
                          message: "Enter employee email!"
                        }
                      ]
                    })(<Input placeholder="Email" />)}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={<IntlMessages id="appModule.password" />}
                  >
                    {getFieldDecorator("employee_password", {
                      rules: [
                        {
                          required: true,
                          message: "Enter password!"
                        }
                      ]
                    })(<Input placeholder="Password" />)}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={<IntlMessages id="appModule.phone" />}
                  >
                    {getFieldDecorator("employee_phone", {
                      rules: [
                        {
                          required: true,
                          message: "Enter employee phone number!"
                        }
                      ]
                    })(<Input placeholder="Số điện thoại" />)}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label={<IntlMessages id="employee.position" />}
                  >
                    {getFieldDecorator("employee_position", {
                      rules: [
                        {
                          required: true,
                          message: "Enter employee position!"
                        }
                      ]
                    })(<Input placeholder="Vị trí" />)}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={<IntlMessages id="employee.display" />}
                  >
                    {getFieldDecorator("employee_display", {
                      rules: [
                        {
                          required: false,
                          message: "Enter your company license number!"
                        }
                      ]
                    })(<Switch />)}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={<IntlMessages id="avatar" />}
                  >
                    {getFieldDecorator("employee_avatar", {
                      rules: [
                        {
                          required: false,
                          message: "Enter your company license number!"
                        }
                      ]
                    })(<UploadPicture />)}
                  </FormItem>
                </Col>
              </Row>
              <div
                className=" d-flex"
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
              >
                <Button
                  onClick={this.handleCancel}
                  style={{ marginBottom: "0 !important" }}
                >
                  <IntlMessages id="general.btn.return" />
                </Button>
                <Button
                  htmlType="submit"
                  type="primary"
                  style={{ marginBottom: "0 !important" }}
                >
                  <IntlMessages id="complete" />
                </Button>
              </div>
            </Form>
          </Modal>
        ) : null}
        {this.state.visible2 ? (
          <Modal
            visible={this.state.visible2}
            title={<IntlMessages id="edit" />}
            onCancel={this.handleCancel}
            width={600}
            footer={null}
          >
            <Form onSubmit={this.handleSubmitEdit}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="employee.position" />}
              >
                {getFieldDecorator("employee_position", {
                  rules: [
                    {
                      required: true,
                      message: "Enter employee position!"
                    }
                  ]
                })(<Input placeholder="Vị trí" />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="appModule.password" />}
              >
                {getFieldDecorator("employee_password", {
                  rules: [
                    {
                      required: true,
                      message: "Enter your password!"
                    }
                  ]
                })(<Input placeholder="Password" />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="employee.display" />}
              >
                {getFieldDecorator("employee.display", {
                  rules: [
                    {
                      required: false,
                      message: "Enter your company license number!"
                    }
                  ]
                })(<Switch />)}

                <br />
                <span className="gx-text-grey">
                  <IntlMessages id="management.member.display.employee" />
                </span>
              </FormItem>
              <div
                className=" d-flex"
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
              >
                <Button
                  onClick={this.handleCancel}
                  style={{ marginBottom: "0 !important" }}
                >
                  <IntlMessages id="general.btn.return" />
                </Button>
                <Button
                  htmlType="submit"
                  type="primary"
                  style={{ marginBottom: "0 !important" }}
                >
                  <IntlMessages id="complete" />
                </Button>
              </div>
            </Form>
          </Modal>
        ) : null}
      </Card>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create()(Dynamic);

// export default WrappedHorizontalLoginForm;

const mapStateToProps = ({ firestore }) => {
  const { members } = firestore.ordered;
  return {
    members
  };
};

export default compose(
  firestoreConnect(props => {
    const user_info = JSON.parse(localStorage.getItem("user_info"));
    return [
      {
        collection: "users",
        where: ["companyId", "==", user_info.company_id],
        limit: 10,
        storeAs: "members"
      }
    ];
  }),
  connect(mapStateToProps, null)
)(WrappedHorizontalLoginForm);
