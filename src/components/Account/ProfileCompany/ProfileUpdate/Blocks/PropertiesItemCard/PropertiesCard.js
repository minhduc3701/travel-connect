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
    let { profile } = this.props;
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
                  <IntlMessages id="account.profile.product.landtour" /> (172)
                </Radio.Button>
                <Radio.Button value={2} className="m-b-0-i">
                  <IntlMessages id="account.profile.product.grouptour" /> (21)
                </Radio.Button>
              </Radio.Group>
            </div>
          }
        />

        {profile.company_products.length > 0 ? (
          profile.company_products.map((data, index) => (
            <PropertiesItemCard key={index} data={data} />
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
// {profile.company_products ? (
//   profile.company_products.map((data, index) => (
//     <PropertiesItemCard key={index} data={data} />
//   ))
// ) : this.state.popular.length < 1 ? (
//   <div>
//         <p className="gx-font-weight-light">
//           <Icon type="exclamation-circle" /> <IntlMessages id="account.profile.product.empty" />
//         </p>
//         <p>
//           <IntlMessages id="account.profile.product.empty.guide" />
//         </p>
//       </div>
// ) : (
//   <CircularProgress className="gx-loader-400" />
// )}
