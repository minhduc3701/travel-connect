import React, { Component } from "react";
class Photos extends Component {
  render() {
    let { photoList } = this.props;
    return (
      <ul className="gx-gallery-list bor-rad-0">
        {photoList.map((photo, index) => (
          <li key={index}>
            <img alt="..." src={photo} />
          </li>
        ))}
      </ul>
    );
  }
}
export default Photos;
