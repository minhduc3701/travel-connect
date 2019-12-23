import React, { Component } from "react";
class Photos extends Component {
    render() {
        return (
            <ul className="gx-gallery-list bor-rad-0">
                {this.props.photoList.map((photo, index) =>
                    <li key={index}>
                        <img alt="..." src={photo.image} />
                    </li>
                )}
            </ul>
        );
    }
}
export default Photos;


