import React, { Component } from "react";
import { Icon, Upload, message } from "antd";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

class BannerBackground extends Component {
  state = {
    loading: false
  };

  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
  };
  render() {
    let { profile } = this.props.profile;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <div className="aspect_box ">
        <div className="aspect_box--inner aspect_box--retangle_1x4 ">
          <img
            src={profile.company_background}
            alt="banner"
            className="aspect_box__img aspect_box__img--cover z-1"
          />
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader aspect_box__img aspect_box__img--cover block__banner--upload z-2"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                className="aspect_box__img aspect_box__img--cover z-3"
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
      </div>
    );
  }
}

export default BannerBackground;
