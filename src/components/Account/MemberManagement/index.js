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
import { Link, Redirect } from "react-router-dom";
import { HOME } from "components/Layout/Header/NavigateLink";

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
    editItem: null,
    page: 1,
    total: 10
  };

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
                currency: "VND",
                language: {
                  languageId: "english",
                  locale: "en",
                  name: "English",
                  icon: "us"
                },
                timezone: "",
                notiLogin: false,
                createdAt: new Date().toISOString(),
                companyActive: true,
                status: "",
                type: "company"
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
        this.setState({
          loadingCreate: false
        });
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
    this.setState({
      filteredInfo: value.toLowerCase()
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
  onLockMember = data => {
    const user_info = JSON.parse(localStorage.getItem("user_info"));
    if (data.type === "company") {
      firebase
        .firestore()
        .collection("users")
        .doc(data.key)
        .update({
          status: "lock",
          display: false
        })
        .then(res => {
          const lockAuth = firebase
            .app("FirebaseApp")
            .functions()
            .httpsCallable("lockAuth");
          lockAuth(data.key);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(data.key)
        .update({
          status: "lock",
          display: false
        })
        .catch(err => {
          console.log(err);
        });
    }
    firebase
      .app("FirebaseB2b")
      .collection("landtours")
      .where(`manager.id`, "==", data.key)
      .update({
        avatar: user_info.user_logo,
        id: user_info.user_id,
        name: user_info.user_name,
        position: user_info.user_position
      });
    firebase
      .app("FirebaseB2b")
      .collection("grouptours")
      .where(`manager.id`, "==", data.key)
      .update({
        avatar: user_info.user_logo,
        id: user_info.user_id,
        name: user_info.user_name,
        position: user_info.user_position
      });
  };
  onDeleteMember = data => {
    const user_info = JSON.parse(localStorage.getItem("user_info"));
    if (data.type === "company") {
      firebase
        .firestore()
        .collection("users")
        .doc(data.key)
        .update({
          status: "deleted",
          display: false
        })
        .then(res => {
          const lockAuth = firebase
            .app("FirebaseApp")
            .functions()
            .httpsCallable("lockAuth");
          lockAuth(data.key);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(data.key)
        .update({
          status: "",
          display: false,
          companyId: "",
          companyBrand: "",
          companyAddress: "",
          companyBusiness: "",
          companyCity: "",
          companyDistrict: "",
          companyLogo: "",
          companyName: "",
          companyNation: ""
        })
        .catch(err => {
          console.log(err);
        });
    }
    firebase
      .app("FirebaseB2b")
      .collection("landtours")
      .where(`manager.id`, "==", data.key)
      .update({
        avatar: user_info.user_logo,
        id: user_info.user_id,
        name: user_info.user_name,
        position: user_info.user_position
      });
    firebase
      .app("FirebaseB2b")
      .collection("grouptours")
      .where(`manager.id`, "==", data.key)
      .update({
        avatar: user_info.user_logo,
        id: user_info.user_id,
        name: user_info.user_name,
        position: user_info.user_position
      });
  };
  onUnLockMember = id => {
    firebase
      .firestore()
      .collection("users")
      .doc(id)
      .update({
        status: "",
        display: false
      })
      .then(res => {
        const unlockAuth = firebase
          .app("FirebaseApp")
          .functions()
          .httpsCallable("unlockAuth");
        unlockAuth(id);
      })
      .catch(err => {
        console.log(err);
      });
  };
  onChangeDisplayToHide = id => {
    firebase
      .firestore()
      .collection("users")
      .doc(id)
      .update({
        display: false
      })
      .catch(err => {
        console.log(err);
      });
  };
  onChangeDisplayToShow = data => {
    firebase
      .firestore()
      .collection("users")
      .doc(data.key)
      .update({
        display: !data.status
      })
      .catch(err => {
        console.log(err);
      });
  };
  onAcceptMember = data => {
    firebase
      .firestore()
      .collection("users")
      .doc(data.key)
      .update({
        status: "",
        companyAddress: data.companyAddress,
        companyBrand: data.companyBrand,
        companyBusiness: data.companyBusiness,
        companyCity: data.companyCity,
        companyDistrict: data.companyDistrict,
        companyNation: data.companyNation,
        companyId: data.companyId,
        companyLogo: data.companyLogo,
        companyEmail: data.companyEmail,
        companyName: data.companyName,
        rPosition: firebase.firestore.FieldValue.delete(),
        rcAddress: firebase.firestore.FieldValue.delete(),
        rcBrand: firebase.firestore.FieldValue.delete(),
        rcBusiness: firebase.firestore.FieldValue.delete(),
        rcCity: firebase.firestore.FieldValue.delete(),
        rcDistrict: firebase.firestore.FieldValue.delete(),
        rcName: firebase.firestore.FieldValue.delete(),
        rcNation: firebase.firestore.FieldValue.delete(),
        rcId: firebase.firestore.FieldValue.delete(),
        rcLogo: firebase.firestore.FieldValue.delete(),
        rcEmail: firebase.firestore.FieldValue.delete(),
        position: data.position
      })
      .then(res => {
        notificationPop(
          "success",
          "Xác nhận thành công!",
          "Bạn đã xác nhận tài khoản thành công. Tài khoản này sẽ được thêm vào danh sách nhân viên công ty của bạn"
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let data = [];
    let filterMember = null;
    let { fileList } = this.state;
    let user_info = JSON.parse(localStorage.getItem("user_info"));
    isLoaded(this.props.members) &&
      this.props.members.forEach(doc => {
        if (doc.status !== "deleted" && doc.position === "CEO") {
          data.unshift({
            key: doc.id || " - ",
            name: doc.name || " - ",
            position: doc.position || "- ",
            status: doc.display,
            mail: doc.email || " - ",
            phone: doc.phone || " - ",
            memberStatus: doc.status,
            company_id: doc.companyId,
            permission: doc.permission || null,
            type: doc.type || ""
          });
        } else if (doc.status !== "deleted") {
          data.push({
            key: doc.id || " - ",
            name: doc.name || " - ",
            position: doc.position || "- ",
            status: doc.display,
            mail: doc.email || " - ",
            phone: doc.phone || " - ",
            memberStatus: doc.status,
            company_id: doc.companyId,
            permission: doc.permission || null,
            type: doc.type || ""
          });
        }
      });
    isLoaded(this.props.membersVerify) &&
      this.props.membersVerify.forEach(doc => {
        if (doc.status !== "deleted") {
          data.push({
            key: doc.id || " - ",
            name: doc.name || " - ",
            position: doc.position || doc.rPosition,
            status: doc.display,
            mail: doc.email || " - ",
            phone: doc.phone || " - ",
            memberStatus: doc.status,
            company_id: doc.companyId,
            permission: doc.permission || null,
            companyAddress: doc.rcAddress,
            companyBrand: doc.rcBrand,
            companyBusiness: doc.rcBusiness,
            companyCity: doc.rcCity,
            companyDistrict: doc.rcDistrict,
            companyNation: doc.rcNation,
            companyId: doc.rcId,
            companyLogo: doc.rcLogo,
            companyName: doc.rcName,
            companyEmail: doc.rcEmail
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
        sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
        render: (key, record) => {
          return <Link to={`/member/${record.key}`}>{record.name}</Link>;
        }
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
          let color, type, text;
          if (record.status === true) {
            text = <IntlMessages id="employee.show" />;
            color = "#04B431";
            // mess = "This employee is displayed on company's contact info";
            type = "check";
          } else {
            text = <IntlMessages id="employee.hide" />;
            color = "grey";
            // mess = "This employee is not displayed on company's contact info";
            type = "close";
          }
          return (
            <Popconfirm
              title={<IntlMessages id="employee.show.confirm" />}
              onConfirm={() => this.onChangeDisplayToShow(record)}
            >
              <Tooltip title={<IntlMessages id="management.member.display" />}>
                <Icon type={type} style={{ color: color }} />{" "}
                <span
                  className="cursor-pointer"
                  style={{ color: color }}
                  key={record.key}
                >
                  {text}
                </span>
              </Tooltip>
            </Popconfirm>
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
                    onConfirm={() => this.onLockMember(record)}
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
                    onConfirm={() => this.onDeleteMember(record)}
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
                        <Icon type="lock" theme="filled" />{" "}
                        <IntlMessages id="unlock" />
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
            ) : record.position === "CEO" ? (
              <span className="gx-link">
                <a href={`${HOME}/user/settings`}>
                  <Icon type="setting" />{" "}
                  <IntlMessages id="management.member.setting" />{" "}
                </a>
              </span>
            ) : record.memberStatus === "unverify" ? (
              <span>
                <span className="gx-link">
                  <Tooltip
                    placement="topLeft"
                    title={<IntlMessages id="submit" />}
                  >
                    <Popconfirm
                      title={
                        <IntlMessages id="manager.submit.employee.confirm" />
                      }
                      onConfirm={() => this.onAcceptMember(record)}
                    >
                      <Icon type="check" /> <IntlMessages id="submit" />
                    </Popconfirm>
                  </Tooltip>
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
            ) : null}
          </Fragment>
        )
      }
    ];
    if (this.state.filteredInfo) {
      filterMember = data.filter(member => {
        return (
          member.name.toLowerCase().indexOf(this.state.filteredInfo) !== -1
        );
      });
    }

    return (
      <Fragment>
        {data.map(item => {
          if (item.position === "CEO") {
            if (item.key !== user_info.user_id) {
              return <Redirect to="/dashboard" />;
            }
          }
        })}
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
              <Fragment>
                <Table
                  bordered={true}
                  className=" gx-table-no-bordered"
                  {...this.state}
                  columns={columns}
                  dataSource={filterMember ? filterMember : data}
                  onChange={this.handleChange}
                  size="small"
                />
              </Fragment>
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
                            message: <IntlMessages id="rule.name.employee" />
                          }
                        ]
                      })(
                        <Input
                          disabled={this.state.loadingCreate}
                          placeholder="Name"
                        />
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label={<IntlMessages id="appModule.email" />}
                    >
                      {getFieldDecorator("employee_email", {
                        rules: [
                          {
                            required: true,
                            message: <IntlMessages id="rule.email.employee" />
                          }
                        ]
                      })(
                        <Input
                          disabled={this.state.loadingCreate}
                          placeholder="Email"
                        />
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label={<IntlMessages id="appModule.password" />}
                    >
                      {getFieldDecorator("employee_password", {
                        rules: [
                          {
                            required: true,
                            message: (
                              <IntlMessages id="rule.password.employee" />
                            ),
                            min: 6
                          }
                        ]
                      })(
                        <Input
                          disabled={this.state.loadingCreate}
                          type="password"
                          placeholder="Password"
                        />
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label={<IntlMessages id="appModule.phone" />}
                    >
                      {getFieldDecorator("employee_phone", {
                        rules: [
                          {
                            required: true,
                            message: <IntlMessages id="rule.phone.employee" />,
                            min: 7,
                            max: 20
                          }
                        ]
                      })(
                        <Input
                          disabled={this.state.loadingCreate}
                          placeholder="Số điện thoại"
                        />
                      )}
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
                            message: (
                              <IntlMessages id="rule.position.employee" />
                            )
                          }
                        ]
                      })(
                        <Select
                          disabled={this.state.loadingCreate}
                          placeholder="Vị trí"
                        >
                          <Option value="Manager">
                            <IntlMessages id="manager" />
                          </Option>
                          <Option value="Saler">
                            <IntlMessages id="seller" />
                          </Option>
                          <Option value="Marketing">Marketing</Option>
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
                            message: <IntlMessages id="rule.display.employee" />
                          }
                        ]
                      })(
                        <Switch
                          disabled={this.state.loadingCreate}
                          defaultChecked={false}
                        />
                      )}
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
                          <Button
                            disabled={this.state.loadingCreate}
                            className="m-0-i"
                          >
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
                        message: <IntlMessages id="rule.position.employee" />
                      }
                    ]
                  })(
                    <Select
                      disabled={this.state.loadingEdit}
                      placeholder="Vị trí"
                    >
                      <Option value="Manager">
                        <IntlMessages id="manager" />
                      </Option>
                      <Option value="Saler">
                        <IntlMessages id="seller" />
                      </Option>
                      <Option value="Marketing">Marketing</Option>
                    </Select>
                  )}
                </FormItem>
                {this.state.editItem.type === "company" && (
                  <FormItem
                    {...formItemLayout}
                    label={<IntlMessages id="appModule.password" />}
                  >
                    {getFieldDecorator("employee_password", {
                      rules: [
                        {
                          message: <IntlMessages id="rule.password.employee" />
                        }
                      ]
                    })(
                      <Input
                        disabled={this.state.loadingEdit}
                        type="password"
                        placeholder="Password"
                      />
                    )}
                  </FormItem>
                )}
                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="employee.display" />}
                >
                  {getFieldDecorator("employee_display", {
                    rules: [
                      {
                        required: true,
                        message: <IntlMessages id="rule.display.employee" />
                      }
                    ]
                  })(
                    <Switch
                      disabled={this.state.loadingEdit}
                      defaultChecked={false}
                    />
                  )}
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
      </Fragment>
    );
  }
}

const mapStateToProps = ({ firestore, settings }) => {
  const { members, membersVerify } = firestore.ordered;
  const { locale } = settings;
  return {
    members,
    locale,
    membersVerify
  };
};

const WrappedHorizontalLoginForm = Form.create()(Dynamic);
export default compose(
  firestoreConnect(props => {
    const user_info = JSON.parse(localStorage.getItem("user_info"));
    return [
      {
        collection: "users",
        where: [["companyId", "==", user_info.company_id]],
        limit: 10,
        storeAs: "members"
      },
      {
        collection: "users",
        where: [["rcId", "==", user_info.company_id]],
        limit: 5,
        storeAs: "membersVerify"
      }
    ];
  }),
  connect(mapStateToProps, null)
)(WrappedHorizontalLoginForm);
