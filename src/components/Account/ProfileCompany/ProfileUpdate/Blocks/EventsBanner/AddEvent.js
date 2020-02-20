import React from "react";
import { Icon } from "antd";
// import { notiChange } from "util/Notification";
import { Link } from "react-router-dom";
import IntlMessages from "util/IntlMessages";

class AddEvent extends React.Component {
  state = { events: null };

  render() {
    return (
      <Link to="/dashboard">
        <div
          className="block-w-nb border-hover pos-rel cursor-pointer"
          style={{
            height: "20em",
            border: "1px grey dashed",
            background: "#c3c3c322"
          }}
        >
          <h3
            className="text-color-white"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)"
            }}
          >
            <Icon type="plus" className="m-r-1" />
            {this.state.events ? (
              <IntlMessages id="account.profile.edit.event.guide" />
            ) : (
              <IntlMessages id="account.profile.edit.event.guide.empty" />
            )}
          </h3>
        </div>
      </Link>
    );
  }
}

export default AddEvent;
