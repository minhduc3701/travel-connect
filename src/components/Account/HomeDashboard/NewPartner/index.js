import React from "react";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Classic from "./Classic/index";
import { testimonialsData } from "./testimonialsData";
import IntlMessage from "util/IntlMessages";
class NewPartner extends React.Component {
  render() {
    const options1 = {
      dots: false,
      infinite: true,
      autoplay: true,
      speed: 500,
      marginLeft: 10,
      marginRight: 10,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className="block_shadow">
        <WidgetHeader
          styleName="gx-flex-row"
          title={<IntlMessage id="newPartner" />}
          extra={
            <span>
              <IntlMessage id="more" />
              <i className="icon icon-long-arrow-right gx-fs-xxl gx-ml-2 gx-d-inline-flex gx-vertical-align-middle" />
            </span>
          }
        />
        <div className="text-align-center">
          <Slider {...options1}>
            <Classic testimonial={testimonialsData[0]} />
            <Classic testimonial={testimonialsData[1]} />
            <Classic testimonial={testimonialsData[2]} />
            <Classic testimonial={testimonialsData[3]} />
            <Classic testimonial={testimonialsData[4]} />
            <Classic testimonial={testimonialsData[5]} />
            <Classic testimonial={testimonialsData[6]} />
          </Slider>
        </div>
      </div>
    );
  }
}

export default NewPartner;
