import React, { Component } from "react";
import { Icon, Upload } from "antd";
// import { notiChange } from "util/Notification";
import background from "assets/images/travel-default-background.png";
import firebaseAcc from "firebase/firebaseAcc";

class BannerBackground extends Component {
  state = {
    loading: false,
    file: {
      background: []
    },
    fileList: [],
    imageUrl: null
  };

  onSendImageBackground = backgrounds => {
    let user_info = JSON.parse(localStorage.getItem("user_info"));
    firebaseAcc
      .storage()
      .ref(`/${user_info.company_id}/${Date.now().toString()}`)
      .put(this.state.fileList[0])
      .then(res => {
        if (res) {
          firebaseAcc
            .storage()
            .ref(res.metadata.fullPath)
            .getDownloadURL()
            .then(url => {
              firebaseAcc
                .firestore()
                .collection("companies")
                .doc(user_info.company_id)
                .update({
                  background: url
                })
                .then(res => {
                  this.setState({
                    imageUrl: url
                  });
                });
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
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
        this.setState(
          state => ({
            fileList: [file]
          }),
          () => this.onSendImageBackground(this.state.fileList)
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
              profile.company_background === ""
                ? background
                : profile.company_background
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
