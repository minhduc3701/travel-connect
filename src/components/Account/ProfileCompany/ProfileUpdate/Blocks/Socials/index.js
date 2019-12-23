import React from "react";
import doneChange from "util/Notification";
import { Link } from "react-router-dom";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";

import { Col, Icon, Input } from "antd";

class Socials extends React.Component {
  state = {
    stt_socials: false
  };

  changeSocialsToEdit = () => {
    if (this.state.stt_socials === true) {
      doneChange();
      this.setState({ stt_socials: false });
    }
    if (this.state.stt_socials === false) this.setState({ stt_socials: true });
  };
  render() {
    return (
      <div className="block-w-nb">
        <WidgetHeader
          styleName="d-flex align-items-flex-end"
          title="Connect and share"
          extra={
            <div className="m-l-1" onClick={() => this.changeSocialsToEdit()}>
              {this.state.stt_socials === false ? (
                <Icon
                  type="edit"
                  className="cursor-pointer cursor-pointer--zoom"
                />
              ) : (
                <Icon
                  className="size-4 cursor-pointer cursor-pointer--zoom"
                  type="check-circle"
                />
              )}
            </div>
          }
        />
        {this.state.stt_socials === false ? (
          <div className="d-flex d-flex-wrap justify-space-between">
            <Col xl={12} lg={24} md={12} sm={12} xs={24}>
              <h4 className="gx-mb-2 text-ellipsis">
                <Link
                  target="blank"
                  to={{
                    pathname: "http://facebook.com"
                  }}
                  className=" d-flex align-items-center"
                >
                  <Icon
                    type="facebook"
                    className="size-5 m-r-1"
                    theme="filled"
                  />{" "}
                  Facebook
                </Link>
              </h4>
            </Col>
            <Col xl={12} lg={24} md={12} sm={12} xs={24}>
              <h4 className="gx-mb-2 text-ellipsis">
                <Link
                  target="blank"
                  to={{
                    pathname: "http://facebook.com"
                  }}
                  className=" d-flex align-items-center"
                >
                  <Icon
                    type="linkedin"
                    className="size-5 m-r-1"
                    theme="filled"
                  />{" "}
                  Linkedin
                </Link>
              </h4>
            </Col>
            <Col xl={12} lg={24} md={12} sm={12} xs={24}>
              <h4 className="gx-mb-2 text-ellipsis">
                <Link
                  target="blank"
                  to={{
                    pathname: "http://facebook.com"
                  }}
                  className=" d-flex align-items-center"
                >
                  <Icon type="gitlab" className="size-5 m-r-1" theme="filled" />{" "}
                  Gitlab
                </Link>
              </h4>
            </Col>
            <Col xl={12} lg={24} md={12} sm={12} xs={24}>
              <h4 className="gx-mb-2 text-ellipsis">
                <Link
                  target="blank"
                  to={{
                    pathname: "http://facebook.com"
                  }}
                  className=" d-flex align-items-center"
                >
                  <Icon type="skype" className="size-5 m-r-1" theme="filled" />{" "}
                  Skype
                </Link>
              </h4>
            </Col>
          </div>
        ) : (
          <div className="d-flex d-flex-wrap justify-space-between">
            <Col xl={24} lg={24} md={12} sm={12} xs={24}>
              <h4 className="gx-mb-2 text-ellipsis">
                <div className=" d-flex align-items-center">
                  <Icon
                    type="facebook"
                    className="size-5 m-r-1"
                    theme="filled"
                  />
                  <Input
                    className="d-inline-block w-65-i"
                    defaultValue="facebook.com/12312312312"
                  />
                </div>
              </h4>
            </Col>
            <Col xl={24} lg={24} md={12} sm={12} xs={24}>
              <h4 className="gx-mb-2 text-ellipsis">
                <div className=" d-flex align-items-center">
                  <Icon
                    type="linkedin"
                    className="size-5 m-r-1"
                    theme="filled"
                  />
                  <Input
                    className="d-inline-block w-65-i"
                    defaultValue="linkedin.com/12312312312"
                  />
                </div>
              </h4>
            </Col>
            <Col xl={24} lg={24} md={12} sm={12} xs={24}>
              <h4 className="gx-mb-2 text-ellipsis">
                <div className=" d-flex align-items-center">
                  <Icon type="gitlab" className="size-5 m-r-1" theme="filled" />
                  <Input
                    className="d-inline-block w-65-i"
                    defaultValue="gitlab.com/12312312312"
                  />
                </div>
              </h4>
            </Col>
            <Col xl={24} lg={24} md={12} sm={12} xs={24}>
              <h4 className="gx-mb-2 text-ellipsis">
                <div className=" d-flex align-items-center">
                  <Icon type="skype" className="size-5 m-r-1" theme="filled" />
                  <Input
                    className="d-inline-block w-65-i"
                    defaultValue="skype.com/12312312312"
                  />
                </div>
              </h4>
            </Col>
          </div>
        )}
        <div
          className="gx-text-primary gx-fs-md gx-pointer gx-mb-4 gx-d-block gx-d-sm-none p-3 text-align-right"
          onClick={() => this.changeSocialsToEdit()}
        >
          {this.state.stt_socials === true ? (
            <div className="d-inline-block">
              {" "}
              <Icon
                type="edit"
                className="cursor-pointer cursor-pointer--zoom"
              />{" "}
              Edit{" "}
            </div>
          ) : (
            <div className="d-inline-block">
              {" "}
              <Icon
                className="size-4 cursor-pointer cursor-pointer--zoom"
                type="check-circle"
              />{" "}
              Save{" "}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Socials;
