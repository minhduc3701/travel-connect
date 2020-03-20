import React, { Component } from "react";
import { Col, Icon } from "antd";
import { Button } from "antd";
import Info from "./Info";
import BannerBackground from "./BannerBackground";
import AvatarCompany from "./AvatarCompany";
import IntlMessages from "util/IntlMessages";
import { Link } from "react-router-dom";

class Banner extends Component {
  render() {
    let { profile } = this.props;

    return (
      <div className="m-b-3">
        <BannerBackground profile={this.props} />
        <div className="d-flex d-flex-wrap">
          <Col xl={6} lg={6} md={24} sm={24} xs={24} className="pos-rel">
            <AvatarCompany profile={this.props} />
            <div className="block__banner__avatar__extend">
              <div className="text-align-center">
                <div className="d-inline-block text-align-left">
                  <h5 className=" gx-text-grey m-b-0-i">
                    <Icon type="usergroup-add" className="p-r-1" />
                    {profile.company_partner}
                  </h5>
                  <h5 className=" gx-text-grey m-b-0-i">
                    <Icon type="eye" className="p-r-1" />
                    {profile.company_views}
                  </h5>
                </div>
              </div>
            </div>
          </Col>
          <Col xl={15} lg={15} md={24} sm={24} xs={24} className="pos-rel">
            <Info profile={this.props} />
          </Col>
          <Col
            xl={3}
            lg={3}
            md={24}
            sm={24}
            xs={24}
            className="text-align-right p-b-3 p-h-3 pos-rel box d-flex-i d-flex-wrap justify-flex-end"
            style={{ alignItems: "flex-end" }}
          >
            <Button className="m-b-0-i p-h-1-i">
              <Link to="/profile">
                <Icon type="double-left" className="m-r-1-i" />
                <span className="gx-d-inline-flex gx-vertical-align-middle gx-ml-1 gx-ml-sm-0">
                  <IntlMessages id="return" />
                </span>
              </Link>
            </Button>
          </Col>
        </div>
      </div>
    );
  }
}

export default Banner;
