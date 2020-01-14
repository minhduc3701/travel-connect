import React, { Component } from "react";
class Photos extends Component {
  render() {
    let { Account } = this.props.Account;
    return (
      <div>
        {Account.company_medias ? (
          <ul className="gx-gallery-list bor-rad-0">
            {Account.company_medias.map((photo, index) => (
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
