import React from "react";
import { Tooltip } from "antd";
import IntlMessages from "util/IntlMessages";

class Detail extends React.Component {
  render() {
    let { Account } = this.props;
    return (
      <div
        style={{
          width: "70%",
          paddingLeft: 5
        }}
      >
        <div
          style={{
            display: "flex",
            marginBottom: 5,
            justifyContent: "space-between"
          }}
        >
          <span><IntlMessages id="account.profile.rating.unit.bad" /> :</span>
          <Tooltip
            placement="right"
            title={`${Account.company_rating_bad} Đánh giá`}
          >
            <span
              style={{
                display: "inline-block",
                marginLeft: 5,
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "#ca4ce9"
              }}
            ></span>
          </Tooltip>
        </div>
        <div
          style={{
            display: "flex",
            marginBottom: 5,
            justifyContent: "space-between"
          }}
        >
          <span><IntlMessages id="account.profile.rating.unit.notgood" /> :</span>
          <Tooltip
            placement="right"
            title={`${Account.company_rating_fail} Đánh giá`}
          >
            <span
              style={{
                display: "inline-block",
                marginLeft: 5,
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "#FF8042"
              }}
            ></span>
          </Tooltip>
        </div>
        <div
          style={{
            display: "flex",
            marginBottom: 5,
            justifyContent: "space-between"
          }}
        >
          <span><IntlMessages id="account.profile.rating.unit.normal" /> :</span>
          <Tooltip
            placement="right"
            title={`${Account.company_rating_normal} Đánh giá`}
          >
            <span
              style={{
                display: "inline-block",
                marginLeft: 5,
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "#FFBB28"
              }}
            ></span>
          </Tooltip>
        </div>
        <div
          style={{
            display: "flex",
            marginBottom: 5,
            justifyContent: "space-between"
          }}
        >
          <span><IntlMessages id="account.profile.rating.unit.good" /> :</span>
          <Tooltip
            placement="right"
            title={`${Account.company_rating_good} Đánh giá`}
          >
            <span
              style={{
                display: "inline-block",
                marginLeft: 5,
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "#0088FE"
              }}
            ></span>
          </Tooltip>
        </div>
        <div
          style={{
            display: "flex",
            marginBottom: 5,
            justifyContent: "space-between"
          }}
        >
          <span><IntlMessages id="account.profile.rating.unit.great" /> :</span>
          <Tooltip
            placement="right"
            title={`${Account.company_rating_great} Đánh giá`}
          >
            <span
              style={{
                display: "inline-block",
                marginLeft: 5,
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "#00C49F"
              }}
            ></span>
          </Tooltip>
        </div>
      </div>
    );
  }
}
export default Detail;
