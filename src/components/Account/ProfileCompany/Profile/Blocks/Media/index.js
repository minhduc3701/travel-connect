import React, { Component } from "react";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import IntlMessages from "util/IntlMessages";
import Photos from "./Photos";
class Media extends Component {
  render() {
    // let { Account } = this.props.profile;
    return (
      <div className="block-w-nb" id="nav_media">
        <WidgetHeader title={<IntlMessages id="account.profile.media" />} />
        <Photos Account={this.props.profile} />
        {/* <p className="gx-text-primary gx-fs-md gx-pointer gx-d-block text-align-right">
                    Go to gallery
                    <i className={`icon icon-long-arrow-right gx-fs-xxl gx-ml-2 gx-d-inline-flex gx-vertical-align-middle`} />
                </p> */}
      </div>
    );
  }
}
export default Media;
