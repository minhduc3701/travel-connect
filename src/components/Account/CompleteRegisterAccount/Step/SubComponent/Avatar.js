import React from "react";
import {Icon, Modal, Upload} from "antd";

class UploadPicture extends React.Component {
  state = {
    // previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  handleCancel = () => this.setState({previewVisible: false});

  handlePreview = (file) => {
    this.setState({
      // previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({fileList}) => this.setState({fileList});

  render() {
    const {previewVisible, fileList} = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          {/* <img alt="example" style={{width: '100%'}} src={previewImage}/> */}
        </Modal>
      </div>
    );
  }
}

export default UploadPicture;
