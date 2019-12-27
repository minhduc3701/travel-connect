import React, { Component } from "react";
import { photoList } from "./data";
import doneChange from "util/Notification";
import { Upload, Icon, Modal } from "antd";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import Photos from "./Photos";

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
    fileList: [
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      },
      {
        uid: "-2",
        name: "image.png",
        status: "done",
        url:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      },
      {
        uid: "-3",
        name: "image.png",
        status: "done",
        url:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      },
      {
        uid: "-4",
        name: "image.png",
        status: "done",
        url:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      },
      {
        uid: "-5",
        name: "image.png",
        status: "error"
      }
    ]
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
      doneChange();
      this.setState({ stt_media: false });
    }
    if (this.state.stt_media === false) this.setState({ stt_media: true });
  };
  render() {
    let { profile } = this.props;
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className="block-w-nb" id="nav_media">
        <WidgetHeader
          styleName="d-flex align-items-flex-end"
          title="Media"
          extra={
            <div className="m-l-1" onClick={() => this.changeMediaToEdit()}>
              {this.state.stt_media === false ? (
                <Icon
                  type="edit"
                  className="cursor-pointer cursor-pointer--zoom"
                />
              ) : (
                <Icon
                  className="size-4 cursor-pointer cursor-pointer--zoom"
                  type="check-circle"
                />
              )}
            </div>
          }
        />
        {this.state.stt_media === false ? (
          <div>
            {profile.company_medias ? (
              <Photos photoList={profile.company_medias} />
            ) : (
              <p>Album media is empty!</p>
            )}
            {/* <p className="gx-text-primary gx-fs-md gx-pointer gx-d-block text-align-right">
                                    Go to gallery
                                    <i className={`icon icon-long-arrow-right gx-fs-xxl gx-ml-2 gx-d-inline-flex gx-vertical-align-middle`} />
                                </p> */}
          </div>
        ) : (
          <div className="clearfix">
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
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
              {" "}
              <Icon
                type="edit"
                className="cursor-pointer cursor-pointer--zoom"
              />{" "}
              Edit{" "}
            </div>
          ) : (
            <div className="d-inline-block">
              {" "}
              <Icon
                className="size-4 cursor-pointer cursor-pointer--zoom"
                type="check-circle"
              />{" "}
              Save{" "}
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Media;
