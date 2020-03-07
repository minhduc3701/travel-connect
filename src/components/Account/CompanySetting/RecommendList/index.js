import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WidgetHeader from "components/GlobalComponent/WidgetHeader/index";
import IntlMessages from "util/IntlMessages";
import ProductItem from "./ProductItem";
import AllRecommendList from "./AllRecommendList";
import {
  getRecommendLandOverview,
  getRecommendGroupOverview
} from "appRedux/actions/GetUser";
import { connect } from "react-redux";
import CircularProgress from "components/GlobalComponent/CircularProgress";
class RecommendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      seeAll: false
    };
    this.props.getRecommendLandOverview();
    this.props.getRecommendGroupOverview();
  }
  back = () => {
    this.setState({
      seeAll: false
    });
  };
  render() {
    const options = {
      dots: false,
      infinite: false,
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
    return !this.state.seeAll ? (
      <div className="p-5">
        <WidgetHeader
          styleName="gx-flex-row"
          title={<IntlMessages id="account.profile.product.landtour" />}
        />

        <div className="block_shadow">
          <div className="text-align-center">
            {this.props.loadRecommandLand ? (
              <CircularProgress />
            ) : this.props.recommendLand.length === 0 ? (
              <div className="">
                <ul className="gx-sub-popover">
                  <p className="text-align-center text-color-sub">
                    <i className="icon icon-inbox size-6"></i>
                  </p>
                  <h5 className="text-align-center text-color-sub">
                    <IntlMessages id="account.setting.recommendList.emptyRecommend" />
                  </h5>
                </ul>
              </div>
            ) : (
              <Slider {...options}>
                {this.props.recommendLand.map((item, id) => {
                  return <ProductItem key={id} data={item} />;
                })}
              </Slider>
            )}
          </div>
          <div className="d-flex">
            <p
              style={{ marginLeft: "auto", marginRight: "2em" }}
              className="gx-link"
              onClick={() => this.setState({ type: "landtour", seeAll: true })}
            >
              <IntlMessages id="account.setting.recommendList.seeAll" />
            </p>
          </div>
        </div>
        <WidgetHeader
          styleName="gx-flex-row"
          title={<IntlMessages id="account.profile.product.grouptour" />}
        />

        <div className="block_shadow">
          <div className="text-align-center">
            {this.props.loadRecommandGroup ? (
              <CircularProgress />
            ) : this.props.recommendGroup.length === 0 ? (
              <div className="">
                <ul className="gx-sub-popover">
                  <p className="text-align-center text-color-sub">
                    <i className="icon icon-inbox size-6"></i>
                  </p>
                  <h5 className="text-align-center text-color-sub">
                    <IntlMessages id="account.setting.recommendList.emptyRecommend" />
                  </h5>
                </ul>
              </div>
            ) : (
              <Slider {...options}>
                {this.props.recommendGroup.map((item, id) => {
                  return <ProductItem key={id} data={item} />;
                })}
              </Slider>
            )}
          </div>
          <div className="d-flex">
            <p
              style={{ marginLeft: "auto", marginRight: "2em" }}
              className="gx-link"
              onClick={() => this.setState({ type: "grouptour", seeAll: true })}
            >
              <IntlMessages id="account.setting.recommendList.seeAll" />
            </p>
          </div>
        </div>
      </div>
    ) : (
      <AllRecommendList type={this.state.type} back={() => this.back} />
    );
  }
}
const mapStateToProps = ({ getUser }) => {
  const {
    recommendGroup,
    recommendLand,
    loadRecommandLand,
    loadRecommandGroup
  } = getUser;
  return {
    recommendGroup,
    recommendLand,
    loadRecommandLand,
    loadRecommandGroup
  };
};
export default connect(mapStateToProps, {
  getRecommendGroupOverview,
  getRecommendLandOverview
})(RecommendList);
