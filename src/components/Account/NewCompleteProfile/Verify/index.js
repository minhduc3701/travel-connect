//
import React, { Component, Fragment } from "react";
import { Col, Input, Icon, Form, Row, Button, Select, Upload } from "antd";
import { connect } from "react-redux";
import { VerifyCompanySDK } from "appRedux/actions/CompanyProfile";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import firebase from "firebase/firebaseAcc";
import { HOME } from "components/Layout/Header/NavigateLink";
import IntlMessages from "util/IntlMessages";
// import GooglePicker from "react-google-picker";
// import axios from "axios";
import { Redirect } from "react-router-dom";

const Dragger = Upload.Dragger;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { xs: 24, sm: 6 },
  wrapperCol: { xs: 24, sm: 18 }
};
const Option = Select.Option;
const { OptGroup } = Select;
// let clientId =
//   "741667578605-v3uc5bm0ct764a13nami9pdq9vau8qph.apps.googleusercontent.com";
// let key = "AIzaSyDHdvr0OmoGMg5SrywSJl09mAYUqxE1wdg";
// let project_id = "741667578605";
// let scope = ["https://www.googleapis.com/auth/drive.file"];

class Company extends Component {
  state = {
    progress: 100,
    step: 5,
    typeUser: "1",
    infoPerson: {
      user_position: null,
      infoUnit: null
    },
    business: [],
    establish: null,
    tourGuide: {
      tour_guide_company: null,
      tour_guide_profile: null,
      tour_guide_type: null
    },
    student: {
      student_specialized: null,
      student_info: null,
      student_verify: null
    },
    fileList: [],
    imageFile: false,
    typeAccount: null,
    verifyData: {
      license: null,
      // licence_file: null,
      licenceDoc: null,
      confirm: null,
      active: false
    },
    fileDetail: null
  };
  handleSubmitPerson = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState(
          {
            verifyData: {
              license: values.company_licence,
              // licenceDoc: licenceFile,
              confirm: values.company_unit_confirm,
              active: true
            }
          },
          () => this.onSendDataPerson()
        );
      }
    });
  };

  onSendDataPerson = async () => {
    await this.props.actSendDataToServer(this.state.verifyData);
  };

  onSelectType = e => {
    this.setState({
      typeAccount: e
    });
  };

  onUploadImage = async () => {
    let user_info = JSON.parse(localStorage.getItem("user_info"));
    await this.state.fileList.forEach(fileItem => {
      firebase
        .storage()
        .ref(`/${user_info.company_id}/${Date.now().toString()}`)
        .put(fileItem)
        .then(res => {
          if (res) {
            firebase
              .storage()
              .ref(res.metadata.fullPath)
              .getDownloadURL()
              .then(url => {
                firebase
                  .firestore()
                  .collection("companies")
                  .doc(user_info.company_id)
                  .update({
                    licenseDoc: firebase.firestore.FieldValue.arrayUnion(url)
                  })
                  .then(ress => {
                    window.location.href = `${HOME}/home`;
                  });
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  };
  onUploadImageDrive = async data => {
    let user_info = JSON.parse(localStorage.getItem("user_info"));
    firebase
      .storage()
      .ref(`/${user_info.company_id}/${Date.now().toString()}`)
      .put(data)
      .then(res => {
        if (res) {
          firebase
            .storage()
            .ref(res.metadata.fullPath)
            .getDownloadURL()
            .then(url => {
              firebase
                .firestore()
                .collection("companies")
                .doc(user_info.company_id)
                .update({
                  licenseDoc: firebase.firestore.FieldValue.arrayUnion(url)
                })
                .then(ress => {
                  window.location.href = `${HOME}/home`;
                });
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let { fileList } = this.state;
    let user_info = JSON.parse(localStorage.getItem("user_info"));
    const props = {
      multiple: true,
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
          fileList: [...state.fileList, file]
        }));
        return false;
      },
      fileList
    };
    return (
      <div className="block-w bor-rad-6">
        {user_info.company_active && <Redirect to="/dashboard" />}
        <WidgetHeader title={<IntlMessages id="account.personal.title" />} />
        <Row className="p-v-6">
          <Col xl={8} lg={8} md={8} sm={24} xs={24}>
            <div style={{ borderRight: "1px solid rgba(0, 0, 0, 0.125)" }}>
              <h3 className="m-b-10">
                <IntlMessages id="cp.verify.title" />
              </h3>
              <p>
                <Icon type="check-circle" />{" "}
                <IntlMessages id="cp.verify.text1" />
              </p>
              <p>
                <Icon type="check-circle" />{" "}
                <IntlMessages id="cp.verify.text2" />
              </p>
            </div>
          </Col>
          <Col xl={16} lg={16} md={16} sm={24} xs={24}>
            <div style={{ paddingBottom: "2em" }}>
              <Form onSubmit={this.handleSubmitPerson}>
                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="step.information.licensenumber" />}
                >
                  {getFieldDecorator("company_licence", {
                    rules: [
                      {
                        required: true,
                        message: <IntlMessages id="cp.verify.licence.rule" />
                      }
                    ]
                  })(<Input placeholder="Mã số giấy phép kinh doanh" />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="step.information.licenseimage" />}
                >
                  {getFieldDecorator("company_licence_file", {
                    valuePropName: "fileList",
                    getValueFromEvent: this.normFile,
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="cp.verify.licence.file.rule" />
                        )
                      }
                    ]
                  })(
                    <Dragger {...props}>
                      <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                      </p>
                      <p className="ant-upload-text">
                        Click hoặc kéo thả file tại khu vực này
                      </p>
                      {this.state.fileList.length < 1 ? (
                        <Fragment>
                          <p className="ant-upload-hint">
                            Cập nhật/Upload giấy phép kinh doanh Giấy phép hành
                            nghề của công ty bạn tại đây
                          </p>
                        </Fragment>
                      ) : null}
                    </Dragger>
                  )}
                </FormItem>
                {/* <FormItem {...formItemLayout} label="Bản đăng ký PDF ">
                  <GooglePicker
                    clientId={
                      "741667578605-v3uc5bm0ct764a13nami9pdq9vau8qph.apps.googleusercontent.com"
                    }
                    developerKey={"AIzaSyDHdvr0OmoGMg5SrywSJl09mAYUqxE1wdg"}
                    scope={[
                      "https://www.googleapis.com/auth/drive.file"
                      // "https://www.googleapis.com/auth/devstorage.read_write"
                    ]}
                    onChange={data => console.log("on change:", data)}
                    onAuthFailed={data => console.log("on auth failed:", data)}
                    multiselect={true}
                    navHidden={true}
                    authImmediate={false}
                    viewId={"DOCS"}
                    mimeTypes={["image/png", "image/jpeg", "image/jpg"]}
                    createPicker={(google, oauthToken) => {
                      const googleViewId = google.picker.ViewId.DOCS;
                      const uploadView = new google.picker.DocsUploadView();
                      const docsView = new google.picker.DocsView(googleViewId)
                        .setIncludeFolders(true)
                        .setSelectFolderEnabled(true);

                      const picker = new window.google.picker.PickerBuilder()
                        .enableFeature(
                          google.picker.Feature.SIMPLE_UPLOAD_ENABLED
                        )
                        .enableFeature(
                          google.picker.Feature.MULTISELECT_ENABLED
                        )
                        .addView(docsView)
                        .addView(uploadView) 
                        .setOAuthToken(oauthToken)
                        .setDeveloperKey(
                          "AIzaSyDHdvr0OmoGMg5SrywSJl09mAYUqxE1wdg"
                        )
                        .setCallback(data => {
                          if (data.action === google.picker.Action.PICKED) {
                            google.script.run.uploadToFirebaseStorage(
                              data,
                              `${user_info.company_id}/${Date.now().toString()}`
                            );
                            axios
                              .get(
                                `https://www.googleapis.com/drive/v2/files/${data.docs[0].id}`,
                                {
                                  headers: {
                                    Authorization: `Bearer ${oauthToken}` //here remove + in template litereal
                                  }
                                }
                              )
                              .then(res => {
                                var type = "image/jpeg";
                                var fd = new FormData();
                                var file = new Blob([res.data], {
                                  type: type
                                });
                                fd.append("file01", file, data.docs[0].name);
                                this.onUploadImageDrive(data);
                              })
                              .catch(err => console.log(err));
                          }
                        });

                      picker.build().setVisible(true);
                    }}
                  >
                    <Button>Download</Button>
                    <div className="google"></div>
                  </GooglePicker>
                </FormItem> */}

                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="cp.verify.verification" />}
                >
                  {getFieldDecorator("company_unit_confirm", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="cp.verify.verification.rule" />
                        )
                      }
                    ]
                  })(
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Đơn vị xác minh"
                    >
                      <OptGroup
                        label={<IntlMessages id="cp.verify.verification" />}
                      >
                        <Option value="tc">Travel Connect</Option>
                      </OptGroup>
                      <OptGroup
                        label={
                          <IntlMessages id="cp.verify.travel.communities" />
                        }
                      >
                        <Option value="cdvn">Cộng đồng Du lịch Việt Nam</Option>
                        <Option value="cda">Cộng đồng Du lịch Châu Á</Option>
                        <Option value="cdqt">Cộng đồng Du lịch Quốc tế</Option>
                      </OptGroup>
                      <OptGroup
                        label={
                          <IntlMessages id="cp.verify.travel.communities.club" />
                        }
                      >
                        <Option value="clhn">Câu lạc bộ du lịch Hà Nội</Option>
                        <Option value="clhcm">
                          Câu lạc bộ du lịch Hồ Chí Minh
                        </Option>
                        <Option value="cldn">Câu lạc bộ du lịch Đà Nẵng</Option>
                      </OptGroup>
                      <OptGroup
                        label={
                          <IntlMessages id="cp.verify.travel.communities.Associations" />
                        }
                      >
                        <Option value="hhhn">Hiệp hội du lịch Hà Nội</Option>
                        <Option value="hhhcm">
                          Hiệp hội du lịch Hồ Chí Minh
                        </Option>
                        <Option value="hhdn">Hiệp hội du lịch Đà Nẵng</Option>
                      </OptGroup>
                    </Select>
                  )}
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
                    htmlType="submit"
                    type="primary"
                    style={{ marginBottom: "0 !important" }}
                    onClick={() => this.onUploadImage()}
                  >
                    <IntlMessages id="complete" />
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    actSendDataToServer: profile => {
      dispatch(VerifyCompanySDK(profile));
    }
  };
};

const WrappedHorizontalLoginForm = Form.create()(Company);
export default connect(null, mapDispatchToProps)(WrappedHorizontalLoginForm);
