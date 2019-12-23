import React from "react";
// import StarRatingComponent from "react-star-rating-component";
import {Avatar} from "antd";
import {Link} from "react-router-dom"
const Classic = ({testimonial}) => {
const { name, title} = testimonial; //content,  avatar
  return (
    <div className="gx-classic-testimonial gx-slide-item dashboard-company">
      <Avatar src={require("../../../../../assets/images/square_logo.png")} alt="..."/>
      <h3 className="gx-title gx-link"><Link to="/company/other">{name}</Link></h3>
      <small className="gx-post-designation" >{title}</small>

      <div className="gx-star-rating">
        {/* <StarRatingComponent name={name} starCount={5} value={4.5}/> */}
        {/* <p className="p-t-1 m-b-0-i">
							<Badge className="gx-badge-radius-sm gx-mb-2" count="Landtour" style={{ backgroundColor: '#52c41a' }} />
							<Badge className="gx-badge-radius-sm gx-mb-2" count="Grouptour" style={{ backgroundColor: '#52c41a' }} />
						</p> */}
      </div>
      {/* <p className="gx-description">{content}</p> */}
    </div>
  )
};

export default Classic;

