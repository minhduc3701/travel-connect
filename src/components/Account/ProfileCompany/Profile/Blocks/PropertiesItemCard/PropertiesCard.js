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

  handleChange1 = e => {
    const value = e.target.value;
    this.setState(
      {
        type: value,
        loader: true
      },
      () => this.onGetList()
    );
    setTimeout(() => {
      this.setState({ loader: false });
    }, 1500);
  };

  onGetList = () => {
    let { Account } = this.props.profile;
    let a = Account.company_products;
    let type = "popular";
    type = a.filter(typeP => {
      return typeP.product_type === this.state.type;
    });
    if (this.state.type === "popular") {
      type = Account.company_products;
    }
    this.setState({
      dataList: type
    });
  };

  render() {
    const { loader } = this.state;
    let { Account } = this.props.profile;
    console.log(Account);
    return (
      <div className="block-w-nb" id="nav_product">
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
        ) : Account.company_products.length > 0 ? (
          Account.company_products.map((data, index) => (
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

// {loader ? (
//   <CircularProgress className="gx-loader-400" />
// ) : Account.company_products && this.state.dataList === null ? (
//   Account.company_products.map((data, index) => (
//     <PropertiesItemCard key={index} data={data} />
//   ))
// ) : this.state.dataList ? (
//   this.state.dataList.map((data, index) => (
//     <PropertiesItemCard key={index} data={data} />
//   ))
// ) : (
//   <div>
//     <p className="gx-font-weight-light">
//       <Icon type="exclamation-circle" />{" "}
//       <IntlMessages id="account.profile.product.empty" />
//     </p>
//     <p>
//       <IntlMessages id="account.profile.product.empty.guide" />
//     </p>
//   </div>
// )}
