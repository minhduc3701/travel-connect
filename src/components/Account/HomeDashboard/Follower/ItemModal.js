import React from "react";
import { Avatar, Button, Popconfirm } from "antd";
import { ACCOUNT } from "components/Layout/Header/NavigateLink";
import firebase from "firebase/firebaseAcc";

class ItemModal extends React.Component {
  onUnFollow = data => {
    let uId = JSON.parse(localStorage.getItem("user_info"));
    firebase
      .firestore()
      .collection("follows")
      .doc(`${data.companyId}_${uId.company_id}`)
      .update({
        status: false
      });
  };

  render() {
    let { data } = this.props;
    return (
      <div
        style={{ justifyContent: "space-between" }}
        className="d-flex-i align-items-center p-b-1"
      >
        <a href={`${ACCOUNT}/company/${data.companyId}`}>
          <Avatar
            src={data.companyLogo}
            shape="circle"
            className="gx-size-40 gx-bg-gray"
          />
          <span className="gx-link p-l-2">{data.companyBrand}</span>
        </a>
        <Popconfirm
          title="Bạn có chắc chắn muốn bỏ theo dõi đơn vị này ?"
          onConfirm={() => this.onUnFollow(data)}
        >
          <Button className="m-0-i" size="small">
            Followed
          </Button>
        </Popconfirm>
      </div>
    );
  }
}
export default ItemModal;
