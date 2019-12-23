import React, { Component } from "react";
import { photoList } from "./data";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";

import Photos from "./Photos";
class Media extends Component {
  render() {
    return (
      <div className="block-w-nb" id="nav_media">
        <WidgetHeader title="Media" />
        <Photos photoList={photoList} />
        {/* <p className="gx-text-primary gx-fs-md gx-pointer gx-d-block text-align-right">
                    Go to gallery
                    <i className={`icon icon-long-arrow-right gx-fs-xxl gx-ml-2 gx-d-inline-flex gx-vertical-align-middle`} />
                </p> */}
      </div>
    );
  }
}
export default Media;
