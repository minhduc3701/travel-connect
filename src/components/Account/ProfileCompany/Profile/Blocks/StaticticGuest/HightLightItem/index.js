import React from "react";
import { Tooltip } from "antd";

class HightLightItem extends React.Component {
  render() {
    return (
      <div className="bor-b d-flex d-flex-wrap p-3">
        <div className="gx-media gx-align-items-center gx-flex-nowrap">
          {/* <div className="gx-mr-lg-4 gx-mr-3">
					</div> */}
          <div className="gx-media-body">
            <span className="d-flex">
              <i
                className={`icon icon-${this.props.icon} size-5 gx-text-${this.props.colorTitle} gx-d-flex p-r-1`}
              />
              <span>
                <h5 className={`gx-font-weight-medium`}>
                  {this.props.title}
                  <Tooltip placement="topLeft" title={this.props.info}>
                    <i className="size-1 m-l-3 cursor-pointer icon icon-exclamation" />
                  </Tooltip>
                </h5>
                <h5
                  className={`gx-font-weight-medium gx-text-${this.props.colorTitle}`}
                >
                  {this.props.values}
                </h5>
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
export default HightLightItem;
