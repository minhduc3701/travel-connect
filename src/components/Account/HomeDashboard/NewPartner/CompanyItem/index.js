import React from "react";
import Widget from "components/Widget/index";
import { Badge, Button, Icon } from "antd";

class CompanyItem extends React.Component {
	render() {
		return (
			<Widget styleName="gx-card-full gx-dot-arrow-hover">
				<div className="gx-user-wid-row">
					<div className="w-150-i h-150-i pos-rel gx-mr-3 box p-1-i">
						<img alt="..." src='https://travelconnect.vn/assets/images/logo/logo_full.png' className="w-100-i h-100-i object-fit-contain object-pos-center" />
					</div>
					<div className="gx-user-wid-body gx-py-3 gx-pr-3">
						<h2 className="h4 gx-text-truncate gx-mb-1">Công ty TNHH Giải pháp kết nối Du lịch Việt Nam</h2>
						<p className="gx-mb-0 gx-text-grey gx-fs-sm">Cung cấp giải pháp cho ngành Du lịch</p>
						<p className="p-t-1 m-b-0-i">
							<Badge className="gx-badge-radius-sm gx-mb-2" count="Landtour" style={{ backgroundColor: '#52c41a' }} />
							<Badge className="gx-badge-radius-sm gx-mb-2" count="Grouptour" style={{ backgroundColor: '#52c41a' }} />
						</p>
						<Button.Group size="small" >
							<Button>
								<Icon type="like" /> Thích
							</Button>
							<Button>
								Đánh giá <Icon type="form" />
							</Button>
						</Button.Group>
						<div className="gx-dot-arrow">
							<div className="gx-bg-primary gx-hover-arrow">
								<i className="icon icon-long-arrow-right gx-text-white" />
							</div>
							<div className="gx-dot">
								<i className="icon icon-ellipse-v gx-text-primary" />
							</div>
						</div>
					</div>
				</div>
			</Widget>
		);
	}
};

export default CompanyItem;
