import React from "react";
import { Icon, Col } from "antd";
import { doneChange, failChange } from "util/Notification";
import { Link } from "react-router-dom";
// import "components/B2B/ProductItem/containerToScroll.less";
import "./containerToScroll.less";

class PropertiesItemCard extends React.Component {
  state = {
    visible: false,
    visibleRecommend: false
  };
  onClose = () => {
    this.setState({
      visible: false
    });
  };
  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 1500);
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };

  onChange = time => {
    console.log(time);
    this.setState({ value: time });
  };

  showRecommend = () => {
    this.setState({
      visibleRecommend: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visibleRecommend: false
    });
    doneChange();
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visibleRecommend: false
    });
    failChange();
  };

  render() {
    // const { title } = this.props.data;
    let { data } = this.props;
    return (
      <div className="gx-featured-item">
        <div className="d-flex d-flex-wrap justify-space-between">
          <Col xl={20} lg={20} md={20} sm={24} xs={24}>
            <h5 className="gx-mb-2 text-ellipsis">
              {data.product_name} - {data.product_day} ngày {data.product_night}{" "}
              đêm
            </h5>
          </Col>
          <Col xl={4} lg={4} md={4} sm={24} xs={24}>
            <h5 className="text-align-right">
              <Link
                target="blank"
                to={{
                  pathname: "/b2b/landtour/detail"
                }}
              >
                <Icon type="double-right" className="m-r-1" />
                Chi tiết
              </Link>
            </h5>
          </Col>
        </div>
      </div>
    );
  }
}

export default PropertiesItemCard;
