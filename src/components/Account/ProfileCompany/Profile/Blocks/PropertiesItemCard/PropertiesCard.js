import React from "react";
import { Radio, Icon } from "antd";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";

import { albama, newJersy, popularList } from "./data";
import CircularProgress from "components/GlobalComponent/CircularProgress";
import PropertiesItemCard from "./PropertiesItemCard";
import IntlMessages from "util/IntlMessages";

const popularData = [popularList, newJersy, albama];

class PropertiesCard extends React.Component {
  state = {
    popular: popularData[0],
    loader: false,
    type: "popular",
    dataList: null
  };

  handleChange1 = e => {
    const value = e.target.value;
    this.setState({
      type: value,
      loader: true
    });
    setTimeout(() => {
      this.setState({ loader: false });
    }, 1000);
  };

  render() {
    const { loader } = this.state;
    let { profile } = this.props;
    let productList = [];
    profile.company_products.forEach(product => {
      if (this.state.type === "popular") {
        productList = profile.company_products;
      } else if (product.productType === this.state.type) {
        productList.push(product);
      }
    });
    if (productList.length > 0 && productList.length > 5) {
      productList = productList(0, 4);
    }
    return (
      <div id="nav_product" style={{ minHeight: "16em" }}>
        <WidgetHeader
          styleName="d-flex"
          title={<IntlMessages id="account.profile.product" />}
          extra={
            <div className="gx-mx-sm-2">
              <Radio.Group
                className="gx-radio-group-link gx-radio-group-link-bg-light"
                defaultValue="popular"
                onChange={this.handleChange1}
              >
                <Radio.Button value="popular" className="m-b-0-i">
                  <IntlMessages id="account.profile.product.popular" />
                </Radio.Button>
                <Radio.Button value="landtour" className="m-b-0-i">
                  <IntlMessages id="account.profile.product.landtour" />
                  {/* (172) */}
                </Radio.Button>
                <Radio.Button value="grouptour" className="m-b-0-i">
                  <IntlMessages id="account.profile.product.grouptour" />
                  {/* (21) */}
                </Radio.Button>
              </Radio.Group>
            </div>
          }
        />
        {loader ? (
          <CircularProgress className="gx-loader-400" />
        ) : productList.length > 0 ? (
          productList.map((data, index) => (
            <PropertiesItemCard key={index} productList={data} />
          ))
        ) : (
          <div>
            <p className="gx-font-weight-light">
              <Icon type="exclamation-circle" />{" "}
              <IntlMessages id="account.profile.product.empty" />
            </p>
            <p>
              <IntlMessages id="account.profile.product.empty.guide" />
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default PropertiesCard;
