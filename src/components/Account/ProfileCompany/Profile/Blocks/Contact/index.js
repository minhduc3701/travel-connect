import React from "react";
import { Table } from "antd";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";

import CallContact from "./CallContact";

const Contact = props => {
  let { Account } = props.profile;
  // console.log(Account);
  // let index = -1;

  // const findIndex = (id, contacts) => {
  //   let result = -1;
  //   contacts.forEach((contact, index) => {
  //     if (contact.id === id) {
  //       return (result = index);
  //     }
  //   });
  //   return result;
  // };

  const columns = [
    {
      title: "Employee Holder Name",
      dataIndex: "image",
      render: (text, Account) => {
        return (
          <div className="gx-flex-row gx-align-items-center">
            <img
              className="gx-rounded-circle gx-size-30 gx-mr-2"
              src={Account.member_logo}
              alt=""
            />
            <p className="gx-mb-0">{Account.member_name}</p>
          </div>
        );
      }
    },
    {
      title: "Job",
      dataIndex: "transfer",
      render: (text, Account) => {
        return <span className="gx-text-grey">{Account.member_job}</span>;
      }
    },
    {
      title: "Action",
      dataIndex: "status",
      render: (text, Account) => {
        return <CallContact Account={Account} button_text={text} />;
      }
    }
  ];

  const data = [
    {
      key: "1",
      name: "Đào Đức Anh",
      transfer: "Tour Operator",
      image: "https://wieldy.g-axon.work/static/media/a5.3ae38faf.png",
      status: "Connect"
    },
    {
      key: "2",
      name: "Lý Tuấn Linh",
      transfer: "Seller",
      image: "https://wieldy.g-axon.work/static/media/a6.58d1c1cf.png",
      status: "Connect"
    },
    {
      key: "3",
      name: "Nguyễn Thị Huyền",
      transfer: "Pha Quế",
      image: "https://wieldy.g-axon.work/static/media/a7.74a075d7.png",
      status: "Connect"
    },
    {
      key: "4",
      name: "Nguyễn Hải Anh",
      transfer: "Digital Marketing",
      image: "https://wieldy.g-axon.work/static/media/a10.52bf5ce3.png",
      status: "Connect"
    }
  ];

  return (
    <div className="block-w-nb" id="nav_contact">
      <WidgetHeader title="Contact" />
      <div className="gx-table-responsive">
        <Table
          className="gx-table-no-bordered"
          columns={columns}
          dataSource={Account.company_contacts}
          pagination={false}
          size="small"
        />
      </div>
    </div>
  );
};

export default Contact;
// import React from "react";
// import { Table } from "antd";
// import WidgetHeader from "components/GlobalComponent/WidgetHeader";

// import CallContact from "./CallContact";

// const columns = [
//   {
//     title: "Employee Holder Name",
//     dataIndex: "image",
//     render: (text, record) => {
//       return (
//         <div className="gx-flex-row gx-align-items-center">
//           <img
//             className="gx-rounded-circle gx-size-30 gx-mr-2"
//             src={text}
//             alt=""
//           />
//           <p className="gx-mb-0">{record.name}</p>
//         </div>
//       );
//     }
//   },
//   {
//     title: "Job",
//     dataIndex: "transfer",
//     render: (text, record) => {
//       return <span className="gx-text-grey">{record.transfer}</span>;
//     }
//   },
//   {
//     title: "Action",
//     dataIndex: "status",
//     render: text => {
//       return <CallContact button_text={text} />;
//     }
//   }
// ];

// const data = [
//   {
//     key: "1",
//     name: "Đào Đức Anh",
//     transfer: "Tour Operator",
//     image: "https://wieldy.g-axon.work/static/media/a5.3ae38faf.png",
//     status: "Connect"
//   },
//   {
//     key: "2",
//     name: "Lý Tuấn Linh",
//     transfer: "Seller",
//     image: "https://wieldy.g-axon.work/static/media/a6.58d1c1cf.png",
//     status: "Connect"
//   },
//   {
//     key: "3",
//     name: "Nguyễn Thị Huyền",
//     transfer: "Pha Quế",
//     image: "https://wieldy.g-axon.work/static/media/a7.74a075d7.png",
//     status: "Connect"
//   },
//   {
//     key: "4",
//     name: "Nguyễn Hải Anh",
//     transfer: "Digital Marketing",
//     image: "https://wieldy.g-axon.work/static/media/a10.52bf5ce3.png",
//     status: "Connect"
//   }
// ];

// const Contact = props => {
//   let { Account } = props.profile;
//   console.log(Account.company_contacts);
//   return (
//     <div className="block-w-nb" id="nav_contact">
//       <WidgetHeader title="Contact" />
//       <div className="gx-table-responsive">
//         <Table
//           className="gx-table-no-bordered"
//           columns={columns}
//           dataSource={data}
//           pagination={false}
//           size="small"
//         />
//       </div>
//     </div>
//   );
// };

// export default Contact;
