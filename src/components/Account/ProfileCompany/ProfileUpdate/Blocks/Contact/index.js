import React from "react";
import { Table } from "antd";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import IntlMessages from "util/IntlMessages";
import logo from "assets/images/placeholder.jpg";

class Contact extends React.Component {
  render() {
    let { member } = this.props;
    const columns = [
      {
        title: <IntlMessages id="account.profile.contact.employee.name" />,
        dataIndex: "image",
        key: "image",
        render: (text, member) => {
          return (
            <div className="gx-flex-row gx-align-items-center">
              <img
                className="gx-rounded-circle gx-size-30 gx-mr-2"
                src={member.mLogo === "" ? logo : member.mLogo}
                alt={member.mName}
              />
              <p className="gx-mb-0">{member.mName}</p>
            </div>
          );
        }
      },
      {
        title: <IntlMessages id="account.profile.contact.employee.job" />,
        dataIndex: "transfer",
        key: "transfer",
        render: (text, member) => {
          return <span className="gx-text-grey">{member.mJob}</span>;
        }
      },
      {
        title: <IntlMessages id="account.profile.contact.employee.action" />,
        dataIndex: "status",
        key: "status",
        render: text => {
          return (
            <span className="gx-text-primary gx-pointer">
              <i className="icon icon-forward gx-fs-sm gx-mr-2" />
              <IntlMessages id="account.profile.contact.employee.connect" />
            </span>
          );
        }
      }
    ];

    return (
      <div
        className="block-w-nb disable_layer_block display-background-grey"
        id="nav_contact"
      >
        <WidgetHeader title={<IntlMessages id="account.profile.contact" />} />
        <div className="gx-table-responsive">
          <Table
            className="gx-table-no-bordered"
            columns={columns}
            dataSource={member}
            pagination={false}
            size="small"
            rowKey={member => member.mId}
          />
        </div>
      </div>
    );
  }
}

export default Contact;
