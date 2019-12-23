import React from "react";
import {
  Tag,
  Drawer,
  Icon,
  Avatar,
  Popover,
  Modal,
  Button,
  Tooltip
} from "antd";
import ProductRequest from "components/B2B/ProductItem/ProductRequest";
import GrouptourDetail from "components/B2B/ProductItem/Detail/GrouptourDetail";
import { doneChange, failChange } from "util/Notification";
import { Link } from "react-router-dom";
import "components/B2B/ProductItem/containerToScroll.less";

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

  onType = type => {
    switch (type) {
      case "hot":
        return (
          <Tag className="gx-rounded-xs" color="#00AA00">
            Hot
          </Tag>
        );
      case "new":
        return (
          <Tag className="gx-rounded-xs" color="#0000AA">
            New
          </Tag>
        );
      case "recommend":
        return (
          <Tag className="gx-rounded-xs" color="#AAAA00">
            Recommend
          </Tag>
        );
      default:
        break;
    }
  };
  content = company => {
    return (
      <div className="gx-profile-banner-top-left">
        <div className="gx-profile-banner-avatar company-logo-profile-surround">
          <Avatar
            shape="circle"
            alt="..."
            src={company.src}
            style={{ border: "1px solid #82828288" }}
          />
        </div>
        <div className="gx-profile-banner-avatar-info">
          <a style={{ marginBottom: 0, fontSize: 16 }}>{company.branchname}</a>
          <p style={{ marginBottom: 0, fontSize: 12 }}>{company.name}</p>
          <p style={{ marginBottom: 0, fontSize: 12 }}>
            <Icon type="environment" />
            {}
            {company.address}
          </p>
        </div>
      </div>
    );
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
    const {
      image,
      title,
      subTitle,
      name,
      vehicle,
      type,
      price,
      view,
      place,
      rate,
      companys,
      company
    } = this.props.data;
    return (
      <div className="gx-featured-item">
        <Avatar icon="user" size="small" style={{ marginLeft: 5 }} />
        <span>
          {} {company}
        </span>
        <div className="gx-media gx-featured-item" style={{ marginTop: 5 }}>
          <div className="gx-news-thumb">
            <img className="gx-rounded-lg gx-width-175" src={image} alt="..." />
          </div>
          <div className="gx-media-body gx-featured-content">
            <div className="gx-featured-content-left">
              {this.onType(type)}
              <Tag className="gx-rounded-xs" color="#000000">
                7 ngày 6 đêm
              </Tag>
              <h3 className="gx-mb-2">{title}</h3>
              <p className="gx-text-grey gx-mb-1">{subTitle}</p>
              <div className="ant-row-flex">
                <p className="gx-text-grey gx-mb-1">
                  <i
                    className={`icon icon-home gx-fs-xs gx-mr-2 gx-d-inline-flex gx-vertical-align-middle`}
                  />
                  {name}
                  {name === "Khách sạn" ? (
                    <span>
                      {} {rate} {}
                      <i
                        className={`icon icon-star gx-fs-xs gx-mr-2 gx-d-inline-flex gx-vertical-align-middle`}
                      />{" "}
                    </span>
                  ) : null}
                </p>
                <p className="gx-text-grey gx-ml-4 gx-mb-1">
                  <Icon type="global" />
                  {} {vehicle}
                </p>
                <p className="gx-text-grey gx-ml-4 gx-mb-1">
                  <Icon type="environment" /> {} {place}
                </p>
              </div>
              <p className="gx-link" onClick={this.showDrawer}>
                <Icon type="double-right" />
                Xem chi tiết
              </p>
              <Drawer
                placement="right"
                width="85%"
                closable={true}
                onClose={this.onClose}
                visible={this.state.visible}
              >
                <GrouptourDetail detail={this.props.data} />
              </Drawer>
            </div>
            <div className="gx-featured-content-right">
              <div>
                <h2 className="gx-text-primary gx-mb-1 gx-font-weight-medium">
                  {price}
                </h2>
                <p className="gx-text-grey gx-fs-sm">
                  Lượt xem {view} | Đánh giá {rate}
                </p>
              </div>
              <ProductRequest />
              <div>
                {companys.map((companys_item, companys_key) =>
                  companys_key < 3 ? (
                    <Link to={`../../company-guest`} target="_blank">
                      <Popover content={this.content(companys_item)}>
                        <Avatar
                          key={companys_key}
                          src={companys_item.src}
                          size="small"
                          style={{
                            marginRight: -5,
                            border: "1px solid #82828288"
                          }}
                        />
                      </Popover>
                    </Link>
                  ) : null
                )}
                <span>. và </span>
                <Tooltip
                  title={companys.map((companys_item, companys_key) =>
                    companys_key < 15 ? (
                      <Link to={`../../company-guest`} target="_blank">
                        <p
                          className="gx-link"
                          key={companys_key}
                          style={{ fontSize: 12, color: "white" }}
                        >
                          {companys_item.branchname}
                        </p>
                      </Link>
                    ) : (
                      <p>...</p>
                    )
                  )}
                  arrowPointAtCenter
                >
                  <span onClick={this.showRecommend} className="gx-link">
                    68 đơn vị khác
                  </span>
                </Tooltip>
                <Modal
                  visible={this.state.visibleRecommend}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  footer={false}
                  title={
                    <span>
                      <Icon type="star" theme="filled" /> Khuyên dùng
                    </span>
                  }
                >
                  <div className="scrollable-container_recommend">
                    {companys.map((companys_item, companys_key) => (
                      <div
                        className="gx-featured-item gx-featured-content"
                        style={{ padding: 0, marginBottom: 5 }}
                      >
                        <div
                          className="gx-featured-content-left"
                          style={{ marginBottom: 0 }}
                        >
                          <Link to={`../../company-guest`} target="_blank">
                            <Popover
                              content={this.content(companys_item)}
                              placement="right"
                            >
                              <Avatar
                                key={companys_key}
                                src={companys_item.src}
                                size="small"
                                style={{ border: "1px solid #82828288" }}
                              />
                              <span
                                className="gx-link size-3-i"
                                style={{ marginLeft: 15 }}
                              >
                                {companys_item.branchname}
                              </span>
                            </Popover>
                          </Link>
                        </div>
                        <div
                          className="gx-featured-content-right"
                          style={{ marginBottom: 0 }}
                        >
                          <Button size="small" type="primary">
                            Flow
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Modal>
                <span> khuyên dùng </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PropertiesItemCard;
