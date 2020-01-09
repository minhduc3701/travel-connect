import React from "react";
import IntlMessages from "util/IntlMessages";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";

import Slider from "react-slick";
import RoadMapItem from "./RoadMapItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Friends({ profile }) {
  // let { Account } = profile;
  let communities = profile.Account.company_communities;

  // const onChangeToArray = com => {
  //   let arr = [];
  //   for (let key in com) {
  //     if (com.hasOwnProperty(key)) {
  //       arr = com[key];
  //     }
  //   }
  //   return arr;
  // };

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

  return (
    <div>
      {communities ? (
        <div className="block-w-nb" id="nav_communities">
          <WidgetHeader title={<IntlMessages id="account.profile.communities" />} />
          <Slider className="gx-slick-slider" {...settings}>
            {communities.map((commu, index) => (
              <RoadMapItem key={index} data={commu} />
            ))}
          </Slider>
        </div>
      ) : (
          <div>
            <WidgetHeader title={<IntlMessages id="account.profile.communities" />} />
            <div className="gx-pt-2">
              <ul className="gx-fnd-list gx-mb-0">
                <p className="gx-font-weight-light">
                  <i className="icon icon-sweet-alert"></i>
                  <IntlMessages id="account.profile.communities.empty" />
                </p>
              </ul>
            </div>
          </div>
        )}
    </div>
  );

  // if (friendList.length < 1) {
  //   return (
  //     <div>
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
  //   <div className="block-w-nb" id="nav_communities">
  //     <WidgetHeader title={<IntlMessages id="company.communities" />} />
  //     <Slider className="gx-slick-slider" {...settings}>
  //       {friendList.map((commu, index) => (
  //         <RoadMapItem key={index} data={commu} />
  //       ))}
  //     </Slider>
  //   </div>
  // );
}
export default Friends;
