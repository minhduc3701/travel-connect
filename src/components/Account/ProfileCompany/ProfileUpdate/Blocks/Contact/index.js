import React from "react";
import { Table } from "antd";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import IntlMessages from "util/IntlMessages";

const Contact = props => {
  let { company_contacts } = props.profile;

  const columns = [
    {
      title: <IntlMessages id="account.profile.contact.employee.name" />,
      dataIndex: "image",
      render: (text, company_contacts) => {
        return (
          <div className="gx-flex-row gx-align-items-center">
            <img
              className="gx-rounded-circle gx-size-30 gx-mr-2"
              src={company_contacts.mLogo}
              alt=""
            />
            <p className="gx-mb-0">{company_contacts.mName}</p>
          </div>
        );
      }
    },
    {
      title: <IntlMessages id="account.profile.contact.employee.job" />,
      dataIndex: "transfer",
      render: (text, company_contacts) => {
        return <span className="gx-text-grey">{company_contacts.mJob}</span>;
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
          dataSource={company_contacts}
          pagination={false}
          size="small"
        />
      </div>
    </div>
  );
};

export default Contact;
