import React, { Component } from "react";
import { Input, Modal, Button, Form } from "antd";
import IntlMessages from "util/IntlMessages";
import { notiDetail } from "util/Notification";
import firebase from "firebase/firebaseAcc";

const { TextArea } = Input;
const FormItem = Form.Item;
const formItemLayout = {
  wrapperCol: { xs: 24, sm: 24 }
};

class CallContact extends Component {
  state = {
    loading: false,
    visible2: false,
    Account: "",
    message: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true, message: values }, () => {
          this.onSendRequest(values);
        });
        setTimeout(() => {
          notiDetail("success", "Gửi thông tin liên hệ thành công!");
          this.setState({ loading: false, visible2: false });
        }, 1500);
      }
    });
  };

  onSendRequest = values => {
    let { data, Account } = this.props;
    let user_info = JSON.parse(localStorage.getItem("user_info"));
    firebase
      .firestore()
      .collection("notifications")
      .add({
        content: "b2b.matching.sent.by",
        createdAt: new Date().toISOString(),
        icon: "",
        object: {
          id: user_info.company_id,
          name: user_info.company_brandname,
          logo: user_info.company_logo
        },
        user: {
          id: user_info.user_id,
          name: user_info.user_name,
          logo: user_info.user_logo
        },
        target: {
          id: Account.mId,
          name: Account.mName,
          logo: Account.mLogo
        },
        cTarget: {
          id: data.company_id,
          name: data.company_brandname,
          logo: data.company_logo
        },
        rules: [],
        type: "matching",
        other: [],
        private: firebase.firestore.FieldValue.arrayUnion(
          `${data.company_id}_${user_info.company_id}_contact`
        )
      });

    firebase
      .firestore()
      .collection("matchings")
      .doc(`${data.company_id}_${user_info.company_id}`)
      .set({
        user: {
          id: user_info.user_id,
          name: user_info.user_name,
          logo: user_info.user_logo
        },
        createdAt: new Date().toISOString(),
        uTarget: {
          id: Account.mId,
          name: Account.mName,
          logo: Account.mLogo
        },
        cTarget: {
          id: data.company_id,
          name: data.company_name,
          logo: data.company_logo
        },
        uCompany: {
          id: user_info.company_id,
          name: user_info.company_name,
          logo: user_info.company_logo
        },
        title: values.message_title,
        message: values.message_mess
      })
      .catch(err => {
        notiDetail("error", "Đã có lỗi xảy ra!", err.message);
      });
  };

  showModal = key => {
    this.setState({
      visible2: true,
      Account: key
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible2: false });
    }, 1500);
  };
  handleCancel = () => {
    this.setState({ visible2: false });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let { Account } = this.props;
    return (
      <div>
        <span
          className="gx-text-primary gx-pointer"
          onClick={() => this.showModal(Account)}
        >
          <i className="icon icon-forward gx-fs-sm gx-mr-2" />
          <IntlMessages id="account.profile.contact.employee.connect" />
        </span>
        <Modal
          onCancel={this.handleCancel}
          visible={this.state.visible2}
          title={<IntlMessages id="company.contact" />}
          footer={null}
        >
          <p>
            <IntlMessages id="to" />: {Account.mName} -{" "}
            <span className="gx-text-grey">{Account.mJob}</span>
          </p>
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout}>
              {getFieldDecorator("message_title", {
                rules: [
                  {
                    required: true,
                    message: "Enter your title message!"
                  }
                ]
              })(<Input placeholder="Title" />)}
            </FormItem>
            <FormItem {...formItemLayout}>
              {getFieldDecorator("message_mess", {
                rules: [
                  {
                    required: true,
                    message: "Enter your message!"
                  }
                ]
              })(
                <TextArea
                  rows={8}
                  placeholder="Your message"
                  style={{ marginBottom: 10 }}
                />
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
                onClick={this.handleCancel}
                style={{ marginBottom: "0 !important" }}
              >
                Return
              </Button>
              <Button
                loading={this.state.loading ? true : false}
                htmlType="submit"
                type="primary"
                style={{ marginBottom: "0 !important" }}
              >
                Send
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create()(CallContact);
export default WrappedHorizontalLoginForm;
