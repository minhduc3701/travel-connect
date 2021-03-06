import React from "react";
import { Icon, Col, Tooltip } from "antd";
import { doneChange, failChange } from "util/Notification";
import { Link } from "react-router-dom";
import IntlMessages from "util/IntlMessages";
import "styles/containerToScroll.less";

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
    this.setState({ value: time });
  };

  showRecommend = () => {
    this.setState({
      visibleRecommend: true
    });
  };

  handleOk = e => {
    this.setState({
      visibleRecommend: false
    });
    doneChange();
  };

  handleCancel = e => {
    this.setState({
      visibleRecommend: false
    });
    failChange();
  };

  render() {
    const { productList } = this.props;
    return (
      <Tooltip title={`${productList.productName}`}>
        <div className="gx-featured-item">
          <div className="d-flex d-flex-wrap justify-space-between">
            <Col xl={20} lg={20} md={20} sm={24} xs={24}>
              {productList ? (
                <h5 className="gx-mb-2 text-ellipsis">
                  {productList.productName} - {productList.productDay}{" "}
                  <IntlMessages id="account.profile.product.unit.days" />{" "}
                  {productList.productNight}{" "}
                  <IntlMessages id="account.profile.product.unit.nights" />
                </h5>
              ) : null}
            </Col>
            <Col xl={4} lg={4} md={4} sm={24} xs={24}>
              <h5 className="text-align-right">
                <Link
                  target="blank"
                  to={{
                    pathname: `/find/${productList.productType}/detail/${productList.productId}`
                  }}
                >
                  <Icon type="double-right" className="m-r-1" />
                  <IntlMessages id="account.profile.product.btn.detail" />
                </Link>
              </h5>
            </Col>
          </div>
        </div>
      </Tooltip>
    );
  }
}

export default PropertiesItemCard;
