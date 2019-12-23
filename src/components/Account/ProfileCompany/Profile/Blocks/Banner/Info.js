import React from 'react';
import { Col, Icon, Row } from "antd";
class Info extends React.Component {
    render() {
        return (
            < div className="p-t-4" >
                <h3>Travel Connect</h3>
                <h2 className="text-trans-upper">Công ty TNHH Kết nối du lịch Việt Nam</h2>
                <Row>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <h5 className=" gx-text-grey "><Icon type="appstore" className="p-r-3" /> Travel Agency, Accommodation, Restaurance, Transport </h5>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <h5 className=" gx-text-grey "><Icon type="environment" className="p-r-3" /> Hà Nội, Việt Nam</h5>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <h5 className=" gx-text-grey "><Icon type="global" className="p-r-3" /> <a href="http://travelconnect.vn" title="Công ty TNHH Kết nối du lịch Việt Nam">http://travelconnect.vn</a></h5>
                    </Col>
                </Row>
            </div >
        )
    }
}

export default Info;