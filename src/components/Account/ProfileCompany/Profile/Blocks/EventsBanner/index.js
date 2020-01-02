import React from "react";
import "instantsearch.css/themes/algolia.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RoadMapItem from "./RoadMapItem";

class EventsBanner extends React.Component {
  state = {
    searchText: ""
  };

  updateSearchChatUser = evt => {
    this.setState({
      searchText: evt.target.value
    });
  };

  render() {
    let { Account } = this.props.profile;
    // console.log(Account.company_events);
    const settings = {
      arrows: false,
      dots: false,
      infinite: true,
      speed: 1000,
      marginLeft: 0,
      marginRight: 0,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000
    };
    return (
      <div className="pos-rel m-b-5" id="nav_event">
        {Account.company_events ? (
          <Slider className="gx-slick-slider p-b-0-i" {...settings}>
            {Account.company_events.map((media, index) => (
              <RoadMapItem key={index} data={media} />
            ))}
          </Slider>
        ) : null}
      </div>
    );
  }
}

export default EventsBanner;
