import React from "react";
import { Tooltip } from "antd";

class Detail extends React.Component {
  render() {
    let { Account } = this.props;
    // console.log(Account);
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
          <span>Tệ :</span>
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
          <span>Chưa tốt :</span>
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
          <span>Bình thường :</span>
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
          <span>Tốt :</span>
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
          <span>Tuyệt vời :</span>
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
