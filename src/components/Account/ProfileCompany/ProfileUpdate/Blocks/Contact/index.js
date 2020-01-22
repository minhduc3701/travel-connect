import React from "react";
import { Table } from "antd";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import IntlMessages from "util/IntlMessages";

const Contact = props => {
  let { profile } = props;

  const columns = [
    {
      title: <IntlMessages id="account.profile.contact.employee.name" />,
      dataIndex: "image",
      render: (text, profile) => {
        return (
          <div className="gx-flex-row gx-align-items-center">
            <img
              className="gx-rounded-circle gx-size-30 gx-mr-2"
              src={profile.member_logo}
              alt=""
            />
            <p className="gx-mb-0">{profile.member_name}</p>
          </div>
        );
      }
    },
    {
      title: <IntlMessages id="account.profile.contact.employee.job" />,
      dataIndex: "transfer",
      render: (text, profile) => {
        return <span className="gx-text-grey">{profile.member_job}</span>;
      }
    },
    {
      title: <IntlMessages id="account.profile.contact.employee.action" />,
      dataIndex: "status",
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
          dataSource={profile.company_contacts}
          pagination={false}
          size="small"
        />
      </div>
    </div>
  );
};

export default Contact;
