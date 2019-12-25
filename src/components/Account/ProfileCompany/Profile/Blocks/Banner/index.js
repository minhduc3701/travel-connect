import React, { Component } from "react";
import { Col, Icon } from "antd";
import { Button, Dropdown, Menu } from "antd";
// import { Link } from "react-router-dom";
import Info from "./Info";
// import IntlMessages from "util/IntlMessages";

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
    // let { profile } = this.props;
    // console.log(profile);
    return (
      <div className="m-b-5">
        <div className="aspect_box">
          <div className="aspect_box--inner aspect_box--retangle_1x4">
            <img
              src="http://www.halongbooking.net/wp-content/uploads/2016/01/travel-banner-halong.jpg"
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
                  src="https://scontent.fhan5-5.fna.fbcdn.net/v/t1.0-1/p100x100/25442975_276028026257353_8090215628955438851_n.png?_nc_cat=101&_nc_oc=AQl2Y0toBu2NaUM4Da0Lkc69MePiriKQFnVbSOWplvE9VdbFPVp1sEiaftSAqjBIh2w&_nc_ht=scontent.fhan5-5.fna&oh=8c9443059fc00926ded386974e78813e&oe=5E78CCD3"
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
                    254 Followers
                    {/* {profile.company_name} */}
                    {/* {this.props.comany_deal} */}
                  </h5>
                  <h5 className=" gx-text-grey m-b-0-i">
                    <Icon type="eye" className="p-r-1" /> 5.214 Views
                  </h5>
                </div>
              </div>
            </div>
          </Col>
          <Col xl={18} lg={18} md={24} sm={24} xs={24} className="pos-rel">
            <Info />
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
