import React from "react";
import { Icon } from "antd";
// import { notiChange } from "util/Notification";
import { Link } from "react-router-dom";

class AddEvent extends React.Component {
  state = { events: null };

  render() {
    return (
      <Link to="/dashboard">
        <div
          className="block-w-nb pos-rel cursor-pointer"
          style={{
            height: "20em",
            border: "1px grey dashed",
            background: "#80808022"
          }}
        >
          <h2
            className="text-color-white"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)"
            }}
          >
            <Icon type="plus" className="m-r-1" />
            {this.state.events
              ? "Create new event"
              : "You dont have any event, Create now"}
          </h2>
        </div>
      </Link>
    );
  }
}

export default AddEvent;
// import React, { Component } from "react";
// import { Upload, Icon, message } from "antd";
// import { notiChange } from "util/Notification";
// import { Link } from "react-router-dom";

// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener("load", () => callback(reader.result));
//   reader.readAsDataURL(img);
// }

// function beforeUpload(file) {
//   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
//   if (!isJpgOrPng) {
//     // message.error("You can only upload JPG/PNG file!");
//     notiChange("error", "You can only upload JPG/PNG file!");
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     // message.error("Image must smaller than 2MB!");
//     notiChange("error", "Image must smaller than 2MB!");
//   }
//   return isJpgOrPng && isLt2M;
// }

// class AddEvent extends React.Component {
//   state = {
//     loading: false
//   };

//   handleChange = info => {
//     if (info.file.status === "uploading") {
//       this.setState({ loading: true });
//       return;
//     }
//     if (info.file.status === "done") {
//       // Get this url from response in real world.
//       getBase64(info.file.originFileObj, imageUrl =>
//         this.setState({
//           imageUrl,
//           loading: false
//         })
//       );
//     }
//   };

//   render() {
//     const uploadButton = (
//       <div>
//         <Icon type={this.state.loading ? "loading" : "plus"} />
//         <div className="ant-upload-text">Create Event</div>
//       </div>
//     );
//     const { imageUrl } = this.state;
//     return (
//       <div className="aspect_box">
//         <div className="aspect_box--inner aspect_box--retangle_1x4">
//           <img
//             src="http://www.halongbooking.net/wp-content/uploads/2016/01/travel-banner-halong.jpg"
//             alt="banner"
//             className="aspect_box__img aspect_box__img--cover z-1"
//           />
//           <Upload
//             name="avatar"
//             listType="picture-card"
//             className="avatar-uploader aspect_box__img aspect_box__img--cover block__banner--upload z-2"
//             showUploadList={false}
//             action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//             beforeUpload={beforeUpload}
//             onChange={this.handleChange}
//           >
//             {imageUrl ? (
//               <img
//                 src={imageUrl}
//                 alt="avatar"
//                 className="aspect_box__img aspect_box__img--cover z-3"
//               />
//             ) : (
//               uploadButton
//             )}
//           </Upload>
//         </div>
//       </div>
//     );
//   }
// }

// export default AddEvent;
