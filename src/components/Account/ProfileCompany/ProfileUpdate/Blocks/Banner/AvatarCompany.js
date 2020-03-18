import React, { Component } from "react";
// import { notiChange } from "util/Notification";
import { Icon, Upload } from "antd";
import firebaseAcc from "firebase/firebaseAcc";
import { connect } from "react-redux";
import { actChangeLogo } from "appRedux/actions/CompanyProfile";

class AvatarCompany extends Component {
  state = {
    loading: false,
    file: {
      logo: []
    },
    fileList: [],
    imageUrl: null
  };

  // onSendImageLogo = logo => {
  //   let user_info = JSON.parse(localStorage.getItem("user_info"));
  //   firebaseAcc
  //     .storage()
  //     .ref(`/${user_info.company_id}/${Date.now().toString()}`)
  //     .put(this.state.fileList[0])
  //     .then(res => {
  //       if (res) {
  //         firebaseAcc
  //           .storage()
  //           .ref(res.metadata.fullPath)
  //           .getDownloadURL()
  //           .then(url => {
  //             firebaseAcc
  //               .firestore()
  //               .collection("companies")
  //               .doc(user_info.company_id)
  //               .update({
  //                 logo: url
  //               })
  //               .then(res => {
  //                 this.setState({
  //                   imageUrl: url
  //                 });
  //               });
  //           });
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

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
            // fileList: file
            fileList: [file]
          }),
          () => this.props.actChangeLogoToStore(this.state.fileList)
          // () => this.onSendImageLogo(this.state.fileList)
        );
        return false;
      },
      fileList
    };

    return (
      <div className="aspect_box block__banner__avatar z-4">
        <div className="aspect_box--inner aspect_box--square --circle block__banner__avatar--inner bg-color-white">
          {profile.company_logo !== "" ? (
            <img
              src={profile.company_logo}
              alt={profile.company_brandname}
              className="aspect_box__img aspect_box__img--contain z-1"
            />
          ) : (
            <div
              className="aspect_box__img aspect_box__img--contain z-1"
              style={{ background: "#c3c3c322" }}
            ></div>
          )}
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader aspect_box__img aspect_box__img--cover block__banner__avatar--upload z-2"
            {...props}
            // onChange={this.handleChange}
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
    actChangeLogoToStore: data => {
      dispatch(actChangeLogo(data));
    }
  };
};

export default connect(null, mapDispatchToProps)(AvatarCompany);
