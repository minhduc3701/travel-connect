import React, { Component } from "react";
class Photos extends Component {
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
                />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
}
export default Photos;
