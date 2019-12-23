import React from "react";
import { Button, Icon, Row, Col } from "antd";
const RoadMapItem = ({ data }) => {
	const { image, title, desc } = data;
	return (
		<div className="gx-slider box bg-color-white">
			<div className="gx-slider-img p-b-0-i">
				<Row>
					<Col xl={24} lg={24} md={24} sm={24} xs={24} >
						<span className="gx-link">
							<img className="filter-blur-1 object-pos-right block__banner__slide" alt="example" src={image} />
						</span>
						<div className="pos-abs pos-abs-center z-2 w-80">

							<h3 className="text-trans-upper block__banner__color--primary" > 23/12/2019 - 31/12/2019</h3>
							<h5 className="text-trans-upper block__banner__color--primary" > At Ha Noi, Viet Nam</h5>
							<h1 className="text-trans-upper block__banner__color--primary" > {title}</h1>
							<h3 className="color-white" >{desc}</h3>
							<p className="text-align-left">
								<Button type="primary">
									<Icon type="double-right" /> View event
								</Button>
							</p>
						</div>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default RoadMapItem;
