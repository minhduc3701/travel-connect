import React, { Component } from "react";
import { Modal } from "antd";
class Photos extends Component {
  state = {
    previewVisible: false,
    previewImage: null
  };
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = item => {
    this.setState({
      previewVisible: true,
      previewImage: item
    });
  };

  render() {
    let { Account } = this.props;
    let mediaList = [];
    if (Account.company_medias.length > 6) {
      mediaList = Account.company_medias.splice(0, 6);
    } else {
      mediaList = Account.company_medias;
    }
    return (
      <div>
        {Account.company_medias ? (
          <ul className="gx-gallery-list bor-rad-0">
            {mediaList.map((photo, index) => (
              <li key={index}>
                <img
                  style={{ height: "8em", objectFit: "cover" }}
                  alt="..."
                  src={photo}
                  className="cursor-pointer"
                  onClick={() => this.handlePreview(photo)}
                />
              </li>
            ))}
          </ul>
        ) : null}
        <Modal
          visible={this.state.previewVisible}
          footer={null}
          onCancel={this.handleCancel}
          style={{ marginTop: -90 }}
        >
          <img
            alt="image"
            style={{ width: "100%" }}
            src={this.state.previewImage}
          />
        </Modal>
      </div>
    );
  }
}
export default Photos;
