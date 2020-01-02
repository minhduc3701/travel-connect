import React, { Component } from "react";
import { notiChange } from "util/Notification";
import { Icon, Upload } from "antd";
import { connect } from "react-redux";
import { actChangeLogo } from "appRedux/actions/CompanyProfile";

class AvatarCompany extends Component {
  state = {
    loading: false,
    file: {
      logo: []
    },
    fileList: []
  };

  handleChange = ({ fileList }) => {
    // console.log("action");
    this.setState({ fileList }, () => this.onSaveLogo());
  };

  onSaveLogo = () => {
    notiChange("success", "Change background success!");
    this.props.actSaveData(this.state.file);
  };

  render() {
    let { fileList } = this.state;
    let { profile } = this.props.profile;
    // console.log(this.state);
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;

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
        // console.log("props");
        if (this.state.file.logo.length < 2) {
          this.setState(state => ({
            fileList: [...state.fileList, file],
            file: {
              logo: [...state.fileList, file]
            }
          }));
        } else {
          this.setState(state => ({
            fileList: [...state.fileList, file],
            file: {
              logo: file
            }
          }));
        }

        return false;
      },
      fileList
    };

    return (
      <div className="aspect_box block__banner__avatar z-4">
        <div className="aspect_box--inner aspect_box--square --circle block__banner__avatar--inner bg-color-white">
          <img
            src={profile.company_logo}
            alt="banner"
            className="aspect_box__img aspect_box__img--contain z-1"
          />
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader aspect_box__img aspect_box__img--cover block__banner__avatar--upload z-2"
            {...props}
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

const mapDispatchToProps = (dispatch, props) => {
  return {
    actSaveData: logo => {
      dispatch(actChangeLogo(logo));
    }
  };
};

export default connect(null, mapDispatchToProps)(AvatarCompany);
