import React, { Component } from "react";
// import { photoList } from "./data";
import doneChange from "util/Notification";
import { Upload, Icon, Modal } from "antd";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import IntlMessages from "util/IntlMessages";
import Photos from "./Photos";
import { connect } from "react-redux";
import { actSaveMedia } from "appRedux/actions/CompanyProfile";

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
    return e && e.fileList1;
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

  onDoneChangeMedia = () => {
    this.props.onSendDataStore(this.state.file);
  };

  render() {
    let { profile } = this.props;
    console.log(this.state);
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">
          <IntlMessages id="general.btn.upload" />
        </div>
      </div>
    );

    const props = {
      multiple: true,
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
              {...props}
              listType="picture-card"
              // fileList={profile.company_medias}
              fileList={fileList}
              onPreview={this.handlePreview}
              // onChange={this.handleChange}
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
              <Icon
                type="edit"
                className="cursor-pointer cursor-pointer--zoom"
              />{" "}
              <IntlMessages id="general.btn.edit" />
            </div>
          ) : (
            <div className="d-inline-block">
              <Icon
                onClick={() => this.onSendDataStore()}
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
    onSendDataStore: media => {
      dispatch(actSaveMedia(media));
    }
  };
};

export default connect(null, mapDispatchToProps)(Media);
