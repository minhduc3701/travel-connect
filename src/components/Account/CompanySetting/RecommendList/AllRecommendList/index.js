import React from "react";
import { Button, Col, Row, Icon } from "antd";
import CircularProgress from "components/GlobalComponent/CircularProgress";
import IntlMessages from "util/IntlMessages";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { B2B } from "components/Layout/Header/NavigateLink";
import { unRecommend } from "appRedux/actions/GetUser";
class AllRecommendList extends React.Component {
  render() {
    return !isLoaded(this.props.recommendList) ? (
      <CircularProgress />
    ) : this.props.recommendList.length === 0 ? (
      <div>
        <Button onClick={this.props.back()} className="p-5">
          <Icon type="arrow-left" />
        </Button>
        <div className="p-5 block_shadow">
          <ul className="gx-sub-popover">
            <p className="text-align-center text-color-sub">
              <i className="icon icon-inbox size-6"></i>
            </p>
            <h5 className="text-align-center text-color-sub">
              <IntlMessages id="account.setting.recommendList.emptyRecommend" />
            </h5>
          </ul>
        </div>
      </div>
    ) : (
      <div className="gx-main-content p-5">
        <Button onClick={this.props.back()}>
          <Icon type="arrow-left" />
        </Button>
        <Row>
          {this.props.recommendList.map((product, index) => (
            <Col key={index} xl={12} md={12} sm={12} xs={24}>
              <div className={`gx-product-item gx-product-horizontal`}>
                <div className="gx-product-image">
                  <div className="gx-grid-thumb-equal">
                    <span className="gx-link gx-grid-thumb-cover">
                      <img
                        alt="Remy Sharp"
                        src={product.productThumb[0].thumb}
                      />
                    </span>
                  </div>
                </div>

                <div className="gx-product-body">
                  <h3 className="gx-product-title">
                    {product.productName}
                    {/* <small className="gx-text-grey">{", " + variant}</small> */}
                  </h3>
                  <div className="ant-row-flex">
                    <h4>
                      {" "}
                      {product.productMinPrice === product.productMaxPrice &&
                        product.productMinPrice !== 0 &&
                        product.productMinPrice !== "" && (
                          <span>
                            {new Intl.NumberFormat("de-DE", {
                              style: "currency",
                              currency: product.productCurrency
                            }).format(product.productMinPrice)}
                            ;
                          </span>
                        )}
                      {product.productMinPrice !== product.productMaxPrice &&
                        product.productMaxPrice !== "" &&
                        product.productMinPrice !== "" && (
                          <span>
                            {new Intl.NumberFormat("de-DE", {
                              style: "currency",
                              currency: product.productCurrency
                            }).format(product.productMinPrice)}{" "}
                            -{" "}
                            {new Intl.NumberFormat("de-DE", {
                              style: "currency",
                              currency: product.productCurrency
                            }).format(product.productMaxPrice)}
                          </span>
                        )}
                      {product.productMinPrice === 0 &&
                        product.productMaxPrice === 0 &&
                        "Liên hệ"}
                    </h4>
                    {/* <h5 className="gx-text-muted gx-px-2">
              <del>{mrp}</del>
            </h5> */}
                    {/* <h5 className="gx-text-success">{offer} off</h5> */}
                  </div>

                  <p>
                    {product.productDestinations.map((item, id) => {
                      return <span key={id}>{item}, </span>;
                    })}
                  </p>
                </div>

                <div className="d-flex">
                  <Button
                    size="small"
                    variant="raised"
                    style={{
                      //   marginLeft: "auto",
                      marginRight: "2em",
                      marginLeft: "20%"
                    }}
                  >
                    <a
                      href={`${B2B}/find/${product.productType}/detail/${product.productId}`}
                    >
                      <IntlMessages id="account.profile.event.btn.detail" />
                    </a>
                  </Button>

                  <Button
                    size="small"
                    type="primary"
                    style={{ marginLeft: "auto", marginRight: "2em" }}
                    onClick={() =>
                      this.props.unRecommend(
                        product.productType + "s",
                        product.productId
                      )
                    }
                  >
                    <IntlMessages id="account.setting.recommendList.recommended" />
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
const mapStateToProps = ({ firestore }) => {
  const { recommendList } = firestore.ordered;
  return { recommendList };
};

export default compose(
  firestoreConnect(props => {
    const user_info = JSON.parse(localStorage.getItem("user_info"));
    return [
      {
        collection: "companies",
        doc: user_info.company_id,
        subcollections: [{ collection: "recommendProduct" }],
        where: [["productType", "==", props.type]],
        storeAs: "recommendList"
      }
    ];
  }),
  connect(mapStateToProps, { unRecommend })
)(AllRecommendList);
