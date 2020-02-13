import React from "react";
import { Table } from "antd";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import IntlMessages from "util/IntlMessages";
import CallContact from "./CallContact";

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
      render: (text, company_contacts) => {
        return <CallContact Account={company_contacts} button_text={text} />;
      }
    }
  ];

  return (
    <div id="nav_contact" style={{ minHeight: "16em" }}>
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
