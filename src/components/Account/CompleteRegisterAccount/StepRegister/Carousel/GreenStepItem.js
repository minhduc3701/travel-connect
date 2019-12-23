import React from "react";
// import Auxiliary from "util/Auxiliary";

const GreenStepItem = ({ data }) => {
  const { title, subTitle, desc } = data;
  return (
    <div style={{ borderRadius: "5px 5px 5px5px" }}>
      <h2 className="h3 gx-mb-2">{title}</h2>
      <h4 className="gx-text-grey">{subTitle}</h4>
      <p>{desc}</p>
    </div>
  );
};

export default GreenStepItem;
