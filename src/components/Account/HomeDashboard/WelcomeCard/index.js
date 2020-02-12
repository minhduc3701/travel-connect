import React from "react";
import { Icon } from "antd";
import IntlMessages from "util/IntlMessages";
const WelcomeCard = props => {
  // let { Account } = props;
  let user = JSON.parse(localStorage.getItem("user_info"));
  let name = user.user_name.split(" ");
  let nameWelcome = name[name.length - 1];
  return (
    <div
      className="block_shadow flow-hidden pos-rel w-100 z-1"
      style={{
        minHeight: "200px",
        height: "calc(100% - 2em)"
      }}
    >
      <div className="pos-abs pos-abs-center z-2 w-80">
        <h1 className="gx-mb-3">
          <IntlMessages id={"welcome"} /> {nameWelcome}!
          {/* <IntlMessages id={"welcome"} /> {Account.company_brandname}! */}
        </h1>
        <p className="gx-fs-sm gx-text-uppercase">
          <IntlMessages id={"youHave"} />:
        </p>
        <ul className="gx-list-group">
          <li>
            <Icon type="message" />
            <span>
              5 <IntlMessages id="sellingRequest.newMessage" />
            </span>
          </li>
          <li>
            <Icon type="mail" />
            <span>
              2{" "}
              <IntlMessages id="home.settings.notification.whatreceive.newquoterequest" />
            </span>
          </li>
          <li>
            <Icon type="profile" />
            <span>
              7 <IntlMessages id="account.quoteUnrep" />
            </span>
          </li>
          <li>
            <Icon type="bell" />
            <span>
              3 <IntlMessages id="unFinishTransaction" />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WelcomeCard;
