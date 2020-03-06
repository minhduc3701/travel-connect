import React from "react";
import { Avatar } from "antd";

class HistoryActivities extends React.Component {
  render() {
    let { data } = this.props;
    return (
      <p>
        <Avatar src={data.avatar} shape="circle" className="gx-size-40" />
        <span className="p-l-2"> {data.title} </span>
      </p>
    );
  }
}
export default HistoryActivities;
