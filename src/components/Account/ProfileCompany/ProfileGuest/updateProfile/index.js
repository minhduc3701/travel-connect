import React, { Component } from "react";
import { Form, Tabs } from "antd";
import Basic from "./basic";
import IntlMessages from "util/IntlMessages";
import "../otherFormControls.less";
import Contact from "./contact";
import Address from "./address";
import License from "./license";

const TabPane = Tabs.TabPane;

class OtherFormControls extends Component {
  constructor(props) {
    super(props);
    // alert(props.option)
    this.state = {
      guild: "",
      value: 1,
      loading: false,
      visible: false
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      // Should format date value before submit.
    });
  };
  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  onChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    return (
      <div>
        <Tabs tabPosition="left">
          <TabPane
            tab={<IntlMessages id="sidebar.components.general" />}
            key="1"
          >
            <Form onSubmit={this.handleSubmit}>
              <Basic />
            </Form>
          </TabPane>
          <TabPane tab={<IntlMessages id="company.contact" />} key="2">
            <Form onSubmit={this.handleSubmit}>
              <Contact />
            </Form>
          </TabPane>
          <TabPane tab={<IntlMessages id="step.information.address" />} key="3">
            <Form onSubmit={this.handleSubmit}>
              <Address />
            </Form>
          </TabPane>
          <TabPane tab={<IntlMessages id="license" />} key="4">
            <Form onSubmit={this.handleSubmit}>
              <License />
            </Form>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const Detail = Form.create()(OtherFormControls);

export default Detail;
