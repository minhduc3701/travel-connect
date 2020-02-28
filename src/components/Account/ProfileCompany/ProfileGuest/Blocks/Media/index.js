import React, { Component } from "react";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import IntlMessages from "util/IntlMessages";
import Photos from "./Photos";
class Media extends Component {
  render() {
    return (
      <div id="nav_media">
        <WidgetHeader title={<IntlMessages id="account.profile.media" />} />
        {/* {this.props.profile !== [] && this.props.profile !== "" ? ( */}
        {this.props.profile.company_medias.length > 0 ? (
          <Photos Account={this.props.profile} />
        ) : (
          <p>Album media is empty!</p>
        )}
      </div>
    );
  }
}
export default Media;
