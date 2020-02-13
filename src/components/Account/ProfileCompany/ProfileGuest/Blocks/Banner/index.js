import React, { Component } from "react";
import { Col, Icon } from "antd";
import { Button, Dropdown, Menu } from "antd";
// import { Link } from "react-router-dom";
import Info from "./Info";
import background from "assets/images/travel-default-background.png";
import logo from "assets/images/travel-default-logo.png";
import IntlMessages from "util/IntlMessages";

const btn_notification_menu = (
  <Menu>
    <Menu.Item>
      <Button type="link" className="m-b-0-i" size="small">
        <IntlMessages id="account.profile.notifications.get.all" />
      </Button>
    </Menu.Item>
    <Menu.Item>
      <Button type="link" className="m-b-0-i" size="small">
        <IntlMessages id="account.profile.notifications.get.product" />
      </Button>
    </Menu.Item>
    <Menu.Item>
      <Button type="link" className="m-b-0-i" size="small">
        <IntlMessages id="account.profile.notifications.get.event" />
      </Button>
    </Menu.Item>
    <Menu.Item>
      <Button type="link" className="m-b-0-i" size="small">
        <IntlMessages id="account.profile.notifications.get.off" />
      </Button>
    </Menu.Item>
  </Menu>
);

class Banner extends Component {
  render() {
    let { profile } = this.props;
    // let { Account } = profile.profile;
    return (
      <div className="m-b-5 ">
        <div className="aspect_box">
          <div className="aspect_box--inner aspect_box--retangle_1x4">
            <img
              src={
                profile.company_background
                  ? profile.company_background
                  : profile.company_background === ""
                  ? background
                  : background
              }
              alt="banner"
              className="aspect_box__img aspect_box__img--cover"
            />
          </div>
        </div>
        <div className="bg-color-white d-flex d-flex-wrap">
          <Col xl={6} lg={6} md={24} sm={24} xs={24} className="pos-rel">
            <div className="aspect_box block__banner__avatar">
              <div className="aspect_box--inner aspect_box--square --circle block__banner__avatar--inner bg-color-white">
                <img
                  src={
                    profile.company_logo
                      ? profile.company_logo
                      : profile.company_logo === ""
                      ? logo
                      : logo
                  }
                  alt="banner"
                  className="aspect_box__img aspect_box__img--contain"
                />
              </div>
            </div>
            <div className="block__banner__avatar__extend">
              <div className="text-align-center">
                <div className="d-inline-block text-align-left">
                  <h5 className=" gx-text-grey m-b-0-i">
                    <Icon type="usergroup-add" className="p-r-1" />
                    368
                    {/* {profile.company_followers} */}
                  </h5>
                  <h5 className=" gx-text-grey m-b-0-i">
                    <Icon type="eye" className="p-r-1" />
                    279
                    {/* {profile.company_views} */}
                  </h5>
                </div>
              </div>
            </div>
          </Col>
          <Col xl={18} lg={18} md={24} sm={24} xs={24} className="pos-rel">
            <Info Account={profile} />
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
                <IntlMessages id="account.profile.follow" />
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
                  <IntlMessages id="account.profile.notifications.get" />
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
