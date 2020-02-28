import React from "react";
import { Table } from "antd";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import IntlMessages from "util/IntlMessages";
import CallContact from "./CallContact";
import logo from "assets/images/placeholder.jpg";

const Contact = props => {
  let { company_contacts } = props.profile;
  let { member } = props;
  // console.log(props);
  const columns = [
    {
      title: <IntlMessages id="account.profile.contact.employee.name" />,
      dataIndex: "image",
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
      render: (text, member) => {
        return <span className="gx-text-grey">{member.mJob}</span>;
      }
    },
    {
      title: <IntlMessages id="account.profile.contact.employee.action" />,
      dataIndex: "status",
      render: (text, member) => {
        return <CallContact Account={member} button_text={text} />;
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
          dataSource={member}
          pagination={false}
          size="small"
        />
      </div>
    </div>
  );
};

export default Contact;
