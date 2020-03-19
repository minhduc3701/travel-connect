import React, { Component } from "react";
import { Upload, Icon, Modal } from "antd";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import IntlMessages from "util/IntlMessages";
import Photos from "./Photos";
import firebase from "firebase/firebaseAcc";
import { actSaveMedia } from "appRedux/actions/CompanyProfile";
import { connect } from "react-redux";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class Media extends Component {
  state = {
    stt_media: false,
    previewVisible: false,
    previewImage: "",
    file: {
      company_medias: []
    },
    fileList: []
  };

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  changeMediaToEdit = () => {
    if (this.state.stt_media === true) {
      this.setState({ stt_media: false });
    }
    if (this.state.stt_media === false) this.setState({ stt_media: true });
  };

  onDoneChangeMedia = () => {
    this.props.actSaveMediaToStore(this.state.fileList);
  };

  // onUploadImage = async () => {
  //   let user_info = JSON.parse(localStorage.getItem("user_info"));
  //   await this.state.fileList.forEach(fileItem => {
  //     firebase
  //       .storage()
  //       .ref(`/${user_info.company_id}/${Date.now().toString()}`)
  //       .put(fileItem)
  //       .then(res => {
  //         if (res) {
  //           firebase
  //             .storage()
  //             .ref(res.metadata.fullPath)
  //             .getDownloadURL()
  //             .then(url => {
  //               firebase
  //                 .firestore()
  //                 .collection("companies")
  //                 .doc(user_info.company_id)
  //                 .update({
  //                   medias: firebase.firestore.FieldValue.arrayUnion(url)
  //                 });
  //             });
  //         }
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   });
  // };

  render() {
    let { profile } = this.props;
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">
          <IntlMessages id="general.btn.upload" />
        </div>
      </div>
    );
    let user_info = JSON.parse(localStorage.getItem("user_info"));

    const props = {
      multiple: true,
      // onRemove: file => {
      //   this.setState(state => {
      //     const index = state.fileList.indexOf(file);
      //     const newFileList = state.fileList.slice();
      //     newFileList.splice(index, 1);
      //     return {
      //       fileList: newFileList
      //     };
      //   });
      // },
      onRemove: file => {
        firebase
          .firestore()
          .collection("companies")
          .doc(user_info.company_id)
          .update({
            medias: firebase.firestore.FieldValue.arrayRemove(file.url)
          });
      },
      beforeUpload: file => {
        this.setState(
          state => ({
            fileList: [...state.fileList, file],
            file: {
              company_medias: [...state.fileList, file]
            }
          }),
          this.onDoneChangeMedia()
        );
        return false;
      },
      fileList
    };
    let imageList = [];
    for (let i = 0; i < profile.company_medias.length; i++) {
      imageList.push({
        uid: i,
        name: `image-${i}`,
        status: "done",
        url: profile.company_medias[i]
      });
    }
    return (
      <div className="block-w-nb" id="nav_media">
        <WidgetHeader
          styleName="d-flex align-items-flex-end"
          title={<IntlMessages id="account.profile.media" />}
          extra={
            <div className="m-l-1" onClick={() => this.changeMediaToEdit()}>
              {this.state.stt_media === false ? (
                <Icon
                  type="edit"
                  className="cursor-pointer cursor-pointer--zoom"
                />
              ) : (
                <Icon
                  onClick={() => this.onDoneChangeMedia()}
                  className="size-4 cursor-pointer cursor-pointer--zoom"
                  type="check-circle"
                />
              )}
            </div>
          }
        />
        {this.state.stt_media === false ? (
          <div>
            {profile.company_medias.length > 0 ? (
              <Photos photoList={profile.company_medias} />
            ) : (
              <p>Album media is empty!</p>
            )}
          </div>
        ) : (
          <div className="clearfix">
            <Upload
              {...props}
              listType="picture-card"
              fileList={imageList}
              onPreview={this.handlePreview}
            >
              {fileList.length >= 6 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={this.handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </div>
        )}
        <div
          className="gx-text-primary gx-fs-md gx-pointer gx-mb-4 gx-d-block gx-d-sm-none p-3 text-align-right"
          onClick={() => this.changeMediaToEdit()}
        >
          {this.state.stt_media === false ? (
            <div className="d-inline-block">
              <Icon
                type="edit"
                className="cursor-pointer cursor-pointer--zoom"
              />{" "}
              <IntlMessages id="general.btn.edit" />
            </div>
          ) : (
            <div className="d-inline-block">
              <Icon
                className="size-4 cursor-pointer cursor-pointer--zoom"
                type="check-circle"
              />{" "}
              <IntlMessages id="general.btn.save" />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    actSaveMediaToStore: data => {
      dispatch(actSaveMedia(data));
    }
  };
};

export default connect(null, mapDispatchToProps)(Media);
