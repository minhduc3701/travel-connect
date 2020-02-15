import React, { Component } from "react";
import { Icon, Input, Modal, Button } from "antd";
import IntlMessages from "util/IntlMessages";
import { doneChange, failChange } from "util/Notification";
const { TextArea } = Input;

class CallContact extends Component {
  state = {
    loading: false,
    visible2: false
  };
  showModal = () => {
    this.setState({
      visible2: true
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible2: false });
      doneChange();
    }, 1500);
  };
  handleCancel = () => {
    failChange();
    this.setState({ visible2: false });
  };
  render() {
    return (
      <div>
        <Icon
          style={{ fontSize: "24px" }}
          type="contacts"
          onClick={this.showModal}
        />
        <Modal
          visible={this.state.visible2}
          title={<IntlMessages id="company.contact" />}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              <IntlMessages id="cancel" />
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={this.state.loading}
              onClick={this.handleOk}
            >
              <IntlMessages id="send" />
            </Button>
          ]}
        >
          <p>
            <IntlMessages id="to" />: Nguyễn Văn A -{" "}
            <span className="gx-text-grey">Sale Manager</span>
          </p>
          <Input placeholder="Title" style={{ marginBottom: 10 }} />
          <TextArea
            rows={8}
            placeholder="Your message"
            style={{ marginBottom: 10 }}
          />
        </Modal>
      </div>
    );
  }
}
export default CallContact;
