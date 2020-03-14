import React from "react";
import { Radio, Icon } from "antd";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";

import { albama, newJersy, popularList } from "./data";
// import CircularProgress from "components/GlobalComponent/CircularProgress";
import PropertiesItemCard from "./PropertiesItemCard";
import IntlMessages from "util/IntlMessages";

const popularData = [popularList, newJersy, albama];

class PropertiesCard extends React.Component {
  state = {
    popular: popularData[0],
    loader: false
  };

  handleChange = e => {
    const value = e.target.value;
    this.setState({
      popular: popularData[value],
      loader: true
    });
    setTimeout(() => {
      this.setState({ loader: false });
    }, 1500);
  };

  render() {
    let popularProduct = [...this.props.profile.company_products].splice(0, 4);
    return (
      <div
        className="block-w-nb disable_layer_block display-background-grey"
        style={{ minHeight: "16em" }}
        id="nav_product"
      >
        <WidgetHeader
          styleName="d-flex"
          title={<IntlMessages id="account.profile.product" />}
          extra={
            <div className="gx-mx-sm-2">
              <Radio.Group
                className="gx-radio-group-link gx-radio-group-link-bg-light"
                defaultValue={0}
                onChange={this.handleChange}
              >
                <Radio.Button value={0} className="m-b-0-i">
                  <IntlMessages id="account.profile.product.popular" />
                </Radio.Button>
                <Radio.Button value={1} className="m-b-0-i">
                  <IntlMessages id="account.profile.product.landtour" />
                </Radio.Button>
                <Radio.Button value={2} className="m-b-0-i">
                  <IntlMessages id="account.profile.product.grouptour" />
                </Radio.Button>
              </Radio.Group>
            </div>
          }
        />

        {popularProduct.length > 0 ? (
          popularProduct.map((data, index) => (
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
