import React, { Component } from "react";
import { Row, Col, Button, Progress, Result, Icon } from "antd";
import Personal from "./Personal";
import Activity from "./Activity";
import Verify from "./Verify";
import PersonCompany from "./PersonCompany";
import CompanyManager from "./CompanyManager";
// import IntlMessages from "util/IntlMessages";
import { Link } from "react-router-dom";
// import { notiChange } from "util/Notification";

class CompleteRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      btnStep: false,
      progress: 0,
      info: [],
      // info: this.props.step
      welcome: true
    };
  }

  onNextStep = () => {
    this.setState({
      step: this.state.step + 1,
      progress: this.state.progress + 25
    });
    window.scrollTo({ top: 100, behavior: "smooth" });
  };
  onBackStep = () => {
    this.setState({
      step: this.state.step - 1,
      progress: this.state.progress - 25
    });
    window.scrollTo({ top: 100, behavior: "smooth" });
  };
  onGetState = (step, process) => {
    this.setState({
      step: step,
      progress: process ? process : this.state.progress + 25
    });
    window.scrollTo({ top: 100, behavior: "smooth" });
  };

  onClose = () => {
    this.setState({
      welcome: false
    });
  };

  render() {
    // let { step } = this.props;
    let userInfo = JSON.parse(localStorage.getItem("user_info"));
    let name = userInfo.user_name.split(" ");
    let nameWelcome = name[name.length - 1];
    return (
      <div>
        <div
          className="block-w position-relative"
          style={this.state.welcome ? {} : { display: "none" }}
        >
          <Row>
            <Col span={8}>
              <div>
                <img
                  src="https://image.freepik.com/free-vector/character-illustration-people-with-packages-shipment_53876-59858.jpg"
                  alt=""
                  style={{ height: "16em" }}
                />
              </div>
            </Col>
            <Col span={16}>
              <div
                className="d-flex w-100 h-100"
                style={{ flexDirection: "column", justifyContent: "center" }}
              >
                <h1 style={{ fontSize: 35 }}>
                  Welcome {nameWelcome} to Travel Connect
                </h1>
                <h3>Chỉ cần một vài bước để hoàn thiện hồ sơ của bạn!</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li style={{ fontSize: 17, margin: "5px 0" }}>
                    <Icon
                      type="check-circle"
                      style={this.state.step !== 0 ? { color: "green" } : {}}
                    />{" "}
                    Thông tin hồ sơ cá nhân
                  </li>
                  <li style={{ fontSize: 17, margin: "5px 0" }}>
                    <Icon
                      type="check-circle"
                      style={this.state.step > 2 ? { color: "green" } : {}}
                    />{" "}
                    Thông tin công ty, lĩnh vực hoạt động
                  </li>
                  <li style={{ fontSize: 17, margin: "5px 0" }}>
                    <Icon
                      type="check-circle"
                      style={this.state.step > 3 ? { color: "green" } : {}}
                    />{" "}
                    Xác minh giấy phép
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <Icon
            onClick={() => this.onClose()}
            type="close"
            style={{ position: "absolute", top: 0, right: 0, padding: 15 }}
          />
        </div>

        {/* Progress */}
        <div>
          {this.state.progress === 0 ? null : (
            <Progress
              percent={this.state.progress}
              strokeColor={{
                from: "#108ee9",
                to: "#87d068"
              }}
              status="active"
            />
          )}
        </div>

        {/* Content component */}
        {this.state.step === 0 ? <Personal getState={this.onGetState} /> : null}
        {this.state.step === 1 ? <Activity getStep={this.onGetState} /> : null}
        {this.state.step === 2 ? (
          <PersonCompany getState={this.onGetState} />
        ) : null}
        {this.state.step === 3 ? (
          <CompanyManager getState={this.onGetState} />
        ) : null}
        {this.state.step === 4 ? <Verify getState={this.onGetState} /> : null}
        {this.state.step === 5 ? (
          <div className="block-w bor-rad-6">
            <Result
              key="aa"
              style={{ height: "30em" }}
              status="success"
              title="Chúc mừng bạn đã cập nhật hồ sơ thành công!"
              // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
              extra={[
                <Link to="/profile">
                  <Button onClick={this.onSubmit} type="primary" key="console">
                    Xác nhận
                  </Button>
                </Link>
              ]}
            />
          </div>
        ) : null}

        {/* Button */}
        {/* <div className=" block-w bor-rad-6">
          {this.state.step === 0 ? (
            <div
              className=" d-flex"
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-end"
              }}
            >
              <Button
                type="primary"
                style={{ marginLeft: "auto", marginBottom: "0 !important" }}
                onClick={this.onNextStep}
              >
                Next
              </Button>
            </div>
          ) : null}
          {this.state.step === 1 ? (
            <div
              className=" d-flex"
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-end"
              }}
            >
              <Button
                style={{ marginBottom: "0 !important" }}
                onClick={this.onBackStep}
              >
                Return
              </Button>
              <Button
                type="primary"
                style={{ marginLeft: "auto", marginBottom: "0 !important" }}
                onClick={this.onNextStep}
              >
                Next
              </Button>
            </div>
          ) : null}
          {this.state.step === 2 ? (
            <div
              className=" d-flex"
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-end"
              }}
            >
              <Button
                style={{ marginBottom: "0 !important" }}
                onClick={this.onBackStep}
              >
                Return
              </Button>
              <Button
                type="primary"
                style={{ marginLeft: "auto", marginBottom: "0 !important" }}
                onClick={this.onNextStep}
              >
                Next
              </Button>
            </div>
          ) : null}
          {this.state.step === 3 ? (
            <div
              className=" d-flex"
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Button
                style={{ marginBottom: "0 !important" }}
                onClick={this.onBackStep}
              >
                Return
              </Button>
              <Button
                onClick={this.onNextStep}
                type="primary"
                style={{ marginBottom: "0 !important" }}
              >
                Complete
              </Button>
            </div>
          ) : null}
          {this.state.step === 4 ? null : null}
        </div>
       */}
      </div>
    );
  }
}

export default CompleteRegister;
