import React from "react";
import { Button } from "antd";
import { Icon, Row, Col } from "antd";
import IntlMessages from "util/IntlMessages";
import { B2B } from "components/Layout/Header/NavigateLink";
import { unRecommend } from "appRedux/actions/GetUser";
import { connect } from "react-redux";
class ProductItem extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div className="gx-classic-testimonial gx-slide-item dashboard-company">
        <div className={`gx-product-vertical`}>
          <div className="gx-product-image">
            <div className="gx-grid-thumb-equal">
              <span className="gx-link gx-grid-thumb-cover">
                <img
                  alt={data.productThumb[0].thumb}
                  src={data.productThumb[0].thumb}
                />
              </span>
            </div>
          </div>

          <div className="gx-product-body">
            <h3 className="gx-product-title">
              {data.productName}
              {/* <small className="gx-text-grey">{", " + "Gold "}</small> */}
            </h3>
            <div className="ant-row-flex">
              <h4>
                {" "}
                {data.productMinPrice === data.productMaxPrice &&
                  data.productMinPrice !== 0 &&
                  data.productMinPrice !== "" && (
                    <span>
                      {new Intl.NumberFormat("de-DE", {
                        style: "currency",
                        currency: data.productCurrency
                      }).format(data.productMinPrice)}
                      ;
                    </span>
                  )}
                {data.productMinPrice !== data.productMaxPrice &&
                  data.productMaxPrice !== "" &&
                  data.productMinPrice !== "" && (
                    <span>
                      {new Intl.NumberFormat("de-DE", {
                        style: "currency",
                        currency: data.productCurrency
                      }).format(data.productMinPrice)}{" "}
                      -{" "}
                      {new Intl.NumberFormat("de-DE", {
                        style: "currency",
                        currency: data.productCurrency
                      }).format(data.productMaxPrice)}
                    </span>
                  )}
                {data.productMinPrice === 0 &&
                  data.productMaxPrice === 0 &&
                  "Liên hệ"}
              </h4>
              {/* <h4>{"$990 "} </h4>
            <h5 className="gx-text-muted gx-px-2">
              <del>{"$990 "}</del>
            </h5>
            <h5 className="gx-text-success">{"29 %"} off</h5> */}
            </div>

            <p>
              {data.productDestinations.map((item, id) => {
                return <span key={id}>{item}, </span>;
              })}
            </p>
          </div>

          <Row>
            <Col span={12}>
              <Button variant="raised" size="small">
                <a
                  href={`${B2B}/find/${data.productType}/detail/${data.productId}`}
                >
                  <IntlMessages id="account.profile.event.btn.detail" />
                </a>
              </Button>
            </Col>
            <Col span={12}>
              <Button
                type="primary"
                size="small"
                onClick={() =>
                  this.props.unRecommend(data.productType + "s", data.productId)
                }
              >
                <Icon type="star" theme="filled" />{" "}
                <IntlMessages id="account.setting.recommendList.recommended" />
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default connect(null, { unRecommend })(ProductItem);
