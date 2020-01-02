import React from "react";

const RoadMapItem = ({ data }) => {
  return (
    <div className="gx-slider">
      <img
        alt="example"
        src={data.communities_logo}
        style={{ maxHeight: 150, objectFit: "contain" }}
      />
      <div className="gx-slider-content">
        <h4>{data.communities_name}</h4>
        <p className="gx-text-grey text-ellipsis-4">{data.communities_intro}</p>
      </div>
    </div>
  );
};

export default RoadMapItem;
