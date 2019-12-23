import React, { Component } from "react";
import { Button, Card, Steps } from "antd";
// import CompanyType from "./SubComponent/type";
import { Link } from "react-router-dom";
// import Membership from './SubComponent/membership'
import Detail from "./SubComponent/detail";
import "./index.css";
import Verify from "./SubComponent/verify";
const Step = Steps.Step;

class SwitchStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      isCompnay: true,
      optionNumber: 0,
      optionNumberDetail: 0
    };
  }
  callbackHandlerFunction = clickStatus => {
    this.setState({
      isCompnay: clickStatus
    });
  };

  setDetailCompanyType = option => {
    this.setState({
      optionNumberDetail: option,
      disabled: false
    });
  };
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
    window.scrollTo({ top: 100, behavior: "smooth" });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  
  render() {
    const { current } = this.state;
    const steps = [
    //   {
    //     title: "Loại hình doanh nghiệp",
    //     content: (
    //       <CompanyType
    //         setOptionNumber={this.setDetailCompanyType}
    //         handleClickParent={this.callbackHandlerFunction}
    //       />
    //     )
    //   },
      {
        title: "Thông tin cá nhân / công ty",
        content: (
          <Detail
            option={true}
            optionNumberDetail={20}
          />
        )
      },
      {
        title: "Xác minh",
        content: <Verify />
      }
    ];
    return (
      <Card className="gx-card">
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="">{steps[this.state.current].content}</div>
        <div className="steps-action">
          {this.state.current < steps.length - 1 && (
            <Button
              type="primary button-next-step"
              onClick={() => this.next()}
            >
              Next
            </Button>
          )}
          {this.state.current === steps.length - 1 && (
            <Button
              type="primary button-next-step"
            >
              <Link to={{pathname : "/dashboard", state: { status: "processing" }}}>
              Gửi lại
              </Link>
            </Button>
          )}
          {this.state.current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </Card>
    );
  }
}

export default SwitchStep;
