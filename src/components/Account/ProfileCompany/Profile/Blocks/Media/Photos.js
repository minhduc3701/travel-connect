import React, { Component } from "react";
class Photos extends Component {
  render() {
    let { Account } = this.props.Account;
    // console.log(Account.company_medias);
    return (
      <div>
        {Account.company_medias ? (
          <ul className="gx-gallery-list bor-rad-0">
            {Account.company_medias.map((photo, index) => (
              <li key={index}>
                <img alt="..." src={photo.image} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
}
export default Photos;
