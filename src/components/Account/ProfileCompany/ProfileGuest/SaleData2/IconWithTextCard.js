import React from "react";

// import Widget from "components/Widget/index";
import { connect } from "react-redux";
import { THEME_TYPE_DARK } from "constants/ThemeSetting";

const IconWithTextCard = props => {
  const { icon, title, subTitle } = props;
  let { iconColor } = props;
  if (props.themeType === THEME_TYPE_DARK) {
    iconColor = "white";
  }

  return (
    <div
      className="block bor-rad-6"
      style={{
        background:
          "linear-gradient(325deg, #ffae75 0%, rgb(248, 116, 52) 100%)",
        // background: "linear-gradient(325deg, #ffae75 0%, #ff5300 100%)",
        border: "none",
        color: "white"
      }}
    >
      <div className=" gx-media gx-align-items-center gx-flex-nowrap">
        <div className="gx-mr-lg-4 gx-mr-3">
          <i
            className={`icon icon-${icon} gx-fs-xlxl gx-text-${iconColor} gx-d-flex`}
            style={{ fontSize: 50 }}
          />
        </div>
        <div className="gx-media-body ">
          <h1
            className="gx-fs-xxxl gx-font-weight-medium gx-mb-1 gx-text-white"
            style={{ fontSize: 25 }}
          >
            {title}
          </h1>
          <p className="gx-text-white gx-mb-0" style={{ fontSize: 16 }}>
            {subTitle}
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ settings }) => {
  const { themeType } = settings;
  return { themeType };
};
export default connect(mapStateToProps, null)(IconWithTextCard);
