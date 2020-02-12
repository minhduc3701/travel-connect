import React from "react";
import IntlMessages from "util/IntlMessages";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";

import Slider from "react-slick";
import RoadMapItem from "./RoadMapItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Friends({ friendList, profile }) {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    // marginLeft: 10,
    // marginRight: 10,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  console.log(profile.company_communities);
  return (
    <div>
      {profile.company_communities && profile.company_communities.length > 0 ? (
        <div
          className="block-w-nb"
          style={{ paddingBottom: "3em" }}
          id="nav_communities"
        >
          <WidgetHeader
            title={<IntlMessages id="account.profile.communities" />}
          />
          <Slider className="gx-slick-slider" {...settings}>
            {profile.company_communities.map((commu, index) => (
              <RoadMapItem key={index} data={commu} />
            ))}
          </Slider>
        </div>
      ) : (
        <div style={{ paddingBottom: "3em" }}>
          <WidgetHeader
            title={<IntlMessages id="account.profile.communities" />}
          />
          <div className="gx-pt-2">
            <ul className="gx-fnd-list gx-mb-0 " style={{ paddingLeft: "1em" }}>
              <p className="gx-font-weight-light">
                <i className="icon icon-sweet-alert"></i>
                <IntlMessages id="account.profile.communities.empty" />
                <span className="gx-link">Here</span>
              </p>
            </ul>
          </div>
        </div>
      )}
    </div>
  );

  // if (friendList.length < 1) {
  //   return (
  //     <div className="block-w-nb disable_layer_block">
  //       <WidgetHeader title={<IntlMessages id="company.communities" />} />
  //       <div className="gx-pt-2">
  //         <ul className="gx-fnd-list gx-mb-0">
  //           <p className="gx-font-weight-light">
  //             <i className="icon icon-sweet-alert"></i> You not have any
  //             communities yet. You can join one in...
  //           </p>
  //         </ul>
  //       </div>
  //     </div>
  //   );
  // }
  // return (
  //   <div className="block-w-nb disable_layer_block" id="nav_communities">
  //     <WidgetHeader title={<IntlMessages id="company.communities" />} />
  //     <Slider className="gx-slick-slider" {...settings}>
  //       {friendList.map((media, index) => (
  //         <RoadMapItem key={index} data={media} />
  //       ))}
  //     </Slider>
  //   </div>
  // );
}
export default Friends;
