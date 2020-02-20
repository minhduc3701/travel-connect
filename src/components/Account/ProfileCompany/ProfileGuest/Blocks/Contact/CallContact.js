import React, { Component } from "react";
import { Input, Modal, Button, Form } from "antd";
import IntlMessages from "util/IntlMessages";
import { notiChange } from "util/Notification";

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
        // console.log("Received values of form: ", values);
        // this.props.getState(this.state.step);
        this.setState({ loading: true, message: values });
        setTimeout(() => {
          this.setState({ loading: false, visible2: false });
          notiChange("success", "Send message success!");
        }, 1500);
      }
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

  findIndex = (id, contacts) => {
    let result = -1;
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].key === id) {
        result = i;
        break;
      }
    }

    return result;
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
              {getFieldDecorator("employee_message_title", {
                rules: [
                  {
                    required: true,
                    message: "Enter your title message!"
                  }
                ]
              })(<Input placeholder="Title" />)}
            </FormItem>
            <FormItem {...formItemLayout}>
              {getFieldDecorator("employee_message_detail", {
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
