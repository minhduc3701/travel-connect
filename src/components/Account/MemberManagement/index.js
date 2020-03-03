import React, { Fragment } from "react";
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
  Row,
  notification,
  Upload,
  Select
} from "antd";
// import WidgetHeader from "components/WidgetHeader";
import Permission from "./permission";
import IntlMessages from "util/IntlMessages";
// import UploadPicture from "./Avatar";
import { doneChange, notificationPop } from "util/Notification";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";
import CircularProgress from "components/GlobalComponent/CircularProgress";
import firebase from "firebase/firebaseAcc";

const { Search } = Input;
const FormItem = Form.Item;

const showHeader = true;

const pagination = { position: "bottom" };
const Option = Select.Option;
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
    editEmoloyee: "",
    fileList: [],
    loadingCreate: false,
    loadingEdit: false,
    editItem: null
  };

  handleSubmit = e => {};

  handleSubmitCreate = e => {
    const user_info = JSON.parse(localStorage.getItem("user_info"));
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loadingCreate: true
        });
        try {
          firebase
            .app("FirebaseApp")
            .auth()
            .createUserWithEmailAndPassword(
              values.employee_email,
              values.employee_password
            )
            .then(data => {
              const sendEmailVerify = firebase
                .app("FirebaseApp")
                .functions()
                .httpsCallable("sendEmailVerify");
              sendEmailVerify({
                email: values.employee_email,
                password: values.employee_password
              });

              const userCredentials = {
                imageUrl: "",
                name: values.employee_name,
                website: "",
                birth: "",
                gender: "",
                email: values.employee_email,
                phone: values.employee_phone,
                address: "",
                district: "",
                city: "",
                nation: "",
                zipcode: "",
                position: values.employee_position,
                companyId: user_info.company_id,
                companyName: user_info.company_name,
                companyBrand: user_info.company_brandname,
                companyLogo: user_info.company_logo,
                companyNation: user_info.company_nation,
                companyCity: user_info.company_city,
                companyDistrict: user_info.company_district,
                companyAddress: user_info.company_address,
                companyBusiness: user_info.company_business,
                package: "",
                language: this.props.locale,
                timezone: "",
                currency: "",
                notiNewRequest: false,
                notiCompany: false,
                notiCommunity: false,
                notiEvents: false,
                notiCurrentRequest: false,
                notiSystem: false,
                notiFlow: false,
                sendEmail: false,
                sendNotiPush: false,
                sendNotiWeb: false,
                display: values.employee_display,
                private: "only",
                permission: [],
                notiRole: [],
                notiLogin: false,
                createdAt: new Date().toISOString(),
                companyActive: true,
                status: ""
              };
              firebase
                .app("FirebaseApp")
                .firestore()
                .doc(`/users/${data.user.uid}`)
                .set(userCredentials);
              firebase
                .firestore()
                .doc(`/users/${data.user.uid}`)
                .set(userCredentials)
                .then(async res => {
                  await this.onUploadImage(data.user.uid);
                  this.setState({
                    loadingCreate: false,
                    visible: false
                  });
                  notificationPop(
                    "success",
                    "Tạo tài khoản thành công",
                    "Tài khoản đã được tạo thành công tại Travel Connect"
                  );
                });
            })
            .catch(error => {
              let err = "";
              if (error.code === "auth/email-already-in-use")
                err = "The email address is already in use by another account";
              else err = "Invalid account information";
              notification.open({
                message: err
              });
            });
        } catch (error) {}
      }
    });
  };

  handleSubmitEdit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loadingEdit: true
        });
        if (values.employee_password) {
          const changePasswordMember = firebase
            .app("FirebaseApp")
            .functions()
            .httpsCallable("changePasswordMember");
          changePasswordMember({
            uid: this.state.editItem.key,
            password: values.employee_password
          });
        }
        firebase
          .firestore()
          .collection("users")
          .doc(this.state.editItem.key)
          .update({
            display: values.employee_display,
            position: values.employee_position
          })
          .then(res => {
            this.setState({
              visible2: false
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };
  showModal2 = detail => {
    this.setState({
      visible2: true,
      editItem: detail
    });
  };
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false, visible2: false });
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

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  onUploadImage = id => {
    firebase
      .storage()
      .ref(`/${id}/${Date.now().toString()}`)
      .put(this.state.fileList[0])
      .then(res => {
        if (id !== null && id !== undefined) {
          firebase
            .storage()
            .ref(res.metadata.fullPath)
            .getDownloadURL()
            .then(url => {
              firebase
                .firestore()
                .collection("users")
                .doc(id)
                .update({
                  imageUrl: url
                });
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  onLockMember = id => {
    firebase
      .firestore()
      .collection("users")
      .doc(id)
      .update({
        status: "lock",
        display: false
      })
      .catch(err => {
        console.log(err);
      });
  };
  onDeleteMember = id => {
    firebase
      .firestore()
      .collection("users")
      .doc(id)
      .update({
        status: "deleted",
        display: false
      })
      .catch(err => {
        console.log(err);
      });
  };
  onUnLockMember = id => {
    firebase
      .firestore()
      .collection("users")
      .doc(id)
      .update({
        status: "",
        display: true
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let data = [];
    let { fileList } = this.state;
    isLoaded(this.props.members) &&
      this.props.members.forEach(doc => {
        if (doc.status !== "deleted") {
          data.push({
            key: doc.id || " - ",
            name: doc.name || " - ",
            position: doc.position || "- ",
            status: doc.display || "Hide",
            mail: doc.email || " - ",
            phone: doc.phone || " - ",
            memberStatus: doc.status,
            company_id: doc.companyId,
            permission: doc.permission || null
          });
        }
      });
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const props = {
      multiple: false,
      listType: "picture",
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [file]
        }));
        return false;
      },
      fileList
    };
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
        render: (tag, record) => {
          let color, mess, type, text;
          if (record.status === true) {
            text = "Show";
            color = "#04B431";
            mess = "This employee is displayed on company's contact info";
            type = "check";
          } else {
            text = "Hide";
            color = "grey";
            mess = "This employee is not displayed on company's contact info";
            type = "close";
          }
          return (
            <Tooltip placement="top" title={mess}>
              <Icon type={type} style={{ color: color }} />{" "}
              <span style={{ color: color }} key={record.key}>
                {text.toUpperCase()}
              </span>
            </Tooltip>
          );
        }
      },
      {
        title: <IntlMessages id="employee.action" />,
        key: "action",
        render: (text, record) => (
          <Fragment>
            {record.memberStatus === "" && record.position !== "CEO" ? (
              <span>
                <span
                  className="gx-link"
                  onClick={() => this.showModal2(record)}
                >
                  <Tooltip
                    placement="topLeft"
                    title={<IntlMessages id="edit" />}
                  >
                    <Icon type="edit" theme="filled" />{" "}
                    <IntlMessages id="edit" />
                  </Tooltip>
                </span>
                <span className="gx-link" style={{ marginLeft: 15 }}>
                  <Permission data={record} />
                </span>
                <span className="gx-link" style={{ marginLeft: 15 }}>
                  <Popconfirm
                    onConfirm={() => this.onLockMember(record.key)}
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
                    onConfirm={() => this.onDeleteMember(record.key)}
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
            ) : record.memberStatus === "lock" ? (
              <Fragment>
                <span className="gx-text-grey cursor-not-allow">
                  <Icon type="edit" theme="filled" /> <IntlMessages id="edit" />
                </span>
                <span
                  className="gx-text-grey cursor-not-allow"
                  style={{ marginLeft: 15 }}
                >
                  <Icon type="tool" theme="filled" />{" "}
                  <IntlMessages id="permission" />
                </span>
                <span className="gx-link" style={{ marginLeft: 15 }}>
                  <Popconfirm
                    onConfirm={() => this.onUnLockMember(record.key)}
                    onCancel={this.cancel}
                    title={<IntlMessages id="management.member.lock.title" />}
                  >
                    <Tooltip placement="topLeft" title="Unlock">
                      <span>
                        <Icon type="lock" theme="filled" /> Unlock
                      </span>
                    </Tooltip>
                  </Popconfirm>
                </span>
                <span className="gx-link" style={{ marginLeft: 15 }}>
                  <Popconfirm
                    onConfirm={() => this.onDeleteMember(record.key)}
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
              </Fragment>
            ) : record.memberStatus === "" && record.position === "CEO" ? (
              <span>
                <span className="gx-text-grey cursor-not-allow">
                  <Icon type="edit" theme="filled" /> <IntlMessages id="edit" />
                </span>
                <span
                  className="gx-text-grey cursor-not-allow"
                  style={{ marginLeft: 15 }}
                >
                  <Icon type="tool" theme="filled" />{" "}
                  <IntlMessages id="permission" />
                </span>
                <span
                  className="gx-text-grey cursor-not-allow"
                  style={{ marginLeft: 15 }}
                >
                  <span>
                    <Icon type="lock" theme="filled" />{" "}
                    <IntlMessages id="management.member.lock" />
                  </span>
                </span>
                <span
                  className="gx-text-grey cursor-not-allow"
                  style={{ marginLeft: 15 }}
                >
                  <span>
                    <Icon type="delete" theme="filled" />{" "}
                    <IntlMessages id="button.delete" />
                  </span>
                </span>
              </span>
            ) : null}
          </Fragment>
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
            <Form onSubmit={this.handleSubmitCreate}>
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
                          message: "Enter password!",
                          min: 6
                        }
                      ]
                    })(<Input type="password" placeholder="Password" />)}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={<IntlMessages id="appModule.phone" />}
                  >
                    {getFieldDecorator("employee_phone", {
                      rules: [
                        {
                          required: true,
                          message: "Enter employee phone number!",
                          min: 7,
                          max: 20
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
                    })(
                      <Select placeholder="Vị trí">
                        <Option value="Manager">Manager</Option>
                        <Option value="Marketing">Marketing</Option>
                        <Option value="Saler">Saler</Option>
                      </Select>
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={<IntlMessages id="employee.display" />}
                  >
                    {getFieldDecorator("employee_display", {
                      rules: [
                        {
                          required: true,
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
                      valuePropName: "fileList1",
                      getValueFromEvent: this.normFile,
                      rules: [
                        {
                          required: false,
                          message: "Enter your company license number!"
                        }
                      ]
                    })(
                      <Upload {...props}>
                        <Button className="m-0-i">
                          <Icon type="upload" />{" "}
                          <IntlMessages id="clickToUpload" />
                        </Button>
                      </Upload>
                    )}
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
                  loading={this.state.loadingCreate}
                  style={{ marginBottom: "0 !important" }}
                  onClick={() => this.onUploadImage()}
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
                })(
                  <Select placeholder="Vị trí" defaultValue="Manager">
                    <Option value="Manager">Manager</Option>
                    <Option value="Marketing">Marketing</Option>
                    <Option value="Saler">Saler</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="appModule.password" />}
              >
                {getFieldDecorator("employee_password", {
                  rules: [
                    {
                      message: "Enter your password!"
                    }
                  ]
                })(<Input placeholder="Password" />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="employee.display" />}
              >
                {getFieldDecorator("employee_display", {
                  rules: [
                    {
                      required: true,
                      message: "Select display member!"
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
                  loading={this.state.loadingEdit}
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

const mapStateToProps = ({ firestore, settings }) => {
  const { members } = firestore.ordered;
  const { locale } = settings;
  return {
    members,
    locale
  };
};

const WrappedHorizontalLoginForm = Form.create()(Dynamic);
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
