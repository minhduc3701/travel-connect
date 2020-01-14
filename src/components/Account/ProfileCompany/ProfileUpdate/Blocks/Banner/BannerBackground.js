import React, { Component } from "react";
import { Icon, Upload } from "antd";
// import { notiChange } from "util/Notification";
import { connect } from "react-redux";
import { actChangeBackground } from "appRedux/actions/CompanyProfile";
import background from "assets/images/travel-default-background.png";

class BannerBackground extends Component {
  state = {
    loading: false,
    file: {
      background: []
    },
    fileList: []
  };

  onSaveBackground = () => {
    this.props.actSaveData(this.state.fileList);
  };

  render() {
    let { fileList } = this.state;
    let { profile } = this.props.profile;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    // const { imageUrl } = this.state;

    const props = {
      showUploadList: false,
      multiple: false,
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(
          state => ({
            fileList: [file]
          }),
          () => this.onSaveBackground()
        );
        return false;
      },
      fileList
    };

    return (
      <div className="aspect_box ">
        <div className="aspect_box--inner aspect_box--retangle_1x4 ">
          <img
            src={
              profile.company_background
                ? profile.company_background
                : profile.company_background === ""
                ? background
                : background
            }
            alt="banner"
            className="aspect_box__img aspect_box__img--cover z-1"
          />
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader aspect_box__img aspect_box__img--cover block__banner--upload z-2"
            {...props}
          >
            {uploadButton}
          </Upload>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    actSaveData: background => {
      dispatch(actChangeBackground(background));
    }
  };
};

export default connect(null, mapDispatchToProps)(BannerBackground);
