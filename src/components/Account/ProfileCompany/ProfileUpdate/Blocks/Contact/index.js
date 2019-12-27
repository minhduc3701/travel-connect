import React from "react";
import { Table } from "antd";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";

import CallContact from "./CallContact";

const Contact = props => {
  let { profile } = props;
  // console.log(profile);

  const columns = [
    {
      title: "Employee Holder Name",
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
      title: "Job",
      dataIndex: "transfer",
      render: (text, profile) => {
        return <span className="gx-text-grey">{profile.member_job}</span>;
      }
    },
    {
      title: "Action",
      dataIndex: "status",
      render: text => {
        return <CallContact button_text={text} />;
      }
    }
  ];

  return (
    <div className="block-w-nb disable_layer_block" id="nav_contact">
      <WidgetHeader title="Contact" />
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
