import React from "react";
import { Tooltip } from "antd";

class HightLightItem extends React.Component {
	render() {
		return (
			<div className={`p-3 m-b-3 gx-flex-nowrap bor-b`}>
				<div className="gx-media gx-align-items-center gx-flex-nowrap">
					<div className="gx-mr-lg-4 gx-mr-3">
						<i className={`icon icon-${this.props.icon} size-6 gx-text-${this.props.colorTitle} gx-d-flex`} />
					</div>
					<div className="gx-media-body">
						<h5 className={`gx-font-weight-medium`}>{this.props.title}
							<Tooltip placement="topLeft" title={this.props.info}>
								<i className="size-1 m-l-3 cursor-pointer icon icon-exclamation" />
							</Tooltip>
						</h5>
						<h4 className={`gx-font-weight-medium gx-text-${this.props.colorTitle}`}>{this.props.values}</h4>
						<p className="gx-text-grey gx-mb-0" >{this.props.desc}</p>
					</div>
				</div>
			</div>
		);
	}
}
export default HightLightItem;
