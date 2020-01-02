import React from "react";
import { Icon } from "antd";
import IntlMessages from "util/IntlMessages";
const WelcomeCard = props => {
  let { Account } = props;
  // console.log(Account);
  return (
    <div
      className="block-w flow-hidden pos-rel w-100 z-1"
      style={{
        minHeight: "200px",
        height: "calc(100% - 2em)"
      }}
    >
      <div className="pos-abs pos-abs-center z-2 w-80">
        <h1 className="gx-mb-3">
          <IntlMessages id={"welcome"} /> {Account.company_brandname}!
        </h1>
        <p className="gx-fs-sm gx-text-uppercase">
          <IntlMessages id={"youHave"} />:
        </p>
        <ul className="gx-list-group">
          <li>
            <Icon type="message" />
            <span>5 Tin nhắn chưa đọc</span>
          </li>
          <li>
            <Icon type="mail" />
            <span>2 báo giá mới</span>
          </li>
          <li>
            <Icon type="profile" />
            <span>7 báo giá chưa phản hồi</span>
          </li>
          <li>
            <Icon type="bell" />
            <span>3 giao dịch chưa hoàn thành</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WelcomeCard;
