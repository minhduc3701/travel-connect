import React from "react";

const RoadMapItem = ({ data }) => {
  return (
    <div className="gx-slider">
      <div className="gx-slider-img">
        <img
          alt="example"
          src="http://img.daidoanket.vn/images/fullsize/2019/Thang-5/31/Hiephoidulich_8436.jpg"
          style={{ maxHeight: 185 }}
        />
        <img className="gx-img-up" alt="example" src={data.communities_logo} />
      </div>
      <div className="gx-slider-content">
        <h4>{data.communities_name}</h4>
        <p className="gx-text-grey">{data.communities_intro}</p>
      </div>
    </div>
  );
};

export default RoadMapItem;
// import React from "react";

// const RoadMapItem = ({ data }) => {
//   return (
//     <div className="gx-slider pos-rel">
//       <img
//         className="pos-abs"
//         alt="example"
//         src={data.communities_logo}
//         style={{ width: "8em", height: "8em", objectFit: "contain" }}
//       />
//       <div className="gx-slider-content">
//         <h4>{data.communities_name}</h4>
//         <p className="gx-text-grey text-ellipsis-4">{data.communities_intro}</p>
//       </div>
//     </div>
//   );
// };

// export default RoadMapItem;
