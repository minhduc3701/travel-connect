import React, { Component } from "react";
import { Row, Col, Button, Progress, Result } from "antd";
import Company from "./Company";
import Personal from "./Personal";
import Activity from "./Activity";
import Verify from "./Verify";
import { data } from "./data";
import IntlMessages from "util/IntlMessages";
import { Link } from "react-router-dom";
// import { notiChange } from "util/Notification";
import { API_PROFILE_COMPANY, a } from "../../../../constants/NavigateLink";

class CompleteRegister extends Component {
  state = {
    step: 0,
    btnStep: false,
    progress: 25,
    info: []
  };

  onNextStep = () => {
    this.setState({
      step: this.state.step + 1,
      progress: this.state.progress + 25
    });
    console.log(this.state);
    window.scrollTo({ top: 100, behavior: "smooth" });
  };
  onBackStep = () => {
    this.setState({
      step: this.state.step - 1,
      progress: this.state.progress - 25
    });
    window.scrollTo({ top: 100, behavior: "smooth" });
  };

  onGetState = step => {
    this.setState({
      step: step,
      progress: this.state.progress + 25
    });
    window.scrollTo({ top: 100, behavior: "smooth" });
  };

  render() {
    let b = `${API_PROFILE_COMPANY}/${a}`;
    console.log(b);
    return (
      <div>
        <Row className="align-items-center" style={{ height: "10em" }}>
          <Col span={24}>
            <h1 className="text-align-center size-6">
              <IntlMessages id="welcome" /> {data.name}!
            </h1>
            <p className="text-align-center text-color-white">
              <IntlMessages id="onlyFewStep" />
            </p>
          </Col>
        </Row>

        {/* Progress */}
        <Progress
          percent={this.state.progress}
          strokeColor={{
            from: "#108ee9",
            to: "#87d068"
          }}
          status="active"
        />

        {/* Content component */}
        {this.state.step === 0 ? (
          <Personal data={data} getState={this.onGetState} />
        ) : null}
        {this.state.step === 1 ? (
          <Company data={data} getState={this.onGetState} />
        ) : null}
        {this.state.step === 2 ? <Activity getStep={this.onGetState} /> : null}
        {this.state.step === 3 ? <Verify /> : null}
        {this.state.step === 4 ? (
          <div className="block-w bor-rad-6">
            <Result
              style={{ height: "30em" }}
              status="success"
              title="Chúc mừng bạn đã cập nhật hồ sơ thành công!"
              // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
              extra={[
                <Link to="/home">
                  <Button type="primary" key="console">
                    Ok
                  </Button>
                </Link>
              ]}
            />
          </div>
        ) : null}

        {/* Button */}
        <div className=" block-w bor-rad-6">
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
      </div>
    );
  }
}
export default CompleteRegister;
