import React, { Component } from "react";
import { Button, Divider } from "antd";
import IntlMessages from "util/IntlMessages";

class PriceItem extends Component {
  state = {};

  render() {
    return (
      <div className={`${this.props.styleName}`} style={{ borderRadius: 10 }}>
        <div className={`${this.props.headerStyle}`}>
          <p className="gx-letter-spacing-base gx-text-white gx-text-uppercase gx-mb-0">
            {<IntlMessages id="account.package.free.title" />}
          </p>
        </div>

        <div className={`${this.props.itemStyle}`}>
          <ul className="gx-package-items">
            <li>
              <i className="icon icon-translation" />
              <span>{<IntlMessages id="pricingTable.easyTranslation" />}</span>
            </li>
            <li>
              <i className="icon icon-font" />
              <span>
                {<IntlMessages id="pricingTable.awesomeGoogleFonts" />}
              </span>
            </li>
            <li>
              <i className="icon icon-hotel-booking" />
              <span>
                {<IntlMessages id="pricingTable.hotelBookingSystem" />}
              </span>
            </li>
            <li>
              <i className="icon icon-sent" />
              <span>
                {<IntlMessages id="pricingTable.emailComposeInterface" />}
              </span>
            </li>
            <li>
              <i className="icon icon-location" />
              <span>
                {<IntlMessages id="pricingTable.locationFinderApp" />}
              </span>
            </li>
          </ul>
          <div className="gx-package-footer">
            <Button type="primary" className={`${this.props.footerStyle}`}>
              {<IntlMessages id="account.package.select" />}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default PriceItem;
