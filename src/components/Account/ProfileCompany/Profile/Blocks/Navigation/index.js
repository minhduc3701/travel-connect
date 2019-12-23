import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import IntlMessages from "util/IntlMessages";

class Navigation extends Component {
    render() {
        return (
            <div className="block-w-nb block__nav__anchor">

                <Menu
                    mode="horizontal"
                    className="bor-b-0"
                >
                    <Menu.Item key="contact">
                        <a href="#nav_contact" >Contact</a>
                    </Menu.Item>
                    <Menu.Item key="statistics">
                        <a href="#nav_statistics" >Statistics</a>
                    </Menu.Item>
                    <Menu.Item key="Introduction">
                        <a href="#nav_introduction" >Introduction</a>
                    </Menu.Item>
                    <Menu.Item key="Communities">
                        <a href="#nav_communities" >Communities</a>
                    </Menu.Item>
                    <Menu.Item key="event" disabled>
                        <a href="#nav_event" >Event</a>
                    </Menu.Item>
                    <Menu.Item key="product">
                        <a href="#nav_product" >Product</a>
                    </Menu.Item>
                    <Menu.Item key="rating">
                        <a href="#nav_rating" >Rating</a>
                    </Menu.Item>
                    <Menu.Item key="media">
                        <a href="#nav_media" >Media</a>
                    </Menu.Item>
                    <Menu.Item key="setting_company" className=" f-r f-clear-fix">
                        <Link title="Setting" to="/company/setting">
                            <Icon type="tool" className="m-r-1-i" />
                            <span className="gx-d-inline-flex gx-vertical-align-middle gx-ml-1 gx-ml-sm-0">
                                <IntlMessages id="company.setting" />
                            </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="edit_profile" className=" f-r">
                        <Link title="Update" to="/company/update">
                            <Icon type="edit" className="m-r-1-i" />
                            <span className="gx-d-inline-flex gx-vertical-align-middle gx-ml-1 gx-ml-sm-0">
                                Edit Profile
                            </span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default Navigation;
