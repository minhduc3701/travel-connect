import React from "react";
import { Radio } from "antd";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";

import { albama, newJersy, popularList } from "./data";
import CircularProgress from "components/GlobalComponent/CircularProgress";
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
    const { loader, popular } = this.state;
    return (
      <div className="block-w-nb disable_layer_block" id="nav_product">
        <WidgetHeader
          styleName="d-flex"
          title={<IntlMessages id="step.product" />}
          extra={
            <div className="gx-mx-sm-2">
              <Radio.Group
                className="gx-radio-group-link gx-radio-group-link-bg-light"
                defaultValue={0}
                onChange={this.handleChange}
              >
                <Radio.Button value={0} className="m-b-0-i">
                  <IntlMessages id="popular" />
                </Radio.Button>
                <Radio.Button value={1} className="m-b-0-i">
                  <IntlMessages id="sidebar.b2bmarketplace.find.landtour" />{" "}
                  (172)
                </Radio.Button>
                <Radio.Button value={2} className="m-b-0-i">
                  <IntlMessages id="sidebar.b2bmarketplace.find.grouptour" />{" "}
                  (21)
                </Radio.Button>
              </Radio.Group>
            </div>
          }
        />

        {loader ? (
          <CircularProgress className="gx-loader-400" />
        ) : this.state.popular.length < 1 ? (
          <p className="gx-font-weight-light">
            <i className="icon icon-sweet-alert"></i>{" "}
            <IntlMessages id="guide.company.product" />
            <b>B2B Marketplace</b> >{" "}
            <b>
              <IntlMessages id="sidebar.b2b.service.inventory" />
            </b>
          </p>
        ) : (
          popular.map((data, index) => (
            <PropertiesItemCard key={index} data={data} />
          ))
        )}
      </div>
    );
  }
}

export default PropertiesCard;
