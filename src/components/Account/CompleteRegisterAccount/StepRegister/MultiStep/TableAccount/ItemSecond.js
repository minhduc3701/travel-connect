import React from "react";
// import {Button} from "antd";

// import IntlMessages from "util/IntlMessages";

const
  PriceItem = ({styleName, headerStyle, itemStyle, footerStyle}) => {
    return (
      <div className={`${styleName}`}>

        <div className={`${headerStyle}`}>
          <h3 className="gx-letter-spacing-base gx-text-white gx-text-uppercase gx-mb-0">
            {/* <IntlMessages id="pricingTable.business"/> */}
            Tài khoản Quản lý
          </h3>
        </div>

        <div className={`${itemStyle}`}>
         
          <ul className="gx-package-items">
          <p style = {{fontSize : '1.2em'}}>
            Chứng từ cơ bản cần cung cấp
          </p>
            <li>
              <span>
                - Bản sao Giấy chứng nhận cho phép kinh doanh.
                </span>
            </li>
            <li>
              <span>
                - Bản sao Giấy chứng nhận đăng ký mã số thuế. 
                </span>
            </li>
          </ul>
        </div>
      </div>
    )
  };

export default PriceItem;

