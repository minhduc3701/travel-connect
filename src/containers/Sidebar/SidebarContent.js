import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import { HOME, ACCOUNT, BUSINESS, B2B } from "../../constants/NavigateLink";

import Auxiliary from "util/Auxiliary";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
	NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
	NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
	THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";

const SubMenu = Menu.SubMenu;
class SidebarContent extends Component {

	getNoHeaderClass = (navStyle) => {
		if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
			return "gx-no-header-notifications";
		}
		return "";
	};
	getNavStyleSubMenuClass = (navStyle) => {
		if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
			return "gx-no-header-submenu-popup";
		}
		return "";
	};

	render() {
		const { themeType, navStyle, pathname } = this.props;
		const selectedKeys = pathname.substr(1);
		const defaultOpenKeys = selectedKeys.split('/')[1];
		const domain = window.location.host;
		return (
			<Auxiliary>
				<SidebarLogo />
				<div className="gx-sidebar-content">
					<div
						className={`gx-sidebar-notifications ${this.getNoHeaderClass(
							navStyle
						)}`}
					>
						<UserProfile />
						<AppsNavigation />
					</div>
					<CustomScrollbars className="gx-layout-sider-scrollbar">
						<Menu
							defaultOpenKeys={[defaultOpenKeys]}
							selectedKeys={[selectedKeys]}
							theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
							mode="inline"
							className="sidebar_menu"
						>
							<SubMenu
								className={this.getNavStyleSubMenuClass(navStyle)}
								key="home"
								title={
									domain === "app.travelconnect.global" ? (
										<Link to="/home">
											<IntlMessages id="sidebar.home" />
										</Link>
									) : (
											<a href={`${HOME}/home`} className="menu-item">
												<IntlMessages id="sidebar.home" />
											</a>
										)
								}
							></SubMenu>

							<SubMenu
								className={this.getNavStyleSubMenuClass(navStyle)}
								key="account"
								title={
									domain === "account.travelconnect.global" ? (
										<Link to="/">
											<IntlMessages id="sidebar.home" />
										</Link>
									) : (
											<IntlMessages id="account" />
										)
								}
							>
								<Menu.Item key="main" className="p-l-3-i">
									{domain === "account.travelconnect.global" ? (
										<Link to="/dashboard">
											<Icon type="dashboard" />
											<IntlMessages id="sidebar.home.dashboard" />
										</Link>
									) : (
											<a href={`${ACCOUNT}/dashboard`} className="menu-item ">
												<Icon type="dashboard" />
												<IntlMessages id="sidebar.home.dashboard" />
											</a>
										)}
								</Menu.Item>
								<Menu.Item key="profileCompany">
									{domain === "account.travelconnect.global" ? (
										<Link to="/company">
											<Icon type="dashboard" />
											<IntlMessages id="sidebar.home.dashboard" />
										</Link>
									) : (
											<a href={`${ACCOUNT}/company`} className="menu-item ">
												<Icon type="area-chart" />
												<IntlMessages id="profileCompany" />
											</a>
										)}
								</Menu.Item>
								<Menu.Item key="membermanagement">
									{domain === "account.travelconnect.global" ? (
										<Link to="/member-management">
											<Icon type="database" />
											<IntlMessages id="sidebar.home.dashboard" />
										</Link>
									) : (
											<a href={`${ACCOUNT}/member-management`} className="menu-item ">
												<Icon type="solution" />
												<IntlMessages id="sidebar.home.membermanagement" />
											</a>
										)}
								</Menu.Item>
								<Menu.Item key="company">
									{domain === "account.travelconnect.global" ? (
										<Link to="/upgrade-account">
											<Icon type="dashboard" />
											<IntlMessages id="sidebar.home.dashboard" />
										</Link>
									) : (
											<a href={`${ACCOUNT}/upgrade-account`} className="menu-item ">
												<Icon type="tag" />
												<IntlMessages id="sidebar.home.upgradeaccount" />
											</a>
										)}
								</Menu.Item>
							</SubMenu>

							<SubMenu
								className={this.getNavStyleSubMenuClass(navStyle)}
								key="events"
								title={<IntlMessages id="sidebar.events" />}
							></SubMenu>

							<SubMenu
								className={this.getNavStyleSubMenuClass(navStyle)}
								key="community"
								title={<IntlMessages id="sidebar.community" />}
							></SubMenu>

							<SubMenu
								className={this.getNavStyleSubMenuClass(navStyle)}
								key="businessmatching"
								title={
									domain === "business.travelconnect.global" ? (
										<Link to="/">
											<IntlMessages id="sidebar.home.dashboard" />
										</Link>
									) : (
											<IntlMessages id="sidebar.businessmatching" />
										)
								}
							>
								<Menu.Item key="sidebar.home.dashboard">
									{domain === "business.travelconnect.global" ? (
										<Link to="/dashboard">
											<Icon type="dashboard" />
											<IntlMessages id="sidebar.home.dashboard" />
										</Link>
									) : (
											<a href={`${BUSINESS}/dashboard`} className="menu-item">
												<Icon type="dashboard" />
												<IntlMessages id="sidebar.home.dashboard" />
											</a>
										)}
								</Menu.Item>
								<Menu.Item key="appointmentManagement">
									{domain === "business.travelconnect.global" ? (
										<Link to="/member-management">
											<Icon type="calendar" />
											<IntlMessages id="appointmentManagement" />
										</Link>
									) : (
											<a href={`${BUSINESS}/member-management`} className="menu-item">
												<Icon type="calendar" />
												<IntlMessages id="appointmentManagement" />
											</a>
										)}
								</Menu.Item>
								<Menu.Item key="company">
									{domain === "business.travelconnect.global" ? (
										<Link to="/company">
											<Icon type="book" />
											<IntlMessages id="contactManagement" />
										</Link>
									) : (
											<a href={`${BUSINESS}/company`} className="menu-item">
												<Icon type="book" />
												<IntlMessages id="contactManagement" />
											</a>
										)}
								</Menu.Item>
							</SubMenu>

							<SubMenu
								className={this.getNavStyleSubMenuClass(navStyle)}
								key="b2bmarketplace"
								title={
									domain === "b2b.travelconnect.global" ? (
										<Link to="/company">
											<IntlMessages id="sidebar.b2bmarketplace" />
										</Link>
									) : (
											<IntlMessages id="sidebar.b2bmarketplace" />
										)
								}
							>
								<Menu.Item key="listlandtour">
									{domain === "b2b.travelconnect.global" ? (
										<Link to="/company">
											<Icon type="dashboard" />
											Dashboard
										</Link>
									) : (
											<a href={`${B2B}/b2b/dashboard`} className="menu-item ">
												<Icon type="dashboard" />
												Dashboard
              								</a>
										)}
								</Menu.Item>

								<SubMenu
									className={this.getNavStyleSubMenuClass(navStyle)}
									key="sell"
									title={
										<span>
											<Icon type="gift" />
											<IntlMessages id="sell" />
										</span>
									}
								>
									<SubMenu
										className="gx-menu-horizontal"
										key="b2bmarketplace.inventory"
										title={
											<span>
												<Icon type="database" />
												<IntlMessages id="sidebar.b2b.service.inventory" />
											</span>
										}
									>
										<Menu.Item key="inventoryLandtour">
											{domain === "b2b.travelconnect.global" ? (
												<Link to="/b2b/inventory/landtour">
													<Icon type="rest" />
													<IntlMessages id="sidebar.b2bmarketplace.find.landtour" />
												</Link>
											) : (
													<a
														href={`${B2B}/b2b/inventory/landtour`}
														className="menu-item "
													>
														<Icon type="rest" />
														<IntlMessages id="sidebar.b2bmarketplace.find.landtour" />
													</a>
												)}
										</Menu.Item>
										<Menu.Item key="inventoryGrouptour">
											{domain === "b2b.travelconnect.global" ? (
												<Link to="/b2b/inventory/grouptour">
													<Icon type="rocket" />
													<IntlMessages id="sidebar.b2bmarketplace.find.grouptour" />
												</Link>
											) : (
													<a
														href={`${B2B}/b2b/inventory/grouptour`}
														className="menu-item "
													>
														<Icon type="rocket" />
														<IntlMessages id="sidebar.b2bmarketplace.find.grouptour" />
													</a>
												)}
										</Menu.Item>
									</SubMenu>
									<Menu.Item key="sellRequest">
										{domain === "b2b.travelconnect.global" ? (
											<Link to="/b2b/transaction/sell">
												<Icon type="gift" />
												<IntlMessages id="sellRequest" />
											</Link>
										) : (
												<a href={`${B2B}/b2b/transaction/sell`} className="menu-item ">
													<Icon type="gift" />
													<IntlMessages id="sellRequest" />
												</a>
											)}
									</Menu.Item>
								</SubMenu>

								<SubMenu
									className={this.getNavStyleSubMenuClass(navStyle)}
									key="buy"
									title={
										<span>
											<Icon type="shopping-cart" />
											<IntlMessages id="buy" />
										</span>
									}
								>
									<SubMenu
										className="gx-menu-horizontal"
										key="b2bmarketplace.find"
										title={
											<span>
												<Icon type="search" />
												<IntlMessages id="sidebar.b2bmarketplace.find" />
											</span>
										}
									>
										<Menu.Item key="listlandtour">
											{domain === "b2b.travelconnect.global" ? (
												<Link to="/b2b/landtour">
													<Icon type="rest" />
													<IntlMessages id="sidebar.b2bmarketplace.find.landtour" />
												</Link>
											) : (
													<a href={`${B2B}/b2b/landtour`} className="menu-item ">
														<Icon type="rest" />
														<IntlMessages id="sidebar.b2bmarketplace.find.landtour" />
													</a>
												)}
										</Menu.Item>
										<Menu.Item key="listgrouptour">
											{domain === "b2b.travelconnect.global" ? (
												<Link to="/b2b/grouptour">
													<Icon type="rocket" />
													<IntlMessages id="sidebar.b2bmarketplace.find.grouptour" />
												</Link>
											) : (
													<a href={`${B2B}/b2b/grouptour`} className="menu-item ">
														<Icon type="rocket" />
														<IntlMessages id="sidebar.b2bmarketplace.find.grouptour" />
													</a>
												)}
										</Menu.Item>
									</SubMenu>
									<Menu.Item key="buyRequest">
										{domain === "b2b.travelconnect.global" ? (
											<Link to="/b2b/transaction/buy">
												<Icon type="shopping-cart" />
												<IntlMessages id="buyRequest" />
											</Link>
										) : (
												<a href={`${B2B}/b2b/transaction/buy`} className="menu-item ">
													<Icon type="shopping-cart" />
													<IntlMessages id="buyRequest" />
												</a>
											)}
									</Menu.Item>
								</SubMenu>
							</SubMenu>

							<SubMenu
								className={this.getNavStyleSubMenuClass(navStyle)}
								key="b2cchannel"
								title={<IntlMessages id="sidebar.b2cchannel" />}
							></SubMenu>

							<SubMenu
								className={this.getNavStyleSubMenuClass(navStyle)}
								key="recruiment"
								title={<IntlMessages id="recruiment" />}
							></SubMenu>

							<SubMenu
								className={this.getNavStyleSubMenuClass(navStyle)}
								key="education"
								title={<IntlMessages id="education" />}
							></SubMenu>

							<SubMenu
								className={this.getNavStyleSubMenuClass(navStyle)}
								key="destination"
								title={<IntlMessages id="destination" />}
							></SubMenu>
						</Menu>
					</CustomScrollbars>
				</div>
			</Auxiliary>
		);
	}
}

SidebarContent.propTypes = {};
const mapStateToProps = ({ settings }) => {
	const { navStyle, themeType, locale, pathname } = settings;
	return { navStyle, themeType, locale, pathname }
};
export default connect(mapStateToProps)(SidebarContent);

