import React, { Fragment } from "react";
import FollowItem from "./FollowItem";
import ItemModal from "./ItemModal";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import { Modal } from "antd";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import IntlMessages from "util/IntlMessages";

class AccountPackage extends React.Component {
  state = {
    visible: false
  };

  onShowModal = () => {
    this.setState({
      visible: true
    });
  };

  onHandleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    let fList = [];
    let listDisplay = null;
    isLoaded(this.props.followList) &&
      this.props.followList.forEach(doc => {
        fList.push({
          companyId: doc.fId,
          companyBrand: doc.fBrand,
          companyLogo: doc.fLogo,
          status: doc.status
        });
      });

    if (fList.length > 4) {
      listDisplay = fList.slice(0, 4);
    }

    return (
      <Fragment>
        {fList.length > 0 ? (
          <div className="block_shadow">
            <WidgetHeader
              title="Đơn vị đang theo dõi"
              styleName="gx-flex-row"
              extra={
                <span className="gx-link" onClick={this.onShowModal}>
                  <IntlMessages id="more" />
                </span>
              }
            />
            {listDisplay
              ? listDisplay.map((item, index) => {
                  return (
                    <p>
                      <FollowItem key={index} data={item} />
                    </p>
                  );
                })
              : fList.map((item, index) => {
                  return (
                    <p>
                      <FollowItem key={index} data={item} />
                    </p>
                  );
                })}
            <Modal
              title="Danh sách đơn vị theo dõi"
              visible={this.state.visible}
              onCancel={this.onHandleCancel}
              footer={null}
            >
              {fList.map((item, index) => {
                return <ItemModal key={index} data={item} />;
              })}
            </Modal>
          </div>
        ) : null}
      </Fragment>
    );
  }
}
// export default AccountPackage;
const mapStateToProps = state => {
  const { followList } = state.firestore.ordered;
  return {
    followList
  };
};

export default compose(
  firestoreConnect(props => {
    const user_info = JSON.parse(localStorage.getItem("user_info"));
    return [
      {
        collection: "follows",
        where: [
          ["cId", "==", user_info.company_id],
          ["status", "==", true]
        ],
        storeAs: "followList"
      }
    ];
  }),
  connect(mapStateToProps, null)
)(AccountPackage);
