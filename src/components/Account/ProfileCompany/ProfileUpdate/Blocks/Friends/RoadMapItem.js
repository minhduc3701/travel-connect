import React from "react";

const RoadMapItem = ({ data }) => {
  const { image, title, desc } = data;
  return (
    <div className="gx-slider">

      <img
        alt="example"
        src={image}
        style={{ maxHeight: 150, objectFit: "contain" }}
      />
      <div className="gx-slider-content">
        <h4>{title}</h4>
        <p className="gx-text-grey text-ellipsis-4">{desc}</p>
      </div>
    </div>
  );
};

export default RoadMapItem;
