import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import IntlMessages from "../../util/IntlMessages";
import {
	NAV_STYLE_ABOVE_HEADER,
	NAV_STYLE_BELOW_HEADER,
	NAV_STYLE_DEFAULT_HORIZONTAL,
	NAV_STYLE_INSIDE_HEADER_HORIZONTAL
} from "../../constants/ThemeSetting";
import { HOME, ACCOUNT, BUSINESS, B2B } from "../../constants/NavigateLink";
const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

class HorizontalNav extends Component {
	getNavStyleSubMenuClass = navStyle => {
		switch (navStyle) {
			case NAV_STYLE_DEFAULT_HORIZONTAL:
				return "gx-menu-horizontal gx-submenu-popup-curve";
			case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
				return "gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve";
			case NAV_STYLE_BELOW_HEADER:
				return "gx-menu-horizontal gx-submenu-popup-curve gx-below-submenu-popup-curve";
			case NAV_STYLE_ABOVE_HEADER:
				return "gx-menu-horizontal gx-submenu-popup-curve gx-above-submenu-popup-curve";
			default:
				return "gx-menu-horizontal";
		}
	};

	render() {
		const domain = window.location.host;
		const { pathname, navStyle } = this.props;
		const selectedKeys = pathname.substr(1);
		const defaultOpenKeys = selectedKeys.split("/")[1];
		return (
			<Menu
				defaultOpenKeys={[defaultOpenKeys]}
				selectedKeys={[selectedKeys]}
				mode="horizontal"
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
						<IntlMessages id="account" />
					}
				>
					<Menu.Item key="account_main">
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
					<Menu.Item key="account_profileCompany">
						{domain === "account.travelconnect.global" ? (
							<Link to="/profile">
								<Icon type="area-chart" />
								<IntlMessages id="profileCompany" />
							</Link>
						) : (
								<a href={`${ACCOUNT}/profile`} className="menu-item ">
									<Icon type="area-chart" />
									<IntlMessages id="profileCompany" />
								</a>
							)}
					</Menu.Item>
					<Menu.Item key="account_membermanagement">
						{domain === "account.travelconnect.global" ? (
							<Link to="/member-management">
								<Icon type="solution" />
								<IntlMessages id="sidebar.home.membermanagement" />
							</Link>
						) : (
								<a href={`${ACCOUNT}/member-management`} className="menu-item ">
									<Icon type="solution" />
									<IntlMessages id="sidebar.home.membermanagement" />
								</a>
							)}
					</Menu.Item>
					<Menu.Item key="account_company">
						{domain === "account.travelconnect.global" ? (
							<Link to="/upgrade-account">
								<Icon type="tag" />
								<IntlMessages id="sidebar.home.upgradeaccount" />
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
					title={<IntlMessages id="sidebar.businessmatching" />}
				>
					<Menu.Item key="businessmatching_dashboard">
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
					<Menu.Item key="businessmatching_appointmentManagement">
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
					<Menu.Item key="businessmatching_contact">
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
					title={<IntlMessages id="sidebar.b2bmarketplace" />}
				>
					<Menu.Item key="b2bmarketplace_listlandtour">
						{domain === "b2b.travelconnect.global" ? (
							<Link to="/company">
								<Icon type="dashboard" />
								<IntlMessages id="sidebar.home.dashboard" />
							</Link>
						) : (
								<a href={`${B2B}/b2b/dashboard`} className="menu-item ">
									<Icon type="dashboard" />
									<IntlMessages id="sidebar.home.dashboard" />
								</a>
							)}
					</Menu.Item>

					<SubMenu
						className={this.getNavStyleSubMenuClass(navStyle)}
						key="b2bmarketplace_sell"
						title={
							<span>
								<Icon type="gift" />
								<IntlMessages id="sell" />
							</span>
						}
					>
						<SubMenu
							className="gx-menu-horizontal"
							key="b2bmarketplace_sell_inventory"
							title={
								<span>
									<Icon type="database" />
									<IntlMessages id="sidebar.b2b.service.inventory" />
								</span>
							}
						>
							<Menu.Item key="b2bmarketplace_sell_inventory_landtour">
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
							<Menu.Item key="b2bmarketplace_sell_inventory_grouptour">
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
						<Menu.Item key="b2bmarketplace_sell_request">
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
						key="b2bmarketplace_buy"
						title={
							<span>
								<Icon type="shopping-cart" />
								<IntlMessages id="buy" />
							</span>
						}
					>
						<SubMenu
							className="gx-menu-horizontal"
							key="b2bmarketplace_buy_find"
							title={
								<span>
									<Icon type="search" />
									<IntlMessages id="sidebar.b2bmarketplace.find" />
								</span>
							}
						>
							<Menu.Item key="b2bmarketplace_buy_find_landtour">
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
							<Menu.Item key="b2bmarketplace_buy_find_grouptour">
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
						<Menu.Item key="b2bmarketplace_buy_request">
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
		);
	}
}

HorizontalNav.propTypes = {};
const mapStateToProps = ({ settings }) => {
	const { themeType, navStyle, pathname, locale } = settings;
	return { themeType, navStyle, pathname, locale };
};
export default connect(mapStateToProps)(HorizontalNav);
