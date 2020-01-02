import React from "react";
import { Icon, Col } from "antd";
import { Link } from "react-router-dom";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";

class Socials extends React.Component {
  render() {
    let { Account } = this.props.profile;
    return (
      <div className="block-w-nb">
        <WidgetHeader title="Connect and share" />
        <div className="d-flex d-flex-wrap justify-space-between">
          <Col xl={12} lg={24} md={12} sm={12} xs={24}>
            <h4 className="gx-mb-2 text-ellipsis">
              <Link
                target="blank"
                to={{
                  pathname: Account.company_fb
                }}
                className=" d-flex align-items-center"
              >
                <Icon type="facebook" className="size-5 m-r-1" theme="filled" />{" "}
                Facebook
              </Link>
            </h4>
          </Col>
          <Col xl={12} lg={24} md={12} sm={12} xs={24}>
            <h4 className="gx-mb-2 text-ellipsis">
              <Link
                target="blank"
                to={{
                  pathname: Account.company_linkedin
                }}
                className=" d-flex align-items-center"
              >
                <Icon type="linkedin" className="size-5 m-r-1" theme="filled" />{" "}
                Linkedin
              </Link>
            </h4>
          </Col>
          <Col xl={12} lg={24} md={12} sm={12} xs={24}>
            <h4 className="gx-mb-2 text-ellipsis">
              <Link
                target="blank"
                to={{
                  pathname: Account.company_gitlab
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
                  pathname: Account.company_skype
                }}
                className=" d-flex align-items-center"
              >
                <Icon type="skype" className="size-5 m-r-1" theme="filled" />{" "}
                Skype
              </Link>
            </h4>
          </Col>
        </div>
      </div>
    );
  }
}

export default Socials;
