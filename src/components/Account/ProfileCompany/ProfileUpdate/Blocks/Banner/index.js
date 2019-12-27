import React, { Component } from "react";
import { Col, Icon } from "antd";
import { Button, Dropdown, Menu } from "antd";
import Info from "./Info";
import BannerBackground from "./BannerBackground";
import AvatarCompany from "./AvatarCompany";
const btn_notification_menu = (
  <Menu>
    <Menu.Item>
      <Button type="link" className="m-b-0-i" size="small">
        All
      </Button>
    </Menu.Item>
    <Menu.Item>
      <Button type="link" className="m-b-0-i" size="small">
        New product only
      </Button>
    </Menu.Item>
    <Menu.Item>
      <Button type="link" className="m-b-0-i" size="small">
        Event only
      </Button>
    </Menu.Item>
    <Menu.Item>
      <Button type="link" className="m-b-0-i" size="small">
        Off
      </Button>
    </Menu.Item>
  </Menu>
);

class Banner extends Component {
  render() {
    let { profile } = this.props;
    // console.log(profile);
    return (
      <div className="m-b-5">
        <BannerBackground profile={this.props} />
        <div className="bg-color-white d-flex d-flex-wrap">
          <Col xl={6} lg={6} md={24} sm={24} xs={24} className="pos-rel">
            <AvatarCompany profile={this.props} />
            <div className="block__banner__avatar__extend">
              <div className="text-align-center">
                <div className="d-inline-block text-align-left">
                  <h5 className=" gx-text-grey m-b-0-i">
                    <Icon type="usergroup-add" className="p-r-1" />
                    {profile.company_followers}
                  </h5>
                  <h5 className=" gx-text-grey m-b-0-i">
                    <Icon type="eye" className="p-r-1" />{" "}
                    {profile.company_views}
                  </h5>
                </div>
              </div>
            </div>
          </Col>
          <Col xl={18} lg={18} md={24} sm={24} xs={24} className="pos-rel">
            <Info profile={this.props} />
          </Col>
          <Col
            xl={24}
            lg={24}
            md={24}
            sm={24}
            xs={24}
            className="text-align-right p-b-3 p-h-3 pos-rel box d-flex-i d-flex-wrap justify-flex-end"
          >
            <Button className="m-b-0-i d-inline-block m-r-3-i m-t-3-i p-h-1-i">
              <Icon type="book" className="p-r-1" />
              <span className="gx-d-inline-flex gx-vertical-align-middle gx-ml-1 gx-ml-sm-0">
                Follow
              </span>
            </Button>
            <Dropdown
              overlay={btn_notification_menu}
              placement="bottomRight"
              className=" m-t-3-i d-inline-block"
            >
              <Button className="m-b-0-i p-h-1-i">
                <Icon type="bell" className="p-r-1" />
                <span className="gx-d-inline-flex gx-vertical-align-middle gx-ml-1 gx-ml-sm-0">
                  Notification
                </span>
              </Button>
            </Dropdown>
          </Col>
        </div>
      </div>
    );
  }
}

export default Banner;
