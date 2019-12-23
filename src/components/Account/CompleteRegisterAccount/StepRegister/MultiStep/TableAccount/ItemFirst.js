import React from "react";
import {Button} from "antd";
import IntlMessages from "util/IntlMessages";

const
  PriceItem = ({styleName, headerStyle, itemStyle, footerStyle}) => {
    return (
      <div className={`${styleName}`}>
        <div className={`${headerStyle}`}>
          <p className="gx-letter-spacing-base gx-text-white gx-text-uppercase gx-mb-0">
            {/* {<IntlMessages id="pricingTable.personal"/>} */}
            Tài khoản cá nhân
          </p>
        </div>
        <div className={`${itemStyle}`}>
          <ul className="gx-package-items">
          <p style = {{fontSize : '1.2em'}}>
            Chứng từ cơ bản cần cung cấp
          </p>
            <li>
              <span>
                - Thông tin xác thực cá nhân (Chứng minh thư, ...).
                </span>
            </li>
          </ul>
        </div>
      </div>
    )
  };

export default PriceItem;

