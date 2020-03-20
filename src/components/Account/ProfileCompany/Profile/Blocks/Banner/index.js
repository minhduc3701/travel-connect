import React, { Component } from "react";
import { Col, Icon } from "antd";
import { Button } from "antd";
// import { Link } from "react-router-dom";
import Info from "./Info";
import IntlMessages from "util/IntlMessages";
import { Link } from "react-router-dom";

class Banner extends Component {
  render() {
    let { profile } = this.props;
    let user_info = JSON.parse(localStorage.getItem("user_info"));

    return (
      <div className="m-b-5 ">
        <div className="aspect_box">
          <div className="aspect_box--inner aspect_box--retangle_1x4">
            {profile.company_background !== "" ? (
              <img
                src={profile.company_background}
                alt="banner"
                className="aspect_box__img aspect_box__img--cover"
              />
            ) : (
              <div
                className="aspect_box__img aspect_box__img--cover"
                style={{ background: "#55555533" }}
              ></div>
            )}
          </div>
        </div>
        <div className="bg-color-white d-flex d-flex-wrap">
          <Col xl={6} lg={6} md={24} sm={24} xs={24} className="pos-rel">
            <div className="aspect_box block__banner__avatar">
              <div className="aspect_box--inner aspect_box--square --circle block__banner__avatar--inner bg-color-white">
                {profile.company_logo !== "" ? (
                  <img
                    src={profile.company_logo}
                    alt="banner"
                    className="aspect_box__img aspect_box__img--contain"
                  />
                ) : (
                  <div
                    className="aspect_box__img aspect_box__img--contain"
                    style={{ background: "#55555533" }}
                  ></div>
                )}
              </div>
            </div>
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
            <Info Account={profile} />
          </Col>
          {user_info.user_id === profile.company_admin && (
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
                <Link
                  onClick={this.onUpdate}
                  title="Update"
                  to="/profile/update"
                >
                  <Icon type="edit" className="m-r-1-i" />
                  <span className="gx-d-inline-flex gx-vertical-align-middle gx-ml-1 gx-ml-sm-0">
                    <IntlMessages id="account.profile.edit" />
                  </span>
                </Link>
              </Button>
            </Col>
          )}
        </div>
      </div>
    );
  }
}

export default Banner;
